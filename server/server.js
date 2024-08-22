// const express = require('express')
// const app = express()
// const mongoose = require('mongoose')
// require('dotenv').config()
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import {} from 'dotenv/config';
import personnelRoutes from './routes/Personnel.js'

const app = express()

app.use(cors({
  origin:"http://localhost:5173",
  methods:"GET,POST,PUT,DELETE",
  credentials:true
}));

app.use(express.urlencoded({extended:false})); 
app.use(express.json());

app.use('/api/personnel',personnelRoutes)

//Connection to DB
mongoose.connect(process.env.URI)
.then(()=>{
  //listen for requests
  app.listen(process.env.PORT, () => {
    console.log(`Connected to DB and Server is running on PORT http://localhost:${process.env.PORT}`);
  })
})
.catch((error)=>{  
  console.log(error) 
}) 