import express, { Request, Response } from 'express'
import { profileRouter } from "./routers/profile-router"
import { corsFilter } from "./middleware/cors-filter"

const app = express() 
//our application from express

app.use(express.json())

app.use(corsFilter)

app.use("/profiles", profileRouter)

//health check! for load balancer and build
app.get('/health', (req: Request, res: Response) => {
    res.sendStatus(200)
})

app.use((err, req, res, next) => {  
    if (err.statusCode) { 
        console.log(err);
        res.status(err.statusCode).send(err.message)
    } else { //if it wasn't one of our custom errors, send generic response
        console.log(err); 
        res.status(500).send("Oops, something went wrong")
    }
})

//what port do we want?
app.listen(2008, () => { //start server on port 2007
    console.log("Server has started");
})

