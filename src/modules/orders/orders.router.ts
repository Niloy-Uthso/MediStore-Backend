import express, { Router } from 'express'
import middleware, { UserRole } from '../../middleware/middlewareproperties'
import { orderController } from './orders.controller'

const router = express.Router()

router.post('/',middleware(UserRole.CUSTOMER),orderController.createOrder)

router.get('/',middleware(UserRole.SELLER),orderController.getOrderasSeller)

router.patch('/:id',middleware(UserRole.SELLER),orderController.updateStatus)

router.get('/customer',middleware(UserRole.CUSTOMER),orderController.getOrderAsCustomer)


export  const orderRouter:Router=router