import Report from '../models/ReportModel.js';
import mongoose from 'mongoose';
import {io} from '../server.js';
import Personnel from '../models/personnelModel.js';

// Get  reports where status:pending
const getReports = async (req, res) => {
  try{
    const reports = await Report.find({status:'pending'})
      .populate('userId','name phone email role')
      .populate('reportedAreaId','area')
      .sort({ createdAt: -1 });
    res.status(200).json(reports);
  }catch(error){
    res.status(400).json({error: error.message});
  }
};

//Get reports with only fixerId my filter with email
const getReportsByFixer = async (req, res) => {
  const { email } = req.body;
  try{
    const user = await Personnel.findOne({ email });
    if (!user) {
      return res.status(404).json({error: 'User not found with the provided email'});
    }

    const fixes = await Report.find({ fixerId: user._id })
      .populate('fixerId', 'name phone email role')
      .populate('reportedAreaId', 'area')
      .sort({createdAt:-1});
    res.status(200).json(fixes);
  }catch(error){
    res.status(400).json({error: error.message});
  }
}

// Create a new  report
const createReport = async (req, res) => {
  const { userId, reportedAreaId } = req.body;
  
  // Get the uploaded image's filename from multer
  const imagePath = req.file ? `/uploads/reports/${req.file.filename}` : null;

  try { 

    // Create the audit report document
    const report = await Report.create({
      userId, 
      reportedAreaId,
      imagepath: imagePath  // Save the image path in the database
    });
    const data = await Report.findOne({_id:report._id})
      .populate('userId','name phone email role')
      .populate('reportedAreaId','area')
    
    io.emit('createdReport', data);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get fixers tasks
const getFixersTasks = async(req,res)=>{
  try{
    const fixers = await Report.find({fixerId: { $exists: true, $ne: null }})
      .populate('fixerId','name phone email role gender')
      .populate('reportedAreaId','area')
    res.status(200).json(fixers);
  }catch(error){
    res.status(400).json({error: error.message});
  }
}


//delete a report
const deleteReport = async(req,res) =>{
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No such Report"});
  }

  const report = await Report.findOneAndDelete({_id:id});

  if(!report){
    return res.status(404).json({error:"No such Report"})
  }
  res.status(200).json(report)
}


//update a `report`
const updateReport = async (req, res) => {
  const { id } = req.params; // Get the reportId from request parameters
  const { fixerId, fixerDeadline } = req.body;

  // Check for empty fields
  let emptyFields = [];
  if (!fixerId) {
    emptyFields.push('fixerId');
  }
  if (!fixerDeadline) {
    emptyFields.push('fixerDeadline');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the fields", emptyFields });
  }
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Report" });
  }

  try {
    const report = await Report.findById(id);
    
    if (report.fixerId) {
      return res.status(400).json({ error: "Work already assigned. Delete that work to reassign." });
    }   
    report.fixerId = fixerId;
    report.fixerDeadline = fixerDeadline;    
    await report.save();    
    const updatedReport = await Report.findById(id)
      .populate('fixerId', 'name phone email role')
      .populate()    
    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const clearFixerId = async(req,res)=>{
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No such Report"});
  }

  const report = await Report.findOneAndUpdate(
    { _id: id },
    { fixerId: null, fixerDeadline: null },
    { new: true }
  )
  if(!report){
    return res.status(404).json({error:"No such Report"})
  }
  res.status(200).json(report)
  io.emit('clearFixerId',report)
}


export { getReports, createReport , deleteReport, updateReport,getFixersTasks,clearFixerId,getReportsByFixer };
