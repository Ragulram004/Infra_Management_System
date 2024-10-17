import AuditTask from "../models/auditTaskModel.js";
import mongoose from "mongoose";
import Personnel from "../models/personnelModel.js";
import {io} from '../server.js'
import moment from 'moment';

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

//get all audits with in a week
const getAssignedAuditorsByWeek = async (req, res) => {
  try {
    // Get the current date
    const currentDate = new Date();

    // Calculate the start and end of the current week (Sunday to Saturday)
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())); // Sunday
    startOfWeek.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // Saturday
    endOfWeek.setHours(23, 59, 59, 999); // Set time to the end of the day

    // Find audits created within this week (from Sunday to Saturday)
    const audits = await AuditTask.find({
      createdAt: { 
        $gte: startOfWeek, 
        $lte: endOfWeek 
      }
    })
    .populate('userId', 'name phone email role gender') // Populate user details
    .sort({ createdAt: -1 });

    res.status(200).json(audits);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

//get auditorstats count
const getAuditorCompletionStats = async (req, res) => {
  try {
    // Aggregate audits by auditor (userId) and their completion status
    const auditStats = await AuditTask.aggregate([
      {
        // Lookup auditor details from Personnel collection
        $lookup: {
          from: 'personnels', // Personnel collection (for auditor details)
          localField: 'userId', // Field in AuditTask
          foreignField: '_id', // Field in Personnel
          as: 'auditorDetails',
        },
      },
      {
        // Unwind to flatten the auditorDetails array
        $unwind: '$auditorDetails'
      },
      {
        // Group by auditor (userId), and count assigned, completed, and pending audits
        $group: {
          _id: {
            auditorId: '$userId',
            name: '$auditorDetails.name',
            phone: '$auditorDetails.phone',
            gender: '$auditorDetails.gender',
            dept:'$auditorDetails.dept'
          },
          assignedCount: { $sum: 1 }, // Total number of audits assigned
          completedCount: {
            $sum: {
              $cond: [{ $eq: ['$status', 'completed'] }, 1, 0], // Count completed audits
            },
          },
          pendingCount: {
            $sum: {
              $cond: [{ $eq: ['$status', 'pending'] }, 1, 0], // Count pending audits
            },
          },
        },
      },
      {
        // Sort by assigned audits in descending order (you can change the sorting as needed)
        $sort: { assignedCount: -1 },
      },
    ]);

    res.status(200).json(auditStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get deadline by week
const getPendingAuditsForCurrentWeek = async (req, res) => {
  try {
    // Get the current date
    const today = moment();
    
    // Find the start (Sunday) and end (Saturday) of the current week
    const weekStart = today.clone().startOf('week').toDate(); // Sunday
    const weekEnd = today.clone().endOf('week').toDate();     // Saturday
    
    // Fetch the pending audits with deadlines within the current week
    const audits = await AuditTask.find({
      status: 'pending', // Only pending audits
    }).populate('userId', 'name phone email gender') // Assuming user details are stored in userId
      .sort({ createdAt: -1 });

    // Filter audits by deadline that fall within the current week (Sunday to Saturday)
    const pendingAuditsForCurrentWeek = audits.filter(audit => {
      const deadlineDate = moment(audit.deadline, 'DD/MM/YYYY').toDate(); // Convert the deadline string to a Date object
      return deadlineDate >= weekStart && deadlineDate <= weekEnd;
    });

    // Send the filtered pending audits as response
    res.status(200).json(pendingAuditsForCurrentWeek);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



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
  getAuditorsByEmail,
  getAssignedAuditorsByWeek,
  getAuditorCompletionStats,
  getPendingAuditsForCurrentWeek  
}