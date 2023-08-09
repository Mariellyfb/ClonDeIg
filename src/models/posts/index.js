const insertPostModel = require('./insertPostModel');
const insertPhotoModel = require('./insertPhotoModel');
const insertLikeModel = require('./insertLikeModel');
const searchPostsUserModel = require('./searchPostsUserModel');
const searchPostModel = require("./searchPostModel")
const searchAllPostModel = require("./searchAllPostModel")

module.exports = {
    insertLikeModel,
    insertPhotoModel,
    insertPostModel,
    searchPostsUserModel,
    searchPostModel,
    searchAllPostModel
};
