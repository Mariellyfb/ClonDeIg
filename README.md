# Simple Instagram API

Este ejercicio consiste en crear una API que simule el funcionamiento de una aplicación similar a Instagram.

## Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.

2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

3. Ejecutar `npm run initDb` para crear las tablas necesarias en la base de datos anteriormente creada.

4. Ejecutar `npm run dev` o `npm start` para lanzar el servidor.

## URL

-   https://github.com/Mariellyfb/ClonDeIg.git

## Entidades

-   Users:

    -   id
    -   email || phone
    -   name
    -   username
    -   password
    -   createdAt

-   Posts:

    -   id
    -   userId
    -   description
    -   photo
    -   updatedAt
    -   createdAt

        (hasta 10 fts post)
        (midelware de error si quiere seleccionar mas de 10 fts)

-   Likes:

    -   id
    -   userId
    -   postId
    -   createdAt

-   Followers:

    -   Id
    -   userId
    -   followerId
    -   accepted

-   Comments:
    -   Id
    -   userId
    -   postId
    -   content
    -   updatedAt
    -   createdAt

<img src="http://localhost:3000/jf8fujf8f8uf8f8f8.jpg" alt="fdgf">

## Endpoints

### Usuarios: ✅

POST [/users] - Registro de usuario. (body formData para poder enviar foto avatar)

POST [/users/login] - Login de usuario (devuelve token, (username, avatar si no se implementa get /users) ).
GET [/users] - Devuelve información del usuario del token. TOKEN

**_ PUT [/users] - Editar el email o el nombre de usuario. TOKEN _**

### Posts:

POST [/posts] - Permite crear post (body de tipo formData). TOKEN

GET [/posts] - Lista de los posts ordenados por fecha desc
    [
        {
            id 
            desc
            photo 
            userId
            username
            avatar
            createdAt
            isLiked,
            numLikes,
            numComentarios
        },
       {
            id 
            desc
            photo 
            userId
            avatar
            username
            createdAt
            isLiked,
            numLikes,
            numComentarios
        },
    ]
    /posts -> lista de los posts ordenados por fecha desc
    /posts?search=Italia
    /posts?search=Italia&order=fecha&orderType=ASC
    /posts?order=likes&orderType=DESC
    /posts?order=coments&orderType=DESC

GET [/posts/:idUser] - Lista de los posts ordenados por fecha desc de idUser

GET [/photos/postId] - Devuelve información de un post por su descripción.
{
       id 
       description
       photo 
       userId
       username
       createdAt
       isLiked,
       numLikes,
       likes: [
        {
            userid
            username
        }
       ]
       numComentarios
       comentarios: [
        {
            id
            userid
            username
            content
        },
        {
            id
            userid
            username
            content
        }
       ]
}

POST [/photos/:postId/likes] - Añade/quita un like a una foto, devolver el numero actualizado de likes. TOKEN



**_ DELETE [/photos/userId:postId] - Borra una foto solo si eres quien lo creó. TOKEN _**
