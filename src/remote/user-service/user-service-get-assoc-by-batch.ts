import { userServiceBaseClient } from ".";
import {Associate} from '../../models/Associate'
// import { profileDTOtoProfileConverter } from "../../utils/profile-dto-to-profile-converter";
// import { associatetoProfileDTOConverter } from "../../utils/profile-dto-to-profile-skill-converter";

export const userserviceGetAssociateByBatch = async (userBatch:string):Promise<Associate[]> => {
    try{
        let res = await userServiceBaseClient.get(`/associates/batch/${userBatch}`
        , {
            // headers:{
            //     'Authorization': token
            // }
        })
        return res.data
        // return Promise.all(res.data.rows.map(associatetoProfileDTOConverter))
    }catch(e){
        console.log(e);
        throw (e)
    }
}

