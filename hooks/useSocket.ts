import { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

export const useSocket = () => {
  const socketRef = useRef<Socket>();
  if (!socketRef.current) {
    socketRef.current =
      typeof window !== "undefined" && io("http://192.168.0.143:5051");
  } else {
    socketRef.current.connect();
  }

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);
  return socketRef.current;
};
