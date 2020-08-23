import { userServiceBaseClient } from ".";


export const userServiceGetBatchByAssociate = async (email:string) => {
    try{
        let res = await userServiceBaseClient.get(`/associates/batch/${email}`, {
            // headers:{
            //     'Authorization': token
        })
        return res.data
    }catch(e){
        console.log(e);
        throw e
    }
}
