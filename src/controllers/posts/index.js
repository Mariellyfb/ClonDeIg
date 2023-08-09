const getPostController = require('./getPostController.js');
const likePostController = require('./likePostController');
const newPostController = require('./newPostController');
const getPostsUserController = require("./getPostsUserController")
const getPostsController = require("./getPostsController")

module.exports = {
    getPostController,
    likePostController,
    newPostController,
    getPostsController,
    getPostsUserController,
};
