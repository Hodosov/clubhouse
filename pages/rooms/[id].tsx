import { Header } from "@components/Header";
import { ButtonBack } from "@components/BackButton";
import { Room } from "@components/Room.tsx";
import { Api } from "pages/api";
import { wrapper } from "redux/store";
import { checkAuth } from "utils/checkAuth";

export default function RoomPage({ room }) {
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
