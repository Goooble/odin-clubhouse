import express from "express";
import session from "express-session"
import { config } from "dotenv";
import bcrypt from "bcrypt";
import { Pool } from "pg";
import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import process from "process"
config()//to inject env variables

const PORT = process.env.PORT || 6000;
const app = express();

app.set("views", "./view")
app.set("view engine", "ejs")

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))



app.get("/", (req, res)=> {
    res.render("test");
})

app.listen(PORT, (error)=>{
    console.log(`listening at ${PORT}`)
    if(error) console.log(error)
})