import { Request, Response } from "express";
import { medicineService } from "./medicine.service";
import { success } from "better-auth/*";
 


const createMedicine = async(req:Request, res:Response) => {
try{
    // console.log(req.user)
    const result = await medicineService.createMedicine(req.body,req.user?.id as string);
    
    res.status(201).json({
        message:'Medicine created successfully',
        result
    })
}
catch(error){
    console.log(error)
    res.status(500).json({
        message:'Internal Server Error',
        error

    })
}


}

const getAllMedicines = async(req:Request, res:Response)=>{
    try{
          const result = await medicineService.getAllMedicines();

          if(result.length==0)
            return res.status(200).json({
             success:true,
             message:"No medicine found",
             data:[]

        
            })

            return res.status(200).json({
              
                success:true,
                message:"All the medicine retrieved successfully",
                result

            })
    }

    catch(err){
             return res.status(400).json({
                success:false,
                message:"Bad request",
                details:err
             })
    }
}

const getMedicineByID= async (req: Request,res:Response)=>{
    try{
     
        const result= await medicineService.getMedicineByID(req.params.id as string )
    console.log(result)
        return res.status(200).json({
            success:true,
            message:"Medicine retrieved successfully",
            result
        })

    }catch(err) {

        return res.status(404).json({
            success:false,
            message:"Medicine not found",
            details:err

        })
    }
}
const updateMedicine = async(req:Request,res:Response)=>{

    try{
        console.log("here req",req)
        const result = await medicineService.updateMedicine(req.params.id as string,req.body)
        return res.status(201).json({
            success:true,
            message:"Medicine Updated Successfully",
            result

        })
    }catch(err){
                
        return res.status(501).json({
            success:false,
            message:"Medicine updatation not implemented",
            err
        })
    }

}

const deleteMedicine= async(req:Request,res:Response)=>{
    try{

        const result = await medicineService.deleteMedicine(req.params.id as string)
        return res.status(200).json({
            success:true,
            message:"Medicine deleted successfully",
            result
        })
    }catch(e){
        return res.status(501).json({
            success:false,
            message:"Medicine could not be deleted",
            e
        })

    }
}
export const medicineController ={
    createMedicine,
    getAllMedicines,
    getMedicineByID,
    updateMedicine,
    deleteMedicine
}
