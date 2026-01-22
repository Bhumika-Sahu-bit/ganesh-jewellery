import Slider from "../../models/Slider.js";
import cloudinary from "../../config/cloudinary.js";

export const addSliderImages = async (req, res) => {
  try {
    let slider = await Slider.findOne();
    if (!slider) slider = new Slider({ images: [] });

    // Upload files
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "slider",
        });
        slider.images.push({ url: result.secure_url, public_id: result.public_id });
      }
    }

    // URL image
    if (req.body.url) {
      slider.images.push({ url: req.body.url });
    }

    // Keep max 8 images
    while (slider.images.length > 8) {
      const removed = slider.images.shift();
      if (removed.public_id) await cloudinary.uploader.destroy(removed.public_id);
    }

    await slider.save();
    res.json({ success: true, images: slider.images });
  } catch (error) {
    console.error("ADD SLIDER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getSliderImages = async (req, res) => {
  try {
    const slider = await Slider.findOne();
    res.json(slider || { images: [] });
  } catch (error) {
    console.error("GET SLIDER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteSliderImage = async (req, res) => {
  try {
    const slider = await Slider.findOne();
    if (!slider) return res.status(404).json({ message: "No slider found" });

    const image = slider.images.id(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    if (image.public_id) await cloudinary.uploader.destroy(image.public_id);

    slider.images = slider.images.filter(img => img._id.toString() !== req.params.id);

    await slider.save();
    res.json({ message: "Image deleted", images: slider.images });
  } catch (error) {
    console.error("DELETE SLIDER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
