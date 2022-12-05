import { useSession } from "next-auth/client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";
const socket = io("localhost:3000", { transports: ["websocket"] });

function ChatBox({ id }) {
  const [session] = useSession();
  const inputRef = useRef(null);
  const [mess, setMess] = useState([]);

  // console.log("id :>> ", id);
  const commentsRef = useRef("null");
  const scrollToBottom = () => {
    const scroll =
      commentsRef.current?.scrollHeight - commentsRef.current?.clientHeight;
    commentsRef.current?.scrollTo(0, scroll);
  };
  socket.on("messages:create:res", (res) => {
    // console.log('res :>> ', res);
  });
  socket.on("messages:connected:res", (res) => {
    console.log(res);
    setMess(res);
  });
  useEffect(() => {
    socket.emit("messages:connected", { chatId: id });
  }, []);
  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;

    socket.emit("messages:create", {
      chatId: id,
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: Date.now(),
    });

    inputRef.current.value = "";
    scrollToBottom();
    socket.emit("messages:connected", { chatId: id });
  };
  useEffect(() => {
    scrollToBottom();
  }, [mess]);
  return (
    <div className="flex flex-col flex-1 bg-white border-l-2 border-r-2">
      {/* Chat message */}
      <div className="flex flex-1 bg-white">
        <div
          ref={commentsRef}
          className="flex flex-col w-full h-0 min-h-full px-10 space-y-3 overflow-y-auto"
        >
          {mess.map((message) => (
            <Chat
              email={message.email}
              key={message._id}
              name={message.name}
              image={message.image}
              message={message.message}
            />
          ))}
        </div>
      </div>
      {/* Input */}
      <div className="flex items-center px-10 py-3 space-x-2 shadow-sm">
        <Image
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
          className="rounded-full"
        />

        <form className="flex flex-1">
          <input
            ref={inputRef}
            className="flex-grow p-2 bg-gray-100 border rounded-full focus:outline-none"
            type="text"
            placeholder="Enter chat..."
          />
          <button hidden type="submit" onClick={sendMessage}>
            Submit
          </button>
        </form>
        <div
          onClick={sendMessage}
          className="flex items-center justify-center w-10 h-10 text-blue-500 rounded-full hover:bg-gray-200"
        >
          <i className="fal fa-paper-plane fa-lg"></i>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
