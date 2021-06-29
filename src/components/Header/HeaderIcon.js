import { useRouter } from "next/router";

function HeaderIcon({ Icon, active ,...props}) {
  const router  = useRouter()
  return (
    <div onClick={props.onClick} className="flex items-center cursor-pointer md:px-5 sm:h-14 lg:px-8 xl:px-10 md:hover:bg-gray-100 rounded-xl active:border-b-2 active:border-blue-500 group">
      <Icon
        className={`h-5 text-center sm:h-7 mx-auto group-hover:text-blue-500 ${
          active ? "text-blue-500" : "text-gray-500"
        }`}
      />
    </div>
  );
}

export default HeaderIcon;
