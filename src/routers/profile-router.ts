import {
  getAllProfilesService,
  getProfileByIdService,
  UpdateProfileService,
  CreateProfileService,
  getProfileBySkillNameService,
  getProfileByYearService,
  getProfileByQuarterService,
  getProfileByTrainerService,
} from "../services/profile-service";
import express, { Request, Response, NextFunction } from "express";
import { Profile } from "../models/Profile";
import { userServiceGetUserByEmail } from "../remote/user-service/user-service-get-assoc-by-email";
//import { associatetoProfileDTOConverter } from "../utils/profile-dto-to-profile-skill-converter";
import { logger, errorLogger } from "../utils/loggers";


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
  let {
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

  console.log(updatedProfile);
     try {
      let results = await UpdateProfileService(updatedProfile);
      logger.info("We have updated profile now to insert in db");
      res.json(results);
    } catch (e) {
      console.log(e);
      logger.debug(updatedProfile);
      errorLogger.error(e);
      next(e)
    }

  }
);

profileRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  
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
  
  logger.debug(createProfile);

    try {
      let results = await CreateProfileService(createProfile);
      logger.info("We have created a new profile")
      res.json(results);
    } catch (e) {
      errorLogger.error(e);
      next(e);
    }

  }
);

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

profileRouter.get('/skill/:skillname', async (req: any, res: Response, next: NextFunction) => {
  let skill = req.params.skillname
  try {
    let associate = await getProfileBySkillNameService(skill)
    res.json(associate)
  } catch (e) {
    next(e)
  }
})


profileRouter.get('/year/:year', async (req:any, res:Response, next:NextFunction) => {
  let year = req.params.year
  try{
      let associate = await getProfileByYearService(year)
      res.json(associate)
  } catch (e){
      next(e)
  }
})

profileRouter.get('/quarter/:quarter', async (req:any, res:Response, next:NextFunction) => {
  let quarter = req.params.quarter
  try{
      let associate = await getProfileByQuarterService(quarter)
      res.json(associate)
  } catch (e){
      next(e)
  }
})

profileRouter.get('/trainer/:trainer', async (req:any, res:Response, next:NextFunction) => {
  let trainer = req.params.trainer
  try{
      let associate = await getProfileByTrainerService(trainer)
      res.json(associate)
  } catch (e){
      next(e)
  }
})
