import { createContext, useState } from 'react';
const PostsContext = createContext();


const PostsProvider = ({ children }) => {
  const [postsList, setPostList] = useState([]);

  return (
    <PostsContext.Provider
      value={{
        postsList,
        setPostList,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export { PostsProvider, PostsContext };