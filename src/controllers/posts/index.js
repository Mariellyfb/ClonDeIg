const getPostController = require('./getPostController.js');
const likePostController = require('./likePostController');
const newPostController = require('./newPostController');
const getPostsUserController = require('./getPostsUserController');
const getPostsController = require('../posts/getAllPostsController.js');

module.exports = {
    getPostController,
    likePostController,
    newPostController,
    getPostsController,
    getPostsUserController,
};
