import { Axios } from "@core/axios";
import { Header } from "@components/Header";
import { ButtonBack } from "@components/BackButton";
import { Room } from "@components/Room.tsx";

export default function ProfilePage({ room }) {
  return (
    <>
      <Header />
      <div className="container mt-40">
        <ButtonBack title="All roms" href="/rooms" />
        <Room title={room.title} />
      </div>
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  try {
    const { data } = await Axios.get("/rooms.json");
    const room = data.find((obj) => obj.id === query.id);
    return {
      props: {
        room,
      },
    };
  } catch (error) {
    console.warn(error);
  }

  return { props: {} };
};
