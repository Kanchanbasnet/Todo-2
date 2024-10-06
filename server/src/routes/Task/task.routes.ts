
import express from 'express';
import { createTaskByUserId, deleteMultipleTaskById, deleteUserTaskById, getTasksByUserId, updateUserTaskById } from '../../controllers/Task/task.controller';

const router = express.Router();

router.get('/', getTasksByUserId);
router.post('/', createTaskByUserId);
router.put('/update', updateUserTaskById);
router.delete('/', deleteUserTaskById);
router.delete('/multiple-delete', deleteMultipleTaskById);

export default router;