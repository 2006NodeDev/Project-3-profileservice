import { ProfileDTO } from "../dtos/profile-dto";
import { Profile } from "../models/Profile";
import { userServiceGetUserByEmail } from "../remote/user-service/user-service-get-assoc-by-email";
import { Associate } from "../models/Associate";

export async function profileDTOtoProfileConverter(dto:ProfileDTO):Promise<Profile>{
    let assoc:Associate = await userServiceGetUserByEmail(dto.email)


    return {
        auth0Id: dto.auth0_user_id,
        firstName: assoc.firstName,
        lastName:assoc.lastName,
        email: dto.email,
        batchId: dto.batch_id,
        nickname: dto.nickname,
        pronouns: dto.pronouns,
        hobbies: dto.hobbies,
        favFoods: dto.fav_foods,
        specialTrait: dto.special_trait,
        degree: dto.degree,
        favLangauge: dto.fav_language,
        relevantSkills: dto.relevant_skills,
        introvert: dto.introvert,
        studyGroup: dto.study_group
    }



}