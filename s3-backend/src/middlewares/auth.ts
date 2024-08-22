import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET as string;

interface CustomRequest extends Request {
  headers: {
    authorization?: string;
  } & Request['headers'],
  userId?: JwtPayload;
}

const verifyJwt = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    if(!req.headers.authorization) throw new Error("Please login");
  
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }
  
    const decode = jwt.verify(token, secretKey) as JwtPayload;
    req.userId = decode ;
    console.log(decode.id);
    next();
  } catch (e) {
    console.error(e);
  }
 
};

export default verifyJwt;
