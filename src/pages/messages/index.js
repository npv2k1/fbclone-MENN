import { getSession } from "next-auth/client";
import Head from "next/head";

import Feed from "../../components/Feed/Feed";
import Header from "../../components/Header/Header";

import ChatsInfo from "../../components/messages/ChatsInfo";
import ChatBox from "../../components/messages/ChatBox";
import Sidebar from "../../components/messages/Sidebar";

import Widgets from "../../components/Widgets/Widgets";
import { db } from "../../firebase";

function messages() {
  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook</title>
      </Head>

      {/* Header */}
      <Header />

      <main className="flex flex-1">
        {/* Side bar */}
        <Sidebar />
        <ChatBox />
        <ChatsInfo />
      </main>
    </div>
  );
}

export default messages;
export async function getServerSideProps(context) {
  // Get the user
  const session = await getSession(context);
  const posts = await db.collection("posts").orderBy("timestamp", "desc").get();
  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }));

  return {
    props: { session, posts: docs },
  };
}
