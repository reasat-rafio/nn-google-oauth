const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const { google } = require("./keys");
const User = require("../models/user-models");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      // ? option for the google strategy
      callbackURL: "/auth/google/redirect",
      clientID: google.clientID,
      clientSecret: google.clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      try {
        //  ? check if user already exist in out database
        const findUser = await User.findOne({ googleId: profile.id });
        if (findUser) {
          // ? user already exist
          console.log(`User is ${findUser}`);

          done(null, findUser);
        } else {
          // ? create a new user
          const newUser = await User.create({
            username: profile.displayName,
            googleId: profile.id,
          });
          done(null, newUser);
          console.log(`new user created ${newUser}`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);
