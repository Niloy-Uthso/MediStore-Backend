import { prisma } from "../../lib/prisma";

const getAllUsersByAdmin = async()=>{
    const allUsers = await prisma.user.findMany();
    return allUsers
}

const updateUserStatusByAdmin = async (id: string) => {

  
  const user = await prisma.user.findUnique({
    where: { id }
  });

  if (!user) {
    throw new Error("User not found");
  }

  
  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      isBanned: !user.isBanned
    }
  });

  return updatedUser;
};

export  const userService={
    getAllUsersByAdmin,
    updateUserStatusByAdmin
}