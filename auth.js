const passport  = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {Users} = require('./models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const SECRET = 'Super secret token';
const jwtSign = (payload)=>{
  return jwt.sign(payload,SECRET)
}
passport.use('signup', new LocalStrategy ({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await Users.create({ email: email, password: password })
    if (!user) {
      return done(null, false, { message: 'Unable to sign up user'})
    }
    done(null, false,user)
  } catch(error) {
    return done(null,false,error)
  }
}))
passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    // find user by their email
    const user = await Users.findOne({ where: { email }})
    if (!user) {
      return done(null, false, { message: 'User not found'})
    }

    // compare passwords
    const validate = await bcrypt.compare(password, user.password);
    if (!validate) {
      return done(null, false, { message: 'Wrong password'})
    }

    // login was a success, return the user object
    return done(null, user, { message: 'Logged in successfully'})

  } catch(error) {
      console.log(error.message);
      // return done(error)
  }
}))

module.exports = {
  passport,
  jwtSign
}