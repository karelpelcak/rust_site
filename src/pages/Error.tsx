const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center border-2 border-red-500">
        <h1 className="text-7xl font-extrabold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist.
        </p>
        <a
          className="px-6 py-3 bg-red-500 text-white font-medium rounded-full shadow-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
          href="/"
        >
          Return Home
        </a>
      </div>
    </div>
  );
};

export default Error;
