import express from 'express'
import notesRoutes from './routes/notesRoutes.js'
import {connectDB} from './config/db.js'
import dotenv from 'dotenv'
import rateLimiter from './middleware/ratelimiter.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from "url";

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(rateLimiter)
app.use('/api/notes',notesRoutes)
const PORT = process.env.PORT || 5001
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../../Frontend/thinkboard/dist");

  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
};

connectDB().then(() =>{
app.listen(PORT,()=>{
    console.log("server started at :", PORT);
});
})
