import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

//  TODO: add handling for anonymous users (signed in as guest).
export function verifyJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    
    if(!authHeader) return res.status(401);    //  unauthorized.
    
    console.log(authHeader);    //  bearer token

    const token = authHeader.split(' ')[1]; //  token is at index 1

    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);    //  CAST to payload interface if available for stronger typing.
        
        // TODO: add better typing for payload and req. or better yet modify the Req interface to add the necessary fields
        (<any>req).user = (<any>payload).username;

        next();
    }
    catch (err) {
        return res.sendStatus(403); //  forbidden/invalid token
    }
}