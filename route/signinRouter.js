import signin from "../controller/signin.js";
import { Router } from "express";
import { body, validationResult } from "express-validator";
import pool from "../db/pool.js";
const signinRouter = Router();

signinRouter.get("/signin", (req, res) => {
  res.render("signin");
});

const signinValidation = () => {
  return [
      body("username")
      .notEmpty().withMessage("Enter a username")
      .custom(async (value)=>{
        const {rows} = await pool.query("SELECT username FROM users WHERE username=$1;", [value]);
        console.log(rows[0])
        if(rows[0]) throw new Error("Username taken")
      }).withMessage("Username Taken")
      
      .isAlphanumeric('en-US', { ignore: '_' }).withMessage("Only Alphabets, numbers and underscores allowed"),

      body("password").notEmpty().withMessage("Enter Password")
      .custom((value, { req }) => {
        return value === req.body.confirmPassword;
      })
      .withMessage("Please confirm password")
    ]
};

function validate(req, res, next){
      const result = validationResult(req);
      if (!result.isEmpty()) {
        console.log(result.array());
        res.locals.errormsg = result.array({onlyFirstError:true})[0].msg
        res.render("signin");
      } else {
        next();
      }
    }
signinRouter.post("/signin", signinValidation(), validate, signin);

export default signinRouter;
