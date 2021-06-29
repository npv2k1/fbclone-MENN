import { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("localhost:3000", { transports: ["websocket"] });

socket.on("serverSendWord", (data) => {
  store.dispatch({ type: "PLAY_UPDATE", payload: data });
});

function Test() {
  useEffect(() => {
    socket.emit("clientSendWord", "Hello");
  });
  return <div>Hello</div>;
}

export default Test;
