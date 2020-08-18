import express, { Request, Response, NextFunction } from 'express'
import { Profile } from "../models/Profile"
import { UpdateProfileService } from '../services/profile-service'

export let profileRouter = express.Router();

//update profile

//router hadn't been declared in index yet, authorizationMiddleware has not been created and may not be necessary
profileRouter.patch('/', authorizationMiddleware(['admin', 'user']), async (req:Request, res:Response, next:NextFunction)=>{
    
    let{
        auth0Id, 
        caliberId,
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
        caliberId,
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
    }

    //update with new info or remain the same
    updatedProfile.nickname = nickname || undefined
    updatedProfile.pronouns = pronouns || undefined
    updatedProfile.hobbies = hobbies || undefined
    updatedProfile.favFoods = favFoods || undefined
    updatedProfile.specialTrait = specialTrait || undefined
    updatedProfile.degree = degree || undefined
    updatedProfile.favLangauge = favLangauge || undefined
    updatedProfile.relevantSkills = relevantSkills || undefined
    updatedProfile.introvert = introvert || undefined
    updatedProfile.studyGroup = studyGroup || undefined


    console.log(updatedProfile)
    try{
        let results = await UpdateProfileService(updatedProfile)
        res.json(results)
    } catch (e){
        next(e)
    }  
})