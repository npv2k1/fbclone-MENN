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
import { useRef, useState } from "react";
import { useRouter } from "next/router";
function Sidebar() {
  const [session] = useSession();
  const inputRef = useRef(null);
  const filepickerRef = useRef(null);

  const [imageToPost, setImageToPost] = useState(null);
  const [chatsList, loading, error] = useCollection(db.collection("chats").orderBy("timestamp", "desc"));

  const [activeAddChat,setActiveAddChat] = useState(false);

  const sendPost = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    db.collection("chats")
      .add({
        chatName: inputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storage
            .ref(`chats/${doc.id}`)
            .putString(imageToPost, "data_url");
          removeImage();
          uploadTask.on(
            "state_change",
            null,
            (error) => console.error(error),
            () => {
              //when upload complete
              storage
                .ref("chats")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("chats").doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });
    inputRef.current.value = "";
    setActiveAddChat(false)
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
  const router = useRouter()

  return (
    <div className="hidden md:flex flex-col p-2 mt-0 max-w-[600px] xl:min-w-[310px] space-y-3 bg-white">
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
          <div onClick={()=>setActiveAddChat(pre=>!pre)} className="rounded-full w-10 h-10 bg-gray-100 items-center text-center p-2 hover:bg-gray-300">
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
        <div className={`${activeAddChat?"flex":"hidden"} space-x-2 border items-center rounded-lg p-3 `}>
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
      <div className="flex-1 space-y-3 ">
        {chatsList?.docs.map((chat) => (
          <div
            className="flex cursor-pointer space-x-2 bg-gray-200 items-center hover:bg-gray-200 rounded-lg p-3 "
            key={chat.id}
            onClick={()=>router.push(`/messages/${chat.id}`)}
          >
            <Image
              src={chat.data().postImage || session.user.image}
              width={40}
              height={40}
              layout="fixed"
              className="rounded-full"
            />
            <p>{chat.data().chatName || "chat No name"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
