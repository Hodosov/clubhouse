import { Axios } from "@core/axios";
import clsx from "clsx";
import { prepareServerlessUrl } from "next/dist/server/base-server";
import { useRouter } from "next/router";
import { RoomApi, RoomType } from "pages/api/roomApi";
import { title } from "process";
import React, { useState } from "react";
import { Button } from "../Button";

import styles from "./StartRoomModal.module.scss";

interface StartRoomModalProps {
  onClose: () => void;
}

export const StartRoomModal: React.FC<StartRoomModalProps> = ({ onClose }) => {
  const [form, setForm] = useState<{ title: string; type: RoomType }>({
    title: "",
    type: "open",
  });
  const router = useRouter();
  const onSubmit = async () => {
    try {
      const room = await RoomApi(Axios).createRoom(form);
      router.push(`/rooms/${room.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img
          width="24px"
          height="24px"
          src="/static/close.svg"
          alt="Close"
          className={styles.closeBtn}
          onClick={onClose}
        />
        <div className="mb-30">
          <h3>Topic</h3>
          <input
            // value={title}
            onChange={({ target }) =>
              setForm((prev) => ({ ...prev, title: target.value }))
            }
            className={styles.inputTitle}
            placeholder="Enter the topic to be discussed"
          />
        </div>
        <div className="mb-30">
          <h3>Room type</h3>
          <div className="d-flex justify-content-between">
            <div
              onClick={() => setForm((prev) => ({ ...prev, type: "open" }))}
              className={clsx(styles.roomType, {
                [styles.roomTypeActive]: form.type === "open",
              })}
            >
              <img
                width="70px"
                height="70px"
                src="/static/room-type-1.png"
                alt="Room type"
              />
              <h5>Open</h5>
            </div>
            <div
              onClick={() => setForm((prev) => ({ ...prev, type: "social" }))}
              className={clsx(styles.roomType, {
                [styles.roomTypeActive]: form.type === "social",
              })}
            >
              <img
                width="70px"
                height="70px"
                src="/static/room-type-2.png"
                alt="Room type"
              />
              <h5>Social</h5>
            </div>
            <div
              onClick={() => setForm((prev) => ({ ...prev, type: "closed" }))}
              className={clsx(styles.roomType, {
                [styles.roomTypeActive]: form.type === "closed",
              })}
            >
              <img
                width="70px"
                height="70px"
                src="/static/room-type-3.png"
                alt="Room type"
              />
              <h5>Closed</h5>
            </div>
          </div>
        </div>
        <div className={styles.delimiter}></div>
        <div className="text-center">
          <h3>Start a room open to everyone</h3>
          <Button onClick={onSubmit} color="green">
            <img
              width="18px"
              height="18px"
              src="/static/celebration.png"
              alt="Celebration"
            />
            Let&apos;s go
          </Button>
        </div>
      </div>
    </div>
  );
};
