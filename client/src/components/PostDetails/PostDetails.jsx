import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Divider, Breadcrumbs, Link, Box, Button } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import CommentSection from './CommentSection';
import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import HomeIcon from '@material-ui/icons/Home';
import LineChart from './LineChart';


const Post = () => {
  const [showPredict, setShowPredict] = useState(false);
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const GraphData = [];
  const credit = useSelector((state) => state);
  console.log(credit);
  console.log("post:",post,"posts:", posts,"isLoading", isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id, memberid } = useParams();
  const checkDefaultRate = () => {
    if(showPredict){
      setShowPredict(false)
    } else{
      setShowPredict(true)
    }
  };
  console.log(id);
  console.log(memberid);
  
  if(post?.data[0] && post?.data[5]){
    const term = parseInt(post.data[0].loanLength);
    const balance = parseFloat(post.data[0].loanAmount).toFixed(2);
    var balances = parseFloat(balance);
    const interestRate = parseFloat(post.data[0].interestRate).toFixed(2);
    var interest=0;
    var principle=0;
    var culPrinciple =0
    var culInterest =0;
    const payment = parseFloat(post.data[5]).toFixed(2);
    var balancedata = {"id": "Balance", "color": "hsl(314, 70%, 50%)","data":[]}
    var interestdata = {"id": "Interest", "color": "hsl(317, 70%, 50%)","data":[]}
    var principledata = {"id": "Principle", "color": "hsl(317, 70%, 50%)","data":[]}
    for(var i=1;i<=term;i++){
      var yBalance = balances;
      interest = (balances*(interestRate/(12*100))).toFixed(2)
      var yInterest = interest 
      culInterest = parseFloat(culInterest) + parseFloat(yInterest)
      principle = payment- yInterest
      var yPrinciple = principle
      culPrinciple = parseFloat(culPrinciple)+ parseFloat(yPrinciple)
      balances = balances - yPrinciple
      var balanceData = {"x": i,"y":yBalance}
      var interestData = {"x": i,"y":culInterest}
      var principleData = {"x": i,"y":culPrinciple}
      balancedata.data.push(balanceData)
      interestdata.data.push(interestData)
      principledata.data.push(principleData)
    }
    console.log(balancedata)
    console.log(interestdata)
    console.log(principledata)
    var data = [];
    GraphData.push(balancedata)
    GraphData.push(interestdata)
    GraphData.push(principledata)
    console.log(GraphData)
  }

  useEffect(() => {
    dispatch(getPost(id,memberid));
  }, [id,memberid]);


  if (!post) return null;


  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <Breadcrumbs aria-label="breadcrumb">
  <Link color="inherit" href="/posts" >
    Home
  </Link>
  <Typography color="textPrimary">{post.data[0].memberID}</Typography>
</Breadcrumbs>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">MenberID: {post.data[0].memberID}</Typography>
          <Typography variant="h4" component="h3">Loan Detail:</Typography>
          {/* <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography> */}
          <Typography variant="body" color="textSecondary" component="h5">{post.data[0].loanAmount? `Loan Amount: $${post.data[0].loanAmount}` : ''} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.data[0].interestRate? `Interest Rate: ${post.data[0].interestRate}%` : ''} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.data[0].loanLength? `Term: ${post.data[0].loanLength} months` : ''} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.data[0].loanGrade? `Loan Grade: ${post.data[0].loanGrade}` : ''} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.data[0].loanPurpose? `Loan Purpose: ${post.data[0].loanPurpose}` : ''} </Typography>
          {post?.data[4]? 
          <>
          <Typography variant="body" color="textSecondary" component="h5">{post?.data[5]? `Installment: $${parseFloat(post.data[5]).toFixed(2)} per month` : ''} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post?.data[4]? `Debt-to-income (DTI): ${parseFloat(post.data[4]).toFixed(2)}%` : ''} </Typography>
          </>:'' }
          <Typography variant="body2" color="textSecondary" component="p">{post.data[0].name? `Created by: ${post.data[0].name}` : ''} </Typography>
          <Typography variant="body2" color="textSecondary" component="p">{post.data[0].createdAt? `Created time: ${post.data[0].createdAt.split('T')[0]}` : ''} </Typography>
          
          {post?.data[1]? 
          <>
          <Typography variant="h4" component="h3">Member Profile:</Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.data[1].home_ownership? `Home Ownership: ${post.data[1].home_ownership}` : ''} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.data[1].emp_title? `Job Title: ${post.data[1].emp_title}` : ''} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.data[0].emp_length? `Employment Length: ${post.data[0].emp_length}` : ''} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.data[1].annual_inc? `Monthly income: $${(parseFloat(post.data[1].annual_inc)/12).toFixed(2)}` : ''} </Typography>
          
          <Typography variant="body" color="textSecondary" component="h5">{post.data[1].addr_state? `State Location: ${post.data[1].addr_state}` : ''} </Typography>
          
          <Typography variant="h4" component="h3">Member Credit History:</Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.data[1].inq_last_6mths? `Inquiries last 6 months : ${post.data[1].inq_last_6mths}` : ''} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.data[3]? `Earliest Credit Line: ${post.data[3]}` : ''} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.data[1].open_acc? `Open Credit Line: ${post.data[1].open_acc}` : ''} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.data[1].total_acc? `Total Credit Line: ${post.data[1].total_acc}` : ''} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.data[1].revol_bal? `Revolving Credit Balance: $${post.data[1].revol_bal}` : ''} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.data[1].percent_bc_gt_75? `Percentage of all bankcard accounts > 75% of limit: ${post.data[1].percent_bc_gt_75}` : ''} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.data[1].mort_acc? `Number of mortgage accounts: ${post.data[1].mort_acc}` : ''} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.data[1].num_accts_ever_120_pd? `Number of accounts ever 120 or more days past due: $${post.data[1].num_accts_ever_120_pd}` : 'Number of accounts ever 120 or more days past due: 0'} </Typography>
      
          <br></br>
          <Divider style={{ margin: '20px 0' }} />
          <div className={classes.commentsOuterContainer}>
        <div>
        <Typography variant="h4" component="h4">Financial Assesmet:</Typography>
          </div>
          <div style={{ width: '40%' }}>
          <Button variant="contained" className={classes.logout} color="primary" onClick={checkDefaultRate}>{showPredict? `Close the assessment` : ` Start an assessment`}</Button>
          </div>
          </div>
          
          {showPredict?<>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body" color="textSecondary" component="h5">{post.data[2][0]=='0'? `Default Prediction: Not Default` : 'Default Prediction: Default'} </Typography>
          <Typography variant="body" color="textSecondary" component="h5">{post.data[2][2]? `Default Rate: ${(parseFloat(post.data[2][2])*100).toFixed(2)}%` : ''} </Typography>
          </>:""}
          </>
          : <Typography variant="h4" component="h3">The member does not have previous historical data</Typography>}
          
          
          <Divider style={{ margin: '20px 0' }} />
          
          <CommentSection post={post.data[0]} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
        {post?.data[1]? <>
        <Typography align='center' variant="h4" component="h4">Loan Amortization Chart</Typography>
        <LineChart graphData={GraphData}/></> :''}
        </div>
        <Box display={{ xs: 'block', sm: 'none' }} bgcolor="text.disabled" className={classes.homeBox}><Link href="/posts" ><HomeIcon className={classes.homeIcon}></HomeIcon></Link></Box>
      </div>
      
    </Paper>
    
  );
};

export default Post;