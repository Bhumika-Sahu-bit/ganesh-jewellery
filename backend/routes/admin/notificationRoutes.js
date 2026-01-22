import express from "express";
import {
  getAdminNotifications,
  markNotificationRead,
} from "../../controllers/admin/notificationController.js";

const router = express.Router();

router.get("/",getAdminNotifications);
router.put("/:id/read", markNotificationRead);

export default router;
