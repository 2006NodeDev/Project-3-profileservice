import { userServiceBaseClient } from ".";
import {Associate} from '../../models/Associate'
import { errorLogger, logger } from "../../utils/loggers";

export const userserviceGetAssociateByQuarter = async (quarter:number):Promise<Associate[]> => {
    try{
        let res = await userServiceBaseClient.get(`/associates/quarter/${quarter}`, {
            // headers:{
            //     'Authorization': token
            // }
        })
        return res.data
    }catch(e){
        errorLogger.error(e);
        logger.error(e)
        //console.log(e);
        throw (e)
    }
}
