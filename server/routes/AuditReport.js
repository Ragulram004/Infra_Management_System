import express from 'express';
import { getAuditReports, createAuditReport , deleteReport } from '../controllers/AuditReportController.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { upload } from '../middleware/uploads.js';  // Import the multer middleware

const router = express.Router();
router.use(requireAuth);

// Get all reports
router.get('/', getAuditReports);

// Post a new audit report with image upload
router.post('/', upload.single('image'), createAuditReport);  // Using multer for single image upload

//delete a report
router.delete(':/id', deleteReport);

export default router;
