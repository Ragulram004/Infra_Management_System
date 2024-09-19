import AuditTask from "../models/auditTaskModel.js";
import mongoose from "mongoose";
import {io} from '../server.js'

//get all audits
const getAssignedAuditors = async (req, res) => {
  const audits = await AuditTask.find({}).sort({ createdAt: -1 });
  res.status(200).json(audits);
};

// get a single audit
const getAssignedAuditor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such audit" });
  }

  const audit = await AuditTask.findById(id);

  if (!audit) {
    return res.status(404).json({ error: "No such audit" });
  }
  res.status(200).json(audit);
}

//create new audit
const createAssignedAuditor = async (req, res) => {
  const { name, phone, email, status, role, area, gender,deadline } = req.body;

  let emptyFields = []
  if(!area) emptyFields.push('Area');
  if(!deadline) emptyFields.push('Deadline'); 
  if(emptyFields.length > 0) {
    return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
  }

  //add doc to db 
  try{
    const audit = await AuditTask.create({ name, phone, email, status, role, area, gender,deadline})
    io.emit('createdAudit', audit)
    res.status(200).json(audit)
  }catch(error){
    res.status(400).json({ error: error.message })
  }
}

//delete a audit
const deleteAssignedAuditor = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No Such Audit"})
  }

  const audit = await AuditTask.findOneAndDelete({_id:id})
  if(!audit) {
    return res.status(400).json({error:"No Such Audit"})
  }
  io.emit('deletedAudit', id)
  res.status(200).json(audit)
}

//update a audit
const updateAssignedAuditor = async(req,res) =>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No Such Audit"})
  }
  const audit = await AuditTask.findOneAndUpdate(
    {_id:id},
    {...req.body},
    { new: true }
  )
  if(!audit) {
    return res.status(400).json({error:"No Such Audit"})
  }
  io.emit('updatedAudit', audit)
  res.status(200).json(audit)
}

export{
  getAssignedAuditors,
  getAssignedAuditor,
  createAssignedAuditor,
  deleteAssignedAuditor,
  updateAssignedAuditor
}