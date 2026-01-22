import { useEffect, useState } from "react";
import api from "../../api/axios.js";

const CategoryPanel = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageType, setImageType] = useState("file"); // file | url

  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* Fetch categories */
  const fetchCategories = async () => {
    try {
      const res = await api.get("/admin/category");
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* Add / Update category */
  const handleSubmit = async () => {
    if (!name) {
      alert("Category name required");
      return;
    }

    // validation
    if (imageType === "file" && !image && !editId) {
      alert("Please upload an image");
      return;
    }

    if (imageType === "url" && !imageUrl) {
      alert("Please enter image URL");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);

    if (imageType === "file" && image) {
      formData.append("image", image);
    }

    if (imageType === "url") {
      formData.append("imageUrl", imageUrl);
    }

    try {
      setLoading(true);

      if (editId) {
        await api.put(`/admin/category/${editId}`, formData);
      } else {
        await api.post("/admin/category", formData);
      }

      // reset
      setName("");
      setImage(null);
      setImageUrl("");
      setEditId(null);
      setImageType("file");

      fetchCategories();
    } catch (error) {
      console.log(error);
      alert("Category operation failed");
    } finally {
      setLoading(false);
    }
  };

  /* Delete */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await api.delete(`/admin/category/${id}`);
    fetchCategories();
  };

  /* Edit */
  const handleEdit = (cat) => {
    setName(cat.name);
    setEditId(cat._id);
    setImage(null);
    setImageUrl(cat.image?.url || "");
    setImageType(cat.image?.public_id ? "file" : "url");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Category Panel</h2>

      {/* FORM */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        {/* IMAGE TYPE */}
        <select
          value={imageType}
          onChange={(e) => setImageType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="file">Upload Image</option>
          <option value="url">Image URL</option>
        </select>

        {/* IMAGE INPUT */}
        {imageType === "file" ? (
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 rounded"
          />
        ) : (
          <input
            type="text"
            placeholder="Paste image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border p-2 rounded"
          />
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-60 md:col-span-3"
        >
          {loading
            ? "Processing..."
            : editId
            ? "Update Category"
            : "Add Category"}
        </button>
      </div>

      {/* CATEGORY LIST */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="border rounded-lg overflow-hidden relative group"
          >
            <img
              src={cat.image?.url}
              alt={cat.name}
              className="w-full h-32 object-cover"
            />

            <div className="p-2 text-center font-medium">
              {cat.name}
            </div>

            {/* ACTIONS */}
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => handleEdit(cat)}
                className="bg-yellow-500 text-white text-xs px-2 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(cat._id)}
                className="bg-red-600 text-white text-xs px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPanel;
