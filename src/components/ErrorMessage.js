function ErrorMessage({ message }) {
  if (message) {
    return (
      <label
        className="block text-red-200 text-xs mb-2"
        htmlFor="grid-password"
      >
        {message}
      </label>
    );
  }
  return <></>;
}

export default ErrorMessage;
