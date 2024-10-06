import FixerTask from '../models/fixerTaskModel.js';
import mongoose from "mongoose";
import {io} from '../server.js'
import AuditReport from '../models/ReportModel.js';

//get all fixes
const getAssignedFixers = async(req,res) =>{
  const audits = await FixerTask.find({}).populate('reportId','area status imagepath').sort({createdAt:-1});
  res.status(200).json(audits);
}

//get a single fix
const getAssignedFixer = async (req,res)=>{
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such fix"})
  }
  const fix = await FixerTask.findById(id);

  if(!fix){
    return res.status(404).json({error: "No such fix"});
  }
  res.status(200).json(fix);
}

//create new fix
const createAssignedFixer = async(req,res) =>{
  const {name,phone,email,gender,deadline,Id} =req.body;
  

  let emptyFields =[]
  if(!name) emptyFields.push('Name');
  if(!deadline) emptyFields.push("Deadline");
  if(emptyFields.length>0){
    return res.status(400).json({error:'Please fill in all the fields' , emptyFields})
  }

  try{
    const fix = await FixerTask.create({name, phone, email, reportId:Id, gender, deadline})
    const data =await FixerTask.findOne({_id:fix._id}).populate('reportId','area status imagepath')
    io.emit('createdFix',data)
    res.status(200).json(data)
  }catch(error){
    res.status(400).json({error:error.message})
  }
}

//delete a fix
const deleteAssignedFixer = async(req,res) =>{
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No such Fixer"})
  }

  const fix = await FixerTask.findOneAndDelete({_id:id})
  if(!fix){
    return res.status(400).json({error:"No such Fixer"})
  }
  io.emit('deletedFix',id)
  res.status(200).json(fix)
}

//update a fix
const updateAssignedFixer = async(req,res)=>{
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No Such Fixer"})
  }
  const fix = await FixerTask.findOneAndUpdate(
    {_id:id},
    {...req.body},
    {new :true}
  )
  if(!fix){
    return res.status(400).json({error:"No such Fixer"})
  }
  io.emit('updatedFix',fix)
  res.status(200).json(fix)
}

const completedFix = async(req,res)=>{
  const {_id} = req.params.id
  const report = await AuditReport.findById(_id)
  if(!report){
    return res.status(400).json({error:"No such Report"})
  }
  report.status = "completed"
  await report.save()
  io.emit('completedFix',report)
  res.status(200).json(report)
}

export{
  getAssignedFixers,
  getAssignedFixer,
  createAssignedFixer,
  deleteAssignedFixer,
  updateAssignedFixer
}