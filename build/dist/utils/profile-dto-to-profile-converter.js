"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileDTOtoProfileConverter = void 0;
function profileDTOtoProfileConverter(dto) {
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
    };
}
exports.profileDTOtoProfileConverter = profileDTOtoProfileConverter;
//# sourceMappingURL=profile-dto-to-profile-converter.js.map