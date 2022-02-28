import { Button } from "@components/Button";
import { ConversationCard } from "@components/ConversationCard";
import { Header } from "@components/Header";
import { StartRoomModal } from "@components/StartRoomModal";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { checkAuth } from "utils/checkAuth";
import { Api } from "./api";
import { Room } from "./api/roomApi";

interface RoomPageProps {
  rooms: Room[];
}

const RoomsPage: NextPage<RoomPageProps> = ({ rooms }) => {
  const [viisbleModal, setVisibleModal] = useState(false);

  return (
    <>
      <Header />
      <div className="container">
        <div className="mt-40 d-flex align-items-center justify-content-between">
          <h1>All conversations</h1>
          <Button onClick={() => setVisibleModal(true)} color="green">
            + Start room
          </Button>
        </div>
        {viisbleModal && (
          <StartRoomModal onClose={() => setVisibleModal(false)} />
        )}
        <div className="grid mt-20">
          {rooms?.map((obj) => (
            <Link href={`/rooms/${obj.id}`} key={obj.id}>
              <a>
                <ConversationCard
                  title={obj.title}
                  speakers={obj.speakers}
                  avatars={[]}
                  listenersCount={obj.listenersCount}
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  RoomPageProps | {}
> = async (ctx) => {
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

    const rooms = await Api(ctx).getRooms();

    return {
      props: {
        rooms,
      },
    };
  } catch (error) {
    console.warn(error);
  }
};

export default RoomsPage;
