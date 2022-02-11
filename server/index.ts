import express from "express";
import { passport } from "./core/passport";
import multer from "multer";
import { nanoid } from "nanoid";
import cors from "cors";

import "./core/db";

const app = express();

const PORT = process.env.PORT;

const uploader = multer({
  storage: multer.diskStorage({
    destination: function (_, __, cb) {
      cb(null, "public/avatars");
    },
    filename: function (_, file, cb) {
      cb(
        null,
        file.fieldname + "-" + nanoid(6) + "." + file.mimetype.split("/").pop()
      );
    },
  }),
});

app.use(cors());

app.post("/upload", uploader.single("photo"), (req, res) => {
  res.json(req.file);
});

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.send(
      `<script>window.opener.postMessage('${JSON.stringify(
        req.user
      )}', '*');window.close();</script>`
    );
  }
);

app.listen(PORT, () => {
  console.log(`server run on port: ${PORT}`);
});
