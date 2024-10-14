import express from 'express';
import { 
  getReports, 
  createReport ,
  clearFixerId, 
  deleteReport,
  updateReport,
  getFixersTasks,
  getReportsByFixer,
  getCompletedReports,
  updateStatusVerification
} from '../controllers/ReportController.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { upload } from '../middleware/uploads.js';  // Import the multer middleware

const router = express.Router();
router.use(requireAuth);

// Get all reports
router.get('/', getReports);

// get completed reports
router.get('/completedReport', getCompletedReports);

//get reports assigned to fixer
router.get('/fixers', getFixersTasks);

//get reports by fixer email
router.post('/fixerRole',getReportsByFixer);

// Post a new audit report with image upload
router.post('/', upload.single('image'), createReport);  // Using multer for single image upload

//update a report
router.patch('/:id', upload.single('completedImage'), updateReport);

//update status
router.patch('/verify/:id',updateStatusVerification)

//delete a report
router.delete(':/id', deleteReport);

//clear fixerid
router.patch('/deleteFix/:id', clearFixerId);


export default router;
