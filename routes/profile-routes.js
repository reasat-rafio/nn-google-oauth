const { Router } = require("express");

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

const router = Router();

router.get("/", authCheck, (req, res) => {
  res.render("profile", {
    user: req.user,
  });
});

module.exports = router;
