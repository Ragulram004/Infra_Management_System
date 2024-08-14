import express from 'express'
import {createPersonnel,
  getPersonnel,
  getPersonnels,
  deletePersonnel,
  updatePersonnel
} from '../controllers/PersonnelController.js'

const router = express.Router()

// Get all personnel
router.get('/', getPersonnels)

// Get a specific personnel member
router.get('/:id', getPersonnel)

// Post a new member
router.post('/', createPersonnel)

// Delete a member
router.delete('/:id', deletePersonnel)

// Update a member
router.patch('/:id', updatePersonnel)

export default router
