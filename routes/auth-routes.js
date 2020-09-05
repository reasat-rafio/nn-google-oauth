const { Router } = require("express");
const passport = require("passport");

const router = Router();

//  ? auth login
router.get("/login", (req, res) => {
  res.render("login");
});

// ? auth logout
router.get("/logout", (req, res) => {
  // ~ handle with passport
  req.logout();
  res.redirect("/");
});

// ? auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// ? callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  // res.send(req.user);
  res.redirect("/profile");
});

module.exports = router;
