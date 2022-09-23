import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

import useStyles from "./styles";

function Posts({setCurrentId}) {
  const { posts, isLoading } = useSelector((state)=> state.posts); //destructuring object payload
    const classes = useStyles();

    //console.log(posts);
    if( !posts.length && !isLoading ) return 'No posts';
  return (
    isLoading ? <CircularProgress/> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3} >
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post setCurrentId={setCurrentId} post={post} />
          </Grid>
        ))}
      </Grid>
    )
  );
}

export default Posts;
