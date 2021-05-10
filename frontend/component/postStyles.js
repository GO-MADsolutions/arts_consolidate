import { makeStyles } from '@material-ui/core/styles';
import { darkTheme } from '../constants/darkTheme';


export const postStyles = makeStyles((theme)=> ({
  root: {
    backgroundColor: darkTheme.$backGroundColor,
    padding: "70px 50px",
    height: "100%",
    minHeight: 900,
    color: darkTheme.$textPrimary
  },
  table: {
    minWidth: 700,
  },
  
  bannerText: {
    display: 'flex',
    justifyContent: 'center',
    padding: 50,
    borderRadius: 10,
    boxShadow: "-30px 25px 156px -50px rgba(255,255,255,0.8)",
    background: 'chocolate'
  },
  postContainer: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: darkTheme.$backGroundColor,
    color: darkTheme.$textPrimary,
    fontWeight: 600
  },
  card: {
    padding: 20,
    background: darkTheme.$cardBackDrop,
    boxShadow: '1px 0px 14px -8px floralwhite',
    maxWidth: 500,
    borderRadius: 10
  },
  headings: {
    color: 'orange',
    fontWeight: 800,
  },
  authorContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -20
  },
  viewAuthor: {
    fontSize: 12,
    textDecoration: 'underline',
    color: darkTheme.$link,
    cursor: 'pointer'
  },
  authorInfo: {
    display: "flex",
    justifyContent: "space-between"
  },
  flexAlign: {
    display: 'flex',
    alignItems: 'center'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  tableContainer: {
    boxShadow: '1px 0px 14px -8px floralwhite'
  }

}));