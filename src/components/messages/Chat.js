import { useSession } from "next-auth/client";

function Chat({ email, name, image, message }) {
  const [session] = useSession();
  if (email === session.user.email) {
    return (
      <div className="flex items-center space-x-2 ml-auto">
        <div className="bg-gray-200 rounded-2xl p-2">
          <h2 className="text-sm font-bold">{name}</h2>
          <p className="break-all max-w-xs">{message}</p>
        </div>
        <img
          className="rounded-full"
          src={image}
          width={40}
          height={40}
          alt="Profile Image"
        />
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex items-center space-x-2 mr-auto ">
          {/* <Image
            src={image}
            width={40}
            height={40}
            layout="fixed"
            className="rounded-full"
          /> */}
          <img
            className="rounded-full"
            src={image}
            width={40}
            height={40}
            alt="Profile Image"
          />
          <div className="bg-gray-200 rounded-2xl p-2">
            <h2 className="text-sm font-bold">{name}</h2>
            <p className="break-all max-w-xs">{message}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
