import { userServiceBaseClient } from ".";
import {Associate} from '../../models/Associate'

export const userserviceGetAssociateByYear = async (year:number):Promise<Associate[]> => {
    try{
        let res = await userServiceBaseClient.get(`/associates/year/${year}`, {
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
