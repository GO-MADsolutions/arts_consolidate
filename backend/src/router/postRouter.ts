import express from 'express';
import { fetchPosts, fetchPostDetails } from '../controller/postsController';
const postsRouter = express.Router();

postsRouter.get('/api/posts',fetchPosts);

postsRouter.get('/api/posts/:id', fetchPostDetails);

export default postsRouter;