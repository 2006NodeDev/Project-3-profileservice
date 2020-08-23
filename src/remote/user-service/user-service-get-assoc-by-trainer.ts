import { userServiceBaseClient } from ".";
import {Associate} from '../../models/Associate'

export const userserviceGetAssociateByTrainer = async (trainer:string):Promise<Associate[]> => {
    try{
        let res = await userServiceBaseClient.get(`/associates/trainer/${trainer}`, {
            
        })
        return res.data
    }catch(e){
        console.log(e);
        throw (e)
    }
}
