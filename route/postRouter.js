import { Router } from "express";
import { createPost } from "../db/query.js";
const postRouter = Router();

postRouter.post("/put-post", (req, res)=>{
    const id = req.user.user_id;
    const post = req.body.post;
    createPost(post, id);
    res.redirect("/")
})


export default postRouter