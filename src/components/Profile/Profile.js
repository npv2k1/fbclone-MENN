import InputBox from "../Feed/InputBox";
import Posts from "../Feed/Posts";
import Stories from "../Feed/Stories";
import ProfileHeader from "./ProfileHeader";
import ProfileMain from "./ProfileMain";


function Profile({ posts }) {
  return (
    <div className="flex-grow h-screen ml-4  pb-44 pt-6 mr-4 overflow-y-auto scrollbar-hide">
      <div className="mx-auto bg-white max-w-6xl">
        <ProfileHeader />
        <ProfileMain />
      </div>
    </div>
  );
}

export default Profile;
