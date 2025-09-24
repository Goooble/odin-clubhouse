import { Router } from "express";
const postRouter = Router();

postRouter.post("/put-post", (req, res)=>{
    res.send("ok")
})


export default postRouter