import { useEffect, useState } from "react";
import { IServerStats } from "../lib/Types";
import { FetchServerStats } from "../lib/Fetch";
import toast from "react-hot-toast";

const ServerStats = () => {
  const [dataRes, setDataRes] = useState<IServerStats>();
  const [loading, setLoading] = useState(false);

  const GetData = async () => {
    setLoading(true);
    const data = await FetchServerStats();
    if (data) {
      setDataRes(data);
    }
    setLoading(false);
  };

  const ClickToCopy = () => {
    const copyText = "connect 185.180.2.15:27552";
    navigator.clipboard.writeText(copyText);
    toast.success('Successfully copied connection command')
  };

  useEffect(() => {
    GetData();
  }, []);


  return (
    <div className="p-6">
      {loading ? (
        <div className="text-white text-center">Loading...</div>
      ) : (
        <div className="mx-auto p-6 bg-gradient-to-t from-black via-gray-900 to-black rounded-lg shadow-lg text-center">
          {dataRes && (
            <>
              <h1 className="text-2xl font-extrabold text-white mb-2">{dataRes.hostname}</h1>
              <h3 className="text-md text-gray-400 mb-4">{dataRes.map}</h3>
              <h3
                className={`text-md font-semibold mb-4 ${
                  dataRes.status === "Online" ? "text-green-500" : "text-red-500"
                }`}
              >
                {dataRes.status}
              </h3>
              <div className="flex flex-row items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                <h1 className="text-xl font-bold text-white">{dataRes.players}</h1>
                <div className="relative bg-gray-700 h-[30px] w-[70%] rounded-lg">
                  <div
                    className={`bg-red-500 h-full rounded-lg`}
                    style={{
                      width: `${(100 / parseInt(dataRes.slots)) * parseInt(dataRes.players)}%`,
                    }}
                  ></div>
                </div>
                <h1 className="text-xl font-bold text-white">{dataRes.slots}</h1>
              </div>
              <button
                onClick={ClickToCopy}
                className="mt-4 py-2 px-4 bg-[#3e4c28] text-[#76983c] rounded-lg shadow-md hover:bg-[#4f6b39] transition-colors"
              >
                JOIN SERVER
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ServerStats;
