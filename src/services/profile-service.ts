import { Profile } from "../models/Profile"
import { getAllProfiles, getProfileById } from "../daos/SQL/profile-dao"


export async function getAllProfilesService(): Promise<Profile[]> {
    return await getAllProfiles()
} //not currently actually using this, just an example

export async function getProfileByIdService(auth0Id: string): Promise<Profile> {
    return await getProfileById(auth0Id)
}