import { Request, Response } from "express";
import { orderService } from "./orderes.service";

const createOrder = async(req:Request,res:Response)=>{
    try{
        console.log(req)
           const createdOrder = await orderService.createOrder(req.body,req.user?.id as string)

           res.status(201).json({
            success:true,
            message:"Order placed successfully",
            createdOrder
           })
    }catch(e){
        res.status(500).json({
            success:false,
            message:"Internal server error",
            e
        })


    }
}

export const orderController ={
    createOrder
}