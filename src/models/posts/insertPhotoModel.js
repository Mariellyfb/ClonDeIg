// Importamos las dependencias.
const uuid = require('uuid');
// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');


// Función que realiza una consulta a la base de datos para agregar una foto a una entrada.
const insertPhotoModel = async (photoName, postId) => {
    let connection;

    try {
        connection = await getDb();

        // Generamos el id de la foto.
        const photoId = uuid.v4();

        // Insertamos la foto.
        await connection.query(
            `INSERT INTO entryPhotos(id, name, postId) VALUES(?, ?, ?)`,
            [photoId, photoName, postId]
        );

        return photoId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertPhotoModel;
