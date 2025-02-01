const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ //configuring cloudinary with the credentials and our backend
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET,
});

// the names cloud_name, api_key, api_secret are default names

const storage = new CloudinaryStorage({ //defining storage for cloudinary
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV', // The name of the folder in cloudinary
    allowedFormats: ['jpeg', 'png', 'jpg'], // The allowed formats of the images
  },
});

module.exports = {
  cloudinary,
  storage,
}; // exporting cloudinary and storage to use them in other files