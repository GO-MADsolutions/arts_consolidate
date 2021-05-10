import axios from 'axios';
import {GET_POSTS, GET_USERS} from './constants';
import { Post }  from '../src/models/post';
import { User } from '../src/models/user';
const fetchPosts = async () => {
    try {
      const {data} = await axios.get(GET_POSTS);
      const postData = data.map((post:any)=> {
        delete post.id;
        return post;
      });
      await insertPost(postData);
    }catch(error) {
      console.error('Couldnot fetch data', error);
    }
}

const fetchUsers = async () => {
  try {
    const {data} = await axios.get(GET_USERS);
    await insertUser(data);
  }catch(error) {
    console.error('Couldnot fetch data', error);
  }
}



const insertPost = async (posts: any) => {
  const post  = posts.pop();
  const {title, body, userId} = post;
  const postModel = Post.build({
    title, body, userId
  });
  try {
    await postModel.save();
  }catch(error) {
    console.log("ERROR IN INSERTING", error)
  }
  if(posts.length)
    insertPost(posts)
  else  
    return;
}

const insertUser = async (users: any) => {
  const user  = users.pop();
  const { name, username, address, phone, website, company, email, id} = user;
  const userId = id;
  const userModel = User.build({
    name, username, address, phone, website, company, email, userId
  });
  try {
    await userModel.save();
  }catch(error) {
    console.log("ERROR IN INSERTING", error)
  }
  if(users.length)
    insertUser(users)
  else  
    return;
}

export const createPostIfNotAvailalbe = async () => {
  try { 
    const posts = await Post.find();
    const users = await User.find();
    if(!posts.length)
      fetchPosts();
    if(!users.length)
      fetchUsers();
  }catch(error) {
    console.error('Error in fetching posts');
    fetchPosts();
  }
}