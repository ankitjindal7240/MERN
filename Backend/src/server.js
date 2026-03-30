import express from 'express'
import notesRoutes from './routes/notesRoutes.js'
import {connectDB} from './config/db.js'
import dotenv from 'dotenv'
import rateLimiter from './middleware/ratelimiter.js'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(rateLimiter)
app.use('/api/notes',notesRoutes)
const PORT = process.env.PORT || 5001

connectDB().then(() =>{
app.listen(PORT,()=>{
    console.log("server started at :", PORT);
});
})
