import { useSession } from "next-auth/client";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import Post from "../Feed/Post";


function ProfilePosts({ posts }) {
    const [session] = useSession();
    console.log('session :>> ', session.user.email);
  const [realtimePosts, loading, error] = useCollection(
    db.collection("posts").where("email","==",session.user.email).orderBy("timestamp", "desc")
  );
  return (
    <div>
      {realtimePosts
        ? realtimePosts?.docs.map((post) => (
            <Post
              id={post.id}
              key={post.id}
              name={post.data().name}
              message={post.data().message}
              email={post.data().email}
              timestamp={post.data().timestamp}
              image={post.data().image}
              postImage={post.data().postImage}
            />
          ))
        : posts?.map((post) => (
            <Post
              key={post.id}
              name={post.name}
              message={post.message}
              email={post.email}
              timestamp={post.timestamp}
              image={post.image}
              postImage={post.postImage}
            />
          ))}
    </div>
  );
}

export default ProfilePosts;
