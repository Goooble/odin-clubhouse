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

async function getPosts(){
    const SQL = `SELECT u.username, p.post, p.post_time from posts as p
    INNER JOIN users as u ON p.user_id = u.user_id
    ORDER BY p.post_time DESC;`
    try{
        const { rows } = await pool.query(SQL);
        return rows;
    }catch(error){
        throw new Error("Cannot get posts");
    }
}


export {createUser, createPost, getPosts}