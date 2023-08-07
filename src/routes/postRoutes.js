const express = require('express');
const router = express.Router();

// Importamos las funciones controladoras requeridas.
const {postExists, authUser, userNotExist, searchPostIdModel} = require('../middlewares/userNotExists');

const {searchByDesc, getPostController,newPostController, searchPostUser } = require('../controllers/posts');
const likePostController = require('../controllers/posts/likePostController');

// Listar entradas.
router.get('/users/posts',likePostController, searchPostIdModel, searchPostUser);

//Nuevo post.
router.post('/posts',authUser, userNotExist,newPostController);

// Likes.
router.post(
    '/posts/:postId/likes',
    authUser,
    userNotExist,
    postExists,
    likePostController
);

// Obtener info de una entrada concreta.
router.get(
    '/posts/:postId',
    postExists,
    getPostController,
);

// Devolver ordenados los posts de un usuario.
router.get('/user/Posts',
postExists,
getPostController,
searchPostUser
);

// Devolver busqueda por descripcion o palabras clave.
router.get('/posts/key', 
postExists,
getPostController,
searchByDesc
);

module.exports = router;
