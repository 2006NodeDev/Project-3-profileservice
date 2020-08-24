import { userServiceBaseClient } from ".";
import {Associate} from '../../models/Associate'

export const userserviceGetAssociateByQuarter = async (quarter:number):Promise<Associate[]> => {
    try{
        let res = await userServiceBaseClient.get(`/associates/quarter/${quarter}`, {
            // headers:{
            //     'Authorization': token
            // }
        })
        return res.data
    }catch(e){
        console.log(e);
        throw (e)
    }
}
