
import { Profile } from "../models/Profile";
import {
  getAllProfiles,
  getProfileById,
  UpdateProfile,
  createProfile,
} from "../daos/SQL/profile-dao";

//do we want to add loggging to this layer?  If so, where?

export async function getAllProfilesService(): Promise<Profile[]> {
  return await getAllProfiles();
} 

export async function getProfileByIdService(auth0Id: string): Promise<Profile> {
  return await getProfileById(auth0Id);
}
export async function UpdateProfileService(profile: Profile): Promise<Profile> {
  return await UpdateProfile(profile);
}

export async function CreateProfileService(profile: Profile): Promise<Profile> {
  return await createProfile(profile);
}
