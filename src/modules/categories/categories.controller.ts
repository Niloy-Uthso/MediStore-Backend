import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { categoryService } from "./categories.service";
import { success } from "better-auth/*";


const createCategories = async(req:Request,res:Response)=>{
    try{
        const createCategory= await categoryService.createCategory(req.body)

        res.status(201).json({
            success:true,
            message:"Category added successfully",
            createCategory

        })
    }catch(e){
        res.status(500).json({
            success:false,
            message:"Internal server error",
            e
        })
    }


}

export const categoryController={
    createCategories
}