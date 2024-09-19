// const express = require('express')
// const app = express()
// const mongoose = require('mongoose')
// require('dotenv').config()
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import {} from 'dotenv/config';
import personnelRoutes from './routes/Personnel.js'
import auditTaskRoutes from './routes/AuditTask.js'
import userRoutes from './routes/User.js'
import http from 'http'
import {Server} from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server (server,{
  cors:{
    origin:[
      'http://localhost:5173',
    ],
    credentials:true
  }
})

app.use(cors({
  origin:"http://localhost:5173",
  methods:"GET,POST,PATCH,DELETE",
  credentials:true
}));

app.use(express.urlencoded({extended:false})); 
app.use(express.json());

app.use('/api/personnel',personnelRoutes)
app.use('/api/auditTask',auditTaskRoutes)
app.use('/api/user',userRoutes)


io.on('connection', (socket) => {
  console.log('User Connected', socket.id);

  socket.on('message', (msg) => {
    console.log('Message received:', msg);
    io.emit('message', msg); // Broadcast the message to all clients
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

export {io,server};

//Connection to DB
mongoose.connect(process.env.URI)
.then(()=>{
  //listen for requests
  // app.listen(process.env.PORT, () => {
  //   console.log(`Connected to DB and Server is running on PORT http://localhost:${process.env.PORT}`);
  // })
  server.listen(process.env.PORT, () => {
    console.log(`Connected to DB and Server is running on PORT http://localhost:${process.env.PORT}`);
  })
})
.catch((error)=>{  
  console.log(error) 
}) 