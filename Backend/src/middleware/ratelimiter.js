import ratelimit from "../config/upsatash.js";

const rateLimiter = async (req,res,next) =>{

    try {
        const {success} = await ratelimit.limit()
        if(!success){
            return res.status(429).json({
                message : "Too many request. please try again"
            })
        }
        next()
    } catch (error) {
        console.log("rate ,imit error", error)
        next()
    }
}

export default rateLimiter;