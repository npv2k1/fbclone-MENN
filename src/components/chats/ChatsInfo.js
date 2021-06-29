import { SearchIcon } from "@heroicons/react/outline";
import { DotsHorizontalIcon, VideoCameraIcon } from "@heroicons/react/solid";
import Contact from "./Contact";

const contacts = [
  { src: "https://links.papareact.com/l4v", name: "nguyen" },
  { src: "https://links.papareact.com/l4v", name: "nguyen" },
  { src: "https://links.papareact.com/l4v", name: "nguyen" },
  { src: "https://links.papareact.com/l4v", name: "nguyen" },
  { src: "https://links.papareact.com/l4v", name: "nguyen" },
];
import Image from "next/image";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
function ChatsInfo({ id }) {
   const [realtimeChatinfo, loading, error] = useCollection(
     db.collection("chats").doc(id)
   );
   console.log('realtimeChatinfo?.docs :>> ', realtimeChatinfo?.data());
  // db.collection("chats")
  //   .doc(id)
  //   .get()
  //   .then((doc) => {
  //     if (doc.exists) {
  //       console.log("Document data:", doc.data());
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   })
  //   .catch((error) => {
  //     console.log("Error getting document:", error);
  //   });
  return (
    <div className="hidden lg:flex bg-white flex-col w-[310px] p-5">
      <div className="flex justify-between items-center text-gray-500 mb-5">
        <h2 className="text-xl ">Chat</h2>
        <div className="flex space-x-3">
          <VideoCameraIcon className="h-6" />
          <SearchIcon className="h-6" />
          <DotsHorizontalIcon className="h-6" />
        </div>
      </div>
      <div className="flex flex-col items-center space-y-3">
        {realtimeChatinfo?.data()?.postImage ? (
          <img
            src={realtimeChatinfo?.data().postImage}
            layout="fixed"
            className="rounded-full w-20 h-20 shadow-sm"
          />
        ) : (
          <i className="  w-20 h-20 far fa-users fa-5x"></i>
        )}

        <h1 className="text-3xl font">
          {realtimeChatinfo?.data()?.chatName || "..."}
        </h1>
      </div>
      {/* Chat option */}
      <div>
        <div className="flex space-x-3 items-center p-2 hover:bg-gray-100 rounded-full">
          <div className="flex rounded-full w-10 h-10 bg-white text-center items-center justify-center ">
            <i className="fad fa-cog fa-lg"></i>
          </div>
          <p>Chat setting</p>
        </div>
        <div className="flex space-x-3 items-center p-2 hover:bg-gray-100 rounded-full">
          <div className="flex rounded-full w-10 h-10 bg-white text-center items-center justify-center ">
            <i className="fad fa-users fa-lg"></i>
          </div>
          <p>Member</p>
        </div>
        <div className="flex space-x-3 items-center p-2 hover:bg-gray-100 rounded-full">
          <div className="flex rounded-full w-10 h-10 bg-white text-center items-center justify-center ">
            <i className="fad fa-file-image fa-lg"></i>
          </div>
          <p>File</p>
        </div>
      </div>
    </div>
  );
}

export default ChatsInfo;
