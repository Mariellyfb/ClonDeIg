// Importamos las dependencias.
const uuid = require('uuid');

// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Función que realiza una consulta a la base de datos para votar una entrada.
const insertLikeModel = async (value, postId, userId) => {
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
            // Si el usuario ya ha dado like, entonces lo eliminamos.
            await connection.query(
                `DELETE FROM likes WHERE userId = ? AND postId = ?`,
                [userId, postId]
            );
        } else {
            // Insertamos el like si no está dado.
            await connection.query(
                `INSERT INTO likes(id, postId, userId) VALUES(?, ?, ?)`,
                [uuid.v3(), postId, userId]
            );
        }

        // Obtenemos la cantidad de likes.
        const [likeAvg] = await connection.query(
            `SELECT AVG(amount) AS avg FROM likes WHERE postId = ?`,
            [postId]
        );

        // Retornamos la cantidad.
        return Number(likeAvg[0].avg);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertLikeModel;
