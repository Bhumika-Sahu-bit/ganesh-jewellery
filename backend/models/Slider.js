import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
    images: [
        {
            url: String,
            public_id: String, // Cloudinary public ID
            createdAt: { type: Date, default: Date.now }
        }
    ]
});

export default mongoose.model("Slider", sliderSchema);