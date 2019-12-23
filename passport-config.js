const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByUsername, getUserById){
    const authenticateUser = async (username, password, done) => {
        const user = await getUserByUsername(username);
        console.log(user)
        if(user == null){
            return done(null,false,{message: "Username don't exist"})
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user);
            }else{
                return done(null, false, {message: 'Password incorrect'})
            }
        }catch (e){
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser))
    passport.serializeUser((user,done) => done(null, user.id))
    passport.deserializeUser((id,done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize