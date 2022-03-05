import { Button } from "@components/Button";
import { ConversationCard } from "@components/ConversationCard";
import { Header } from "@components/Header";
import { StartRoomModal } from "@components/StartRoomModal";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { setRooms } from "redux/slices/roomsSlice";
import { selectRooms } from "redux/selectors";
import { wrapper } from "redux/store";
import { checkAuth } from "utils/checkAuth";
import { Api } from "./api";
import { Room } from "./api/roomApi";
import { setUser } from "redux/slices/userSlice";

const RoomsPage: NextPage = () => {
  const [viisbleModal, setVisibleModal] = useState(false);
  const rooms = useSelector(selectRooms);

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
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(async (ctx) => {
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
      ctx.store.dispatch(setRooms(rooms));
      ctx.store.dispatch(setUser(user));

      return {
        props: {},
      };
    } catch (error) {
      console.warn(error);
    }
  });

export default RoomsPage;
