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
  //add doc to db
  try {
    const personnel = await Personnel.create({ name, phone, email, role, dept, gender })
    res.status(200).json(personnel)
  } catch (err) {
    res.status(400).json({ err: err.message })
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