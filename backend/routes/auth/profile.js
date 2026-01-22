import express from 'express';
import User from '../../models/User.js';
import Address from '../../models/Address.js';
import authMiddleware from '../../middleware/auth.js';

import multer from 'multer';
import cloudinary from '../../config/cloudinary.js';

const router = express.Router();

//get user profile
router.get("/", authMiddleware, async(req,res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        const address = await Address.findOne({
          userId: req.user._id,
          isDefault: true,
        });

        res.json({ user, address });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

//update user profile
router.put("/", authMiddleware, async (req, res) => {
    try {
      const { name , phone, avatarUrl } = req.body;

      const user = await User.findByIdAndUpdate(
        req.user._id,
        { name, phone , avatar: avatarUrl },
        { new: true }
      );

      res.json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

/* ================= GET ADDRESS ================= */
router.get("/address", authMiddleware, async (req, res) => {
  try {
    const address = await Address.findOne({
      userId: req.user._id,
      isDefault: true,
    });

    res.json({ address });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



//update address
router.put("/address", authMiddleware, async (req, res) => {
    try {
      const address = await Address.findOneAndUpdate(
        { userId: req.user._id, isDefault: true},
        { ...req.body, userId: req.user._id, isDefault: true},
        { new: true, upsert: true }
      )

      res.json({ address });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
})


//upload avatar via file

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/avatar", authMiddleware, upload.single("avatar"), async(req,res) => {
  try {
    const fileStr = req.file.buffer.toString("base64");

    const uploadResponse = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${fileStr}`,
      {
        folder: "avatars",
        public_id: `user_${req.user._id}_${Date.now()}`,
      }
    );

    const avatarUrl = uploadResponse.secure_url;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: avatarUrl },
      { new: true }
    );

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
