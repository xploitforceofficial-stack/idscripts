
import React, { useState, useEffect, useMemo } from 'react';
import { RobloxScript, ExecutorType, User } from './types';
import { GENRES, EXECUTORS } from './constants';
import { loginWithGoogle, auth } from './firebase-config';
import { ScriptService } from './api';
import Navbar from './components/Navbar';
import ScriptCard from './components/ScriptCard';
import ScriptDetail from './components/ScriptDetail';
import UploadForm from './components/UploadForm';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [scripts, setScripts] = useState<RobloxScript[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedScript, setSelectedScript] = useState<RobloxScript | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterExecutor, setFilterExecutor] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  // Persistence and initial load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await ScriptService.getScripts();
        setScripts(data);
      } catch (e) {
        console.error("Failed to load scripts", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const syncedUser = await ScriptService.syncUser(firebaseUser);
        setCurrentUser(syncedUser);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const filteredScripts = useMemo(() => {
    return scripts.filter(script => {
      const matchGenre = activeTab === 'All' || script.genre === activeTab;
      const matchSearch = script.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          script.gameName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchExecutor = filterExecutor === 'All' || script.executors.includes(filterExecutor as ExecutorType);
      return matchGenre && matchSearch && matchExecutor;
    });
  }, [scripts, activeTab, searchQuery, filterExecutor]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-500/30">
      <Navbar 
        user={currentUser} 
        onLogin={handleLogin} 
        onLogout={handleLogout}
        onUploadClick={() => setIsUploadOpen(true)}
      />

      <main className="flex-grow container mx-auto px-4 md:px-6 py-6 lg:py-10">
        {/* State: Main Feed */}
        {!selectedScript && !isUploadOpen && (
          <div className="space-y-10 animate-fade-in">
            {/* Hero / Filter Section */}
            <div className="relative group p-8 lg:p-12 rounded-3xl overflow-hidden border border-white/5 bg-[#0d0d0f] shadow-2xl">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-600/10 to-transparent pointer-events-none"></div>
              
              <div className="relative z-10 max-w-4xl space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight">
                    Premium <span className="text-indigo-500">Roblox Scripts</span>
                  </h2>
                  <p className="text-slate-400 font-medium text-sm lg:text-base">
                    Cari loadstring berkualitas tinggi dari komunitas exploit Indonesia.
                  </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-grow">
                    <i className="fa-solid fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"></i>
                    <input 
                      type="text" 
                      placeholder="Cari script, game, atau fitur..."
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-indigo-500/50 transition-all font-bold text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="relative">
                      <select 
                        className="appearance-none bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:outline-none focus:border-indigo-500/50 min-w-[180px]"
                        value={filterExecutor}
                        onChange={(e) => setFilterExecutor(e.target.value)}
                      >
                        <option value="All">All Executors</option>
                        {EXECUTORS.map(ex => <option key={ex} value={ex}>{ex}</option>)}
                      </select>
                      <i className="fa-solid fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-xs"></i>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {GENRES.map(genre => (
                    <button 
                      key={genre}
                      onClick={() => setActiveTab(genre)}
                      className={`px-5 py-2 rounded-xl text-xs font-black transition-all border ${
                        activeTab === genre 
                        ? 'bg-white text-black border-white' 
                        : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {genre.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid Area */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-slate-800"></span>
                  {activeTab} Scripts
                </h3>
                <span className="text-[10px] font-bold text-slate-600">{filteredScripts.length} SCRIPTS FOUND</span>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                  <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                  <p className="text-xs font-black text-slate-600 tracking-widest uppercase">Fetching Data...</p>
                </div>
              ) : filteredScripts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredScripts.map(script => (
                    <ScriptCard 
                      key={script.id} 
                      script={script} 
                      onClick={() => setSelectedScript(script)}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-32 flex flex-col items-center justify-center text-center space-y-6 bg-white/[0.02] rounded-3xl border border-dashed border-white/5">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-ghost text-4xl text-slate-700"></i>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-white">Script Tidak Ditemukan</h4>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto">
                      Coba cari dengan kata kunci lain atau bersihkan filter pencarian anda.
                    </p>
                  </div>
                  <button onClick={() => {setSearchQuery(''); setActiveTab('All'); setFilterExecutor('All');}} className="text-indigo-400 font-black text-xs uppercase tracking-widest hover:text-indigo-300">Reset Filters</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* State: Script Detail */}
        {selectedScript && !isUploadOpen && (
          <div className="animate-fade-in">
            <ScriptDetail 
              script={selectedScript} 
              onClose={() => setSelectedScript(null)} 
            />
          </div>
        )}

        {/* State: Upload Form */}
        {isUploadOpen && (
          <div className="animate-fade-in">
            <UploadForm 
              user={currentUser} 
              onClose={() => setIsUploadOpen(false)}
              onSuccess={async (newScript) => {
                const saved = await ScriptService.uploadScript(newScript);
                setScripts([saved, ...scripts]);
                setIsUploadOpen(false);
              }}
            />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
