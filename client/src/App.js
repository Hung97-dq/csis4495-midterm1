import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
    
import {Container} from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import Contact from "./components/Contact/Contact.js";

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <BrowserRouter>
        <Container maxWidth="xl">
            <Navbar/>
            <Routes>
                <Route path="/" exact element={<Navigate replace to='/posts'/>}></Route>
                <Route path="/contact" exact element={<Contact/>}></Route>
                <Route path="/posts" exact element={<Home/>}></Route>
                <Route path="/posts/search" exact element={<Home/>}></Route>
                <Route path="/posts/:id" exact element={<Navigate replace to='/posts/:id/:memberid'/>}></Route>
                <Route path="/posts/:id/:memberid" exact element={<PostDetails/>}></Route>
                <Route path="/auth" exact element={<Auth />} />
            </Routes>
        </Container>
        </BrowserRouter>
    );
}

export default App;