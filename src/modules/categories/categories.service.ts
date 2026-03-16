import { Category } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const createCategory = async(data: Omit<Category,"id"|"updatedAt"|"updatedAt">)=>{
    const Category = await prisma.category.create({
  data:  data
});

return Category
}

export const categoryService ={
    createCategory
}