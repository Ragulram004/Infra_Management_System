import AuditTask from "../models/auditTaskModel.js";
import mongoose from "mongoose";
import Personnel from "../models/personnelModel.js";
import {io} from '../server.js'

//get all audits
const getAssignedAuditors = async (req, res) => {
  const {email,role} = req.body
  try{
    const audits = await AuditTask.find({}).populate('userId','name phone email role gender').sort({ createdAt: -1 });
  res.status(200).json(audits);
  }catch(error){ 
    res.status(400).json({error: error.message})
  }  
};

//get audits by email
const getAuditorsByEmail = async (req, res) => {
  const { email } = req.body;
  
  try {
    // First, find the user by email in the Personnel collection
    const user = await Personnel.findOne({ email });

    // Check if the user was found
    if (!user) {
      return res.status(404).json({ error: 'User not found with the provided email' });
    }

    // Now, use the user's _id (which is an ObjectId) to find related AuditTasks
    const audits = await AuditTask.find({ userId: user._id })
      .populate('userId', 'name phone email role gender')
      .sort({ createdAt: -1 });

    res.status(200).json(audits);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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
  const { id ,area ,deadline } = req.body;

  let emptyFields = []
  if(!area) emptyFields.push('Area');
  if(!deadline) emptyFields.push('Deadline'); 
  if(emptyFields.length > 0) {
    return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
  }

  //add doc to db 
  try{
    const audit = await AuditTask.create({ userId: id, area, deadline})
    const data =await AuditTask.findOne({_id:audit._id}).populate('userId','name phone email role gender')
    io.emit('createdAudit', data)
    res.status(200).json(data)
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
  const data = await AuditTask.findOne({_id:id}).populate('userId','name phone email role gender')
  console.log(data)
  io.emit('updatedAudit', data)
  res.status(200).json(data)
}

export{
  getAssignedAuditors,
  getAssignedAuditor,
  createAssignedAuditor,
  deleteAssignedAuditor,
  updateAssignedAuditor,
  getAuditorsByEmail
}