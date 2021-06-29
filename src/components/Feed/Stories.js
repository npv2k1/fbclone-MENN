import StoryCard from "./StoryCard";

const stories = [
  {
    name: "nguyen",
    src: "https://links.papareact.com/zof",
    profile: "https://links.papareact.com/l4v",
  },
  {
    name: "nguyen",
    src: "https://links.papareact.com/zof",
    profile: "https://links.papareact.com/l4v",
  },
  {
    name: "nguyen",
    src: "https://links.papareact.com/zof",
    profile: "https://links.papareact.com/l4v",
  },
  {
    name: "nguyen",
    src: "https://links.papareact.com/zof",
    profile: "https://links.papareact.com/l4v",
  },
  {
    name: "nguyen",
    src: "https://links.papareact.com/zof",
    profile: "https://links.papareact.com/l4v",
  }
];
function Stories() {
  return (
    <div className="flex justify-center space-x-3 mx-auto">
      {stories.map((story,i) => (
        <StoryCard
          key={i}
          name={story.name}
          src={story.src}
          profile={story.profile}
        />
      ))}
    </div>
  );
}

export default Stories;
