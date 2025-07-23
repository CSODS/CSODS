import { Request, Response } from "express";

interface RegisterBody {
    Email: string,
    Username: string,
    Password: string,
    StudentName?: string,
    StudentNumber?: string,
    UserIconUrl?: string
}

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
export async function handleNewUser(req: Request<{}, {}, RegisterBody>, res: Response) {
    //  data retrieval from request body.
    //  usericon url is not required for now but will be implemented later.
    const { Email, Username, Password, }: RegisterBody = req.body;

    const fields = {
        Email: req.body.Email,
        Username: req.body.Username,
        Password: req.body.Password,
        StudentName: req.body.StudentName ?? '',
        StudentNumber: req.body.StudentNumber ?? '',
        UserIconUrl: req.body.UserIconUrl ?? ''
    }

    console.log(JSON.stringify(fields));

    //  validation
    try {
        console.log('validating user');
        req.userDataService.validateUser(fields);
    }
    catch (err) {
        console.error(err);
        res.status(404).json({ 'message': (<Error>err).message});
        return; 
    }

    //  run a check through db to see if the new user's username, studentName, or email already exists.
    const isExistingUser = await req.userDataService.isUserExists(fields);  
    //  duplicate conflict.
    if (isExistingUser) {
        res.sendStatus(409).json({ 'message': 'user already exists'});
        return;
    } 
    
    try {
        console.log('inserting');
        await req.userDataService.insertUser(fields);

        res.status(201).json({ 'success': 'New user created.'});
    }   
    catch (err) {
        res.status(500).json({ 'message': 'server error'});
    }


}