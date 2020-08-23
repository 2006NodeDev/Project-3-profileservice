
import { Profile } from "../models/Profile";
//import { userServiceGetUserByEmail } from "../remote/user-service/user-service-get-assoc-by-email";
import { Associate } from "../models/Associate";
import { getProfileByEmail } from "../daos/SQL/profile-dao";

export async function associatetoProfileDTOConverter(dto:Associate):Promise<Profile>{
    let profile = await getProfileByEmail(dto.email)

    return {
        auth0Id: profile.auth0_user_id,
        firstName: dto.firstName,
        lastName:dto.lastName,
        email: profile.email,
        batchId: profile.batch_id,
        nickname: profile.nickname,
        pronouns: profile.pronouns,
        hobbies: profile.hobbies,
        favFoods: profile.fav_foods,
        specialTrait: profile.special_trait,
        degree: profile.degree,
        favLangauge: profile.fav_language,
        relevantSkills: profile.relevant_skills,
        introvert: profile.introvert,
        studyGroup: profile.study_group
    }
}