import { Header } from "@components/Header";
import { ButtonBack } from "@components/BackButton";
import { Room } from "@components/Room.tsx";
import { Api } from "pages/api";
import { wrapper } from "redux/store";
import { checkAuth } from "utils/checkAuth";

import io, { Socket } from "socket.io-client";
import { useEffect, useRef } from "react";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { useRouter } from "next/router";

export default function RoomPage({ room, user }) {
  const router = useRouter();
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      socketRef.current = io("http://192.168.0.143:5051");

      socketRef.current.emit("CLIENT@ROOMS:JOIN", {
        roomId: router.query.id,
        user,
      });

      socketRef.current.on("SERVER@ROOMS:JOIN", (user) => console.log(user));
    }
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-40">
        <ButtonBack title="All roms" href="/rooms" />
        <Room title={room?.title} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    const user = await checkAuth(ctx);
    if (!user) {
      return {
        props: {},
        redirect: {
          destination: "/",
        },
      };
    }
    const roomId = ctx.query.id;
    const room = await Api(ctx).getRoom(roomId.toString());

    return {
      props: {
        room,
        user,
      },
    };
  } catch (error) {
    console.warn(error);
    return {
      props: {},
      redirect: {
        destination: "/rooms",
      },
    };
  }
});
