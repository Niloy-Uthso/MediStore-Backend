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
    const update = await 
}

export const  userController ={
    getAllUser
}