const checkAdminAuthenticated = async function (req, res, next){
    let user = await req.user;
    if(req.isAuthenticated()){
        if(user.admin){
            return next()
        }
    }
    res.redirect('/profile');
}

module.exports = checkAdminAuthenticated;