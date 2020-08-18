import express, { Request, Response, NextFunction } from 'express'
import { getAllProfilesService, getProfileByIdService } from '../services/profile-service'

export const profileRouter = express.Router()

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