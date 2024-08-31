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

export type IStatistics = {
  LastUpdate: number;
  Joins: number;
  Leaves: number;
  Kills: number;
  Deaths: number;
  Suicides: number;
  Shots: number;
  Headshots: number;
  Experiments: number;
  Recoveries: number;
  VoiceBytes: number;
  WoundedTimes: number;
  CraftedItems: number;
  RepairedItems: number;
  LiftUsages: number;
  WheelSpins: number;
  HammerHits: number;
  ExplosivesThrown: number;
  WeaponReloads: number;
  RocketsLaunched: number;
  SecondsPlayed: number;
  Names: string[];
  IPs: string[];
  TimeStamps: number[];
  CollectiblePickups: Record<string, any>;
  PlantPickups: Record<string, any>;
  Gathered: Record<string, number>;
};

export type IResStats = {
  StatisticsDB: string | null;
  id: number | null;
  ip: string | null;
  name: string | null;
  steamid: string | null;
  userid: string | null;
};

export type IPlayerInfo = {
  Name: string;
  Kills: number;
  Deaths: number;
}

// Type for the individual player data
interface IPlayer {
  avatar: string;
  avatarfull: string;
  avatarhash: string;
  avatarmedium: string;
  communityvisibilitystate: number;
  loccityid?: number; // Optional, as it may not always be present
  loccountrycode: string;
  locstatecode: string;
  personaname: string;
  personastate: number;
  personastateflags: number;
  primaryclanid: string;
  profilestate: number;
  profileurl: string;
  realname?: string; // Optional, as it may not always be present
  steamid: string;
  timecreated: number;
}

interface ISteamPlayerSummariesResponse {
  players: IPlayer[];
}

export interface ISteamAPIResponse {
  response: ISteamPlayerSummariesResponse;
}
