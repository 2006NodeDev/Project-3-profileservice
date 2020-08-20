
import {
  getAllProfilesService,
  getProfileByIdService,
  UpdateProfileService,
  CreateProfileService,
} from "../services/profile-service";
import express, { Request, Response, NextFunction } from "express";
import { Profile } from "../models/Profile";

export const profileRouter = express.Router();


//no middleware set up yet

//get all profiles

profileRouter.get("/", async (req:Request, res: Response, next: NextFunction)=>{
    try {
        let allProfiles = await getAllProfilesService()
        res.json(allProfiles)
    } catch (e) {
        next(e)
    }
})

//get profiles based on auth0Id
profileRouter.get("/:auth0Id", async (req:Request, res:Response, next:NextFunction)=>{
    let {auth0Id} = req.params 
    //since text, idk what to test for to ensure input accuracy (can't use NaN)
    try {
        let profile = await getProfileByIdService(auth0Id)
        res.json(profile)
    } catch (e) {
        next(e)
    }
})


//update profile

//authorizationMiddleware has not been created and may not be necessary
profileRouter.patch('/', async (req:Request, res:Response, next:NextFunction)=>{
    
    let{
        auth0Id, 
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
      res.json(results);
    } catch (e) {
      next(e);
    }
  }
);

profileRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body); //lets look at what the request body looks like
    let {
      auth0Id,
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
  }
);

