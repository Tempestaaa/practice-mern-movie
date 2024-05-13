import express from "express";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createGenre,
  deleteGenre,
  getGenre,
  getGenreslist,
  updateGenre,
} from "../controllers/genreControllers.js";
const router = express.Router();

router
  .route("/")
  .post(authenticate, authorizedAdmin, createGenre)
  .get(getGenreslist);
router
  .route("/:genreId")
  .put(authenticate, authorizedAdmin, updateGenre)
  .delete(authenticate, authorizedAdmin, deleteGenre)
  .get(getGenre);

export default router;
