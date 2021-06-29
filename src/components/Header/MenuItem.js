function MenuItem({ Icon, text }) {
  return (
    <div className="flex items-center justify-start space-x-2 hover:bg-gray-200 rounded-lg p-3">
      <i className={Icon}></i>
      <p className="text-lg sm:text-lg xl:text-2xl">{text}</p>
    </div>
  );
}

export default MenuItem;
