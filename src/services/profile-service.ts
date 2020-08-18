import { Profile } from "../models/Profile";
import { UpdateProfile } from "../daos/SQL/profile-dao";


export async function UpdateProfileService(profile:Profile):Promise<Profile>{
    return await UpdateProfile(profile)
}