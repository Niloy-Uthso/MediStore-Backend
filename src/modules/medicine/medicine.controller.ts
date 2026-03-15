import { Request, Response } from "express";
import { medicineService } from "./medicine.service";
import { success } from "better-auth/*";
 


const createMedicine = async(req:Request, res:Response) => {
try{
    // console.log(req.user)
    const result = await medicineService.createMedicine(req.body,req.user?.id as string);
    console.log(result)
    res.status(201).json({
        message:'Medicine created successfully'
    })
}
catch(error){
    console.log(error)
    res.status(500).json({message:'Internal Server Error'})
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
        
        const result = await medicineService.
    }catch(err){

    }

}
export const medicineController ={
    createMedicine,
    getAllMedicines,
    getMedicineByID
}
