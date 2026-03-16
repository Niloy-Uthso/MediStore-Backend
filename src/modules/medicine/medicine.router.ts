import express, { NextFunction, Request, Response, Router } from 'express';
import { medicineController } from './medicine.controller';
 
import middleware, { UserRole } from '../../middleware/middlewareproperties';

const router = express.Router();


 
// admin routes
 


// sellers routes
router.post('/',middleware(UserRole.SELLER),medicineController.createMedicine )
router.put('/:id',middleware(UserRole.SELLER),medicineController.updateMedicine)
router.delete('/:id',middleware(UserRole.SELLER),medicineController.deleteMedicine)


// public routes
router.get('/',medicineController.getAllMedicines)
router.get('/:id',medicineController.getMedicineByID)

 
 
export const medicineRouter:Router = router;
