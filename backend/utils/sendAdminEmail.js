// import nodemailer from "nodemailer";

// const sendAdminEmail = async (order) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.ADMIN_EMAIL,
//         pass: process.env.ADMIN_EMAIL_PASSWORD,
//       },
//     });

//     const products = order.items
//       .map(
//         (item) =>
//           `<li>${item.name} - Quantity: ${item.quantity} - Price: $${item.price}</li>`
//       )
//       .join("\n");

//     await transporter.sendMail({
//       from: `"Jewellery Store" <${process.env.ADMIN_EMAIL}>`,
//       to: process.env.ADMIN_EMAIL,
//       subject: "New Order Placed",
//       text: `
//             NEW ORDER 🎉

// Order ID: ${order._id}
// Amount: ₹${order.totalAmount}
// Payment: ${order.paymentMethod}

// PRODUCTS:
// ${products}

// CUSTOMER:
// ${order.address.name}
// ${order.address.phoneNo}

// ADDRESS:
// ${order.address.addressLine},
// ${order.address.city},
// ${order.address.state} - ${order.address.pincode}
//             `,
//     });
//   } catch (error) {
//     console.error("Error sending admin email:", error);
//     throw new Error("Failed to send admin email");
//   }
// };

// export default sendAdminEmail;


import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendAdminEmail = async (order) => {
  try {
    const products = order.items
      .map(
        (item) =>
          `${item.name} — Qty: ${item.quantity} — ₹${item.price}`
      )
      .join("");

    await resend.emails.send({
      from: "Ganesh Art Jewellery <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL,
      subject: "🛒 New Order Received",
      html: `
        <h2>New Order 🎉</h2>
        <p><b>Order ID:</b> ${order._id}</p>
        <p><b>Total Amount:</b> ₹${order.totalAmount}</p>
        <p><b>Payment:</b> ${order.paymentMethod}</p>

        <h3>Products</h3>
        <ul>${products}</ul>

        <h3>Customer Details</h3>
        <p>
          ${order.address.name}<br/>
          ${order.address.phoneNo}
        </p>

        <h3>Shipping Address</h3>
        <p>
          ${order.address.addressLine}<br/>
          ${order.address.city}, ${order.address.state} - ${order.address.pincode}
        </p>
      `,
    });

    console.log("✅ Admin email sent successfully");
  } catch (error) {
    console.error("❌ Resend email error:", error);
  }
};

export default sendAdminEmail;
