// Import the necessary modules
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Configure Cloudinary
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_KEY,
  api_secret: env.CLOUDINARY_SECRET,
});

// Create the multer storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "posts", // Specify the folder where the images will be stored on Cloudinary
    allowed_formats: ["png"], // Specify the allowed image formats
    public_id: (req, file) => file.originalname, // Use the original file name as the public ID
  },
});

// Create the multer upload middleware
const upload = multer({ storage });

export { cloudinary, storage, upload };
