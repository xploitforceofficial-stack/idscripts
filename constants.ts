
import { ExecutorType, PlatformType, User, RobloxScript } from './types';

export const EXECUTORS = Object.values(ExecutorType);
export const PLATFORMS = Object.values(PlatformType);
export const GENRES = ['All', 'Action', 'RPG', 'Simulator', 'Adventure', 'Fighting', 'Sports', 'Horror'];

export const BLACKLISTED_KEYWORDS = ['logger', 'webhook', 'grab', 'cookie', 'steal', 'hack_account', 'discord.gg/vibe'];

export const MOCK_USER: User = {
  id: 'firebase_google_id',
  publicUserId: 'U-9F2A7X',
  username: 'IndoGamer_Pro',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky',
  badge: 'Trusted Uploader',
  uploadCount: 0,
  joinDate: new Date().toISOString()
};

// Mock scripts are now removed from initial display as per requirement
export const MOCK_SCRIPTS: RobloxScript[] = [];
