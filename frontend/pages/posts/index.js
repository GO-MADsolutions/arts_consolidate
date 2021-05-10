import React from 'react'
import {PostsProvider} from '../../context/postContext';
import ListPostBase from '../../component/ListPostBase';
function index() {
  return (
    <div>
      <PostsProvider>
        <ListPostBase></ListPostBase>
      </PostsProvider>
    </div>
  )
}

export default index
