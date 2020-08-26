"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
var profile_service_1 = require("../services/profile-service");
var express_1 = __importDefault(require("express"));
var user_service_get_assoc_by_email_1 = require("../remote/user-service/user-service-get-assoc-by-email");
var loggers_1 = require("../utils/loggers");
//import { associatetoProfileDTOConverter } from "../utils/profile-dto-to-profile-skill-converter";
//import { userServiceGetUserByEmail } from "../remote/user-service/user-service-get-assoc-by-email";
exports.profileRouter = express_1.default.Router();
//no middleware set up yet
//get all profiles
exports.profileRouter.get("/", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allProfiles, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, profile_service_1.getAllProfilesService()];
            case 1:
                allProfiles = _a.sent();
                res.json(allProfiles);
                loggers_1.logger.debug(allProfiles);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                loggers_1.errorLogger.error(e_1);
                loggers_1.logger.error(e_1);
                next(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//get profiles based on auth0Id
exports.profileRouter.get("/:auth0Id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var auth0Id, profile, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                auth0Id = req.params.auth0Id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, profile_service_1.getProfileByIdService(auth0Id)];
            case 2:
                profile = _a.sent();
                res.json(profile);
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                loggers_1.errorLogger.error(e_2);
                loggers_1.logger.error(e_2);
                next(e_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//get all the profiles of the associates in your batch
exports.profileRouter.get("/batch/:auth0Id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var auth0Id, profile, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                auth0Id = req.params.auth0Id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, profile_service_1.getBatchAssociatesById(auth0Id)];
            case 2:
                profile = _a.sent();
                res.json(profile);
                loggers_1.logger.debug(profile);
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                loggers_1.errorLogger.error(e_3);
                next(e_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//update profile
//authorizationMiddleware has not been created and may not be necessary
exports.profileRouter.patch('/:auth0Id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var auth0Id, user_profile, batchId, _a, firstName, lastName, email, nickname, pronouns, hobbies, favFoods, specialTrait, degree, favLanguage, relevantSkills, introvert, studyGroup, updatedProfile, results, e_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                auth0Id = req.params.auth0Id;
                return [4 /*yield*/, profile_service_1.getProfileByIdService(auth0Id)];
            case 1:
                user_profile = _b.sent();
                loggers_1.logger.debug(user_profile.email);
                return [4 /*yield*/, user_service_get_assoc_by_email_1.userServiceGetUserByEmail(user_profile.email)];
            case 2:
                batchId = _b.sent();
                loggers_1.logger.debug(batchId);
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, nickname = _a.nickname, pronouns = _a.pronouns, hobbies = _a.hobbies, favFoods = _a.favFoods, specialTrait = _a.specialTrait, degree = _a.degree, favLanguage = _a.favLanguage, relevantSkills = _a.relevantSkills, introvert = _a.introvert, studyGroup = _a.studyGroup;
                updatedProfile = {
                    auth0Id: auth0Id,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    batchId: batchId,
                    nickname: nickname,
                    pronouns: pronouns,
                    hobbies: hobbies,
                    favFoods: favFoods,
                    specialTrait: specialTrait,
                    degree: degree,
                    favLanguage: favLanguage,
                    relevantSkills: relevantSkills,
                    introvert: introvert,
                    studyGroup: studyGroup,
                };
                //update with new info or remain the same
                updatedProfile.nickname = nickname || undefined;
                updatedProfile.pronouns = pronouns || undefined;
                updatedProfile.hobbies = hobbies || undefined;
                updatedProfile.favFoods = favFoods || undefined;
                updatedProfile.specialTrait = specialTrait || undefined;
                updatedProfile.degree = degree || undefined;
                updatedProfile.favLanguage = favLanguage || undefined;
                updatedProfile.relevantSkills = relevantSkills || undefined;
                updatedProfile.introvert = introvert || undefined;
                updatedProfile.studyGroup = studyGroup || undefined;
                loggers_1.logger.debug(updatedProfile);
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, profile_service_1.UpdateProfileService(updatedProfile)];
            case 4:
                results = _b.sent();
                console.log("we have updated profile now to insert in db");
                res.json(results);
                return [3 /*break*/, 6];
            case 5:
                e_4 = _b.sent();
                loggers_1.errorLogger.error(e_4);
                loggers_1.logger.error(e_4);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.profileRouter.post('/createprofile', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, auth0Id, firstName, lastName, email, batchId, nickname, pronouns, hobbies, favFoods, specialTrait, degree, favLanguage, relevantSkills, introvert, studyGroup, createProfile, results, e_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log(req.body); //lets look at what the request body looks like
                _a = req.body, auth0Id = _a.auth0Id, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, batchId = _a.batchId, nickname = _a.nickname, pronouns = _a.pronouns, hobbies = _a.hobbies, favFoods = _a.favFoods, specialTrait = _a.specialTrait, degree = _a.degree, favLanguage = _a.favLanguage, relevantSkills = _a.relevantSkills, introvert = _a.introvert, studyGroup = _a.studyGroup;
                createProfile = {
                    auth0Id: auth0Id,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    batchId: batchId,
                    nickname: nickname,
                    pronouns: pronouns,
                    hobbies: hobbies,
                    favFoods: favFoods,
                    specialTrait: specialTrait,
                    degree: degree,
                    favLanguage: favLanguage,
                    relevantSkills: relevantSkills,
                    introvert: introvert,
                    studyGroup: studyGroup,
                };
                createProfile.nickname = nickname;
                createProfile.hobbies = hobbies;
                createProfile.favFoods = favFoods;
                createProfile.specialTrait = specialTrait;
                createProfile.degree = degree;
                createProfile.favLanguage = favLanguage;
                createProfile.relevantSkills = relevantSkills;
                createProfile.introvert = introvert;
                createProfile.studyGroup = studyGroup;
                console.log(createProfile);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, profile_service_1.CreateProfileService(createProfile)];
            case 2:
                results = _b.sent();
                res.json(results);
                return [3 /*break*/, 4];
            case 3:
                e_5 = _b.sent();
                next(e_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.profileRouter.get("/email/:email", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, associate, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.params.email;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_service_get_assoc_by_email_1.userServiceGetUserByEmail(email)];
            case 2:
                associate = _a.sent();
                res.json(associate);
                return [3 /*break*/, 4];
            case 3:
                e_6 = _a.sent();
                next(e_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/*
 for (var i in batchList){
        getAssocInBatch = getAssocInBatch.concat(await getAssociatesByBatchId(batchList[i].batchId))
    }
*/
exports.profileRouter.get('/skill/:skillname', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var skill, associate, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                skill = req.params.skillname;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, profile_service_1.getProfileBySkillNameService(skill)];
            case 2:
                associate = _a.sent();
                res.json(associate);
                return [3 /*break*/, 4];
            case 3:
                e_7 = _a.sent();
                next(e_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.profileRouter.get('/year/:year', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var year, associate, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                year = req.params.year;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, profile_service_1.getProfileByYearService(year)];
            case 2:
                associate = _a.sent();
                res.json(associate);
                return [3 /*break*/, 4];
            case 3:
                e_8 = _a.sent();
                next(e_8);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.profileRouter.get('/quarter/:quarter', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var quarter, associate, e_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                quarter = req.params.quarter;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, profile_service_1.getProfileByQuarterService(quarter)];
            case 2:
                associate = _a.sent();
                res.json(associate);
                return [3 /*break*/, 4];
            case 3:
                e_9 = _a.sent();
                next(e_9);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.profileRouter.get('/trainer/:trainer', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var trainer, associate, e_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                trainer = req.params.trainer;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, profile_service_1.getProfileByTrainerService(trainer)];
            case 2:
                associate = _a.sent();
                res.json(associate);
                return [3 /*break*/, 4];
            case 3:
                e_10 = _a.sent();
                next(e_10);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.profileRouter.get('/trainer/current/:trainer', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var trainer, associate, e_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                trainer = req.params.trainer;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, profile_service_1.getCurrentBatchassociatesForTrainerService(trainer)];
            case 2:
                associate = _a.sent();
                res.json(associate);
                return [3 /*break*/, 4];
            case 3:
                e_11 = _a.sent();
                next(e_11);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=profile-router.js.map