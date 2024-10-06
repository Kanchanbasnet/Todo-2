import { createUser, getUser, updateUser, deleteUser,  LoginUser } from "../../controllers/User/user.controller";

import express from 'express';

const router = express.Router();

router.post('/', createUser);
router.post('/login', LoginUser);
router.get('/', getUser);
router.put('/update', updateUser);
router.delete('/delete', deleteUser);

export default router;
