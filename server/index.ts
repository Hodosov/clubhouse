import express from "express";
import { passport } from "./core/passport";

const app = express();

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => res.redirect("/")
);

app.listen(8080, () => {
  console.log("server run");
});
