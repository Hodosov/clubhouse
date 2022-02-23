import { Button } from "@components/Button";
import { ConversationCard } from "@components/ConversationCard";
import { Header } from "@components/Header";
import { StartRoomModal } from "@components/StartRoomModal";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useState } from "react";
import { checkAuth } from "utils/checkAuth";
// import { Api } from "./api/userApi";

export default function RoomsPage({ rooms }) {
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
                  speakers={obj.avatars}
                  guests={obj.guests}
                  avatars={[]}
                  listenersCount={0}
                  // guestsCount={obj.guestsCount}
                  // speakersCount={obj.speakersCount}
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  try {
    const user = await checkAuth(ctx);
    if (!user) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }
    return {
      props: {
        user,
        rooms: [],
      },
    };
  } catch (error) {
    console.warn(error);
  }

  return { props: {} };
};
