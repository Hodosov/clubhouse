import express from "express";
import { generateRandomCode } from "../../server/utils/generateRandomCode";
import { Room } from "../../models";

class RoomController {
  async index(req: express.Request, res: express.Response) {
    const item = await Room.findAll();
    try {
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  }

  async create(req: express.Request, res: express.Response) {
    try {
      const data = { title: req.body.title, type: req.body.type };

      if (!data.title || !data.type) {
        return res
          .status(400)
          .json({ message: "Отсутствует заголовок или тип комнаты" });
      }

      const room = await Room.create(data);
      res.json(room);
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  }

  async show(req: express.Request, res: express.Response) {
    try {
      const roomId = req.params.id;

      if (isNaN(Number(roomId))) {
        return res.status(404).json({ message: "Неверный ID комнаты" });
      }

      const room = await Room.findByPk(roomId);

      if (!room) {
        return res.status(404).json({ message: "Комната не найдена" });
      }

      res.json(room);
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  }

  async delete(req: express.Request, res: express.Response) {
    try {
      const roomId = req.params.id;

      if (isNaN(Number(roomId))) {
        return res.status(404).json({ message: "Неверный ID комнаты" });
      }

      const room = await Room.destroy({ where: { id: roomId } });

      res.send();
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  }
}

export default new RoomController();
