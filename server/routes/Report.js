import express from 'express';
import { getReports, createReport , deleteReport } from '../controllers/ReportController.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { upload } from '../middleware/uploads.js';  // Import the multer middleware

const router = express.Router();
router.use(requireAuth);

// Get all reports
router.get('/', getReports);

// Post a new audit report with image upload
router.post('/', upload.single('image'), createReport);  // Using multer for single image upload

//delete a report
router.delete(':/id', deleteReport);

export default router;
