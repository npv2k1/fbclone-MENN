import { useSession } from "next-auth/client";
import {
  ChevronDownIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import {
  CalendarIcon,
  ClockIcon,
  DesktopComputerIcon,
  UserIcon,
} from "@heroicons/react/solid";
import SidebarRow from "./SidebarRow";
import Image from "next/image";
import { useCollection } from "react-firebase-hooks/firestore";

import { db, storage } from "../../firebase";
import firebase from "firebase/app";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { io } from "socket.io-client";
const socket = io("localhost:3000", { transports: ["websocket"] });
socket.on("chats:create:res", (mess) => {
  // console.log(mess);
});

function Sidebar({ listChats }) {
  const [session] = useSession();
  const inputRef = useRef(null);
  const filepickerRef = useRef(null);

  const [imageToPost, setImageToPost] = useState(null);
  const [chatsList, setChatsList] = useState([]);

  const [activeAddChat, setActiveAddChat] = useState(false);
  // socket.on("chats:connected:res", (mess) => {
  //   // console.log(mess);
  //   setChatsList(mess);
  // });
  useEffect(() => {
    socket.emit("chats:connected");
    setChatsList(listChats);
  }, [listChats]);

  const sendPost = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    socket.emit("chats:create", {
      chatName: inputRef.current.value,
      image: "",
    });
    inputRef.current.value = "";
    setActiveAddChat(false);
    socket.emit("chats:connected");
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };
  const router = useRouter();

  return (
    <div className="hidden md:flex flex-col p-2 mt-0 pb-32 min-w-[300px] max-w-[600px] min-h-full h-0 xl:min-w-[310px] space-y-3 bg-white">
      {/* Top*/}
      <div className="flex items-center space-x-3 w-full">
        <Image
          className="rounded-full cursor-pointer "
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <h2 className="text-lg font-bold flex-grow ">Chat</h2>
        <div className="flex space-x-1">
          <div className="rounded-full w-10 h-10 bg-gray-100 items-center text-center p-2 hover:bg-gray-300">
            <i className="fas fa-ellipsis-h"></i>
          </div>
          <div className="rounded-full w-10 h-10 bg-gray-100 items-center text-center p-2 hover:bg-gray-300">
            <i className="fad fa-video"></i>
          </div>
          <div
            onClick={() => setActiveAddChat((pre) => !pre)}
            className="rounded-full w-10 h-10 bg-gray-100 items-center text-center p-2 hover:bg-gray-300"
          >
            <i className="fas fa-plus"></i>
          </div>
        </div>
      </div>
      {/* Search */}
      <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
        <SearchIcon className="h-6 text-gray-600" />
        <input
          className="hidden md:inline-flex ml-1 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink"
          type="text"
          placeholder="Search Chat"
        />
      </div>

      {/* Add chat form */}
      <div>
        <div
          className={`${
            activeAddChat ? "flex" : "hidden"
          } space-x-2 border items-center rounded-lg p-3 `}
        >
          <Image
            onClick={() => filepickerRef.current.click()}
            src={imageToPost || session.user.image}
            width={40}
            height={40}
            layout="fixed"
            className="rounded-full cursor-pointer"
          />
          <form action="">
            <input
              ref={inputRef}
              className="bg-gray-200 rounded-full p-2 focus:outline-none"
              type="text"
              placeholder="Enter Chatname"
            />
            <button hidden type="submit" onClick={sendPost}>
              Submit
            </button>
            <input
              ref={filepickerRef}
              onChange={addImageToPost}
              type="file"
              hidden
            />
          </form>
        </div>
      </div>
      {/* Chats list */}
      <div className="flex-1 space-y-3 overflow-y-auto scrollbar-hide ">
        {chatsList?.map((chat) => (
          <div
            className="flex cursor-pointer space-x-2 bg-gray-200 items-center hover:bg-gray-200 rounded-lg p-3 "
            key={chat._id}
            onClick={() => router.push(`/chats/${chat._id}`)}
          >
            <Image
              src={chat.image || session.user.image}
              width={40}
              height={40}
              layout="fixed"
              className="rounded-full"
            />
            <p>{chat.chatName || "chat No name"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
