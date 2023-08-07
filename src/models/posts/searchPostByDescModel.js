const express = require('express');
const app = express();
const sqlstring = require('sqlstring');
const PORT = 8080;

// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDB = require('../../db/getDb');

// Función que realiza una consulta a la base de datos para obtener un listado de posts.
const selectPostByKey = async (keyword = '', postId, userId = 0) => {
    let connection;

    try {
        connection = await getDB();

        const [posts] = await connection.query(
            `
            SELECT
            P.id,
            P.description,
            P.photo,
            U.username,
            U.id,
            P.userId = ${sqlstring.escape(String(userId))} AS owner,
            P.createdAt
        FROM posts P
        INNER JOIN users U ON U.id = P.userId
        WHERE P.id = ${sqlstring.escape(String(postId))}
        GROUP BY P.id
        ORDER BY P.createdAt DESC
            `,
            [userId, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
        );

        // Si no hay posts para mostrar lanzamos un error.
        if (posts.length < 1) {
            throw new Error(
                'No se encontraron publicaciones con estas palabras clave.'
            );
        }

        // Si el array de posts tiene alguna entrada, la obtenemos.
        for (const post of posts) {
            const [listedPosts] = await connection.query(
                `SELECT id, name FROM entryPhotos WHERE entryId = ?`,
                [post.id]
            );
            // Agregamos los posts a la entrada.
            listedPosts.post = post;
        }

        // Devolvemos los posts.
        return (
            posts,
            'id',
            'description',
            'photo',
            'userId',
            'username',
            'createdAt',
            'isLiked',
            'numLikes',
            'likes:,',
            'userId',
            'username',
            'numComentarios',
            'comentarios:',
            'id',
            'userid',
            'username',
            'content:',
            'id',
            'userid',
            'username',
            'content'
        );
    } catch (error) {
        // Manejar cualquier error que ocurra durante la ejecución de la consulta.
        console.error('Error en la consulta:', error);
        throw error; // Rechazar la promesa con el error capturado.
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectPostByKey;
