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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBatchProfilesById = exports.getProfileByEmail = exports.getAllCurrentProfilesByTrainer = exports.getAllProfilesByTrainer = exports.getAllProfilesByQuarter = exports.getAllProfilesByYear = exports.getAllProfilesBySkill = exports.UpdateProfile = exports.createProfile = exports.getProfileById = exports.getAllProfiles = void 0;
var _1 = require(".");
var profile_dto_to_profile_converter_1 = require("../../utils/profile-dto-to-profile-converter");
var profile_not_found_error_1 = require("../../errors/profile-not-found-error");
var user_service_get_assoc_by_skill_name_1 = require("../../remote/user-service/user-service-get-assoc-by-skill-name");
var user_service_get_assoc_by_year_1 = require("../../remote/user-service/user-service-get-assoc-by-year");
var user_service_get_assoc_by_quarter_1 = require("../../remote/user-service/user-service-get-assoc-by-quarter");
var user_service_get_assoc_by_trainer_1 = require("../../remote/user-service/user-service-get-assoc-by-trainer");
var user_service_get_assoc_by_batchID_1 = require("../../remote/user-service/user-service-get-assoc-by-batchID");
var user_service_get_current_associates_for_trainer_1 = require("../../remote/user-service/user-service-get-current-associates-for-trainer");
var loggers_1 = require("../../utils/loggers");
var schema = process.env['P3_SCHEMA'] || 'project_3_profile_service';
//get all profiles
function getAllProfiles() {
    return __awaiter(this, void 0, void 0, function () {
        var client, results, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    //get connection
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select * from " + schema + ".profiles p;")];
                case 2:
                    results = _a.sent();
                    //return results
                    return [2 /*return*/, Promise.all(results.rows.map(profile_dto_to_profile_converter_1.profileDTOtoProfileConverter))];
                case 3:
                    e_1 = _a.sent();
                    //if we get an error we don't know
                    loggers_1.logger.error(e_1);
                    loggers_1.errorLogger.error(e_1);
                    throw new Error("This error can't be handled");
                case 4:
                    //let the connection go back to the pool
                    client && client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getAllProfiles = getAllProfiles;
//find profiles by id
function getProfileById(auth0Id) {
    return __awaiter(this, void 0, void 0, function () {
        var client, results, res, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, 7, 8]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select * from " + schema + ".profiles p \n                                                    where p.auth0_user_id = $1;", [auth0Id])];
                case 2:
                    results = _a.sent();
                    if (!(results.rowCount === 0)) return [3 /*break*/, 3];
                    throw new Error('NotFound');
                case 3: return [4 /*yield*/, profile_dto_to_profile_converter_1.profileDTOtoProfileConverter(results.rows[0])];
                case 4:
                    res = _a.sent();
                    loggers_1.logger.debug("dto result: " + res);
                    //console.log("dto result: " + res)
                    return [2 /*return*/, res];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_2 = _a.sent();
                    if (e_2.message === "NotFound") {
                        throw new profile_not_found_error_1.ProfileNotFoundError;
                    }
                    loggers_1.logger.error(e_2);
                    loggers_1.errorLogger.error(e_2);
                    throw new Error("This error can't be handled");
                case 7:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.getProfileById = getProfileById;
//create profile
function createProfile(newProfile) {
    return __awaiter(this, void 0, void 0, function () {
        var client, results, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, 6, 7]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("BEGIN;")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, client.query("insert into " + schema + ".profiles(\"auth0_user_id\", \"email\",  \"nickname\", \"pronouns\", \"hobbies\", \"fav_foods\", \"special_trait\", \"degree\", \"fav_language\", \"relevant_skills\", \"introvert\", \"study_group\")\n                              values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)\n                              returning *", [
                            newProfile.auth0Id,
                            newProfile.email,
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
                        ])];
                case 3:
                    results = _a.sent();
                    return [4 /*yield*/, client.query("COMMIT;")];
                case 4:
                    _a.sent();
                    if (results.rowCount === 0) {
                        throw new Error('Not Submitted');
                    }
                    else {
                        return [2 /*return*/, newProfile];
                    }
                    return [3 /*break*/, 7];
                case 5:
                    error_1 = _a.sent();
                    client && client.query("ROLLBACK;");
                    loggers_1.errorLogger.error(error_1);
                    loggers_1.logger.error(error_1);
                    //console.log(error);
                    throw new profile_not_found_error_1.ProfileNotFoundError();
                case 6:
                    client === null || client === void 0 ? void 0 : client.release();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.createProfile = createProfile;
function UpdateProfile(updatedProfile) {
    return __awaiter(this, void 0, void 0, function () {
        var client, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 26, 27, 28]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("BEGIN;")];
                case 2:
                    _a.sent(); //begins the transaction
                    if (!updatedProfile.email) return [3 /*break*/, 4];
                    return [4 /*yield*/, client.query("update " + schema + ".profiles set \"email\" = $1 where \"auth0_user_id\" = $2;", [updatedProfile.email, updatedProfile.auth0Id])];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    if (!updatedProfile.nickname) return [3 /*break*/, 6];
                    return [4 /*yield*/, client.query("update " + schema + ".profiles set \"nickname\" = $1 where \"auth0_user_id\" = $2;", [updatedProfile.nickname, updatedProfile.auth0Id])];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    if (!updatedProfile.pronouns) return [3 /*break*/, 8];
                    return [4 /*yield*/, client.query("update " + schema + ".profiles set \"pronouns\" = $1 where \"auth0_user_id\" = $2;", [updatedProfile.pronouns, updatedProfile.auth0Id])];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    if (!updatedProfile.hobbies) return [3 /*break*/, 10];
                    return [4 /*yield*/, client.query("update " + schema + ".profiles set \"hobbies\" = $1 where \"auth0_user_id\" = $2;", [updatedProfile.hobbies, updatedProfile.auth0Id])];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10:
                    if (!updatedProfile.favFoods) return [3 /*break*/, 12];
                    return [4 /*yield*/, client.query("update " + schema + ".profiles set \"fav_foods\" = $1 where \"auth0_user_id\" = $2;", [updatedProfile.favFoods, updatedProfile.auth0Id])];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12:
                    if (!updatedProfile.specialTrait) return [3 /*break*/, 14];
                    return [4 /*yield*/, client.query("update " + schema + ".profiles set \"special_trait\" = $1 where \"auth0_user_id\" = $2;", [updatedProfile.specialTrait, updatedProfile.auth0Id])];
                case 13:
                    _a.sent();
                    _a.label = 14;
                case 14:
                    if (!updatedProfile.degree) return [3 /*break*/, 16];
                    return [4 /*yield*/, client.query("update " + schema + ".profiles set \"degree\" = $1 where \"auth0_user_id\" = $2;", [updatedProfile.degree, updatedProfile.auth0Id])];
                case 15:
                    _a.sent();
                    _a.label = 16;
                case 16:
                    if (!updatedProfile.favLangauge) return [3 /*break*/, 18];
                    return [4 /*yield*/, client.query("update " + schema + ".profiles set \"fav_language\" = $1 where \"auth0_user_id\" = $2;", [updatedProfile.favLangauge, updatedProfile.auth0Id])];
                case 17:
                    _a.sent();
                    _a.label = 18;
                case 18:
                    if (!updatedProfile.relevantSkills) return [3 /*break*/, 20];
                    return [4 /*yield*/, client.query("update " + schema + ".profiles set \"relevant_skills\" = $1 where \"auth0_user_id\" = $2;", [updatedProfile.relevantSkills, updatedProfile.auth0Id])];
                case 19:
                    _a.sent();
                    _a.label = 20;
                case 20:
                    if (!updatedProfile.introvert) return [3 /*break*/, 22];
                    return [4 /*yield*/, client.query("update " + schema + ".profiles set \"introvert\" = $1 where \"auth0_user_id\" = $2;", [updatedProfile.introvert, updatedProfile.auth0Id])];
                case 21:
                    _a.sent();
                    _a.label = 22;
                case 22:
                    if (!updatedProfile.studyGroup) return [3 /*break*/, 24];
                    return [4 /*yield*/, client.query("update " + schema + ".profiles set \"study_group\" = $1 where \"auth0_user_id\" = $2;", [updatedProfile.studyGroup, updatedProfile.auth0Id])];
                case 23:
                    _a.sent();
                    _a.label = 24;
                case 24:
                    loggers_1.logger.debug("about to commit");
                    //console.log("about to commit");
                    return [4 /*yield*/, client.query("COMMIT;")];
                case 25:
                    //console.log("about to commit");
                    _a.sent(); //ends the transaction
                    //below is just a placeholder, will edit when get profile is done
                    return [2 /*return*/, getProfileById(updatedProfile.auth0Id)];
                case 26:
                    error_2 = _a.sent();
                    client && client.query("ROLLBACK;"); //does not save if doesn't work
                    //placeholder until similar error is figured out
                    loggers_1.logger.error(error_2);
                    loggers_1.errorLogger.error(error_2);
                    throw new profile_not_found_error_1.ProfileNotFoundError();
                case 27:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 28: return [2 /*return*/];
            }
        });
    });
}
exports.UpdateProfile = UpdateProfile;
//getAssociateBySkillNameService
//getAssociateBySkillName
function getAllProfilesBySkill(skillName) {
    return __awaiter(this, void 0, void 0, function () {
        var client, caliberUsersbySkill, emails, i, filter_res, _a, _b, _i, i, result, e_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 9, 10, 11]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    //get connection
                    client = _c.sent();
                    return [4 /*yield*/, user_service_get_assoc_by_skill_name_1.userserviceGetAssociateBySkillName(skillName)];
                case 2:
                    caliberUsersbySkill = _c.sent();
                    emails = [];
                    for (i in caliberUsersbySkill) {
                        emails.push(caliberUsersbySkill[i].email);
                    }
                    filter_res = [];
                    return [4 /*yield*/, client.query("BEGIN;")];
                case 3:
                    _c.sent();
                    _a = [];
                    for (_b in emails)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 4;
                case 4:
                    if (!(_i < _a.length)) return [3 /*break*/, 7];
                    i = _a[_i];
                    return [4 /*yield*/, client.query("select * from " + schema + ".profiles p where p.email = $1;", [emails[i]])];
                case 5:
                    result = _c.sent();
                    if (result.rows[0]) {
                        filter_res.push(result.rows[0]);
                    }
                    _c.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7: return [4 /*yield*/, client.query("COMMIT;")];
                case 8:
                    _c.sent();
                    //return ProfileDTO-s
                    return [2 /*return*/, Promise.all(filter_res.map(profile_dto_to_profile_converter_1.profileDTOtoProfileConverter))];
                case 9:
                    e_3 = _c.sent();
                    //if we get an error we don't know
                    loggers_1.errorLogger.error(e_3);
                    loggers_1.logger.error(e_3);
                    //console.log(e);
                    throw new Error("This error can't be handled");
                case 10:
                    //let the connection go back to the pool
                    client && client.release();
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.getAllProfilesBySkill = getAllProfilesBySkill;
//getAssociateBySkillName
function getAllProfilesByYear(year) {
    return __awaiter(this, void 0, void 0, function () {
        var client, caliberUsersbyYear, emails, i, filter_res, _a, _b, _i, i, result, e_4;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 9, 10, 11]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    //get connection
                    client = _c.sent();
                    return [4 /*yield*/, user_service_get_assoc_by_year_1.userserviceGetAssociateByYear(year)];
                case 2:
                    caliberUsersbyYear = _c.sent();
                    emails = [];
                    for (i in caliberUsersbyYear) {
                        emails.push(caliberUsersbyYear[i].email);
                    }
                    filter_res = [];
                    return [4 /*yield*/, client.query("BEGIN;")];
                case 3:
                    _c.sent();
                    _a = [];
                    for (_b in emails)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 4;
                case 4:
                    if (!(_i < _a.length)) return [3 /*break*/, 7];
                    i = _a[_i];
                    return [4 /*yield*/, client.query("select * from " + schema + ".profiles p where p.email = $1;", [emails[i]])];
                case 5:
                    result = _c.sent();
                    if (result.rows[0]) {
                        filter_res.push(result.rows[0]);
                    }
                    _c.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7: return [4 /*yield*/, client.query("COMMIT;")];
                case 8:
                    _c.sent();
                    //return ProfileDTO-s
                    return [2 /*return*/, Promise.all(filter_res.map(profile_dto_to_profile_converter_1.profileDTOtoProfileConverter))];
                case 9:
                    e_4 = _c.sent();
                    //if we get an error we don't know
                    loggers_1.errorLogger.error(e_4);
                    loggers_1.logger.error(e_4);
                    //console.log(e);
                    throw new Error("This error can't be handled");
                case 10:
                    //let the connection go back to the pool
                    client && client.release();
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.getAllProfilesByYear = getAllProfilesByYear;
function getAllProfilesByQuarter(quarter) {
    return __awaiter(this, void 0, void 0, function () {
        var client, caliberUsersbyQuarter, emails, i, filter_res, _a, _b, _i, i, result, e_5;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 9, 10, 11]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    //get connection
                    client = _c.sent();
                    return [4 /*yield*/, user_service_get_assoc_by_quarter_1.userserviceGetAssociateByQuarter(quarter)];
                case 2:
                    caliberUsersbyQuarter = _c.sent();
                    emails = [];
                    for (i in caliberUsersbyQuarter) {
                        emails.push(caliberUsersbyQuarter[i].email);
                    }
                    filter_res = [];
                    return [4 /*yield*/, client.query("BEGIN;")];
                case 3:
                    _c.sent();
                    _a = [];
                    for (_b in emails)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 4;
                case 4:
                    if (!(_i < _a.length)) return [3 /*break*/, 7];
                    i = _a[_i];
                    return [4 /*yield*/, client.query("select * from " + schema + ".profiles p where p.email = $1;", [emails[i]])];
                case 5:
                    result = _c.sent();
                    if (result.rows[0]) {
                        filter_res.push(result.rows[0]);
                    }
                    _c.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7: return [4 /*yield*/, client.query("COMMIT;")];
                case 8:
                    _c.sent();
                    //return ProfileDTO-s
                    return [2 /*return*/, Promise.all(filter_res.map(profile_dto_to_profile_converter_1.profileDTOtoProfileConverter))];
                case 9:
                    e_5 = _c.sent();
                    //if we get an error we don't know
                    loggers_1.errorLogger.error(e_5);
                    loggers_1.logger.error(e_5);
                    //console.log(e);
                    throw new Error("This error can't be handled");
                case 10:
                    //let the connection go back to the pool
                    client && client.release();
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.getAllProfilesByQuarter = getAllProfilesByQuarter;
function getAllProfilesByTrainer(trainer) {
    return __awaiter(this, void 0, void 0, function () {
        var client, caliberUsersbyTrainer, emails, i, filter_res, _a, _b, _i, i, result, e_6;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 9, 10, 11]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    //get connection
                    client = _c.sent();
                    return [4 /*yield*/, user_service_get_assoc_by_trainer_1.userserviceGetAssociateByTrainer(trainer)];
                case 2:
                    caliberUsersbyTrainer = _c.sent();
                    emails = [];
                    for (i in caliberUsersbyTrainer) {
                        emails.push(caliberUsersbyTrainer[i].email);
                    }
                    loggers_1.logger.debug(emails);
                    filter_res = [];
                    return [4 /*yield*/, client.query("BEGIN;")];
                case 3:
                    _c.sent();
                    _a = [];
                    for (_b in emails)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 4;
                case 4:
                    if (!(_i < _a.length)) return [3 /*break*/, 7];
                    i = _a[_i];
                    return [4 /*yield*/, client.query("select * from " + schema + ".profiles p where p.email = $1;", [emails[i]])];
                case 5:
                    result = _c.sent();
                    if (result.rows[0]) {
                        filter_res.push(result.rows[0]);
                    }
                    _c.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7: return [4 /*yield*/, client.query("COMMIT;")];
                case 8:
                    _c.sent();
                    //return ProfileDTO-s
                    return [2 /*return*/, Promise.all(filter_res.map(profile_dto_to_profile_converter_1.profileDTOtoProfileConverter))];
                case 9:
                    e_6 = _c.sent();
                    //if we get an error we don't know
                    loggers_1.errorLogger.error(e_6);
                    loggers_1.logger.error(e_6);
                    //console.log(e);
                    throw new Error("This error can't be handled");
                case 10:
                    //let the connection go back to the pool
                    client && client.release();
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.getAllProfilesByTrainer = getAllProfilesByTrainer;
function getAllCurrentProfilesByTrainer(trainer) {
    return __awaiter(this, void 0, void 0, function () {
        var client, caliberUsersbyTrainer, emails, i, filter_res, _a, _b, _i, i, result, e_7;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 9, 10, 11]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    //get connection
                    client = _c.sent();
                    return [4 /*yield*/, user_service_get_current_associates_for_trainer_1.userserviceGetCurrentAssociatesForTrainer(trainer)];
                case 2:
                    caliberUsersbyTrainer = _c.sent();
                    emails = [];
                    for (i in caliberUsersbyTrainer) {
                        emails.push(caliberUsersbyTrainer[i].email);
                    }
                    loggers_1.logger.debug(emails);
                    filter_res = [];
                    return [4 /*yield*/, client.query("BEGIN;")];
                case 3:
                    _c.sent();
                    _a = [];
                    for (_b in emails)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 4;
                case 4:
                    if (!(_i < _a.length)) return [3 /*break*/, 7];
                    i = _a[_i];
                    return [4 /*yield*/, client.query("select * from " + schema + ".profiles p where p.email = $1;", [emails[i]])];
                case 5:
                    result = _c.sent();
                    if (result.rows[0]) {
                        filter_res.push(result.rows[0]);
                    }
                    _c.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7: return [4 /*yield*/, client.query("COMMIT;")];
                case 8:
                    _c.sent();
                    //return ProfileDTO-s
                    return [2 /*return*/, Promise.all(filter_res.map(profile_dto_to_profile_converter_1.profileDTOtoProfileConverter))];
                case 9:
                    e_7 = _c.sent();
                    //if we get an error we don't know
                    loggers_1.errorLogger.error(e_7);
                    loggers_1.logger.error(e_7);
                    //console.log(e);
                    throw new Error("This error can't be handled");
                case 10:
                    //let the connection go back to the pool
                    client && client.release();
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.getAllCurrentProfilesByTrainer = getAllCurrentProfilesByTrainer;
function getProfileByEmail(email) {
    return __awaiter(this, void 0, void 0, function () {
        var client, results, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select * from " + schema + ".profiles p \n                                                    where p.email = $1;", [email])
                        // if (results.rowCount === 0) {
                        //   throw new Error('NotFound')
                        // } else {
                    ];
                case 2:
                    results = _a.sent();
                    // if (results.rowCount === 0) {
                    //   throw new Error('NotFound')
                    // } else {
                    return [2 /*return*/, results.rows[0]
                        // }
                    ];
                case 3:
                    e_8 = _a.sent();
                    if (e_8.message === "NotFound") {
                        throw new profile_not_found_error_1.ProfileNotFoundError;
                    }
                    //console.log(e);
                    loggers_1.errorLogger.error(e_8);
                    loggers_1.logger.error(e_8);
                    throw new Error("This error can't be handled");
                case 4:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getProfileByEmail = getProfileByEmail;
function getBatchProfilesById(auth0Id) {
    return __awaiter(this, void 0, void 0, function () {
        var client, currUser, caliberAssociatesbyBatch, emails, i, filter_res, _a, _b, _i, i, result, e_9;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 10, 11, 12]);
                    return [4 /*yield*/, getProfileById(auth0Id)];
                case 1:
                    currUser = (_c.sent()).batchId;
                    return [4 /*yield*/, user_service_get_assoc_by_batchID_1.userserviceGetAssociateByBatch(currUser)];
                case 2:
                    caliberAssociatesbyBatch = _c.sent();
                    emails = [];
                    for (i in caliberAssociatesbyBatch) {
                        emails.push(caliberAssociatesbyBatch[i].email);
                    }
                    filter_res = [];
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 3:
                    client = _c.sent();
                    return [4 /*yield*/, client.query("BEGIN;")];
                case 4:
                    _c.sent();
                    _a = [];
                    for (_b in emails)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 5;
                case 5:
                    if (!(_i < _a.length)) return [3 /*break*/, 8];
                    i = _a[_i];
                    return [4 /*yield*/, client.query("select * from " + schema + ".profiles p where p.email = $1;", [emails[i]])];
                case 6:
                    result = _c.sent();
                    if (result.rows[0]) {
                        filter_res.push(result.rows[0]);
                    }
                    _c.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 5];
                case 8: return [4 /*yield*/, client.query("COMMIT;")];
                case 9:
                    _c.sent();
                    //return ProfileDTO-s
                    return [2 /*return*/, Promise.all(filter_res.map(profile_dto_to_profile_converter_1.profileDTOtoProfileConverter))];
                case 10:
                    e_9 = _c.sent();
                    if (e_9.message === "NotFound") {
                        throw new profile_not_found_error_1.ProfileNotFoundError;
                    }
                    loggers_1.errorLogger.error(e_9);
                    loggers_1.logger.error(e_9);
                    //console.log(e);
                    throw new Error("This error can't be handled");
                case 11:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.getBatchProfilesById = getBatchProfilesById;
//# sourceMappingURL=profile-dao.js.map