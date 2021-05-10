import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useRouter } from "next/router";
import { postStyles } from './postStyles';
import { Collapse } from '@material-ui/core';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import EmailIcon from '@material-ui/icons/Email';
import LanguageIcon from '@material-ui/icons/Language';
import PersonPinIcon from '@material-ui/icons/PersonPin';
function PostDescription() {
  const [postDetails, setPostDetails] = useState({});
  const [showAuthorDeatils, setShowAuthorDetails] = useState(false);
  const {
    query: { id },
  } = useRouter();
  useEffect(async () => {
    if (id) {
      const { data } = await axios(`http://localhost:4505/api/posts/${id}`);
      setPostDetails(data);
    }
  }, [id]);

  const classes = postStyles();
  const showAuthorDetails = ({ phone, email, address, website }) => {
    const { street, suite, city, zipcode } = address
    return (
      <Collapse in={showAuthorDeatils} timeout={500}>
        <div className={classes.authorInfo}>
          <div>
            <div className={classes.flexAlign}>
              <PhoneIphoneIcon style={{ color: "khaki", marginRight: "5px" }}></PhoneIphoneIcon><p className={classes.headings}>Phone</p>
            </div>
            <span>{phone}</span>
          </div>
          <div>
            <div className={classes.flexAlign}>
              <EmailIcon style={{ color: "khaki", marginRight: "5px" }}></EmailIcon> <p className={classes.headings}>Email</p>
            </div>
            <a href={`mailto:${email}`} target="_blank">{email}</a>
          </div>
        </div>
        <div>
          <div className={classes.flexAlign}>
            <LanguageIcon style={{ color: "khaki", marginRight: "5px" }}></LanguageIcon><p className={classes.headings}>Visit</p>
          </div>
          <a href={`https:${website}`} target="_blank">{website}</a>
        </div>
        <div className={classes.flexColumn}>
          <div className={classes.flexAlign}>
            <PersonPinIcon style={{ color: "khaki", marginRight: "5px" }}></PersonPinIcon><p className={classes.headings}>Address</p>
          </div>
          <span>{street}</span>
          <span>{suite}</span>
          <span>{city}</span>
          <span>{zipcode}</span>
        </div>

      </Collapse>
    )
  }

  const displayPostDetails = () => {
    const { post, user } = postDetails;
    const { title, body } = post;
    const { name } = user;
    return (
      <div className={classes.postContainer}>
        <div className={classes.card}>
          <div>
            <p className={classes.headings}>Title</p>
            <p>{title}</p>
          </div>
          <div>
            <p className={classes.headings}>Description</p>
            <p>{body}</p>
          </div>
          <div>
            <p className={classes.headings}>Author</p>
            <div className={classes.authorContainer}>
              <p>{name}</p>
              {
                !showAuthorDeatils ? (<p className={classes.viewAuthor} onClick={() => { setShowAuthorDetails(true) }}>View Author Details</p>) :
                  <p className={classes.viewAuthor} onClick={() => { setShowAuthorDetails(false) }}>show Less</p>
              }
            </div>
          </div>
          {showAuthorDetails(user)}
        </div>
      </div>
    )
  }
  return (
    <div>
      {Object.keys(postDetails).length ? displayPostDetails() : ''}
    </div>
  )
}

export default PostDescription
