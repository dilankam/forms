const express = require('express');
const Post = require('../models/posts');

const router = express.Router();

router.post("",(req,res,next) =>{
    // const post = req.body;
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(createdPost =>{
        res.status(201).json({
            message: 'Post added sucessfully',
            postId:  createdPost._id
        });
    });
    console.log(post);

});

router.delete("/:id",(req,res,next)=>{
    console.log("id="+req.params.id);
    // res.status(200).json({message:"post deleted"});
    Post.deleteOne({_id: req.params.id}).then(result=>{
        console.log(result);
        res.status(200).json({message:"post deleted"});    
    });
});

router.put("/:id",(req,res,next)=>{
    const post = new Post({
        _id:req.params.id,
        title:req.body.title,
        content: req.body.content
    });
    console.log(post);
    Post.updateOne({_id:req.params.id},post).then(result=>{
        console.log(result);
        res.status(200).json({message:'update succeccful'});
    });
});

//get single post
router.get("/:id",(req,res,next)=>{
    // console.log("asdasdasd "+ req.param.id);
    Post.findById(req.params.id).then(post=>{
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({message:'Post not found'});
        }
    });
});

router.use('',(req,res,next)=>{
    // const posts = [
    //     {id:'235235',title:'first post',content:'post one content'},
    //     {id:'a345235daad',title:'second post',content:'post second content !'}
    // ];

    Post.find().then(documents => {
        res.status(200).json({
            message: 'Post fetched successfully !',
            posts:documents
        });
    });

    // return res.status(200).json({
    //     message: 'Post fetched successfully !',
    //     posts:posts
    // });
});

module.exports = router;
