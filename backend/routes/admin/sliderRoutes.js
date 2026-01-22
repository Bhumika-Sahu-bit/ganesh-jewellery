import express from "express";
import upload from "../../middleware/upload.js";
import { addSliderImages, deleteSliderImage, getSliderImages } from "../../controllers/admin/sliderController.js";

const router = express.Router();

router.post("/slider", upload.array("images", 8), addSliderImages);
router.get("/slider", getSliderImages);
router.delete("/slider/:id", deleteSliderImage);

export default router;
