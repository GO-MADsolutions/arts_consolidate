import { Request, Response } from 'express';
import { Post, PostAttrs } from '../models/post';
import { User } from '../models/user';
export const fetchPosts = async (request: Request, response: Response) => {
  try {
    const posts = await Post.aggregate([
      {
        "$project": {"id": 1, "title": 1, "userId": 1, "_id": 0}
      },
    ])
    response.send(posts).status(200);
  }catch(error) {
    console.log('ERROR IN FETCHING', error);
  }
}


export const fetchPostDetails = async (request: Request, response: Response) => {
  try {
    const {id} = request.params;
    const post: PostAttrs = await Post.findOne({id})
    const { userId } = post;
    const user = await User.findOne({userId});
    const postDetails = {
     post,
     user
    }
    response.send(postDetails).status(200);
  } catch(error) {
    console.log("ERROR IN FETCHING DATA", error);
  }
}