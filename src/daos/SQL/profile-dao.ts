import { PoolClient, QueryResult } from "pg";
import { Profile } from "../../models/Profile";
import { connectionPool } from ".";


import { profileDTOtoProfileConverter } from "../../utils/profile-dto-to-profile-converter"
import { ProfileNotFoundError } from "../../errors/profile-not-found-error";
//import { logger, errorLogger } from "../../utils/logger";

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

//import { logger, errorLogger } from "../../utils/logger";


//create profile
export async function createProfile(newProfile: Profile): Promise<Profile> {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();

    let results = await client.query(
      `insert into project_3_profile_service.profiles("auth0_user_id", "caliber_user_id", "batch_id", "nickname", "pronouns", "hobbies", "fav_foods", "special_trait", "degree", "fav_languages", "relevant_skills", "introvert", "study_group")
                              values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
                              returning *`,
      [
        newProfile.auth0Id,
        newProfile.caliberId,
        newProfile.batchId,
        newProfile.nickname,
        newProfile.pronouns,
        newProfile.hobbies,
        newProfile.favFoods,
        newProfile.specialTrait,
        newProfile.degree,
        newProfile.favLangauge,
        newProfile.relevantSkills,
        newProfile.introvert,
        newProfile.studyGroup,
      ]
    );

    return createProfile(results.rows[0]);
  } catch (error) {
    console.log(error);
  } finally {
    client?.release();
  }
}

export async function UpdateProfile(updatedProfile: Profile): Promise<Profile> {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    await client.query("BEGIN;"); //begins the transaction
    //left off the userId aspect of it for now, not sure how that is going to work
    if (updatedProfile.nickname) {
      await client.query(`update ${schema}.profile set nickname = $1`, [
        updatedProfile.nickname,
      ]);
    }
    if (updatedProfile.pronouns) {
      await client.query(`update ${schema}.profile set pronouns = $1`, [
        updatedProfile.pronouns,
      ]);
    }
    if (updatedProfile.hobbies) {
      await client.query(`update ${schema}.profile set hobbies = $1`, [
        updatedProfile.hobbies,
      ]);
    }
    if (updatedProfile.favFoods) {
      await client.query(`update ${schema}.profile set favFoods = $1`, [
        updatedProfile.favFoods,
      ]);
    }
    if (updatedProfile.specialTrait) {
      await client.query(`update ${schema}.profile set specialTrait = $1`, [
        updatedProfile.specialTrait,
      ]);
    }
    if (updatedProfile.degree) {
      await client.query(`update ${schema}.profile set degree = $1`, [
        updatedProfile.degree,
      ]);
    }
    if (updatedProfile.favLangauge) {
      await client.query(`update ${schema}.profile set favLangauge = $1`, [
        updatedProfile.favLangauge,
      ]);
    }
    if (updatedProfile.relevantSkills) {
      await client.query(`update ${schema}.profile set relevantSkills = $1`, [
        updatedProfile.relevantSkills,
      ]);
    }
    if (updatedProfile.introvert) {
      await client.query(`update ${schema}.profile set introvert = $1`, [
        updatedProfile.introvert,
      ]);
    }
    if (updatedProfile.studyGroup) {
      await client.query(`update ${schema}.profile set studyGroup = $1`, [
        updatedProfile.studyGroup,
      ]);
    }
    await client.query("COMMIT;"); //ends the transaction
    //below is just a placeholder, will edit when get profile is done
    return getProfileById(updatedProfile.auth0Id);
  } catch (error) {
    client && client.query("ROLLBACK;"); //does not save if doesn't work
    //placeholder until similar error is figured out
    if (error.message === "Role not found") {
      throw new Error("Role not found");
    }
    //logger.error(error);
    //errorLogger.error(error)
    throw new Error("Unhandled Error");
  } finally {
    client && client.release();
  }
}
