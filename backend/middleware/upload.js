import multer from "multer";
import fs from "fs";
import path from "path";

const uploadFolder = path.join(process.cwd(), "uploads");

// ensure folder exists
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

export default upload;
