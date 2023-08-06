/* 
const uuid = require('uuid');

const insertPostModel = async (description, photo, userId) => {

    let connection;

    try {
        connection = await getDb();

        let postId = uuid.v4();

        await connection.query(
            `INSERT INTO posts(id, description, photo, userId) VALUES(?, ?, ?, ?)`,
            [postId, description, photo, userId]

        );





    }
} */
