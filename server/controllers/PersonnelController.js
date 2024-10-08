import Personnel from '../models/personnelModel.js'
import mongoose from 'mongoose'
import {io} from '../server.js'

//get all members
const getPersonnels = async(req,res)=>{
  const personnels = await Personnel.find({}).sort({createdAt:-1})
  res.status(200).json(personnels)
}

// get a single personnel
const getPersonnel = async (req,res)=>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No Such Personnel"})
  }

  const personnel = await Personnel.findById(id)
  if(!personnel){
    return res.status(404).json({error:'No Such Personnel'})
  }

  res.status(200).json(personnel)

}

//get ony auditors
const getAuditorsByRole = async(req,res)=>{
  try{
    const auditors = await Personnel.find({role:'auditor'}).sort({createdAt:-1})
    res.status(200).json(auditors)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}
//get ony handyman
const getHandymansByRole = async(req,res)=>{
  try{
    const handymans = await Personnel.find({role:'handyman'}).sort({createdAt:-1})
    res.status(200).json(handymans)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

//create New personnel
const createPersonnel = async (req, res) => {
  const { name, phone, email, role, dept, gender } = req.body;

  let emptyFields = [];
  if (!name) emptyFields.push('Name');
  if (!phone) emptyFields.push('Phone');
  if (!email) emptyFields.push('Email');
  if (!role) emptyFields.push('Role');
  if (!dept) emptyFields.push('Department');
  if (!gender) emptyFields.push('Gender');
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  try {
    const personnel = await Personnel.create({ name, phone, email, role, dept, gender });
    io.emit('createPersonnel', personnel); // Emit event when personnel is created
    res.status(200).json(personnel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a personnel
const deletePersonnel = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No Such Personnel' });
  }

  const personnel = await Personnel.findOneAndDelete({ _id: id });
  if (!personnel) {
    return res.status(400).json({ error: 'No Such Personnel' });
  }

  io.emit('deletePersonnel', id); // Emit event when personnel is deleted
  res.status(200).json(personnel);
};

//update a personnel
const updatePersonnel = async(req,res)=>{
  const {id} = req.params
  
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({Error: ' No Such Personnel'})
  }
  const personnel = await Personnel.findOneAndUpdate(
    {_id:id},
    {...req.body},
    { new: true }  
  )

  if(!personnel) {
    return res.status(400).json({error:"No Such Personnel"})
  }

  res.status(200).json(personnel)
}

export{
  createPersonnel,
  getPersonnel,
  getPersonnels,
  deletePersonnel,
  updatePersonnel,
  getAuditorsByRole,
  getHandymansByRole
}