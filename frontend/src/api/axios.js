import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// attach the token to each request if available
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ✅ response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // token expired or invalid
      localStorage.removeItem("token"); // token delete
      window.location.href = "/login";  // redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
