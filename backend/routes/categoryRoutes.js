import express from "express";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategoryList,
  updateCategory,
} from "../controllers/categoryControllers.js";
const router = express.Router();

router
  .route("/")
  .post(authenticate, authorizedAdmin, createCategory)
  .get(getCategoryList);
router
  .route("/:categoryId")
  .put(authenticate, authorizedAdmin, updateCategory)
  .delete(authenticate, authorizedAdmin, deleteCategory)
  .get(getCategory);

export default router;
