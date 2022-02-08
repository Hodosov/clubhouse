import express from "express";
import { passport } from "./core/passport";

import "./core/db";

const app = express();

const PORT = process.env.PORT;

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => res.send()
);

app.listen(PORT, () => {
  console.log(`server run on port: ${PORT}`);
});
