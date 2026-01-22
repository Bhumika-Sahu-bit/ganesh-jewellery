import { useEffect, useState } from "react";
import api from "../../api/axios";

const SubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const [imageType, setImageType] = useState("file"); // file | url
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH CATEGORIES ================= */
  const fetchCategories = async () => {
    try {
      const res = await api.get("/admin/category");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= FETCH SUB CATEGORIES ================= */
  const fetchSubCategories = async () => {
    try {
      const res = await api.get("/admin/sub-category");
      setSubCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  /* ================= ADD / UPDATE ================= */
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !category) {
      alert("All fields required");
      return;
    }

    if (!editId && imageType === "file" && !image) {
      alert("Image required");
      return;
    }

    if (!editId && imageType === "url" && !imageUrl) {
      alert("Image URL required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);

    if (imageType === "file" && image) {
      formData.append("image", image);
    }

    if (imageType === "url" && imageUrl) {
      formData.append("imageUrl", imageUrl);
    }

    try {
      setLoading(true);

      if (editId) {
        await api.put(`/admin/sub-category/${editId}`, formData);
      } else {
        await api.post("/admin/sub-category", formData);
      }

      resetForm();
      fetchSubCategories();
    } catch (error) {
      console.log(error);
      alert("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this sub-category?")) return;
    await api.delete(`/admin/sub-category/${id}`);
    fetchSubCategories();
  };

  /* ================= EDIT ================= */
  const editHandler = (sub) => {
    setEditId(sub._id);
    setName(sub.name);
    setCategory(sub.category?._id);
    setImage(null);
    setImageUrl("");
    setImageType("file");
  };

  const resetForm = () => {
    setName("");
    setCategory("");
    setImage(null);
    setImageUrl("");
    setEditId(null);
    setImageType("file");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">
        Sub Category Panel
      </h2>

      {/* ================= FORM ================= */}
      <form
        onSubmit={submitHandler}
        className="grid md:grid-cols-3 gap-4 mb-8"
      >
        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-3 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* NAME */}
        <input
          type="text"
          placeholder="Sub Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded"
          required
        />

        {/* IMAGE TYPE */}
        <select
          value={imageType}
          onChange={(e) => setImageType(e.target.value)}
          className="border p-3 rounded"
        >
          <option value="file">Upload Image</option>
          <option value="url">Image URL</option>
        </select>

        {/* IMAGE INPUT */}
        {imageType === "file" ? (
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-3 rounded md:col-span-3"
          />
        ) : (
          <input
            type="text"
            placeholder="Paste image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border p-3 rounded md:col-span-3"
          />
        )}

        {/* SUBMIT */}
        <button
          disabled={loading}
          className="bg-black text-white py-3 rounded md:col-span-3 disabled:opacity-60"
        >
          {loading
            ? "Processing..."
            : editId
            ? "Update Sub Category"
            : "Add Sub Category"}
        </button>
      </form>

      {/* ================= LIST ================= */}
      <div className="grid md:grid-cols-4 gap-6">
        {subCategories.map((sub) => (
          <div
            key={sub._id}
            className="border rounded-lg overflow-hidden relative group"
          >
            <img
              src={sub.image?.url}
              alt={sub.name}
              className="h-40 w-full object-cover"
            />

            <div className="p-4">
              <h4 className="font-semibold">{sub.name}</h4>
              <p className="text-sm text-gray-500">
                {sub.category?.name}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => editHandler(sub)}
                className="bg-yellow-500 text-white text-xs px-2 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteHandler(sub._id)}
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

export default SubCategory;
