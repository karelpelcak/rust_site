import { Link, Outlet, useLocation } from "react-router-dom";

const Players = () => {
  const location = useLocation();
  const actualPage = location.pathname.split("/")[2];

  return (
    <div>
      <div className="w-[600px] text-white flex flex-row gap-5 justify-center py-5 px-4 mb-2 bg-black rounded-lg">
        <Link
          to="live"
          className={`p-4 rounded-lg border border-gray-700 ${
            actualPage === "live" ? "bg-gray-900" : "bg-gray-800"
          }`}
        >
          <h1>Live Players</h1>
        </Link>
        <Link
          to="pvp"
          className={`p-4 rounded-lg border border-gray-700 ${
            actualPage === "pvp" ? "bg-gray-900" : "bg-gray-800"
          }`}
        >
          <h1>Other Players</h1>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Players;
