import { PoolClient, QueryResult } from "pg";
import { Profile } from "../../models/Profile";
import { connectionPool } from ".";
import { profileDTOtoProfileConverter } from "../../utils/profile-dto-to-profile-converter"
import { ProfileNotFoundError } from "../../errors/profile-not-found-error";

const schema = process.env['P3_SCHEMA'] || 'project_3_profile_service'

//get all profiles 
export async function getAllProfiles(): Promise<Profile[]>{
    //first, decleare a client
    let client:PoolClient
    try {
        //get connection
        client = await connectionPool.connect()
        //send query
        let results: QueryResult = await client.query(`select * from ${schema}.profiles p;`)
        //return results
        return results.rows.map(profileDTOtoProfileConverter)
    } catch(e) {
        //if we get an error we don't know
        console.log(e);
        throw new Error ("This error can't be handled")
    } finally {
        //let the connection go back to the pool
        client && client.release()
    }
}

//find profiles by id
export async function getProfileById(auth0Id: string): Promise<Profile> {
    let client: PoolClient 
    try{ 
        client = await connectionPool.connect()
        let results: QueryResult = await client.query(`select * from ${schema}.profiles p 
                                                    where p.auth0_user_id = $1;`, [auth0Id])
        if (results.rowCount === 0){
            throw new Error('NotFound')
        } else {
            return profileDTOtoProfileConverter(results.rows[0])
        }
    } catch(e) {
        if (e.message === "NotFound"){
            throw new ProfileNotFoundError
        }
        console.log(e);
        throw new Error ("This error can't be handled")
    } finally { 
        client && client.release()
    }
}