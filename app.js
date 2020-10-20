const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");

const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");
const { mongodb, session } = require("./config/keys");

const app = express();

// ? set up view engin
app.set("view engine", "ejs");

const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60,
    keys: [session.cookieKey],
  })
);

// ? initialize passport
app.use(passport.initialize());
app.use(passport.session());

// ? connect to mongodb
mongoose.connect(
  mongodb.dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to mongodb")
);

// ? set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// ? create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("app now listening to port 3000");
});
