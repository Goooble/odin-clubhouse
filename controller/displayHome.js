import { getPosts } from "../db/query.js";
async function displayHome(req, res){
    const rows = await getPosts();
    console.log(rows);
    res.render("home", {posts: rows});
}

export default displayHome;