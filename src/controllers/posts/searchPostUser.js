const searchPostModel = require('../../models/posts/searchPostModel');

const searchPostUser = async (req, res, next) => {
    try {
        const { keyword } = req.query;

        // Dado que la propiedad user puede no existir lo indicamos por medio de la interrogación.
        const posts = await searchPostModel(keyword, req.user?.id);

        res.send({
            status: 'ok',
            data: {
                posts,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = searchPostUser;
