import { userServiceBaseClient } from ".";
import {Associate} from '../../models/Associate'

export const userserviceGetCurrentAssociatesForTrainer = async (trainer:string):Promise<Associate[]> => {
    try{
        let res = await userServiceBaseClient.get(`/associates/batch/current/${trainer}`, {
            
        })
        return res.data
    }catch(e){
        console.log(e);
        throw (e)
    }
}
