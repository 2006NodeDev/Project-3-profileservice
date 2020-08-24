import {
  getAllProfilesService,
  getProfileByIdService,
  UpdateProfileService,
  CreateProfileService,
  getProfileBySkillNameService,
  getProfileByYearService,
  getProfileByQuarterService,
  getProfileByTrainerService,
  getBatchAssociatesById,
  getCurrentBatchassociatesForTrainerService,
} from "../services/profile-service";
import express, { Request, Response, NextFunction } from "express";
import { Profile } from "../models/Profile";
import { userServiceGetUserByEmail } from "../remote/user-service/user-service-get-assoc-by-email";
import { logger, errorLogger } from "../utils/loggers";
//import { associatetoProfileDTOConverter } from "../utils/profile-dto-to-profile-skill-converter";
//import { userServiceGetUserByEmail } from "../remote/user-service/user-service-get-assoc-by-email";

export const profileRouter = express.Router();

//no middleware set up yet

//get all profiles


profileRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let allProfiles = await getAllProfilesService();
      res.json(allProfiles);
      logger.debug(allProfiles)
    } catch (e) {
      errorLogger.error(e);
      logger.error(e)
      next(e);
    }
  }
);

//get profiles based on auth0Id
profileRouter.get(
  "/:auth0Id",
  async (req: Request, res: Response, next: NextFunction) => {
    let { auth0Id } = req.params;
    //since text, idk what to test for to ensure input accuracy (can't use NaN)
    try {
      let profile = await getProfileByIdService(auth0Id);
      res.json(profile);
    } catch (e) {
      errorLogger.error(e);
      logger.error(e)
      next(e);
    }
  }
);

//get all the profiles of the associates in your batch
profileRouter.get(
  "/batch/:auth0Id",
  async (req: Request, res: Response, next: NextFunction) => {
    let { auth0Id } = req.params;

    try {
      let profile = await getBatchAssociatesById(auth0Id);
      res.json(profile);
      logger.debug(profile)
    } catch (e) {
      errorLogger.error(e);
      next(e);
    }
  }
);

//update profile

//authorizationMiddleware has not been created and may not be necessary
profileRouter.patch('/:auth0Id', async (req: Request, res: Response, next: NextFunction) => {
  let { auth0Id } = req.params

  let user_profile = await getProfileByIdService(auth0Id)
  logger.debug(user_profile.email)
  //console.log(user_profile.email)

  let batchId = await userServiceGetUserByEmail(user_profile.email)
  logger.debug(batchId)
  //console.log(batchId)


  let {
    firstName,
    lastName,
    email,
    nickname,
    pronouns,
    hobbies,
    favFoods,
    specialTrait,
    degree,
    favLangauge,
    relevantSkills,
    introvert,
    studyGroup
  } = req.body



  //this is where authorization code would go- ensure userId matches or role matches
  //Not sure how we want to handle it so it's blank for now

  let updatedProfile: Profile = {
    auth0Id,
    firstName,
    lastName,
    email,
    batchId,
    nickname,
    pronouns,
    hobbies,
    favFoods,
    specialTrait,
    degree,
    favLangauge,
    relevantSkills,
    introvert,
    studyGroup,
  };

  //update with new info or remain the same
  updatedProfile.nickname = nickname || undefined;
  updatedProfile.pronouns = pronouns || undefined;
  updatedProfile.hobbies = hobbies || undefined;
  updatedProfile.favFoods = favFoods || undefined;
  updatedProfile.specialTrait = specialTrait || undefined;
  updatedProfile.degree = degree || undefined;
  updatedProfile.favLangauge = favLangauge || undefined;
  updatedProfile.relevantSkills = relevantSkills || undefined;
  updatedProfile.introvert = introvert || undefined;
  updatedProfile.studyGroup = studyGroup || undefined;

  logger.debug(updatedProfile);
  //console.log(updatedProfile);
  try {
    let results = await UpdateProfileService(updatedProfile);
    console.log("we have updated profile now to insert in db");
    res.json(results);
  } catch (e) {
    errorLogger.error(e);
    logger.error(e)
    //console.log(e);
  }
});

profileRouter.post('/createprofile', async (req: Request, res: Response, next: NextFunction) => {

  console.log(req.body); //lets look at what the request body looks like
  let {
    auth0Id,
    firstName,
    lastName,
    email,
    batchId,
    nickname,
    pronouns,
    hobbies,
    favFoods,
    specialTrait,
    degree,
    favLangauge,
    relevantSkills,
    introvert,
    studyGroup,
  } = req.body;

  let createProfile: Profile = {
    auth0Id,
    firstName,
    lastName,
    email,
    batchId,
    nickname,
    pronouns,
    hobbies,
    favFoods,
    specialTrait,
    degree,
    favLangauge,
    relevantSkills,
    introvert,
    studyGroup,
  };

  createProfile.nickname = nickname;
  createProfile.hobbies = hobbies;
  createProfile.favFoods = favFoods;
  createProfile.specialTrait = specialTrait;
  createProfile.degree = degree;
  createProfile.favLangauge = favLangauge;
  createProfile.relevantSkills = relevantSkills;
  createProfile.introvert = introvert;
  createProfile.studyGroup = studyGroup;
  console.log(createProfile);
  try {
    let results = await CreateProfileService(createProfile);
    res.json(results);
  } catch (e) {
    next(e);
  }
});


profileRouter.get("/email/:email", async (req: Request, res: Response, next: NextFunction) => {
  let { email } = req.params;
  //since text, idk what to test for to ensure input accuracy (can't use NaN)
  try {
    let associate = await userServiceGetUserByEmail(email);

    res.json(associate);

  } catch (e) {
    next(e);
  }
}
);

/*
 for (var i in batchList){
        getAssocInBatch = getAssocInBatch.concat(await getAssociatesByBatchId(batchList[i].batchId))
    }
*/



profileRouter.get('/skill/:skillname', async (req: any, res: Response, next: NextFunction) => {
  let skill = req.params.skillname
  try {
    let associate = await getProfileBySkillNameService(skill)
    res.json(associate)
  } catch (e) {
    next(e)
  }
})


profileRouter.get('/year/:year', async (req: any, res: Response, next: NextFunction) => {
  let year = req.params.year
  try {
    let associate = await getProfileByYearService(year)
    res.json(associate)
  } catch (e) {
    next(e)
  }
})

profileRouter.get('/quarter/:quarter', async (req: any, res: Response, next: NextFunction) => {
  let quarter = req.params.quarter
  try {
    let associate = await getProfileByQuarterService(quarter)
    res.json(associate)
  } catch (e) {
    next(e)
  }
})


profileRouter.get('/trainer/:trainer', async (req: any, res: Response, next: NextFunction) => {
  let trainer = req.params.trainer
  try {
    let associate = await getProfileByTrainerService(trainer)
    res.json(associate)
  } catch (e) {
    next(e)
  }
})

profileRouter.get('/trainer/current/:trainer', async (req: any, res: Response, next: NextFunction) => {
  let trainer = req.params.trainer
  try {
    let associate = await getCurrentBatchassociatesForTrainerService(trainer)
    res.json(associate)
  } catch (e) {
    next(e)
  }
})

