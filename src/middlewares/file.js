const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const getFolder = () => {
  return process.env.CLOUDINARY_FOLDER || "proyecto10"; 
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => ({
    folder: getFolder(), 
    allowedFormats: ["jpg", "png", "jpeg", "gif", "webp"],
  }),
});


const upload = multer({ storage });
module.exports = upload