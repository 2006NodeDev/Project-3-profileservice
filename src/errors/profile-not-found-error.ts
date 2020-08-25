import { HttpError } from "./http-error";

export class ProfileNotFoundError extends HttpError{
    constructor(){
        super(404, 'User profile not found')
    }
}