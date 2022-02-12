import express from "express";
import fs from "fs";
import { passport } from "./core/passport";
import multer from "multer";
import { nanoid } from "nanoid";
import sharp from "sharp";
import cors from "cors";
import { Code } from "../models";

import "./core/db";
import { UserData } from "pages";
import Axios from "axios";

declare global {
  namespace Express {
    interface User extends UserData {}
  }
}

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

export const generateRandomCode = (max: number = 9999, min: number = 1000) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

app.use(cors());
app.use(express.json());

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
  "/auth/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

app.get(
  "/auth/sms",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const phone = req.query.phone;
    const userId = req.user.id;
    const smsCode = generateRandomCode();
    if (!phone) {
      return res.status(400).send();
    }

    try {
      // const data = await Axios.get(
      //   `https://sms.ru/sms/send?api_id=${process.env.SMS_API_KEY}&to=79992380831&msg=${code}`
      // );

      await Code.create({
        code: smsCode,
        user_id: userId,
      });

      res.status(201).send();
    } catch (error) {
      res.status(500).json({
        message: "Ошибка при отправке СМС-кода",
      });
    }
  }
);

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
