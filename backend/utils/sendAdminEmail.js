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
