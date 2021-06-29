import InputBox from "../Feed/InputBox";
import Posts from "../Feed/Posts";
import Stories from "../Feed/Stories";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import firebase from "firebase/app";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
import { io } from "socket.io-client";
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
    <div className="flex flex-1 flex-col border-l-2 border-r-2 bg-white">
      {/* Chat message */}
      <div className="flex flex-1 bg-white">
        <div
          ref={commentsRef}
          className="flex flex-col w-full space-y-3  overflow-y-auto h-0 min-h-full px-10"
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
      <div className="flex px-10 py-3 space-x-2 items-center shadow-sm">
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
            className="rounded-full flex-grow focus:outline-none border bg-gray-100 p-2"
            type="text"
            placeholder="Enter chat..."
          />
          <button hidden type="submit" onClick={sendMessage}>
            Submit
          </button>
        </form>
        <div
          onClick={sendMessage}
          className="flex h-10 w-10 rounded-full text-blue-500 hover:bg-gray-200 justify-center items-center"
        >
          <i className="fal fa-paper-plane fa-lg"></i>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
