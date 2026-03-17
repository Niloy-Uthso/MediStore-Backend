import { prisma } from "../../lib/prisma";

const getAllUsersByAdmin = async()=>{
    const allUsers = await prisma.user.findMany();
    return allUsers
}

const updateUserByAdmin = async(id:string,status:string)=>{
    const updateUser = await prisma.user.update({
  where: {
    id: id,
  },
  data: {
    status: status,
  },
});
}

export  const userService={
    getAllUsersByAdmin
}