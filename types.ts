
export enum ExecutorType {
  KRNL = 'KRNL',
  FLUXUS = 'Fluxus',
  HYDROGEN = 'Hydrogen',
  WAVE = 'Wave',
  SENTINEL = 'Sentinel',
  SYNAPSE = 'Synapse Z',
  SOLARA = 'Solara'
}

export enum PlatformType {
  PC = 'PC',
  ANDROID = 'Android',
  IOS = 'iOS'
}

export interface User {
  id: string;
  publicUserId: string;
  username: string;
  avatarUrl: string;
  badge: 'None' | 'Verified' | 'Trusted Uploader' | 'Admin';
  uploadCount: number;
  joinDate: string;
}

export interface RobloxScript {
  id: string;
  title: string;
  gameId: string;
  gameName: string;
  genre: string;
  thumbnailUrl: string;
  description: string;
  features: string[];
  executors: ExecutorType[];
  platforms: PlatformType[];
  hasKeySystem: boolean;
  luaCode: string;
  uploader: User;
  views: number;
  createdAt: string;
}

export interface Report {
  id: string;
  scriptId: string;
  reporterId: string;
  reason: string;
  status: 'Pending' | 'Resolved' | 'Dismissed';
}
