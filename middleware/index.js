let middlewareObj = {};

middlewareObj.isLoggedin = function isLoggedin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    console.log('Not logged in');
    res.redirect('/login');
};

module.exports = middlewareObj;