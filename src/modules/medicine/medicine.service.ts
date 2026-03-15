import { Request, Response } from "express";
import { Medicine } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createMedicine = async (data: Omit<Medicine,"id"|"created_at"|"updated_at"|"sellerID">,userId:string) => {
 
 const result = await prisma.medicine.create({
       data:{
        ...data,
        sellerID:userId
       }
    })
 
    return result;

}

const getAllMedicines = async()=>{
    const medicine = await prisma.medicine.findMany();
    return medicine;

}

const getMedicineByID = async(id:string)=>{
    console.log(id)
    const medicine = await prisma.medicine.findUnique({
  where: {
     id: id
  },
});
console.log(medicine)
return medicine;
}

const updateMedicine = async(id:string)=>{
    
}

export const medicineService = {

    createMedicine,
    getAllMedicines,
    getMedicineByID
}

