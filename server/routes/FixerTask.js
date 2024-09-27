import express from 'express'
import {requireAuth} from '../middleware/requireAuth.js'
import {
  getAssignedFixers,
  getAssignedFixer,
  createAssignedFixer,
  deleteAssignedFixer,
  updateAssignedFixer
} from '../controllers/FixerTaskController.js'

const router = express.Router()
router.use(requireAuth)


//get all fixertasks
router.get('/',getAssignedFixers)

//get a fixertask
router.get('/:id',getAssignedFixer)

//post a fixertask
router.post('/',createAssignedFixer)

//delete a fixertask
router.delete('/:id',deleteAssignedFixer)

//update a fixertask
router.patch('/:id',updateAssignedFixer)

export default router