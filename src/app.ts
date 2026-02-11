import express, { Application } from 'express';
import { medicineRouter } from './modules/medicine/medicine.router';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
 import cors from 'cors';
const app:Application = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:4000',
    credentials: true
    
}))

app.all('/api/auth/{*any}', toNodeHandler(auth));


app.use(express.json());

app.use("/post",medicineRouter );


app.get('/', (req, res) => {
    res.send('Hello, World!');
})
export default app;
