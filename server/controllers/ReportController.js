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

//get reports where imagepath is present
const getReportsWithImagepath = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Personnel.findOne({ email });

    if (!user) {      
      return res.status(404).json({ error: 'User not found with the provided email' });
    }

    const reports = await Report.find({ userId: user._id, imagepath: { $exists: true, $ne: null } })
      .populate('userId', 'name phone email role')
      .populate('reportedAreaId', 'area')
      .sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (error) {    
    res.status(400).json({ error: error.message });
  }
}



//get reports where CompletedReportImagePath is present
const getCompletedReports = async (req, res) => {
  try{
    const reports = await Report.find({CompletedReportImagePath: { $exists: true, $ne: null }})
      .populate('fixerId','name phone email role')
      .populate('reportedAreaId','area')
      .sort({ createdAt: -1 });
    res.status(200).json(reports);
  }catch(error){
    res.status(400).json({error: error.message});
  }
};

//get CompletedReportImagePath by email
const getCompletedReportsByEmail = async (req, res) => {
  const { email } = req.body; // Extract email from the request body

  try {
    const fixer = await Personnel.findOne({ email });
    
    if (!fixer) {
      return res.status(404).json({ error: 'No user with the provided email found' });
    }

    const reports = await Report.find({
      fixerId: fixer._id,
      CompletedReportImagePath: { $exists: true, $ne: null }
    })
    .populate('fixerId', 'name phone email role')
    .populate('reportedAreaId', 'area')
    .sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

  io.emit('deletedReport',id)
  res.status(200).json(report)
}


//update a `report`
const updateReport = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No such Report"});
  }
  const { fixerId, fixerDeadline} = req.body; // Extract data from request body

  // Check if req.file is present (image is being uploaded)
  const isImageUpdate = !!req.file;

  // Only validate fixerId and fixerDeadline if no image is provided
  let emptyFields = [];
  if (!isImageUpdate) {
    if (!fixerId) {
      emptyFields.push('fixerId');
    }
    if (!fixerDeadline) {
      emptyFields.push('fixerDeadline');
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: "Please fill in all the fields", emptyFields });
    }
  }
  
  // Check if the report ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Report" });
  }

  try {
    // Fetch the report by ID
    const report = await Report.findById(id);

    // If fixerId is already assigned, return an error unless an image is being uploaded
    if (!isImageUpdate && report.fixerId) {
      return res.status(400).json({ error: "Work already assigned. Delete that work to reassign." });
    }

    // Update fixerId and fixerDeadline if this is not an image update
    if (!isImageUpdate) {
      report.fixerId = fixerId;
      report.fixerDeadline = fixerDeadline;
    }

    // If image is sent, update the CompletedReportImagePath and status
    if (isImageUpdate) {
      const imagePath = `/uploads/reports/${req.file.filename}`; // Save the file path
      report.CompletedReportImagePath = imagePath;
      report.CompletedReportTime = Date.now();
    }

    // Save the updated report
    await report.save();    

    // Fetch the updated report and populate the necessary fields
    const updatedReport = await Report.findById(id)
      .populate('fixerId', 'name phone email role gender')
      .populate('reportedAreaId', 'area');  // Populating fixer details

    io.emit('updatedReport', updatedReport);
    res.status(200).json(updatedReport);  // Return the updated report
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update status
const updateStatusVerification = async (req, res) => {
  const { id } = req.params;   
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Report" });
  }  
  const { status } = req.body;   
  try {    
    const report = await Report.findById(id);        
    if (!report) {
      return res.status(404).json({ error: "No such Report" });
    }    
    report.status = status;    
    await report.save();
    const updatedReport = await Report.findById(id)
      .populate('fixerId', 'name phone email role gender')
      .populate('reportedAreaId', 'area');

    io.emit('updatedReport',updatedReport)
    res.status(200).json(report);
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


export { getReports, 
  createReport , 
  deleteReport, 
  updateReport,
  getFixersTasks,
  clearFixerId,
  getReportsByFixer,
  getCompletedReports,
  updateStatusVerification,
  getCompletedReportsByEmail,
  getReportsWithImagepath 
};
