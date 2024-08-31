import { useEffect, useState } from "react";
import { FetchServerStats } from "../lib/Fetch";
import { IPlayers_list } from "../lib/Types";

const Players = () => {
  const [loading, setLoading] = useState(false);
  const [playerList, setPlayerList] = useState<IPlayers_list[]>();

  const GetData = async () => {
    setLoading(true);
    const data = await FetchServerStats();
    if (data) {
      setPlayerList(data.players_list); 
    }
    setLoading(false);
  };

  useEffect(() => {
    GetData();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="w-[600px] py-5 px-4 bg-black rounded-lg shadow-lg">
      {playerList && playerList.length > 0 ? (
        <ul className="space-y-4">
          {playerList.map((player, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700"
            >
              <div className="flex items-center space-x-4">
                <div className="text-white font-semibold">{player.name}</div>
              </div>
              <div className="text-gray-400">
                {`${(player.time! / 60 / 60).toFixed()} Hours: active`}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-white text-center">No players online</div>
      )}
    </div>
  );
};

export default Players;
