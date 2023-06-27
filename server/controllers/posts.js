import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();
export const getPosts = async (req, res) => {
    const { page } = req.query;
    const creatorId = req.userId;
    console.log(req.userId);
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await PostMessage.find({creator: creatorId}).countDocuments({});
        // const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        const posts = await PostMessage.find({creator: creatorId}).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { tags } = req.query;
    console.log("tag:",tags);
    try {
        const posts = await PostMessage.find({ memberID: { $in: tags.split(',') } });
        console.log(posts);
        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async(req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req,res) =>{
    const { id } = req.params;
    const { creator, memberID, loanAmount, interestRate, loanLength, loanGrade, loanPurpose, name, emp_length } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, memberID, loanAmount, interestRate, loanLength, loanGrade, loanPurpose, name,emp_length, createdAt: new Date().toISOString(), _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
    console.log(updatedPost);
}

// export const updatePost = async (req, res) => {

//     const { id } = req.params;
//     const { title, message, creator, selectedFile, tags, likes } = req.body;
    
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
//     const updatedPost = { creator, title, message, tags, selectedFile, likes, _id: id };
    
//     await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    
//     res.json(updatedPost);
//     }

export const deletePost = async (req,res) => {
    const {id} =req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);
    res.json({message: 'Post deleted'});
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}

export const commentPost = async (req, res) => {
    console.log("cp",req.params);
    const { id, memberID } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};

export default router;