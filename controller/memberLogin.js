import { updateMembership } from "../db/query.js"

function memberLogin(req, res){
if(req.body.secret === "club"){
updateMembership(req.user.user_id);
res.redirect("/");
}else{
    res.render("member", {error: "Wrong Secret Key"})
}
}


export default memberLogin