import AdminNotification from "../../models/AdminNotification.js";

/* =========================
   GET ADMIN NOTIFICATIONS
========================= */
export const getAdminNotifications = async (req, res) => {
  const notifications = await AdminNotification.find()
    .sort({ createdAt: -1 })
    .limit(20);

  res.json(notifications);
};

/* =========================
   MARK AS READ
========================= */
export const markNotificationRead = async (req, res) => {
  await AdminNotification.findByIdAndUpdate(req.params.id, {
    isRead: true,
  });

  res.json({ success: true });
};
