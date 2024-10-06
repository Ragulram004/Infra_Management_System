import AuditReport from '../models/ReportModel.js';
import mongoose from 'mongoose';
import {io} from '../server.js'

// Get  reports where status:pending
const getReports = async (req, res) => {
  try{
    const reports = await AuditReport.find({status:'pending'})
      .populate('userId','name phone email role')
      .populate('reportedAreaId','area')
      .sort({ createdAt: -1 });
    res.status(200).json(reports);
  }catch(error){
    res.status(400).json({error: error.message});
  }
};

// Create a new  report

const createReport = async (req, res) => {
  const { userId, reportedAreaId } = req.body;
  
  // Get the uploaded image's filename from multer
  const imagePath = req.file ? `/uploads/reports/${req.file.filename}` : null;

  try { 

    // Create the audit report document
    const report = await AuditReport.create({ 
      userId, 
      reportedAreaId,
      imagepath: imagePath  // Save the image path in the database
    });
    const data = await AuditReport.findOne({_id:report._id})
      .populate('userId','name phone email role')
      .populate('reportedAreaId','area')
    
    io.emit('createdReport', data);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//delete a report
const deleteReport = async(req,res) =>{
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No such Report"});
  }

  const report = await AuditReport.findOneAndDelete({_id:id});

  if(!report){
    return res.status(404).json({error:"No such Report"})
  }
  res.status(200).json(report)
}

export { getReports, createReport , deleteReport };
