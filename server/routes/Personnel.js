import express from 'express'
import {createPersonnel,
  getPersonnel,
  getPersonnels,
  deletePersonnel,
  updatePersonnel,
  getAuditorsByRole,
  getHandymansByRole
} from '../controllers/PersonnelController.js'
import {requireAuth} from '../middleware/requireAuth.js'

const router = express.Router()

//auth
router.use(requireAuth)

// Get all personnel
router.get('/', getPersonnels)

//get all auditors
router.get('/auditors',getAuditorsByRole)

//get all handyman
router.get('/handymans',getHandymansByRole)

// Get a specific personnel member
router.get('/:id', getPersonnel)

// Post a new member
router.post('/', createPersonnel)

// Delete a member
router.delete('/:id', deletePersonnel)

// Update a member
router.put('/:id', updatePersonnel)


export default router
