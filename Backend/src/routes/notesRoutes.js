import express from 'express'
import { creatNotes, deleteNotes, getAllNotes, updateNotes, getNote } from '../controllers/notesController.js'
const router = express.Router()

router.get('/',getAllNotes)
router.post('/',creatNotes)
router.get('/:id',getNote)
router.put('/:id',updateNotes)
router.delete('/:id',deleteNotes)

export default router