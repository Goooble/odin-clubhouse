import signin from "../controller/signin.js";
import { Router } from "express";
const signinRouter = Router();

signinRouter.get("/signin",(req, res)=>{
    res.render("signin");
})
signinRouter.post("/signin", signin)

export default signinRouter