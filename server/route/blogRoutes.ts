import express from 'express';
import { createBlog } from '../controllers/blogController';
import { uploadMiddleware } from '../middleware/upload';

const router = express.Router();

router.post('/create-blog',uploadMiddleware.single('file') ,createBlog);

export default router;