import { getPosts } from "../db/query.js";
async function displayHome(req, res){
    const rows = await getPosts();
    // console.log(rows);
    rows.map((item)=>{
        delete item.username;
    })
    console.log(req.user);
    res.render("home", {posts: rows, user: req.user});
}

export default displayHome;