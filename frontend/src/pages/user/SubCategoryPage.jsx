import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import BottomFooter from "../../components/user/BottomFooter";
import Sidebar from "../../components/user/Sidebar";
import { FaArrowLeft } from "react-icons/fa";

const SubCategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!categoryId) return;

    const fetchSubCategories = async () => {
      try {
        const res = await api.get(`/admin/sub-category/${categoryId}`);
        setSubCategories(res.data.subCategories || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [categoryId]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-400 text-lg animate-pulse">
        Loading...
      </p>
    );
  }

  return (
    <>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition"
        >
          <FaArrowLeft />
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* SubCategory Cards */}
      <section className="mt-6 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          {subCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {subCategories.map((sub) => (
                <div
                  key={sub._id}
                  onClick={() => navigate(`/products/sub-category/${sub._id}`)}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 cursor-pointer group"
                >
                  <img
                    src={sub.image?.url}
                    alt={sub.name}
                    className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="p-5 text-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {sub.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Click to view products
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Default Template if no subcategory found
            <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                No Subcategories Found
              </h2>
              <p className="text-gray-500 mt-3">
                Looks like this category doesn't have any subcategories yet.
              </p>

              <div className="mt-6 flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-2 rounded-full bg-black text-white font-medium hover:bg-gray-900 transition"
                >
                  Go to Home
                </button>

                <button
                  onClick={() => navigate("/products")}
                  className="px-6 py-2 rounded-full bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition"
                >
                  Browse All Products
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>

      <BottomFooter />
    </>
  );
};

export default SubCategoryPage;
