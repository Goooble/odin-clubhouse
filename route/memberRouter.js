import { Router } from "express";
import memberLogin from "../controller/memberLogin.js";
const memberRouter = Router();

memberRouter.get("/login", (req, res)=>{
    res.render("member");
});

memberRouter.post("/login", memberLogin);




export default memberRouter