const Toast = ({ message, type }) => {
  if (!message) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 rounded px-4 py-3 text-white shadow-lg
        ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
    >
      {message}
    </div>
  );
};

export default Toast;
