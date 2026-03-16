import express, { Router } from 'express'
import middleware, { UserRole } from '../../middleware/middlewareproperties'
import { categoryController } from './categories.controller'

const router = express.Router()

router.post('/',middleware(UserRole.ADMIN),categoryController.createCategories)

export const MedicineCategories:Router= router