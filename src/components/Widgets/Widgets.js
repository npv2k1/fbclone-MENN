import { SearchIcon } from "@heroicons/react/outline";
import { DotsHorizontalIcon, VideoCameraIcon } from "@heroicons/react/solid";
import Contact from "./Contact";

const contacts = [
  { src: "https://links.papareact.com/l4v", name: "nguyen" },
  { src: "https://links.papareact.com/l4v", name: "nguyen" },
  { src: "https://links.papareact.com/l4v", name: "nguyen" },
  { src: "https://links.papareact.com/l4v", name: "nguyen" },
  { src: "https://links.papareact.com/l4v", name: "nguyen" },
];

function Widgets() {
  return (
    <div className="hidden lg:flex flex-col w-60 p2 mt-5">
      <div className="flex justify-between items-center text-gray-500 mb-5">
        <h2 className="text-xl ">Contacts</h2>
        <div className="flex space-x-2">
          <VideoCameraIcon className="h-6" />
          <SearchIcon className="h-6" />
          <DotsHorizontalIcon className="h-6" />
        </div>
      </div>
      {contacts.map((contact,i)=>(
          <Contact key={i} src={contact.src} name={contact.name} />
      ))}

    </div>
  );
}

export default Widgets;
