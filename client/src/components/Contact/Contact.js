import React, { useRef } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button, TextField , Container, Grid, Paper, Box, Breadcrumbs} from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import useStyles from './styles';


export const Contact = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const classes = useStyles();
    const form = useRef();
    const [isSubmited, setIsSubmited] = useState(false);

    const sendEmail = async (e) => {
        e.preventDefault();
        setIsSubmited(true);
        
        emailjs.sendForm('service_u72jk1y', 'template_t4vifyd', form.current, 'W4cA85wdUDSpTOc4m')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

    if (!user?.result?.name) {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              Please Sign In to contact support.
            </Typography>
          </Paper>
        );
      }

    return (
    
        <Container maxWidth="xl">
            <Breadcrumbs aria-label="breadcrumb">
  <Link color="inherit" to="/" >
    Home
  </Link>
  <Typography color="textPrimary">Contact</Typography></Breadcrumbs>
        <Grid container justify-content="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
          <form ref={form} className={`${classes.root} ${classes.form}`} onSubmit={sendEmail}>
          <Typography variant="h6">Contact Technical Support</Typography>
        <TextField name="user_name" variant="outlined" label="Name" fullWidth value={user?.result?.name} />
        <TextField name="user_email" variant="outlined" label="Email" fullWidth value={user?.result?.email} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={6} />
        <Button  variant="contained" color="primary" size="large" type="submit" value="Send" fullWidth >Submit</Button>
        </form>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
          {isSubmited?<Box>Your form has been submited. Return <Link color="inherit" to="/" >Home</Link></Box>:''}
          
          </Grid>
          </Grid>
          </Container>
  );
};

export default Contact;