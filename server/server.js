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
import reportRoutes from './routes/Report.js'
import userRoutes from './routes/User.js'
import http from 'http'
import {Server} from 'socket.io'
import path from 'path';


const app = express()
const server = http.createServer(app)
const io = new Server (server,{
  cors:{
    origin:[
      'https://infra-management-system.vercel.app',
    ],
    credentials:true
  }
})


// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors({
  origin:"https://infra-management-system.vercel.app",
  methods:"GET,POST,PATCH,DELETE",
  credentials:true
}));

app.use(express.urlencoded({extended:false})); 
app.use(express.json());

app.use('/api/personnel',personnelRoutes)
app.use('/api/auditTask',auditTaskRoutes)
app.use('/api/report',reportRoutes)
app.use('/api/user',userRoutes)



io.on('connection', (socket) => {
  console.log('User Connected', socket.id);

  socket.on('message', (msg) => {
    console.log('Message received:', msg);
    io.emit('message', msg); 
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

export {io,server};

//Connection to DB
mongoose.connect(process.env.URI)
.then(()=>{
  server.listen(process.env.PORT, () => {
    console.log(`Connected to DB and Server is running on PORT http://localhost:${process.env.PORT}`);
  })
})
.catch((error)=>{  
  console.log(error) 
}) 

export default app;