import { Strategy as localStrategy } from "passport-local";
import bcrypt from "bcrypt";
import passport from "passport";
import pool from "./db/pool.js";

passport.serializeUser((user, done)=>{
    done(null, user.user_id);
})

passport.deserializeUser(async (id, done)=>{
    try{
        const {rows} = await pool.query(`SELECT user_id, username, is_member, is_admin from users WHERE user_id = $1`, [id]);
        const user = rows[0];
        done(null, user);
    }catch(error){
        done(err);
    }
})

const strategy = new localStrategy({usernameField: "username", passwordField: "password"},async (username, password, done)=>{
    try{
        const { rows } = await pool.query(`SELECT * from users WHERE username = $1`, [username])
        if(!rows[0]){
            return done(null, false, {message: "User not found"})
        } 

        const match = await bcrypt.compare(password, rows[0].password)
        // const match = rows[0].password == password;
        if(!match) return done(null, false, {message: "Password incorrect"}) 
        return done(null, rows[0])
    }catch(error){
        return done(error)
    }

    
})
passport.use(strategy);

export default passport;