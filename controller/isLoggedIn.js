function isLoggedIn(req, res, next){
    console.log("checking for log in")
    if(!req.user){
        res.render("login");
    }else{
        next();
    }
}

export default isLoggedIn