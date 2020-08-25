import { userServiceBaseClient } from ".";
import {Associate} from '../../models/Associate'
import { errorLogger, logger } from "../../utils/loggers";

export const userserviceGetAssociateByTrainer = async (trainer:string):Promise<Associate[]> => {
    try{
        let res = await userServiceBaseClient.get(`/associates/trainer/${trainer}`, {
            
        })
        return res.data
    }catch(e){
        errorLogger.error(e);
        logger.error(e)
        //console.log(e);
        throw (e)
    }
}
