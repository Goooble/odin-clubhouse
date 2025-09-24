import pool from "./pool.js";

async function createUser(user, password){
    try{
        await pool.query("INSERT INTO users (username, password) VALUES($1, $2)",[user, password])
    }catch(error){
        console.log(error)
        throw error;
    }
    
}

export {createUser}