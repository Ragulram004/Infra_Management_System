import Personnel from '../models/personnelModel.js'
import mongoose from 'mongoose'

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

//create New personnel
const createPersonnel = async (req,res)=>{
  const { name, phone, email, role, dept, gender } = req.body

  let emptyFields = []
  if(!name) emptyFields.push('Name');
  if(!phone) emptyFields.push('Phone');
  if(!email) emptyFields.push('Email');
  if(!role) emptyFields.push('Role');
  if(!dept) emptyFields.push('Department');
  if(!gender) emptyFields.push('Gender');
  if(emptyFields.length > 0) {
    return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
  }

  //add doc to db
  try {
    const personnel = await Personnel.create({ name, phone, email, role, dept, gender })
    res.status(200).json(personnel)
  } catch (error) {
    res.status(400).json({ error: error.message})
  }
 
}

//delete a personnel
const deletePersonnel = async(req,res)=>{
  const {id} = req.params
  
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({Error: ' No Such Personnel'})
  }

  const personnel = await Personnel.findOneAndDelete({_id:id})
  if(!personnel) {
    return res.status(400).json({error:"No Such Personnel"})
  }
  res.status(200).json(personnel)
}

//update a personnel
const updatePersonnel = async(req,res)=>{
  const {id} = req.params
  
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({Error: ' No Such Personnel'})
  }
  const personnel = await Personnel.findOneAndUpdate({_id:id},{
    ...req.body
  })

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
  updatePersonnel
}