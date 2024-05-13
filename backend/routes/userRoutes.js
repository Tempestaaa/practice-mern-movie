import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUser,
  getUserById,
  updateUserById,
} from "../controllers/userControllers.js";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// /api/users/
router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizedAdmin, getAllUsers);

// /api/users/auth
router.post("/auth", loginUser);
// /api/users/logout
router.post("/logout", logoutCurrentUser);

// /api/users/profile
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

// Admin
// /api/users/:id
router
  .route("/:id")
  .delete(authenticate, authorizedAdmin, deleteUser)
  .get(authenticate, authorizedAdmin, getUserById)
  .put(authenticate, authorizedAdmin, updateUserById);

export default router;
