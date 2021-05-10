import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { darkTheme } from '../constants/darkTheme';
import { postStyles } from "./postStyles";
import Router from 'next/router';


function PostsTable({postsList}) {
  const classes = postStyles();

  const navigateToPage = (id) => {
    Router.push(`/posts/${id}`);
  } 

  const StyledTableCell = withStyles((theme) => ({
    root: {
      border: 'none',
    },
    head: {
      backgroundColor: theme.palette.common.black,
      color: darkTheme.$textPrimary,
    },
    body: {
      fontSize: 14,
      color: darkTheme.$textPrimary,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      cursor: 'pointer',
      '&:nth-of-type(odd)': {
        backgroundColor: darkTheme.$cellLigt,
        border: `solid 1px ${darkTheme.$cellLigt}`,
        color: darkTheme.$textPrimary,
      },
      '&:nth-of-type(even)': {
        backgroundColor: darkTheme.$tableHeader,
        border: `solid 1px ${darkTheme.$tableHeader}`,
        color: darkTheme.$textPrimary,
      },
    },
  }))(TableRow);

  const StyledPaper = withStyles((theme) => ({
    root: {
      boxShadow: '1px 0px 14px -8px floralwhite'
    },
  }))(Paper);
  return (
    <TableContainer component={StyledPaper} className={classes.tableContailer}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell width="2%">id</StyledTableCell>
                <StyledTableCell align="left">Title</StyledTableCell>
                <StyledTableCell align="left">Author</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {postsList.map((post, index) => {
                return (
                  <StyledTableRow key={index} onClick={()=>navigateToPage(post.id)}>
                    <StyledTableCell align="left">{post.id}</StyledTableCell>
                    <StyledTableCell align="left">{post.title}</StyledTableCell>
                    <StyledTableCell align="left">{post.userId}</StyledTableCell>
                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
  )
}

export default PostsTable
