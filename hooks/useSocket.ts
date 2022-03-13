import { useRef } from "react";
import io, { Socket } from "socket.io-client";

export const useSocket = () => {
  const socketRef = useRef<Socket>();
  socketRef.current = io("http://192.168.0.143:5051");
  return socketRef.current;
};
