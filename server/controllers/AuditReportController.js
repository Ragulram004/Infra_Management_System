import AuditReport from '../models/auditReportModel.js';
import mongoose from 'mongoose';

// Get all audit reports
const getAuditReports = async (req, res) => {
  const reports = await AuditReport.find({}).sort({ createdAt: -1 });
  res.status(200).json(reports);
};

// Create a new audit report
const createAuditReport = async (req, res) => {
  const { name, phone, email, area } = req.body;
  
  // Get the uploaded image's filename from multer
  const imagePath = req.file ? `/uploads/reports/${req.file.filename}` : null;

  try {
    // Create the audit report document
    const report = await AuditReport.create({ 
      name, 
      phone, 
      email, 
      area, 
      imagepath: imagePath  // Save the image path in the database
    });

    res.status(200).json(report);
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

export { getAuditReports, createAuditReport , deleteReport };
