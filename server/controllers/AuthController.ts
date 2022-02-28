import express from "express";
import { generateRandomCode } from "../../server/utils/generateRandomCode";
import { Code, User } from "../../models";
// import { Axios } from "../../core/axios";

class AuthController {
  authCallback(req: express.Request, res: express.Response) {
    res.send(
      `<script>window.opener.postMessage('${JSON.stringify(
        req.user
      )}', '*');window.close();</script>`
    );
  }

  getMe(req: express.Request, res: express.Response) {
    res.json(req.user);
  }

  async activate(req: express.Request, res: express.Response) {
    const userId = req.user.id;
    const smsCode = req.query.code;

    if (!smsCode) {
      res.status(400).json({ message: "Введите код активации" });
    }

    try {
      const whereQuery = { code: smsCode, user_id: userId };
      const findCode = await Code.findOne({
        where: whereQuery,
      });

      if (findCode) {
        await Code.destroy({
          where: whereQuery,
        });
        await User.update(
          { isActive: 1 },
          {
            where: { id: userId },
          }
        );
        return res.send();
      } else {
        res.status(400).json({
          message: "Код не найден",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Ошибка при активации аккаунта",
      });
    }
  }

  async sendSMS(req: express.Request, res: express.Response) {
    const phone = req.query.phone;
    const userId = req.user.id;
    const smsCode = generateRandomCode();
    if (!phone) {
      return res.status(400).json({
        message: " Номер не указан",
      });
    }

    try {
      // await Axios.get(
      //   `https://sms.ru/sms/send?api_id=${process.env.SMS_API_KEY}&to=79992380831&msg=${smsCode}`
      // );

      const findCode = await Code.findOne({
        where: { user_id: userId },
      });

      if (findCode) {
        return res.status(400).json({ message: "Код уже был отправлен" });
      }

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
}

export default new AuthController();
