import { AxiosInstance } from "axios";
interface Room {
  title: string;
  listenesrCount: number;
  speakers: any[];
}

type RoomType = "open" | "social" | "closed";

export const RoomApi = (instance: AxiosInstance) => {
  return {
    getRooms: async (): Promise<Room> => {
      const { data } = await instance.get("/rooms");
      return data;
    },

    getRoom: async (id: number): Promise<Room> => {
      const { data } = await instance.get(`/rooms/${id}`);
      return data;
    },

    createRoom: async (title: string, type: RoomType): Promise<Room> => {
      const { data } = await instance.post(`/rooms`, { title, type });
      return data;
    },

    deleteRoom: async (id: number): Promise<Room> =>
      await instance.delete(`/rooms/${id}`),
  };
};
