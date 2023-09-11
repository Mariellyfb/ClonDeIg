// Importamos las dependencias.
const uuid = require('uuid');
const getDb = require('../../db/getDb');

// Función que realiza una consulta a la base de datos para dar like a un post.
const insertLikeModel = async (postId, userId) => {
    let connection;

    try {
        connection = await getDb();

        // Comprobamos si el usuario ya le ha dado like al mismo post.
        const [like] = await connection.query(
            `SELECT id FROM likes WHERE userId = ? AND postId = ?`,
            [userId, postId]
        );

        // Si la longitud del array de likes es mayor que cero, lanzamos un error indicando que el usuario ya ha dado like a ese post.
        if (like.length > 0) {
            let likeID = like[0].id;
            // Si el usuario ya ha dado like, entonces lo eliminamos.
            await connection.query(`DELETE FROM likes WHERE id=?`, [likeID]);
        } else {
            // Insertamos el like si no está dado.
            await connection.query(
                `INSERT INTO likes( postId, userId) VALUES( ?, ?)`,
                [postId, userId]
            );
        }

        // Contamos los likes que tiene el post consultado.
        const [totalLikes] = await connection.query(
            `SELECT postId, COUNT(*) as totalLikes FROM likes GROUP BY postId HAVING postId = ?`,
            [postId]
        );
        // Retornamos la cantidad de likes para el post específico.
        return totalLikes.length > 0 ? totalLikes[0].totalLikes : 0;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertLikeModel;
