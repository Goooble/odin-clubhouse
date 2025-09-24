import pool from "../db/pool.js";
import bcrypt from "bcrypt"
async function signin(req, res){
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES($1, $2)",[username, password])
    res.redirect("/");
}

export default signin