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
exports.getCurrentBatchassociatesForTrainerService = exports.getBatchAssociatesById = exports.getProfileByTrainerService = exports.getProfileByQuarterService = exports.getProfileByYearService = exports.getProfileBySkillNameService = exports.CreateProfileService = exports.UpdateProfileService = exports.getProfileByIdService = exports.getAllProfilesService = void 0;
var profile_dao_1 = require("../daos/SQL/profile-dao");
//import { getAssociateBySkillName } from "../remote/user-service/user-service-get-assoc-by-skill-name";
//do we want to add loggging to this layer?  If so, where?
function getAllProfilesService() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, profile_dao_1.getAllProfiles()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getAllProfilesService = getAllProfilesService;
function getProfileByIdService(auth0Id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, profile_dao_1.getProfileById(auth0Id)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getProfileByIdService = getProfileByIdService;
function UpdateProfileService(profile) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, profile_dao_1.UpdateProfile(profile)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.UpdateProfileService = UpdateProfileService;
function CreateProfileService(profile) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, profile_dao_1.createProfile(profile)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.CreateProfileService = CreateProfileService;
function getProfileBySkillNameService(skill) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, profile_dao_1.getAllProfilesBySkill(skill)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getProfileBySkillNameService = getProfileBySkillNameService;
function getProfileByYearService(year) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, profile_dao_1.getAllProfilesByYear(year)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getProfileByYearService = getProfileByYearService;
function getProfileByQuarterService(quarter) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, profile_dao_1.getAllProfilesByQuarter(quarter)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getProfileByQuarterService = getProfileByQuarterService;
//getProfileByQuarterService
function getProfileByTrainerService(trainer) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, profile_dao_1.getAllProfilesByTrainer(trainer)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getProfileByTrainerService = getProfileByTrainerService;
//getProfileByQuarterService
function getBatchAssociatesById(auth0Id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, profile_dao_1.getBatchProfilesById(auth0Id)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getBatchAssociatesById = getBatchAssociatesById;
function getCurrentBatchassociatesForTrainerService(trainer) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, profile_dao_1.getAllCurrentProfilesByTrainer(trainer)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getCurrentBatchassociatesForTrainerService = getCurrentBatchassociatesForTrainerService;
//# sourceMappingURL=profile-service.js.map