const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  upload(req, res, (err) => {
    console.log("filePath", res.req.file.path);
    console.log("fileName", res.req.file.filename);

    if (err) {
      return res.json({ success: false, err });
    }

    return res.json({
      success: true,

      filePath: res.req.file.path,

      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;
