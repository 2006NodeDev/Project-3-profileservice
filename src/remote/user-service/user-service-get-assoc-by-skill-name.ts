

import { userServiceBaseClient } from ".";
import {Associate} from '../../models/Associate'
// import { profileDTOtoProfileConverter } from "../../utils/profile-dto-to-profile-converter";
// import { associatetoProfileDTOConverter } from "../../utils/profile-dto-to-profile-skill-converter";

export const userserviceGetAssociateBySkillName = async (skill:string) => {
    try{
        let res = await userServiceBaseClient.get(`/associates/skill/${skill}`, {
            // headers:{
            //     'Authorization': token
            // }
        })
        console.log(res.data)
        return res.data
        // return Promise.all(res.data.rows.map(associatetoProfileDTOConverter))
    }catch(e){
        console.log(e);
        let defaultUser = new Associate()
        //defaultUser.email = email
        return defaultUser
    }
}
