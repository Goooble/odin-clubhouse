import express from "express";
import session from "express-session"
import { config } from "dotenv";
import { Pool } from "pg";
import passport from "./authentication.js";
import process from "process"
import connectPgSimple from "connect-pg-simple";
import isLoggedIn from "./controller/isLoggedIn.js";
import signinRouter from "./route/signinRouter.js";
import loginRouter from "./route/loginRouter.js";
import postRouter from "./route/postRouter.js";
import displayHome from "./controller/displayHome.js";
import memberRouter from "./route/memberRouter.js";

const pgSession = connectPgSimple(session);
config()//to inject env variables

const PORT = process.env.PORT || 6000;
const app = express();

app.set("views", "./view")
app.set("view engine", "ejs")

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))

//auth
const sessionPool = new Pool({
    connectionString: process.env.DB
})

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized:false,
    store: new pgSession({
        pool: sessionPool,
    })
}))
app.use(passport.session());

//routes
//logger
// app.use((req, res, next)=>{
//     console.log("middleware logger")
//     console.log(req.user)
//     next()
// })


//auth routes
app.use("/auth-signin", signinRouter)
app.use("/auth-login", loginRouter)
app.use("/member", memberRouter)


//home routes
app.get("/", displayHome)

//post routes
app.use("/post",isLoggedIn, postRouter)


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});


app.listen(PORT, (error)=>{
    console.log(`listening at ${PORT}`)
    if(error) console.log(error)
})


export {passport}