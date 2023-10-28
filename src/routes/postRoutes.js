const express = require('express');
const router = express.Router();

// Importamos las funciones controladoras requeridas.
const { postExists, authUser, userExist } = require('../middlewares');

const {
    getPostController,
    getPostsController,
    likePostController,
    newPostController,
    getPostsUserController,
} = require('../controllers/posts');

//Nuevo post.
router.post('/posts', authUser, userExist, newPostController);

// Obtener posts por su publicacion de forma descendente
router.get('/posts/home/noauth', getPostsController);
router.get('/posts/home', authUser, getPostsController);

// Devolver ordenados los posts de un usuario.
router.get('/users/:userId/posts', getPostsUserController);

//obtener posts pos su id.
router.get('/posts/search/:postId', postExists, getPostController);

// Likes.
router.post(
    '/posts/:postId/likes',
    authUser,
    userExist,
    postExists,
    likePostController
);

module.exports = router;
