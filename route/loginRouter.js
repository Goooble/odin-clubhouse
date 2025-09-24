import passport from "../authentication.js"
import { Router } from "express";

const loginRouter = Router();
loginRouter.post("/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/failed",
    failureMessage: true
}))

loginRouter.get("/logout", (req, res, next)=> {
    req.logout((err)=>{
        if(err){
            next(err)
        }
    });
    res.redirect("/")
})

export default loginRouter