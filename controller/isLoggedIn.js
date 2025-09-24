function isLoggedIn(req, res, next){
    if(!req.user){
        const message = req.session.messages || [];

        console.log(message)
        res.render("login", {message:message.at(-1)});
    }else{
        next();
    }
}

export default isLoggedIn