import { userServiceBaseClient } from ".";
import {Associate} from '../../models/Associate'


export const userServiceGetUserByEmail = async (email:string) => {
    try{
        let res = await userServiceBaseClient.get(`/associates/${email}`, {
            // headers:{
            //     'Authorization': token
            // }
        })
        return res.data
    }catch(e){
        console.log(e);
        let defaultUser = new Associate()
        defaultUser.email = email
        return defaultUser
    }
}

