import express from 'express'
import {
  getAssignedAuditors,
  getAssignedAuditor,
  createAssignedAuditor,
  deleteAssignedAuditor,
  updateAssignedAuditor,
  getAuditorsByEmail,
  getAssignedAuditorsByWeek
} from '../controllers/AuditTaskController.js'
import {requireAuth} from '../middleware/requireAuth.js'


const router = express.Router()
router.use(requireAuth)

// Get all personnel
router.get('/', getAssignedAuditors)

router.get('/weeklytasks',getAssignedAuditorsByWeek)

//get by email
router.post('/role',getAuditorsByEmail)

// Get a specific personnel member
router.get('/:id', getAssignedAuditor)

// Post a new member
router.post('/', createAssignedAuditor)

// Delete a member
router.delete('/:id', deleteAssignedAuditor)

//update a audit
router.patch('/:id',updateAssignedAuditor)

export default router
