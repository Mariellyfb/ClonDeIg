# Simple Instagram API

Este proyecto consiste en crear una API que simula el funcionamiento de una aplicación similar a Instagram.

## Instalación

1. Instala las dependencias mediante el comando `npm install` o `npm i`.

2. Renombra el archivo `.env.example` a `.env` y proporciona los datos necesarios.

3. Ejecuta `npm run initDb` para crear las tablas necesarias en la base de datos ya creada.

4. Ejecuta `npm run dev` o `npm start` para iniciar el servidor.

## Repositorio

-   [Repositorio GitHub](https://github.com/Mariellyfb/ClonDeIg.git)

## Entidades

### Users

-   `id`
-   `email`
-   `name`
-   `lastname`
-   `phone`
-   `avatar`
-   `username`
-   `password`
-   `createdAt`
-   `modifiedAt`

### Posts

-   `id`
-   `description`
-   `photo`
-   `userId`
-   `createdAt`
-   `modifiedAt`

### Likes

-   `id`
-   `userId`
-   `postId`
-   `createdAt`

## Endpoints

### Usuarios

POST [/users] - Registro de usuario ¡(utilizando FormData).

POST [/users/login] - Inicio de sesión de usuario (devuelve token, (nombre de usuario, avatar si no se implementa get /users)).

GET [/users] - Devuelve información del usuario correspondiente al token (TOKEN).

PUT [/users] - Edita el correo electrónico o el nombre de usuario (TOKEN).

### Posts

POST [/posts] - Crea una nueva publicación (cuerpo en formData). TOKEN.

GET [/posts] - Lista de publicaciones ordenadas por fecha de manera descendente:

-   Arreglo de objetos con información de las publicaciones, incluyendo si el usuario autenticado ha dado "like" a la publicación y el número de "likes" y comentarios.

GET [/posts/:idUser] - Lista de publicaciones ordenadas por fecha de manera descendente de un usuario en particular.

GET [/photos/postId] - Devuelve información de una publicación según su descripción, incluyendo "likes" y comentarios.

POST [/photos/:postId/likes] - Añade o quita un "like" a una publicación y devuelve el número actualizado de "likes". TOKEN.

DELETE [/photos/userId:postId] - Borra una publicación solo si el usuario autenticado es el que la creó. TOKEN.

### Tabla de Usuarios

| Campo      | Tipo         | Descripción                            |
| ---------- | ------------ | -------------------------------------- |
| id         | INT UNSIGNED | Identificador único del usuario        |
| email      | VARCHAR(100) | Correo electrónico del usuario         |
| name       | VARCHAR(100) | Nombre del usuario                     |
| lastname   | VARCHAR(100) | Apellidos del usuario                  |
| phone      | VARCHAR(10)  | Número de teléfono del usuario         |
| avatar     | VARCHAR(200) | Nombre del avatar del usuario          |
| username   | VARCHAR(50)  | Nombre de usuario                      |
| password   | VARCHAR(100) | Contraseña del usuario (hash)          |
| createdAt  | DATETIME     | Fecha y hora de creación del usuario   |
| modifiedAt | DATETIME     | Fecha y hora de la última modificación |

### Tabla de Publicaciones

| Campo       | Tipo         | Descripción                                |
| ----------- | ------------ | ------------------------------------------ |
| id          | INT UNSIGNED | Identificador único de la publicación      |
| description | TEXT         | Descripción de la publicación              |
| photo       | VARCHAR(200) | URL de la foto de la publicación           |
| userId      | INT UNSIGNED | ID del usuario creador de la publicación   |
| createdAt   | DATETIME     | Fecha y hora de creación de la publicación |
| modifiedAt  | DATETIME     | Fecha y hora de la última modificación     |

### Tabla de Likes

| Campo     | Tipo         | Descripción                              |
| --------- | ------------ | ---------------------------------------- |
| id        | INT UNSIGNED | Identificador único del like             |
| userId    | INT UNSIGNED | ID del usuario que dio el like           |
| postId    | INT UNSIGNED | ID de la publicación que recibió el like |
| createdAt | DATETIME     | Fecha y hora de creación del like        |
