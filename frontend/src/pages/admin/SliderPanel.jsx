import React, { useState, useEffect } from "react";
import api from "../../api/axios.js";

const SliderPanel = () => {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch slider images
  const fetchSlider = async () => {
    try {
      const response = await api.get("/admin/slider");
      if (response.data && Array.isArray(response.data.images)) {
        setImages(response.data.images);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch slider images");
    }
  };

  useEffect(() => {
    fetchSlider();
  }, []);

  // Upload images
  const handleUpload = async () => {
    if (files.length + images.length > 8 || (url && images.length >= 8)) {
      alert("Maximum 8 images allowed");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    if (url) formData.append("url", url);

    try {
      setLoading(true);
      await api.post("/admin/slider", formData,{headers: { "Content-Type": "multipart/form-data" }});
      setFiles([]);
      setUrl("");
      fetchSlider();
      alert("Images uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to upload images");
    } finally {
      setLoading(false);
    }
  };

  // Delete image
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await api.delete(`/admin/slider/${id}`);
      fetchSlider();
      alert("Image deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete image");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Slider Management</h2>

      {/* Upload Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="file"
          multiple
          className="border p-2 rounded w-full"
          onChange={(e) => setFiles([...e.target.files])}
        />

        <input
          type="text"
          placeholder="Paste image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mb-6 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Image"}
      </button>

      <p className="text-sm text-gray-500 mb-4">
        Maximum 8 images allowed ({images.length}/8)
      </p>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div
            key={img._id}
            className="relative group border rounded overflow-hidden"
          >
            <img
              src={img.url}
              alt="slider"
              className="w-full h-32 object-cover"
            />

            <button
              onClick={() => handleDelete(img._id)}
              className="absolute top-2 right-2 bg-red-600 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderPanel;
