import { EmojiHappyIcon } from "@heroicons/react/outline";
import {
  UserIcon,
  AdjustmentsIcon,
  SupportIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
function DropdownMenu() {
  const [menu, setMenu] = useState("menu");
  return (
    <div>
      {menu == "menu" && (
        <div className="flex flex-col absolute top-26 mt-5 w-[300px] bg-white  transform translate-x-[-85%] rounded-lg shadow-lg p-4 space-y-4">
          <div className="flex items-center justify-start space-x-2">
            <UserIcon className="h-7 text-yellow-500 rounded-full" />
            <p className="text-lg sm:text-lg xl:text-2xl">Profile</p>
          </div>
          <div
            onClick={() => setMenu("setting")}
            className="flex items-center justify-start space-x-2"
          >
            <AdjustmentsIcon className="h-7 text-yellow-500 rounded-full" />
            <p className="text-lg sm:text-lg xl:text-2xl">Setting</p>
            <ArrowCircleRightIcon className="h-7 justify-self-end" />
          </div>
          <div className="flex items-center justify-start space-x-2">
            <SupportIcon className="h-7 text-yellow-500 rounded-full" />
            <p className="text-lg sm:text-lg xl:text-2xl">Support</p>
          </div>
        </div>
      )}
      {menu == "setting" && (
        <div className="flex flex-col absolute top-26 mt-5 w-[300px] bg-white  transform translate-x-[-85%] rounded-lg shadow-lg p-4 space-y-4">
          <div className="flex items-center justify-start space-x-2">
            <UserIcon className="h-7 text-yellow-500 rounded-full" />
            <p className="text-lg sm:text-lg xl:text-2xl">Back</p>
          </div>
          <div className="flex items-center justify-start space-x-2">
            <AdjustmentsIcon className="h-7 text-yellow-500 rounded-full" />
            <p className="text-lg sm:text-lg xl:text-2xl">Theme</p>
            <ArrowCircleRightIcon className="h-7 justify-self-end" />
          </div>
          <div className="flex items-center justify-start space-x-2">
            <SupportIcon className="h-7 text-yellow-500 rounded-full" />
            <p className="text-lg sm:text-lg xl:text-2xl">Accoune</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
