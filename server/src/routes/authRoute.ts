import { Router, Request, Response } from "express";
import bcrypt from 'bcrypt';
import { CONSTANTS } from "@data";
import { RouteLogger } from "@utils";

const AUTH_ROUTES = CONSTANTS.AUTH_ROUTES;

const authRouter = Router();

authRouter.get(AUTH_ROUTES.SIGN_IN, async (req, res) => {
    RouteLogger.info(`[${[AUTH_ROUTES.SIGN_IN]}] Processing request...`);
    const profiler = RouteLogger.startTimer();

    //  controller logic here

    profiler.done({ message: `[${AUTH_ROUTES.SIGN_IN}] Request processed.`} );
});

authRouter.get(AUTH_ROUTES.REGISTER, async (req, res) => {
    RouteLogger.info(`[${AUTH_ROUTES.REGISTER}] Processing request...`);
    const profiler = RouteLogger.startTimer();

    //  controller logic here

    profiler.done({ message: `[${AUTH_ROUTES.REGISTER}] Request processed.` });
})

export default authRouter;

/**
 * @public
 * @async
 * @function handlerNewUser
 * @description Handles validating of new user from POST request and storing to the database if
 * all validation checks are passed.
 * Executes the following actions:
 * - Retrieves the username, student name, email, password from {@link req.body}.
 * - Performs validation checks on the received data.
 * - Hashes the password.
 * - Stores to database.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
const handlerNewUser = async (req: Request, res: Response) => {
    //  data retrieval from request body.
    //  usericon url is not required for now but will be implemented later.
    const { username, studentName, email, password, userIconUrl = '' } = req.body;

    //  validation
    if (!username || !studentName || !email || !password) {
        return res.status(404).json({ 'message': 'Username, Student name, Email, and Password are required.'});
    }
    
    //  run a check through db to see if the new user's username, studentName, or email already exists.
    const isExistingUser = false;  
    //  duplicate conflict.
    if (isExistingUser) return res.sendStatus(409).json({ 'message': 'user already exists'}); 
    
    try {
        //  encrypt password
        const hashedPassword = await bcrypt.hash(password, 10); //  10 salt rounds for protection.
        const newUser = {};
        //  set new user to database.
        
        res.status(201).json({ 'success': 'New user created.'});
    } 
    catch (err) {
        res.status(500).json({ 'message': 'server error'});
    }
}

/**
 * @public
 * @async
 * @function handleLogin
 * @description Controller for handling login.
 * - Receives username, email, and password from the request body.
 * - Validates if the username and/or email fields exist. 
 * - If they don't, respond with status 404. If they exist, check if the username and/or email exists in the database. 
 * - If they don't, respond with status 401. If they exist in the database, validate the password with bcrypt.
 * - If the password doesn't match, responsd with status 401. If they match, return a success message.
 * @param req 
 * @param res 
 */
const handleLogin = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(404).json({ 'message': 'username, password, and email are required.'});
    
    //  find the user in the database.
    const foundUser = { user: 'someuser', password: 'someHash'};

    if (!foundUser) return res.sendStatus(401); // unauthorized

    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
        //  create JWT token
        return res.json({ 'success': 'User is authenticated.'});
    }
    else return res.sendStatus(401);    // unauthorized.
}