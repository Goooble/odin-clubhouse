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
    const SQL = `SELECT p.post_id, u.username, p.post,  
  CASE 
    WHEN p.post_time::date != now()::date
      THEN to_char(post_time, 'DD Month YYYY')
    ELSE to_char(post_time, 'HH:MIpm')
  END as post_time
    from posts as p
    INNER JOIN users as u ON p.user_id = u.user_id
    ORDER BY p.post_time DESC;`
    try{
        const { rows } = await pool.query(SQL);
        return rows;
    }catch(error){
        throw new Error("Cannot get posts");
    }
}

async function deletePost(id){
    try{
        await pool.query("DELETE FROM posts WHERE post_id = $1", [id])
    }catch(error){
        console.log(error);
        throw new Error("Cannot delete post");
    }
}

async function updateMembership(id){
    try{
        await pool.query(`UPDATE users SET is_member=true where user_id=$1`, [id])
    }catch(error){
        console.log(error)
        throw new Error("Cannot update membership status")
    }
}

async function updateAdmin(id){
    try{
        await pool.query(`UPDATE users SET is_admin=true where user_id=$1`, [id])
    }catch(error){
        console.log(error)
        throw new Error("Cannot update admin status")
    }
}



export {createUser, createPost, getPosts, updateMembership, updateAdmin, deletePost}