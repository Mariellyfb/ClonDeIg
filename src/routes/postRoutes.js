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

const { insertPostModel, insertPhotoModel } = require('../models/posts');

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

// Obtener posts por su descripcion o palabras clave.
router.get('/posts/key', postExists, getPostController, searchByDesc);

// Devolver ordenados los posts de un usuario.
router.get('/user/Posts', postExists, getPostController, searchPostUser);

// Listar ordenados los posts de un usuario en concreto.
router.get(
    '/users/posts',
    authUser,
    getPostController,
    searchByDesc,
    searchPostUser
);

module.exports = router;
