import Image from "next/image";

import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import { signOut, useSession } from "next-auth/client";
import DropdownMenu from "./DropdownMenu";
import { useEffect, useRef, useState } from "react";
import { Router, useRouter } from "next/router";

function Header() {
  const [session] = useSession();
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const router = useRouter()

  return (
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
      {/* Left */}
      <div className="flex items-center">
        <Image
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
          layout="fixed"
        />
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className="hidden md:inline-flex ml-1 items-center bg-transparent outline-none placeholder-gray-500  flex-shrink"
            type="text"
            placeholder="Search Facebook"
          />
        </div>
      </div>
      {/* Center */}
      <div className="flex justify-center flex-grow">
        <div className="hidden md:flex space-x-3">
          <HeaderIcon
            active
            Icon={HomeIcon}
            onClick={() => {
              router.push("/");
            }}
          />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>
      {/* Right */}
      <div className="flex items-center sm:space-x-2 justify-end">
        {/* Profile pic */}

        <div className="flex items-center space-x-3 hover:bg-gray-100 rounded-full cursor-pointer">
          <Image
            onClick={signOut}
            className="rounded-full cursor-pointer"
            src={session.user.image}
            width={40}
            height={40}
            layout="fixed"
          />
          <p className="whitespace-nowrap font-semibold pr-3">
            {session.user.name}
          </p>
        </div>

        <ViewGridIcon className="icon" />
        <ChatIcon
          className="icon"
          onClick={() => {
            router.push("/messages");
          }}
        />
        <BellIcon className="icon" />
        <div>
          <ChevronDownIcon
            onClick={() => setShowDropdownMenu((prevState) => !prevState)}
            className="icon"
          />
          <DropdownMenu
            active={showDropdownMenu}
            changeActive={setShowDropdownMenu}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
