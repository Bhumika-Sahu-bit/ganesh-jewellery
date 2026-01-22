// import BuyNow from "../../models/BuyNow.js";
// import Product from "../../models/Product.js";
// import Address from "../../models/Address.js";
// import Order from "../../models/Order.js";

// // export const checkoutBuyNow = async (req, res) => {
// //   try {
// //     const userId = req.user._id;
// //     const { addressId, paymentMethod } = req.body;

// //     if (!addressId || !paymentMethod) {
// //       return res.status(400).json({ message: "Address ID and Payment Method are required" });
// //     }

// //     const buyNow = await BuyNow.findOne({ userId });
// //     if (!buyNow) return res.status(404).json({ message: "No Buy Now item found" });

// //     const address = await Address.findOne({ _id: addressId, userId });
// //     if (!address) return res.status(404).json({ message: "Address not found" });

// //     const product = await Product.findById(buyNow.productId);
// //     if (!product || !product.isActive) return res.status(404).json({ message: "Product not available" });

// //     if (paymentMethod === "COD" && !product.codAvailable) {
// //       return res.status(400).json({ message: "Cash on Delivery not available for this product" });
// //     }

// //     const order = await Order.create({
// //       userId,
// //       items: [
// //         {
// //           productId: product._id,
// //           name: product.name,
// //           image: product.images?.[0]?.url,
// //           quantity: buyNow.quantity,
// //         },
// //       ],
// //       address: {
// //         name: address.name,
// //         phoneNo: address.phoneNo,
// //         addressLine: address.addressLine,
// //         city: address.city,
// //         state: address.state,
// //         pincode: address.pincode,
// //       },
// //       totalAmount: buyNow.totalAmount,
// //       paymentMethod,
// //       paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
// //       orderStatus: "Confirmed",
// //     });

// //     product.stock -= buyNow.quantity;
// //     await product.save();

// //     await BuyNow.deleteOne({ userId });

// //     res.status(201).json({ message: "Order placed successfully", orderId: order._id });
// //   } catch (error) {
// //     console.error("Checkout BuyNow error:", error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };


// // COD or Online Payment after success
// export const checkoutBuyNow = async (req, res) => {
//     try {
//         const { addressId, paymentMethod, productId, paymentId } = req.body;
//         const userId = req.user._id;

//         // Fetch product
//         const product = await Product.findById(productId);
//         if (!product || !product.isActive) {
//             return res.status(404).json({ message: "Product not available" });
//         }

//         // Fetch address
//         const address = await Address.findOne({ _id: addressId, userId });
//         if (!address) {
//             return res.status(404).json({ message: "Address not found" });
//         }

//         // Create Order
//         const order = await Order.create({
//             userId,
//             items: [{
//                 productId: product._id,
//                 name: product.name,
//                 image: product.images?.[0]?.url,
//                 quantity: 1,
//                 price: product.finalPrice,
//             }],
//             address: {
//                 name: address.name,
//                 phoneNo: address.phoneNo,
//                 addressLine: address.addressLine,
//                 city: address.city,
//                 state: address.state,
//                 pincode: address.pincode,
//             },
//             totalAmount: product.finalPrice,
//             paymentMethod,
//             paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
//             paymentId: paymentId || null,
//         });

//         // Reduce stock
//         product.stock -= 1;
//         await product.save();

//         // Clear BuyNow
//         await BuyNow.deleteOne({ userId });

        
//         res.status(201).json({ message: "Order placed successfully", order });
//     } catch (error) {
//         console.error("Checkout error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };


import BuyNow from "../../models/BuyNow.js";
import Product from "../../models/Product.js";
import Address from "../../models/Address.js";
import Order from "../../models/Order.js";
import AdminNotification from "../../models/AdminNotification.js";
import sendAdminEmail from "../../utils/sendAdminEmail.js";

export const checkoutBuyNow = async (req, res) => {
  try {
    const { addressId, paymentMethod, productId, paymentId } = req.body;
    const userId = req.user._id;

    // 1️⃣ Fetch product
    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not available" });
    }

    // 2️⃣ Fetch address
    const address = await Address.findOne({ _id: addressId, userId });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // 3️⃣ Create Order
    const order = await Order.create({
      userId,
      items: [{
        productId: product._id,
        name: product.name,
        image: product.images?.[0]?.url,
        quantity: 1,
        price: product.finalPrice,
      }],
      address: {
        name: address.name,
        phoneNo: address.phoneNo,
        addressLine: address.addressLine,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      },
      totalAmount: product.finalPrice,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
      orderStatus: "Placed",
      paymentId: paymentId || null,
    });

    // 🔔 4️⃣ ADMIN NOTIFICATION
    await AdminNotification.create({
      title: paymentMethod === "COD" ? "New COD Order" : "New Online Order",
      messaage: `₹${order.totalAmount} order placed`,
      orderId: order._id,
    });

    // 📧 5️⃣ SEND ADMIN EMAIL
    await sendAdminEmail(order);

    // 6️⃣ Reduce stock
    product.stock -= 1;
    await product.save();

    // 7️⃣ Clear BuyNow
    await BuyNow.deleteOne({ userId });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
