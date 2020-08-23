
import { Profile } from "../models/Profile";
import {
  getAllProfiles,
  getProfileById,
  UpdateProfile,
  createProfile,
  getAllProfilesBySkill,
  getAllProfilesByYear,
  getAllProfilesByQuarter,
  getAllProfilesByTrainer,
} from "../daos/SQL/profile-dao";
//import { getAssociateBySkillName } from "../remote/user-service/user-service-get-assoc-by-skill-name";

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

export async function getProfileBySkillNameService(skill: string): Promise<Profile[]> {
 return await getAllProfilesBySkill(skill); 
}

export async function getProfileByYearService(year: number): Promise<Profile[]> {
  return await getAllProfilesByYear(year); 
}

 export async function getProfileByQuarterService(quarter: number): Promise<Profile[]> {
  return await getAllProfilesByQuarter(quarter); 
}

//getProfileByQuarterService
export async function getProfileByTrainerService(trainer: string): Promise<Profile[]> {
  return await getAllProfilesByTrainer(trainer); 
}

