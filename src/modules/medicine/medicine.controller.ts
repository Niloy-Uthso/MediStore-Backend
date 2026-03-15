import { Request, Response } from "express";
import { medicineService } from "./medicine.service";
 


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

export const medicineController ={
    createMedicine,
}
