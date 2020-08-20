import { ProfileDTO } from "../dtos/profile-dto";
import { Profile } from "../models/Profile";

export function profileDTOtoProfileConverter(dto:ProfileDTO):Profile{

    return {
        auth0Id: dto.auth0_user_id,
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