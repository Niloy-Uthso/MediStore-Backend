import express, { Application } from 'express';
import { medicineRouter } from './modules/medicine/medicine.router';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
 import cors from 'cors';
import { MedicineCategories } from './modules/categories/categories.router';
import { orderRouter } from './modules/orders/orders.router';
import { userRouter } from './modules/user/user.router';
const app:Application = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:4000',
    credentials: true
    
}))

app.all('/api/auth/{*any}', toNodeHandler(auth));


app.use(express.json());

app.use("/admin/categories",MedicineCategories)

app.use("/api/seller/medicines",medicineRouter );
app.use("/api/medicines",medicineRouter );

app.use("/api/orders",orderRouter)
app.use("/api/seller/orders",orderRouter)


app.use("/api/admin/users",userRouter)





app.get('/', (req, res) => {
    res.send('Hello, World!');
})
export default app;
