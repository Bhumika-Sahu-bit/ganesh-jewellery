import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";

const UserCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/admin/category");
        setCategories(res.data || []);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  

  const handleCategoryClick = async (cat) => {
  try {
    const res = await api.get(`/admin/sub-category/${cat._id}`);

    if (res.data.subCategories && res.data.subCategories.length > 0) {
      navigate(`/category/${cat._id}/subcategories`);
    } else {
      navigate(`/products/category/${cat._id}`);
    }
  } catch (error) {
    console.error("Error checking sub-categories:", error);
    navigate(`/products/category/${cat._id}`);
  }
};

  if (loading) {
    return (
      <p className="text-center my-16 text-gray-500 text-lg animate-pulse">
        Loading categories...
      </p>
    );
  }

  return (
    <section className="mt-10 px-4 sm:px-6 md:px-10 lg:px-14">
      {/* Heading */}
      <div className="text-center mb-5">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-wide">
          Explore Categories
        </h2>
        <p className="text-gray-500 text-sm md:text-base mt-2">
          Discover jewellery crafted for every moment
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {categories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => handleCategoryClick(cat)}
            className="
              group cursor-pointer
              bg-white
              rounded-2xl
              overflow-hidden
              shadow-md
              hover:shadow-xl
              transition-all duration-300
              hover:-translate-y-1
            "
          >
            {/* Image */}
            <div className="relative h-36 sm:h-40 md:h-44 lg:h-48 overflow-hidden">
              <img
                src={cat.image?.url}
                alt={cat.name}
                className="
                  w-full h-full object-cover
                  transition-transform duration-500
                  group-hover:scale-110
                "
              />

              {/* Gradient Overlay */}
              <div className="
                absolute inset-0
                bg-gradient-to-t from-black/40 via-black/10 to-transparent
                opacity-0 group-hover:opacity-100
                transition-opacity
              " />
            </div>

            {/* Name */}
            <div className="py-4 text-center">
              <p className="text-sm md:text-base font-medium tracking-wide text-gray-800">
                {cat.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserCategory;
