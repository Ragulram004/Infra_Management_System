import Personnel from "../models/personnelModel.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d'})
}

//login 
const loginUser = async(req,res) =>{
  const {email} = req.body
  try{
    const user = await Personnel.login(email)
    //create token
    const token = createToken(user._id)
    const role = user.role
    res.status(200).json({email, role, token})
  }catch(error){
    res.status(400).json({error: error.message})
  }
}
export const LoginViaEmail = async(req,res) =>{
  const {email} = req.body
  try{
    const user = await Personnel.login(email)
    //create token
    const token = createToken(user._id)
    const role = user.role
    res.status(200).json({email, role, token})
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

export{
  loginUser
}