function isAdmin(req, res, next){
if(req.user.is_admin){
    next();
}else
{res.redirect("/");}
}

export default isAdmin;