import { Router } from "express";
import { createPost, deletePost } from "../db/query.js";
import isAdmin from "../controller/isAdmin.js"
import { body, validationResult } from "express-validator";
const postRouter = Router();

function validate(req, res, next){
      const result = validationResult(req);
      if (!result.isEmpty()) {
        console.log(result.array());
        res.redirect("/");
      } else {
        next();
      }
    }

postRouter.post("/put-post", body("post").rtrim().notEmpty(),validate, (req, res)=>{
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