import { Router } from "express";
import { createPost, deletePost } from "../db/query.js";
import isAdmin from "../controller/isAdmin.js"
const postRouter = Router();

postRouter.post("/put-post", (req, res)=>{
    const id = req.user.user_id;
    const post = req.body.post;
    createPost(post, id);
    res.redirect("/")
})

postRouter.post("/delete/:id", isAdmin, (req, res)=>{
const id = req.params.id;
deletePost(id);
    res.redirect("/");
})

export default postRouter