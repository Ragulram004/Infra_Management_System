import express from 'express'
import {
  getAssignedAuditors,
  getAssignedAuditor,
  createAssignedAuditor,
  deleteAssignedAuditor
} from '../controllers/AuditTaskController.js'
import {requireAuth} from '../middleware/requireAuth.js'


const router = express.Router()
router.use(requireAuth)

// Get all personnel
router.get('/', getAssignedAuditors)

// Get a specific personnel member
router.get('/:id', getAssignedAuditor)

// Post a new member
router.post('/', createAssignedAuditor)

// Delete a member
router.delete('/:id', deleteAssignedAuditor)

export default router
