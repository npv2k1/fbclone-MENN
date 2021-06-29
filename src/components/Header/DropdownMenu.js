import { EmojiHappyIcon } from "@heroicons/react/outline";
import {
  UserIcon,
  AdjustmentsIcon,
  SupportIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";
import { useEffect, useRef, useState } from "react";
import MenuItem from "./MenuItem";
import { useRouter } from "next/router";
function DropdownMenu({ active, changeActive }) {
   const router = useRouter();
  const [menu, setMenu] = useState("menu");
  const dropdownMenuRef = useRef(null);

  // hook active when active change
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(e.target)
      ) {
        if (active) changeActive(false);
      }
    };
    // add click even for page
    document.addEventListener("click", handleOutsideClick, false);
    return () => {
      // remove click even for page !importan need remove
      document.removeEventListener("click", handleOutsideClick, false);
    };
  }, [active]);
  return (
    <div ref={dropdownMenuRef} className={active ? "flex" : "hidden"}>
      {menu == "menu" && (
        <div className="flex flex-col absolute top-26 mt-5 w-[300px] bg-white  transform translate-x-[-85%] rounded-lg shadow-lg p-4 space-y-4">
          <div onClick={()=>{router.push('/profile');}} className="flex items-center justify-start space-x-2 hover:bg-gray-200 rounded-lg p-3">
            <i className="far fa-user-circle fa-2x"></i>
            <p className="text-lg sm:text-lg xl:text-2xl">Profile</p>
          </div>
          <div
            onClick={(e) => {
              setMenu("setting");
              e.stopPropagation(); // ngăn việc truyền e tiếp.
            }}
            className="flex items-center justify-start space-x-2 hover:bg-gray-200 rounded-lg p-3"
          >
            <i className="fal fa-cog fa-2x"></i>
            <p className="text-lg sm:text-lg xl:text-2xl">Setting</p>
          </div>

          <MenuItem Icon="fal fa-sign-out-alt fa-2x" text="Logout" />
        </div>
      )}
      {menu == "setting" && (
        <div className="flex flex-col absolute top-26 mt-5 w-[300px] bg-white  transform translate-x-[-85%] rounded-lg shadow-lg p-4 space-y-4">
          <div
            onClick={(e) => {
              setMenu("menu");
              e.stopPropagation();
            }}
            className="flex items-center justify-start space-x-2"
          >
            <i className="fal fa-arrow-left fa-2x"></i>
            <p className="text-lg sm:text-lg xl:text-2xl">Back</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
