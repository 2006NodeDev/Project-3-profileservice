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
exports.UpdateProfile = exports.createProfile = exports.getProfileById = exports.getAllProfiles = void 0;
var _1 = require(".");
var profile_dto_to_profile_converter_1 = require("../../utils/profile-dto-to-profile-converter");
var profile_not_found_error_1 = require("../../errors/profile-not-found-error");
//import { logger, errorLogger } from "../../utils/logger";
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
                    return [2 /*return*/, results.rows.map(profile_dto_to_profile_converter_1.profileDTOtoProfileConverter)];
                case 3:
                    e_1 = _a.sent();
                    //if we get an error we don't know
                    console.log(e_1);
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
        var client, results, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select * from " + schema + ".profiles p \n                                                    where p.auth0_user_id = $1;", [auth0Id])];
                case 2:
                    results = _a.sent();
                    if (results.rowCount === 0) {
                        throw new Error('NotFound');
                    }
                    else {
                        return [2 /*return*/, profile_dto_to_profile_converter_1.profileDTOtoProfileConverter(results.rows[0])];
                    }
                    return [3 /*break*/, 5];
                case 3:
                    e_2 = _a.sent();
                    if (e_2.message === "NotFound") {
                        throw new profile_not_found_error_1.ProfileNotFoundError;
                    }
                    console.log(e_2);
                    throw new Error("This error can't be handled");
                case 4:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getProfileById = getProfileById;
//import { logger, errorLogger } from "../../utils/logger";
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
                    return [4 /*yield*/, client.query("insert into " + schema + ".profiles(\"auth0_user_id\", \"email\", \"batch_id\", \"nickname\", \"pronouns\", \"hobbies\", \"fav_foods\", \"special_trait\", \"degree\", \"fav_language\", \"relevant_skills\", \"introvert\", \"study_group\")\n                              values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)\n                              returning *", [
                            newProfile.auth0Id,
                            newProfile.email,
                            newProfile.batchId,
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
                    console.log(error_1);
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
                    console.log("trying to input in db");
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
                    console.log("about to commit");
                    return [4 /*yield*/, client.query("COMMIT;")];
                case 25:
                    _a.sent(); //ends the transaction
                    //below is just a placeholder, will edit when get profile is done
                    return [2 /*return*/, getProfileById(updatedProfile.auth0Id)];
                case 26:
                    error_2 = _a.sent();
                    client && client.query("ROLLBACK;"); //does not save if doesn't work
                    //placeholder until similar error is figured out
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
//# sourceMappingURL=profile-dao.js.map