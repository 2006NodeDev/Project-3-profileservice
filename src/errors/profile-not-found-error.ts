import { HttpError } from "./Http-Error";

export class ProfileNotFoundError extends HttpError{
    constructor(){
        super(404, 'User profile not found')
    }
}