import { useSession } from "next-auth/client";
import InputBox from "../Feed/InputBox";
import ProfilePosts from "./ProfilePosts"

function ProfileMain() {
    const [session] = useSession();
  return (
    <div className="flex mt-32 flex-col bg-gray-100 ">
      {/* Head */}
      <div className="flex  space-x-4 ml-5">
        <div className="text-xl p-5 hover:text-blue-500 border-b-2 border-blue-500 cursor-pointer">
          Giới thiệu
        </div>
        <div className="text-xl p-5 hover:text-blue-500 cursor-pointer">
          Bài viết
        </div>
        <div className="text-xl p-5 hover:text-blue-500 cursor-pointer">
          Bạn bè
        </div>
      </div>
      {/* Main */}
      <div className=' flex flex-1 flex-col md:flex-row'>
        <div className="max-w-sm">
          <div className="flex flex-col space-y-3 border border-gray-400 rounded-xl p-3 mt-5">
            <div className="flex space-x-3 items-center p-1">
              <i class="fal fa-graduation-cap fa-2x text-gray-500"></i>
              <p>Học tại Học viện Công nghệ Bưu chính Viễn thông - PTIT</p>
            </div>
            <div className="flex space-x-3 items-center p-1">
              <i class="fad fa-house fa-2x text-gray-500"></i>
              <p>Sống tại Hưng Yên</p>
            </div>
            <div className="flex space-x-3 items-center p-1">
              <i class="fas fa-heart fa-2x text-gray-500"></i>
              <p>Độc thân</p>
            </div>
            <div className="flex space-x-3 items-center p-1">
              <i class="fas fa-rss fa-2x text-gray-500"></i>
              <p>Có 4 người theo dõi</p>
            </div>
            <div className="flex space-x-3 items-center p-1">
              <i class="fal fa-blog fa-2x text-gray-500"></i>
              <p>
                <a href="https://ndata.2k1.org/">ndata.2k1.org</a>
              </p>
            </div>
          </div>
          {/* main */}
        </div>
        <div className="flex-1 md:p-5">
          <InputBox />
          <ProfilePosts/>
        </div>
      </div>
    </div>
  );
}

export default ProfileMain;
