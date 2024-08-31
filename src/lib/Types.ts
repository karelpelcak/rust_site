export type IServerStats = {
  cpu: string;
  hostname: string;
  map: string;
  memory: string;
  players: string;
  players_list: IPlayers_list;
  slots: string;
  status: string;
};

export type IPlayers_list = {
  deaths: string | null;
  kills: string | null;
  name: string | null;
  ping: string | null;
  score: number | null;
  time: number | null;
};
