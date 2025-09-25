import passport from "../authentication.js";
import { Router } from "express";
import isLoggedIn from "../controller/isLoggedIn.js";
import { body, validationResult } from "express-validator";

const loginRouter = Router();
loginRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth-login/login",
    failureMessage: true,
  })
);

loginRouter.get("/login", isLoggedIn);

loginRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
  });
  res.redirect("/");
});

export default loginRouter;
