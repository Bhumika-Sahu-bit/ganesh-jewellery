import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import http from "http";
import { Server } from "socket.io";

//import routes
import authRoutes from "./routes/authRoutes.js";
import sliderRoutes from "./routes/admin/sliderRoutes.js";
import categoryRoutes from "./routes/admin/categoryRoutes.js";
import subCategoryRoutes from "./routes/admin/subCategoryRoutes.js";
import productRoutes from "./routes/admin/productRoutes.js";
import userProductRoutes from "./routes/user/productRoutes.js";
import cartRoutes from "./routes/user/cartRoutes.js";
import wishlistRoutes from "./routes/user/wishlistRoutes.js";
import buyNowRoutes from "./routes/user/buyNowRoutes.js";
// import addressRoutes from "./routes/user/addressRoutes.js";
import checkoutRoutes from "./routes/user/checkoutRoutes.js";
import checkout from "./routes/user/checkout.js";
import orderRoutes from "./routes/user/orderRoutes.js";
import adminOrderRoutes from "./routes/admin/orderRoutes.js";
import notificationRoutes from "./routes/admin/notificationRoutes.js";
import profile from "./routes/auth/profile.js";

dotenv.config();
connectDB();

const app = express();


//create http server
const server = http.createServer(app);

//Socket.io setup
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  })
})


app.use(cors());
app.use(express.json());

console.log("Cloudinary:", {
  name: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY ? "LOADED" : "MISSING",
  secret: process.env.CLOUDINARY_API_SECRET ? "LOADED" : "MISSING"
});

//routes middleware
app.use("/api/profile", profile);
app.use("/api/auth", authRoutes);
app.use("/api/admin", sliderRoutes);
app.use("/api/admin", categoryRoutes);
app.use("/api/admin", subCategoryRoutes);
app.use("/api/admin", productRoutes);
app.use("/api/admin", adminOrderRoutes);
app.use("/api/admin", notificationRoutes);


app.use("/api/products", userProductRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);


app.use("/api/buy-now", buyNowRoutes);
// app.use("/api/address", addressRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/checkout", checkout);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0" , () =>
  console.log(`Server running on port ${PORT}`)
);
