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

## Endpoints

### Usuarios: ✅

POST [/users] - Registro de usuario.

POST [/users/login] - Login de usuario (devuelve token).

GET [/users] - Devuelve información del usuario del token. TOKEN

**_ PUT [/users] - Editar el email o el nombre de usuario. TOKEN _**

### Posts:

POST [/photo] - Permite crear post. TOKEN

GET [/photos] - Lista las ultimas fotos.

-   GET [/photos/postId] - Devuelve información de un post por su descripción. \*

POST [/photos/:postId/likes] - Añade un like a una foto. TOKEN

DELETE [/photos/:postId/likes] - Deshace un like de una foto. TOKEN

**_ DELETE [/photos/userId:postId] - Borra una foto solo si eres quien lo creó. TOKEN _**
