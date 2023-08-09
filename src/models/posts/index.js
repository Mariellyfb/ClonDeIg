const insertPostModel = require('./insertPostModel');
const insertLikeModel = require('./insertLikeModel');
const searchPostsUserModel = require('./searchPostsUserModel');
const searchPostModel = require("./searchPostModel")
const searchAllPostModel = require("./searchAllPostModel")

module.exports = {
    insertLikeModel,
    insertPostModel,
    searchPostsUserModel,
    searchPostModel,
    searchAllPostModel
};
