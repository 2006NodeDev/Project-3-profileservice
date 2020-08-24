

import { userServiceBaseClient } from ".";
import {Associate} from '../../models/Associate'
import { errorLogger, logger } from "../../utils/loggers";
// import { profileDTOtoProfileConverter } from "../../utils/profile-dto-to-profile-converter";
// import { associatetoProfileDTOConverter } from "../../utils/profile-dto-to-profile-skill-converter";

export const userserviceGetAssociateBySkillName = async (skillName:string):Promise<Associate[]> => {
    try{
        let res = await userServiceBaseClient.get(`/associates/skill/${skillName}`, {
            // headers:{
            //     'Authorization': token
            // }
        })
        return res.data
        // return Promise.all(res.data.rows.map(associatetoProfileDTOConverter))
    }catch(e){
        errorLogger.error(e);
        logger.error(e)
        //console.log(e);
        throw (e)
    }
}
