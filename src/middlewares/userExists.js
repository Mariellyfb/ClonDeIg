/* const getDb = require('./getDb'); */

/* const userExists = async (req, res, next) => {

    let connection; */
/* 
    try {
        connection = await getDb();

        // intentamos obtener el ID del usuario
        const userId = req.user?.id || req.params.userId;

        const [users] = await connection.query(
            `SELECT id FROM users WHERE id = ?`,
            [userId]
        );

        // pasamos el error en la siguiente funcion si no lo encuentra
        if (users.lenght < 1)
        
        
        next()
    }
} */
