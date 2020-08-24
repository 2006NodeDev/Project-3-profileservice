import { userServiceBaseClient } from ".";
import {Associate} from '../../models/Associate'
import { errorLogger, logger } from "../../utils/loggers";


export const userServiceGetUserByEmail = async (email:string) => {
    try{
        let res = await userServiceBaseClient.get(`/associates/${email}`, {
            // headers:{
            //     'Authorization': token
            // }
        })
        return res.data
    }catch(e){
        errorLogger.error(e);
        logger.error(e)
        //console.log(e);
        let defaultUser = new Associate()
        defaultUser.email = email
        return defaultUser
    }
}

