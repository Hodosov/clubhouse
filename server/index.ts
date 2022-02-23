import express from "express";
import fs from "fs";
import { passport } from "./core/passport";
import sharp from "sharp";
import cors from "cors";

import "./core/db";
import AuthController from "./controllers/AuthController";
import RoomController from "./controllers/RoomController";

import { uploader } from "./core/uploader";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get(
  "/rooms",
  passport.authenticate("jwt", { session: false }),
  RoomController.index
);
app.post(
  "/rooms",
  passport.authenticate("jwt", { session: false }),
  RoomController.create
);
app.get(
  "/rooms/:id",
  passport.authenticate("jwt", { session: false }),
  RoomController.show
);
app.delete(
  "/rooms/:id",
  passport.authenticate("jwt", { session: false }),
  RoomController.delete
);

app.get(
  "/auth/me",
  passport.authenticate("jwt", { session: false }),
  AuthController.getMe
);

app.get(
  "/auth/sms/activate",
  passport.authenticate("jwt", { session: false }),
  AuthController.activate
);

app.get(
  "/auth/sms",
  passport.authenticate("jwt", { session: false }),
  AuthController.sendSMS
);

app.get("/auth/github", passport.authenticate("github"));

app.post("/upload", uploader.single("photo"), (req, res) => {
  const filePath = req.file.path;
  sharp(filePath)
    .resize(150, 150)
    .toFormat("jpeg")
    .toFile(filePath.replace(".png", ".jpeg"), (err) => {
      if (err) {
        throw err;
      }
      fs.unlinkSync(filePath);
      res.json({
        url: `/avatars/${req.file.filename.replace(".png", ".jpeg")}`,
      });
    });
});

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  AuthController.authCallback
);

app.listen(PORT, () => {
  console.log(`server run on port: ${PORT}`);
});
