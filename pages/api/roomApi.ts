import { AxiosInstance } from "axios";
import { UserData } from "pages";

interface Room {
  title: string;
  listenesrCount: number;
  speakers: any[];
}

type RoomType = "open" | "social" | "closed";

export const RoomApi = (instance: AxiosInstance) => {
  return {
    getAll: async (): Promise<Room> => {
      const { data } = await instance.get("/rooms");
      return data;
    },

    get: async (id: number): Promise<Room> => {
      const { data } = await instance.get(`/rooms/${id}`);
      return data;
    },

    create: async (title: string, type: RoomType): Promise<Room> => {
      const { data } = await instance.post(`/rooms`, { title, type });
      return data;
    },

    delete: async (id: number): Promise<Room> =>
      await instance.delete(`/rooms/${id}`),
  };
};
