import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";

export enum UserRole {
     CUSTOMER="Customer",
    ADMIN="Admin",
    SELLER="Seller"
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
          console.log(req.user.role )
        return res.status(403).json({message:'You are forbidden ekhane to access this resource'})

      }
        next();
    }
}

export default middleware