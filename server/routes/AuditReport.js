import express from 'express';
import { getAuditReports, createAuditReport } from '../controllers/AuditReportController.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { upload } from '../middleware/uploads.js';  // Import the multer middleware

const router = express.Router();
router.use(requireAuth);

// Get all reports
router.get('/', getAuditReports);

// Post a new audit report with image upload
router.post('/', upload.single('imagepath'), createAuditReport);  // Using multer for single image upload

export default router;
