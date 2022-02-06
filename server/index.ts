import express from "express";
import passport from "passport";

const app = express();

app.post("/auth/twitter", passport.authenticate("local"), function (req, res) {
  res.redirect("/");
});

app.listen(8080, () => {
  console.log("server run");
});
