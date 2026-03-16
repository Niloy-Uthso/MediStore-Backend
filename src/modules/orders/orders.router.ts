import express, { Router } from 'express'
import middleware, { UserRole } from '../../middleware/middlewareproperties'
import { orderController } from './orders.controller'

const router = express.Router()

router.post('/',middleware(UserRole.CUSTOMER),orderController.createOrder)

export  const orderRouter:Router=router