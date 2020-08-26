import { userServiceBaseClient } from ".";
import { logger, errorLogger } from "../../utils/loggers";


export const userServiceGetBatchByAssociate = async (email:string) => {
    try{
        let res = await userServiceBaseClient.get(`/associates/batch/${email}`, {
            // headers:{
            //     'Authorization': token
        })
        return res.data
    }catch(e){
        errorLogger.error(e);
        logger.error(e)
        //console.log(e);
        throw e
    }
}
