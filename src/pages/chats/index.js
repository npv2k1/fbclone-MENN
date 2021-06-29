import { getSession } from "next-auth/client";
import Head from "next/head";

import Feed from "../../components/Feed/Feed";
import Header from "../../components/Header/Header";

import ChatsInfo from "../../components/chats/ChatsInfo";
import ChatBox from "../../components/chats/ChatBox";
import Sidebar from "../../components/chats/Sidebar";

import Widgets from "../../components/Widgets/Widgets";
import { db } from "../../firebase";
import axios from "axios";

function chats({ listChats }) {
  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook</title>
      </Head>

      {/* Header */}
      <Header />

      <main className="flex flex-1">
        {/* Side bar */}
        <Sidebar listChats={listChats} />
        {/* <ChatBox /> */}
        {/* <ChatsInfo /> */}
      </main>
    </div>
  );
}

export default chats;
export async function getServerSideProps(context) {
  // Get the user
  const session = await getSession(context);
  const posts = await db.collection("posts").orderBy("timestamp", "desc").get();
  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }));
  const listChats = JSON.parse(JSON.stringify(context.query.listChats)); //|| await axios.get("http://localhost:3000/api/chats").then((res) => res.data);
  // const listChats = context.query.listChats
  return {
    props: { session, posts: docs, listChats },
  };
}
