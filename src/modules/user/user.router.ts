import express, { Router } from 'express';
import middleware, { UserRole } from '../../middleware/middlewareproperties';
import { userController } from './user.controller';

const router = express.Router()

router.get('/',middleware(UserRole.ADMIN),userController.getAllUser)
router.patch('/:id',middleware(UserRole.ADMIN),userController.updateUserStatusByAdmin)
export  const userRouter:Router= router

