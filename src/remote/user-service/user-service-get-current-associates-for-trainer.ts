import { userServiceBaseClient } from ".";
import {Associate} from '../../models/Associate'
import { errorLogger, logger } from "../../utils/loggers";

export const userserviceGetCurrentAssociatesForTrainer = async (trainer:string):Promise<Associate[]> => {
    try{
        let res = await userServiceBaseClient.get(`/associates/batch/current/${trainer}`, {
            
        })
        return res.data
    }catch(e){
        errorLogger.error(e);
        logger.error(e)
        //console.log(e);
        throw (e)
    }
}
