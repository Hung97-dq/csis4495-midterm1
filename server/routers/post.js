import express from 'express';

import { getPosts, getPostsBySearch, getPost, createPost, updatePost, likePost, deletePost, commentPost } from '../controllers/posts.js';
import { getCredit } from '../controllers/credits.js';
const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/search', getPostsBySearch);
router.get('/',auth, getPosts);
router.get('/:id', getPost);
router.get('/:id/:memberid',auth, getCredit);
router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/:memberid/commentPost', commentPost);

export default router;
