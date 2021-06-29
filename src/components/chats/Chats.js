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
function Chats() {
  const [session] = useSession();
  const inputRef = useRef(null);
  const [realtimeComments, loading, error] = useCollection(
    db
      .collection("posts")
      .doc("mXWAkkNfl5AkhRbPAGV2")
      .collection("comments")
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
    db.collection("posts")
      .doc("mXWAkkNfl5AkhRbPAGV2")
      .collection("comments")
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
    <div className="flex-1 border-l-2 border-r-2 overflow-y-auto scrollbar-hide bg-white">
      <div className="flex flex-col w-full pb-28 bg-white space-y-3">
        {/* Chat message */}
        <div
          ref={commentsRef}
          className="flex flex-col space-y-3 flex-1 overflow-y-auto px-10"
        >
          {/* {realtimeComments?.docs.map((comment) => (
            <Chat
              email={comment.data().email}
              key={comment.id}
              name={comment.data().name}
              image={comment.data().image}
              message={comment.data().message}
            />
          ))} */}
        </div>
        {/* Input */}
        <div className="flex px-3 space-x-2 items-center">
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
              placeholder="Enter your comment"
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
    </div>
  );
}

export default Chats;
