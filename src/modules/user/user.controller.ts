import { Request, Response } from "express"
import { userService } from "./user.service"

const getAllUser = async(req:Request,res:Response)=>{

    try{

        const getAllUsersByAdmin= await userService.getAllUsersByAdmin()
        res.status(200).json({
            success:true,
            message:"All user retrieved",
            getAllUsersByAdmin

        })
        
    }catch(e){
             
        res.status(500).json({
            success:false,
            message:"Internal server error",
            e
        })
    }
}

const updateUserStatusByAdmin = async(req:Request,res:Response)=>{
   try{
const update = await userService.updateUserStatusByAdmin(req.params.id as string)
 res.status(200).json({
            success:true,
            message:"User Status Updated Successfully!!!!",
            update

        })
        
    }catch(e){
             
        res.status(500).json({
            success:false,
            message:"Internal server error",
            e
        })
    }
    
}
const getCurrentUser=async(req:Request,res:Response)=>{
    try{
        const getCurrentUser= await userService.getCurrentUser(req.user?.id as string)
        res.status(200).json({
            success:true,
            message:"Current user retrieved",
            getCurrentUser
        })
    }catch(e){
             
        res.status(500).json({
            success:false,
            message:"Internal server error",
            e
        })
    }
}

export const  userController ={
    getAllUser,
    updateUserStatusByAdmin,
    getCurrentUser
}