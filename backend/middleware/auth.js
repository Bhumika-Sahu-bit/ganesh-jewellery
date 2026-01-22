// import jwt from "jsonwebtoken";
// import User from "../models/User.js"; // Make sure you have a User model

// const authMiddleware = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Find the user
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(401).json({ message: "Unauthorized: User not found" });
//     }

//     req.user = user; // attach user to request
//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ message: "Unauthorized: Invalid token" });
//   }
// };

// export default authMiddleware;

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Token verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);

    // ✅ Handle expired token
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please login again" });
    }

    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default authMiddleware;
