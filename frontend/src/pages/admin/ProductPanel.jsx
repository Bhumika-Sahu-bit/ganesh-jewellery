import { useEffect, useState } from "react";
import api from "../../api/axios";

const MAX_IMAGES = 8;

const ProductPanel = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [codAvailable, setCodAvailable] = useState(false);
  const [returnAvailable, setReturnAvailable] = useState(false);

  const [fileImages, setFileImages] = useState([]);
  const [urlImages, setUrlImages] = useState([]);
  const [imageUrlInput, setImageUrlInput] = useState("");

  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchCategories = async () => {
    const res = await api.get("/admin/category");
    setCategories(res.data);
  };

  const fetchSubCategories = async (catId) => {
    if (!catId) return setSubCategories([]);
    const res = await api.get(`/admin/sub-category/${catId}`);
    setSubCategories(res.data.subCategories || []);
  };

  const fetchProducts = async () => {
    const res = await api.get("/admin/product");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchSubCategories(category);
    setSubCategory("");
  }, [category]);

  /* ================= IMAGE HELPERS ================= */
  const totalImages = fileImages.length + urlImages.length;

  const removeImage = (index, type) => {
    if (type === "file") {
      const arr = [...fileImages];
      arr.splice(index, 1);
      setFileImages(arr);
    } else {
      const arr = [...urlImages];
      arr.splice(index, 1);
      setUrlImages(arr);
    }
  };

  const addUrlImage = () => {
    if (!imageUrlInput.trim()) return;

    if (totalImages >= MAX_IMAGES) {
      alert("Maximum 8 images allowed");
      return;
    }

    if (urlImages.some((img) => img.url === imageUrlInput.trim())) {
      alert("This image URL already added");
      return;
    }

    setUrlImages([...urlImages, { url: imageUrlInput.trim() }]);
    setImageUrlInput("");
  };

  /* ================= PRICE ================= */
  const getFinalPrice = (price, discount) =>
    discount ? Math.round(price - (price * discount) / 100) : price;

  /* ================= SUBMIT ================= */
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !productCode || !category || !price) {
      alert("Required fields missing");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("productCode", productCode);
    formData.append("category", category);
    formData.append("subCategory", subCategory || "");
    formData.append("price", price);
    formData.append("discount", discount || 0);
    formData.append("stock", stock || 0);
    formData.append("shortDesc", shortDesc);
    formData.append("description", description);
    formData.append("codAvailable", codAvailable);
    formData.append("returnAvailable", returnAvailable);

    fileImages.forEach((f) => formData.append("images", f));

    if (urlImages.length) {
      formData.append("imageUrls", JSON.stringify(urlImages));
    }

    setLoading(true);
    try {
      editId
        ? await api.put(`/admin/product/${editId}`, formData)
        : await api.post("/admin/product", formData);

      resetForm();
      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
    setLoading(false);
  };

  const resetForm = () => {
    setName("");
    setProductCode("");
    setCategory("");
    setSubCategory("");
    setPrice("");
    setDiscount("");
    setStock("");
    setShortDesc("");
    setDescription("");
    setCodAvailable(false);
    setReturnAvailable(false);
    setFileImages([]);
    setUrlImages([]);
    setImageUrlInput("");
    setEditId(null);
  };

  /* ================= EDIT ================= */
  const editHandler = (p) => {
    setEditId(p._id);
    setName(p.name);
    setProductCode(p.productCode);
    setCategory(p.category?._id);
    setSubCategory(p.subCategory?._id || "");
    setPrice(p.price);
    setDiscount(p.discount);
    setStock(p.stock);
    setShortDesc(p.shortDesc);
    setDescription(p.description);
    setCodAvailable(p.codAvailable);
    setReturnAvailable(p.returnAvailable);
    setFileImages([]);

    const uniqueImages = [
      ...new Map(p.images.map((img) => [img.url, img])).values(),
    ];
    setUrlImages(uniqueImages.map((img) => ({ url: img.url })));
  };

  /* ================= DELETE ================= */
  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await api.delete(`/admin/product/${id}`);
    fetchProducts();
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Product Panel</h2>

      {/* ================= FORM ================= */}
      <form
        onSubmit={submitHandler}
        className="grid md:grid-cols-2 gap-4 bg-white p-6 rounded shadow mb-10"
      >
        <input className="border p-2" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border p-2" placeholder="Product Code" value={productCode} onChange={(e) => setProductCode(e.target.value)} />

        <select className="border p-2" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>

        <select className="border p-2" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
          <option value="">Select SubCategory (Optional)</option>
          {subCategories.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>

        <input type="number" className="border p-2" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="number" className="border p-2" placeholder="Discount %" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        <input type="number" className="border p-2" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />

        <textarea className="border p-2" placeholder="Short Description" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} />
        <textarea className="border p-2" placeholder="Full Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        {/* Checkboxes */}
        <div className="flex gap-4">
          <label><input type="checkbox" checked={codAvailable} onChange={(e) => setCodAvailable(e.target.checked)} /> COD</label>
          <label><input type="checkbox" checked={returnAvailable} onChange={(e) => setReturnAvailable(e.target.checked)} /> Return</label>
        </div>

        {/* FILE UPLOAD */}
        <input
          type="file"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files);
            if (files.length + totalImages > MAX_IMAGES) {
              alert("Max 8 images allowed");
              return;
            }
            setFileImages([...fileImages, ...files]);
          }}
        />

        {/* URL IMAGE INPUT */}
        <div className="flex gap-2 md:col-span-2">
          <input
            className="border p-2 flex-1"
            placeholder="Paste image URL"
            value={imageUrlInput}
            onChange={(e) => setImageUrlInput(e.target.value)}
          />
          <button type="button" onClick={addUrlImage} className="bg-black text-white px-4">
            Add URL
          </button>
        </div>

        {/* IMAGE PREVIEW */}
        <div className="grid grid-cols-4 gap-2 md:col-span-2">
          {fileImages.map((f, i) => (
            <div key={i} className="relative">
              <img src={URL.createObjectURL(f)} className="h-20 w-full object-cover rounded" />
              <button type="button" onClick={() => removeImage(i, "file")} className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 rounded">✕</button>
            </div>
          ))}

          {urlImages.map((u, i) => (
            <div key={i} className="relative">
              <img src={u.url} className="h-20 w-full object-cover rounded" />
              <button type="button" onClick={() => removeImage(i, "url")} className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 rounded">✕</button>
            </div>
          ))}
        </div>

        <button className="bg-black text-white py-3 md:col-span-2">
          {loading ? "Saving..." : editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* ================= PRODUCT LIST ================= */}
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="border rounded shadow">
            <div className="grid grid-cols-4 gap-1 p-2">
              {[...new Map(p.images.map((img) => [img.url, img])).values()].map((img, i) => (
                <img key={i} src={img.url} className="h-24 object-cover rounded" />
              ))}
            </div>

            <div className="p-4">
              <h4 className="font-semibold">{p.name}</h4>
              <p className="text-sm">{p.productCode}</p>
              <p className="text-sm">{p.category?.name} {p.subCategory && `/ ${p.subCategory.name}`}</p>

              <div className="mt-2">
                {p.discount > 0 && <span className="line-through mr-2">₹{p.price}</span>}
                <span className="text-lg font-bold text-green-700">₹{getFinalPrice(p.price, p.discount)}</span>
              </div>

              <div className="flex gap-2 mt-4">
                <button onClick={() => editHandler(p)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                <button onClick={() => deleteHandler(p._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPanel;
