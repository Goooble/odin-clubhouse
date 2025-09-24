function isLoggedIn(req, res, next){
    console.log("checking for log in")
    if(!req.user){
        const message = req.session.messages;
        console.log(message)
        res.render("login", {message:message.at(-1)});
    }else{
        next();
    }
}

export default isLoggedIn