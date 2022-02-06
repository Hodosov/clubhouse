import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/github/callback",
    },

    (accessToken, refreshToken, profile, cb) => {
      console.log(accessToken, refreshToken, profile, cb);
    }
  )
);

export { passport };
