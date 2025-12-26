"use strict";
const express = require('express');
const cors =require('cors');
const mysql = require('mysql2');


const app =express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

app.post("/register",(req, res)=>{
  const sql="INSERT INTO login ('name','email','password') VALUES (?)";
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

