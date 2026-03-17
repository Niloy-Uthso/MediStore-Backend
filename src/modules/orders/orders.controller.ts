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

const getOrderasSeller = async(req:Request,res:Response)=>{
    try{
            const order = await orderService.getOrdersAsSeller(req.user?.id as string)
            res.status(201).json({
                success:true,
                message:"Order fetched successfully",
                order
            })
    }catch(e){

         res.status(500).json({
                success:false,
                message:"Internal server error",
                e
            })
    }
}

const updateStatus=async( req:Request,res:Response)=>{
    try{
        const {status}= req.body
        const id=req.params.id
           const updateStatus= await orderService.updateStatusBySeller(id as string,status)
    res.status(201).json({
                success:true,
                message:"Order Status updated successfully",
                updateStatus
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
    createOrder,
    getOrderasSeller,
    updateStatus
}