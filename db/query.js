import pool from "./pool.js";

async function createUser(user, password){
    try{
        await pool.query("INSERT INTO users (username, password) VALUES($1, $2)",[user, password])
    }catch(error){
        console.log(error)
        throw error;
    }
    
}

async function createPost(post, id){
    try{
        await pool.query("INSERT INTO posts (post, user_id) VALUES($1, $2);", [post, id])
    }catch(error){
        console.log(error);
        throw new Error("Cannot create post");;
    }
}

export {createUser, createPost}