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

let peers = [];

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
          audio: true,
          video: true,
        })
        .then((stream) => {
          socket.emit("CLIENT@ROOMS:JOIN", {
            user,
            roomId,
          });

          socket.on("SERVER@ROOMS:JOIN", (allUsers: UserData[]) => {
            setUsers(allUsers);

            allUsers.forEach((speaker) => {
              if (
                user.id !== speaker.id &&
                !peers.find((obj) => obj.id !== speaker.id)
              ) {
                const peerIncome = new Peer({
                  initiator: true,
                  trickle: false,
                  stream,
                });

                peerIncome.on("signal", (signal) => {
                  socket.emit("CLIENT@ROOMS:CALL", {
                    targetUserId: speaker.id,
                    callerUserId: user.id,
                    roomId,
                    signal,
                  });
                  peers.push({
                    peer: peerIncome,
                    id: speaker.id,
                  });
                });

                socket.on(
                  "SERVER@ROOMS:CALL",
                  ({ targetUserId, callerUserId, signal: callerSignal }) => {
                    const peerOutcome = new Peer({
                      initiator: false,
                      trickle: false,
                      stream,
                    });

                    peerOutcome.signal(callerSignal);
                    peerOutcome
                      .on("signal", (outSignal) => {
                        socket.emit("CLIENT@ROOMS:ANSWER", {
                          targetUserId: callerUserId,
                          callerUserId: targetUserId,
                          roomId,
                          signal: outSignal,
                        });
                      })
                      .on("stream", (stream) => {
                        document.querySelector("video").srcObject = stream;
                        document.querySelector("video").play();
                      });
                  }
                );

                socket.on("SERVER@ROOMS:ANSWER", ({ callerUserId, signal }) => {
                  const obj = peers.find(
                    (obj) => Number(obj.id) === Number(callerUserId)
                  );
                  if (obj) {
                    obj.peer.signal(signal);
                  }
                });
              }
            });
          });

          socket.on("SERVER@ROOMS:LEAVE", (leaveUser: UserData) => {
            setUsers((prev) =>
              prev.filter((prevUser) => {
                const peerUser = peers.find(
                  (obj) => Number(obj.id) === Number(leaveUser.id)
                );
                if (peerUser) {
                  peerUser.peer.destroy();
                }
                return prevUser.id !== leaveUser.id;
              })
            );
          });
        })
        .catch(() => {
          console.error("Нет доступа к микрофону");
        });
    }

    return () => {
      peers.forEach((obj) => {
        obj.peer.destroy();
      });
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <video controls width={200} height={200} />
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
