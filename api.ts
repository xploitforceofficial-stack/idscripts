
import { RobloxScript, User, ExecutorType, PlatformType } from './types';

/**
 * PRODUCTION-READY ARCHITECTURE SIMULATION
 * 
 * MongoDB Connection: mongodb+srv://cellofinda_db_user:<password>@lyntrixai.0u2uv1i.mongodb.net/
 * In a real environment, the logic below would be handled by a REST API 
 * hosted on a Node.js/Express server connecting via Mongoose.
 */

const STORAGE_KEY = 'idscript_v2_data';

export const ScriptService = {
  // GET: /api/scripts
  async getScripts(): Promise<RobloxScript[]> {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // POST: /api/scripts
  async uploadScript(script: RobloxScript): Promise<RobloxScript> {
    // Backend would validate script content for malicious code here
    const scripts = await this.getScripts();
    const withViews = { ...script, views: Math.floor(Math.random() * 50) + 1 }; // Initial view seed
    const updated = [withViews, ...scripts];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return withViews;
  },

  // GET: /api/scripts/:id
  async incrementView(id: string) {
    const scripts = await this.getScripts();
    const updated = scripts.map(s => s.id === id ? { ...s, views: s.views + 1 } : s);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  // AUTH SYNC: /api/users/sync
  async syncUser(firebaseUser: any): Promise<User> {
    const usersData = localStorage.getItem('idscript_v2_users');
    let users = usersData ? JSON.parse(usersData) : {};
    
    if (users[firebaseUser.uid]) {
      return users[firebaseUser.uid];
    }

    const publicId = `U-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const newUser: User = {
      id: firebaseUser.uid,
      publicUserId: publicId,
      username: firebaseUser.displayName || 'Anonim',
      avatarUrl: firebaseUser.photoURL || `https://api.dicebear.com/7.x/shapes/svg?seed=${firebaseUser.uid}`,
      badge: 'None',
      uploadCount: 0,
      joinDate: new Date().toISOString()
    };

    users[firebaseUser.uid] = newUser;
    localStorage.setItem('idscript_v2_users', JSON.stringify(users));
    return newUser;
  }
};
