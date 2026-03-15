import { Medicine } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createMedicine = async (data: Omit<Medicine,"id"|"created_at"|"updated_at"|"sellerID">,userId:string) => {
console.log(data)
 const result = await prisma.medicine.create({
       data:{
        ...data,
        sellerID:userId
       }
    })
    console.log(result)
    return result;

}

export const medicineService = {

    createMedicine,
}

