import nodemailer from "nodemailer";

const sendAdminEmail = async (order) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    const products = order.items
      .map(
        (item) =>
          `<li>${item.name} - Quantity: ${item.quantity} - Price: $${item.price}</li>`
      )
      .join("\n");

    await transporter.sendMail({
      from: `"Jewellery Store" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Order Placed",
      text: `
            NEW ORDER 🎉

Order ID: ${order._id}
Amount: ₹${order.totalAmount}
Payment: ${order.paymentMethod}

PRODUCTS:
${products}

CUSTOMER:
${order.address.name}
${order.address.phoneNo}

ADDRESS:
${order.address.addressLine},
${order.address.city},
${order.address.state} - ${order.address.pincode}
            `,
    });
  } catch (error) {
    console.error("Error sending admin email:", error);
    throw new Error("Failed to send admin email");
  }
};

export default sendAdminEmail;
