// Importamos las dependencias.
const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const uuid = require('uuid');

// Importamos los errores.
const { saveFileError } = require('./errorService');

// Funcion principal para guardar la foto en el directorio.
const savePhotoService = async (img, width) => {
    try {
        const uploadsDir = path.join(
            __dirname,
            '..',
            '..',
            process.env.UPLOADS_DIR
        );

        // Creamos la carpeta uoloads usando el metodo "access".
        try {
            await fs.access(uploadsDir);
        } catch {
            await fs.mkdir(uploadsDir);
        }

        // Creamos un objeto de tipo Sharp con la imagen recibida.
        const sharpImg = sharp(img.data);

        // Redimensionamos la imagen
        sharpImg.resize(width);

        // Generamos un nombre único para la imagen para evitar que haya dos imágenes con el mismo nombre.
        const imgName = `${uuid.v4()}.jpg`;

        // Ruta absoluta a la imagen.
        const imgPath = path.join(uploadsDir, imgName);

        // Guardamos la imagen en una carpeta de subida de archivos
        await sharpImg.toFile(imgPath);

        // Retornamos el nuevo nombre de la imagen
        return imgName;
    } catch (err) {
        saveFileError();
    }
};
module.exports = savePhotoService;
