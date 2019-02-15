const express = require('express');
const bodyParser = require("body-parser");
const mongooes= require("mongoose");

const app = express();

const postsRoutes = require('./routes/posts');
const userRoutes = require("./routes/user");


mongooes.connect("mongodb://localhost/form")
.then(()=>{
    console.log('conected to database !');
})
.catch(()=>{
    console.log('connection failed !');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});





app.use("/api/posts",postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;