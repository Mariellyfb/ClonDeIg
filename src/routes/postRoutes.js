const express = require('express');
const router = express.Router();

// Importamos las funciones controladoras requeridas.
const { postExists, authUser, userExist } = require('../middlewares');

const {
    getPostController,
    likePostController,
    newPostController,
    searchByDesc,
    searchPostUser,
} = require('../controllers/posts');

//const { insertPostModel, insertPhotoModel } = require('../models/posts');

const searchPostHome = require('../models/posts/searchAllPostModel');

//Nuevo post.
router.post('/posts', authUser, userExist, newPostController);

// Likes.
router.post(
    '/posts/:postId/likes',
    authUser,
    userExist,
    /*   postExists, */
    likePostController
);

// Obtener posts por su publicacion de forma descendente
router.get('/posts/home', searchPostHome);

//obtener posts pos su descripcion
router.get('/posts/key', postExists, getPostController, searchByDesc);

// Devolver ordenados los posts de un usuario.
router.get('/users/posts', postExists, getPostController, searchPostUser);

module.exports = router;
