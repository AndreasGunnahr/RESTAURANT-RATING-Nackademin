const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../db/index')

function initialize(passport, getUserByUsername, getUserById){
    const authenticateUser = async (username, password, done) => {
        const user = await getUserByUsername(username);
        if(user == null){
            return done(null, false, {message: "Username don't exist"})
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
    const authenticateNewUser = async (req,username, password, done) => {
        const user = await getUserByUsername(username);
        console.log(user)
        if(user == undefined){
            const user = req.body
            user.password = await bcrypt.hash(user.password,10);
            const insertId = await db.insert(`users`, user);
            user.id = insertId;
            return done(null, user);
        }
        
        return done(null, false, {message: 'Username taken'})
        // Add if error handling
    }
    
    passport.use('login',new LocalStrategy({usernameField: 'username'}, authenticateUser))
    passport.use('register',new LocalStrategy({usernameField: 'username', passReqToCallback: true}, authenticateNewUser))
    passport.serializeUser((user,done) => done(null, user.id))
    passport.deserializeUser((id,done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize