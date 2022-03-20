import { FC, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import Peer from "simple-peer";
import { Button } from "@components/Button";

import styles from "./Room.module.scss";
import Image from "next/image";
import { Speaker } from "@components/Speaker";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { selectUser } from "redux/selectors";
import { UserData } from "pages";
import { useSocket } from "hooks/useSocket";

interface RoomProps {
  title: string;
}

type User = {
  id: string;
  fullname: string;
  avatarUrl: string;
};

export const Room: FC<RoomProps> = ({ title }) => {
  const user = useSelector(selectUser);
  const [users, setUsers] = useState<UserData[]>([]);

  const router = useRouter();
  const roomId = router.query.id;
  const socket = useSocket();

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          const peerIncome = new Peer({
            initiator: true,
            trickle: false,
            stream,
          });

          peerIncome.on("signal", (signal) => {
            socket.emit("CLIENT@ROOMS:CALL", {
              user,
              roomId,
              signal,
            });
          });

          socket.on("SERVER@ROOMS:CALL", ({ user: callerUser, signal }) => {
            console.log(111, user, signal);

            const peerOutcome = new Peer({
              initiator: false,
              trickle: false,
              stream,
            });

            peerOutcome.signal(signal);
            peerOutcome
              .on("stream", (stream) => {
                document.querySelector("audio").srcObject = stream;
                document.querySelector("audio").play();
              })
              .on("signal", (signal) => {
                socket.emit("CLIENT@ROOMS:ANSWER", {
                  targetUserId: callerUser.id,
                  roomId,
                  signal,
                });
              });
          });
          socket.on("SERVER@ROOMS:ANSWER", ({ targetUserId, signal }) => {
            if (user.id === targetUserId) {
              peerIncome.signal(signal);
            }
          });
        })
        .catch(() => console.log("Нет доступа к микрофону"));

      socket.emit("CLIENT@ROOMS:JOIN", {
        user,
        roomId,
      });

      socket.on("SERVER@ROOMS:LEAVE", (user) => {
        setUsers((prev) => prev.filter((obj) => obj.id !== user.id));
      });

      socket.on("SERVER@ROOMS:JOIN", (allUsers) => {
        setUsers(allUsers);
      });
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <audio controls />
      <div className="d-flex align-items-center justify-content-between">
        <h2>{title}</h2>
        <div
          className={clsx("d-flex align-items-center", styles.actionButtons)}
        >
          <Link href="/rooms">
            <a>
              <Button color="gray" className={styles.leaveButton}>
                <Image
                  width={18}
                  height={18}
                  src="/static/peace.png"
                  alt="Hand black"
                />
                Leave quietly
              </Button>
            </a>
          </Link>
        </div>
      </div>

      <div className="users">
        {users?.map((obj) => (
          <Speaker key={obj.fullname} {...obj} />
        ))}
      </div>
    </div>
  );
};
