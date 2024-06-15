import express from 'express';
import {
  createUser,
  loginUser,
  logoutUser,
  uploadUserPhoto,
  getCurrentUser,
  getAllUsers,
  updateUser,
  deleteUserAccount,
  deleteUserById,
} from '@/controller/user.controller';
import { requireSuperadmin, authenticateUser } from '@/middlewares/auth.middlewares';
const router = express.Router();

router.post('/users', createUser);
router.post('/users/login', loginUser);
router.post('/users/logout', authenticateUser, logoutUser);
router.post('/users/logoutAll', authenticateUser, logoutUser);
router.post('/users/upload', authenticateUser, uploadUserPhoto);
router.post('/users/delete', authenticateUser, deleteUserAccount);
router.get('/users', requireSuperadmin, getAllUsers);
router.get('/users/:id', authenticateUser, getCurrentUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', requireSuperadmin, deleteUserById);
export default router;
