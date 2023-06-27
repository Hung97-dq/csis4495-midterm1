import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  console.log(user);
  const postss = useSelector((state) => state);
  console.log(postss);
  const posts = useSelector((state) => state.posts.posts.filter((post) => (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator)));
  console.log(posts);
  const classes = useStyles();

  if (!(user?.result?.googleId || user?.result?._id)) {
    return (
      <CircularProgress />
    );
  }

  return (
    !posts?.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;