import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
} from "../controllers/blogController";
import { uploadMiddleware } from "../middleware/upload";

const router = express.Router();

router.post("/create-blog", uploadMiddleware.single("file"), createBlog);
router.put("/update-blog", uploadMiddleware.single("file"), updateBlog);
router.get("/get-blogs", getAllBlog);
router.get("/get-blog/:id", getSingleBlog);
router.delete("/delete-blog", deleteBlog);

export default router;
