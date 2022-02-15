import { Button } from "@components/Button";
import { ConversationCard } from "@components/ConversationCard";
import { Header } from "@components/Header";
import Link from "next/link";
import Axios from "@core/axios";

export default function RoomsPage({ rooms }) {
  return (
    <>
      <Header />
      <div className="container">
        <div className="mt-40 d-flex align-items-center justify-content-between">
          <h1>All conversations</h1>
          <Button color="green">+ Start room</Button>
        </div>
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

export const getServerSideProps = async () => {
  try {
    const { data: rooms } = await Axios.get("/rooms.json");
    return {
      props: {
        rooms,
      },
    };
  } catch (error) {
    console.warn(error);
  }

  return { props: {} };
};
