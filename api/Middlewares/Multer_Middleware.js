const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueName = req.user.id;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = { upload };
