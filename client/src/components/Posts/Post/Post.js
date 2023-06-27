import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import StarIcon from '@material-ui/icons/Star';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import InfoIcon from '@material-ui/icons/Info';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { getPost, likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate ();
  console.log(post);
  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><StarIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : ` APPROVED${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><StarOutlineIcon fontSize="small" />&nbsp; {post.likes.length === 1 ? 'OPEN' : 'Approved'}</>
        );
    }

    return <><StarOutlineIcon fontSize="small" />&nbsp;OPEN</>;
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, navigate));

    navigate(`/posts/${post._id}/${post.memberID}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        
        {/* <div className={classes.overlay}>
          <Typography variant="h6">{post.memberID}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div> */}
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: 'black' }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
        )}
        <div className={classes.details}>
          <Typography  variant='root' color="textSecondary" component="h3">{post.memberID? `Member ID: ${post.memberID}` : ''}</Typography>
        </div>
        
        <CardContent>
          <Typography variant="body" color="textSecondary" component="h5">{post.loanAmount? `Loan Amount: $${post.loanAmount}` : ''} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.interestRate? `Interest Rate: ${post.interestRate}%` : ''} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.loanLength? `Loan Length: ${post.loanLength} months` : ''} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.loanGrade? `Loan Grade: ${post.loanGrade}` : ''} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.loanPurpose? `Loan Amount: ${post.loanPurpose}` : ''} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.emp_length? `Employment Length: ${post.emp_length}` : ''} </Typography>
          <Typography variant="body2" color="textSecondary" component="p">{post.name? `Created by: ${post.name}` : ''} </Typography>
          <Typography variant="body2" color="textSecondary" component="p">{post.createdAt? `Created time: ${post.createdAt.split('T')[0]}` : ''} </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;