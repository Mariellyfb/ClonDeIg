require('dotenv').config();

const getDb = require('./getDb.js');

const main = async () => {
    let connection;

    try {
        connection = await getDb();

        console.log('borrando tablas si existen...');

        await connection.query('DROP TABLE IF EXISTS likes, posts, users');

        console.log('creando tablas...');

        await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR (50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            name VARCHAR(100),
            lastname VARCHAR(100),
            avatar VARCHAR(200),
            password VARCHAR(100) NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
        )
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS posts (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            description TEXT NOT NULL,
            photo VARCHAR(200) NOT NULL,
            userId INT UNSIGNED NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY(userId) REFERENCES users(id)
        )
        `);

        await connection.query(`
   CREATE TABLE IF NOT EXISTS likes (
       id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
       userId INT UNSIGNED NOT NULL,
       postId INT UNSIGNED NOT NULL, 
       createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY(userId) REFERENCES users(id),
       FOREIGN KEY(postId) REFERENCES posts(id),
       UNIQUE(userId,postId)
   )
`);
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
};

main();
