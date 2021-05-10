import React, { useEffect, useContext, useState } from 'react';
import { PostsContext } from '../context/postContext';
import axios from 'axios';
import { postStyles } from "./postStyles";
import Input from '@material-ui/core/Input';
import TableContainer from './PostsTable';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const inputTheme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      root: {
        minWidth: 340,
        color: 'white',
        border: 'none',
        background: '#353648',
        borderRadius: 4,
        padding: 5,
        margin: '20px 0',
      },
      input: {
        marginLeft: 10
      }
    },
    MuiSvgIcon: {
      root: {
        height: 16,
        transform: 'rotate(-4deg)',
      }
    },
    MuiInput: {
      marginLeft: 10,
      underline: {
        border: 'none',
        "&:hover:not(.Mui-disabled):before": {
          border: 'none',
        }
      }
    },
  }
})

function ListPostBase() {
  const classes = postStyles();
  const { postsList, setPostList } = useContext(PostsContext);
  const [filteredPost, setFilteredPosts] = useState(postsList);
  const [isSearching ,setIsSearching] = useState(false);
  useEffect(async () => {
    if(!postsList.length) {
      const { data } = await axios('http://localhost:4505/api/posts');
      setPostList(data);
      setFilteredPosts(data);
    }
  }, []);

  const filterPosts = (searchText) => {
    if(searchText) {
      const searchedPosts = postsList.filter(({title}) => {
        return title.includes(searchText)
      });
      setIsSearching(true);
      setFilteredPosts([...searchedPosts]);
    } else {
      setIsSearching(false);
      setFilteredPosts([...postsList])
    }
  }


  const displayPostLength = () => {
    if (filteredPost && filteredPost.length) {
      return (
        <TableContainer postsList={filteredPost}></TableContainer>
      )
    } else {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {isSearching ? <h1 className={classes.bannerText}>No post found for your search key word</h1>
            : <h1 className={classes.bannerText}>Please Wait While Fetching post</h1>}
        </div>
      )
    }
  }
  return (
    <div className={classes.root}>
      <ThemeProvider theme={inputTheme}>
        <Input placeholder="Search title" onChange={(e) => filterPosts(e.target.value)}
        endAdornment={
          <InputAdornment position="end"><SearchIcon></SearchIcon></InputAdornment>
        }
        ></Input>
      </ThemeProvider>
      {displayPostLength()}
    </div>
  )
}

export default ListPostBase
