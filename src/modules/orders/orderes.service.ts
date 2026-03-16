import { prisma } from "../../lib/prisma";


const createOrder = async (data: any, customerId: string) => {
  const { medicineId, quantity, location } = data;

   
  const medicine = await prisma.medicine.findUnique({
    where: { id: medicineId }
  });

  if (!medicine) {
    throw new Error("Medicine not found");
  }

   
  const price = medicine.price * quantity;

   
  const order = await prisma.order.create({
    data: {
      customerId,
      location,
      items: {
        create: [
          {
            medicineId,
            quantity,
            price
        
          }
        ]
      }
    },
    include: {
      items: true
    }
  });

  return order;
};

export const orderService ={
    createOrder
}