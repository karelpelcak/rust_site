import { useEffect, useState } from "react";
import { IPlayerInfo, IResStats, IStatistics, ISteamAPIResponse } from "../lib/Types";

const PVPStats = () => {
  const [data, setData] = useState<IResStats[] | null>(null);
  const [stats, setStats] = useState<IStatistics[] | null>(null);
  const [playerStats, setPlayerStats] = useState<IPlayerInfo[]>([]);

  const areStatisticsEqual = (stats1: IStatistics, stats2: IStatistics) => {
    return JSON.stringify(stats1) === JSON.stringify(stats2);
  };

  const FetchUsersData = async () => {
    try {
      const response = await fetch("http://localhost:6113/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        const err = await response.json();
        console.error("Error fetching data:", err);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const FetchSteamID = async (UserId: string) => {
    try {
      const response = await fetch(`http://localhost:6113/api/steam/${UserId}`);
      if (response.ok) {
        const data: ISteamAPIResponse = await response.json();
        return data;
      } else {
        const errorText = await response.text();
        console.error("Error fetching Steam ID:", errorText);
        return null;
      }
    } catch (error) {
      console.error("Network or server error:", error);
      return null;
    }
  };

  useEffect(() => {
    FetchUsersData();
  }, []);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      if (data && stats) {
        const uniquePlayerNames = new Set<string>();
        const fetchedPlayerStats: IPlayerInfo[] = [];

        for (let index = 0; index < data.length; index++) {
          const userId = data[index]?.userid;
          if (userId) {
            const steamResponse = await FetchSteamID(userId);
            if (steamResponse) {
              const player = steamResponse.response.players[0];
              if (player && !uniquePlayerNames.has(player.personaname)) {
                uniquePlayerNames.add(player.personaname);
                fetchedPlayerStats.push({
                  Name: player.personaname,
                  Kills: stats[index]?.Kills || 0,
                  Deaths: stats[index]?.Deaths || 0,
                });
              }
            }
          }
        }

        // Sort by K/D ratio
        const sortedPlayerStats = fetchedPlayerStats.sort((a, b) => {
          const ratioA = a.Deaths === 0 ? a.Kills : a.Kills / a.Deaths;
          const ratioB = b.Deaths === 0 ? b.Kills : b.Kills / b.Deaths;
          return ratioB - ratioA; // Descending order
        });

        setPlayerStats(sortedPlayerStats);
      }
    };

    fetchPlayerStats();
  }, [data, stats]);

  useEffect(() => {
    if (data) {
      const parsedStats = data
        .map((item) => {
          if (item.StatisticsDB) {
            try {
              const statsData = JSON.parse(item.StatisticsDB);
              return statsData;
            } catch (error) {
              console.error("Error parsing JSON:", error);
              return null;
            }
          }
          return null;
        })
        .filter((stats): stats is IStatistics => stats !== null);

      const uniqueStats: IStatistics[] = [];
      parsedStats.forEach((stat) => {
        if (
          !uniqueStats.some((existingStat) =>
            areStatisticsEqual(existingStat, stat)
          )
        ) {
          uniqueStats.push(stat);
        }
      });

      setStats(uniqueStats);
    }
  }, [data]);

  return (
    <div className="w-[600px] py-5 px-4 bg-black rounded-lg shadow-lg">
      {playerStats.length > 0 ? (
        <ul className="space-y-4">
          {playerStats.map((player, index) => {
            const ratio = player.Deaths === 0 ? player.Kills : player.Kills / player.Deaths;
            return (
              <li
                key={index}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-white font-semibold">{player.Name}</div>
                </div>
                <div className="text-gray-400">{`${ratio.toFixed(2)} K/D`}</div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-white text-center">Loading</div>
      )}
    </div>
  );
};

export default PVPStats;
