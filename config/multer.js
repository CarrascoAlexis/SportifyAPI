const multer = require('multer');
const { config } = require('nodemon');

// Set up storage for uploaded files
const storageUser = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'profiles/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const storageEvents = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'eventsPic/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create the multer instance
const uploadUser = multer({ storage: storageUser });
const uploadEvent = multer({storage: storageEvents})

module.exports = {uploadUser, uploadEvent}