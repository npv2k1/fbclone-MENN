import Image from "next/image";
import { useSession } from "next-auth/client";

function ProfileHeader() {
  const [sessicon]  = useSession();
  return (
    <div className="flex bg-white">
      <div className="relative w-full h-48 md:h-96 bg-white">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/fbclone-ca564.appspot.com/o/posts%2Ff5256f22b9dea5d4eb80c41f91f87793.jpg?alt=media&token=629bb978-8720-4be5-bd11-81078eaf6d31"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute ml-14 -bottom-14 md:ml-32 md:-bottom-24 flex items-end space-x-3">
          <img
            className="rounded-full h-28 w-28 object-cover md:h-48 md:w-48"
            src="https://firebasestorage.googleapis.com/v0/b/fbclone-ca564.appspot.com/o/posts%2FmXWAkkNfl5AkhRbPAGV2?alt=media&token=b47436ae-4edd-4501-b1b1-c3e0c11876f5"
          />
          <h1 className="text-2xl  md:text-6xl font-bold font-serif text-gray-800">
            Nguyen Van
          </h1>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
