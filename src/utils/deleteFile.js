const cloudinary = require("cloudinary").v2;

const deleteFile = async (url) => {
    try {
        if (!url || typeof url !== "string" || !url.includes("/")) {
            throw new Error("URL inválida");
        }

        const imgSplited = url.split("/");
        const folderName = imgSplited.at(-2);
        const fileName = imgSplited.at(-1).split(".")[0];

        const publicId = `${folderName}/${fileName}`;
        const result = await cloudinary.uploader.destroy(publicId);

        console.log("Destruido:", result);
    } catch (error) {
        console.error("Error al eliminar archivo:", error);
    }
};
module.exports = deleteFile;
