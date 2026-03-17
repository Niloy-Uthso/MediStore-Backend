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

const getOrdersAsSeller = async (sellerId: string) => {
  const orders = await prisma.order.findMany({
    where: {
      items: {
        some: {
          medicine: {
            sellerID: sellerId
          }
        }
      }
    },
    include: {
      items: {
        include: {
          medicine: true, 
        }
      },
      customer: true 
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return orders;
};

const updateStatusBySeller = async(orderId:string,status:string)=>{

  const updateStatus = await prisma.order.update({
  where: {
    id: orderId
  },
  data: {
    status:status
  },
});
return updateStatus
}

export const orderService ={
    createOrder,
    getOrdersAsSeller,
    updateStatusBySeller
}