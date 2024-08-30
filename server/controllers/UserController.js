import Personnel from "../models/personnelModel.js";
import mongoose from "mongoose";

const loginUser = async(req,res) =>{
  res.json({mssg:"Login"})
}

export{
  loginUser
}