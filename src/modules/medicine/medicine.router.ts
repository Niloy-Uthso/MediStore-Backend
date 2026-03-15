import express, { NextFunction, Request, Response, Router } from 'express';
import { medicineController } from './medicine.controller';
import { auth } from '../../lib/auth';
import { any, email } from 'better-auth/*';

const router = express.Router();
export enum UserRole {
    USER="user",
    ADMIN="admin"
}
declare global{
namespace Express {
    export interface Request {
        user?: {
            id: string;
            email: string;
            role: string;
            // isBanned: boolean;
            phone?: string;
            address?: string;
            emailVerified: boolean;
            name: string;
        }
    }
}
}

const middleware = (...role:UserRole[])=>{
   return  async (req: Request, res: Response, next: NextFunction) => {

      const session= await  auth.api.getSession({
        headers:req.headers as any
      })
      // console.log(session)
      if(!session){
        return res.status(401).json({message:'You are Unauthorized'})
      }

      if (!session.user.emailVerified) {
        return res.status(403).json({ message: 'Please verify your email to access this resource.' });
      }

      req.user = {
        id: session.user.id,
        email:session.user.email,
        name:session.user.name,
        role: session.user.role as string,
        emailVerified: session.user.emailVerified,

      }

      if(role.length && !role.includes(req.user.role as UserRole)){

        return res.status(403).json({message:'You are forbidden ekhane to access this resource'})

      }
        next();
    }
}
router.post('/',middleware(UserRole.USER),medicineController.createMedicine )
 
export const medicineRouter:Router = router;
