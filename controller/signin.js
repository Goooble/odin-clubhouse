
import bcrypt from "bcrypt"
import { createUser } from "../db/query.js";
async function signin(req, res){
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);
    createUser(username, password)
    res.redirect("/");
}

export default signin