import InputBox from "../Feed/InputBox";
import Posts from "../Feed/Posts";
import Stories from "../Feed/Stories";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { db } from "../../firebase";
import firebase from "firebase/app";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
function ChatBox({id}) {
  const [session] = useSession();
  const inputRef = useRef(null);
  const [realtimeComments, loading, error] = useCollection(
    db
      .collection("chats")
      .doc(id)
      .collection("chat")
      .orderBy("timestamp")
  );
  // console.log("id :>> ", id);
  const commentsRef = useRef("null");
  const scrollToBottom = () => {
    const scroll =
      commentsRef.current?.scrollHeight - commentsRef.current?.clientHeight;
    commentsRef.current?.scrollTo(0, scroll);
  };
  const sendComment = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    db.collection("chats")
      .doc(id)
      .collection("chat")
      .add({
        message: inputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    inputRef.current.value = "";
    scrollToBottom();
  };
  useEffect(() => {
    scrollToBottom();
  }, [realtimeComments]);
  return (
    <div className="flex flex-1 flex-col border-l-2 border-r-2 bg-white">
      {/* Chat message */}

      <div className="flex flex-1 bg-white">
        <div
          ref={commentsRef}
          className="flex flex-col w-full space-y-3  overflow-y-auto h-0 min-h-full px-10"
        >
          {realtimeComments?.docs.map((comment) => (
            <Chat
              email={comment.data().email}
              key={comment.id}
              name={comment.data().name}
              image={comment.data().image}
              message={comment.data().message}
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
          <button hidden type="submit" onClick={sendComment}>
            Submit
          </button>
        </form>
        <div
          onClick={sendComment}
          className="flex h-10 w-10 rounded-full text-blue-500 hover:bg-gray-200 justify-center items-center"
        >
          <i className="fal fa-paper-plane fa-lg"></i>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
