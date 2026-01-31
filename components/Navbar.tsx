
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  onUploadClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogin, onLogout, onUploadClick }) => {
  return (
    <nav className="sticky top-0 z-[60] glass border-b border-white/5 py-4 px-4 md:px-10">
      <div className="container mx-auto flex items-center justify-between">
        {/* Brand */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => window.location.href = '/'}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500/20 blur-lg rounded-full group-hover:bg-indigo-500/40 transition-all"></div>
            <img 
              src="https://files.catbox.moe/wfcthe.png" 
              alt="IDS Logo" 
              className="relative w-11 h-11 object-contain transform transition-transform group-hover:scale-110"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-black text-white tracking-tighter leading-none">
              IDScript<span className="text-indigo-500">.hub</span>
            </h1>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Indonesia Platform</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <button onClick={() => window.location.href = '/'} className="text-xs font-black text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Feed</button>
          <a href="https://chat.whatsapp.com/I8hG44FLgrRAwQcS3lvEft" target="_blank" rel="noreferrer" className="text-xs font-black text-slate-400 hover:text-emerald-400 transition-colors uppercase tracking-widest flex items-center gap-2">
            <i className="fa-brands fa-whatsapp text-lg"></i> Community
          </a>
          <button className="text-xs font-black text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Executors</button>
          <button className="text-xs font-black text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Verified</button>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={onUploadClick}
                className="hidden md:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all btn-glow"
              >
                <i className="fa-solid fa-plus-circle text-sm"></i> Publish
              </button>
              
              <div className="h-8 w-[1px] bg-white/5 mx-2 hidden md:block"></div>

              <div className="flex items-center gap-3 group cursor-pointer relative">
                <img 
                  src={user.avatarUrl} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-2xl border border-white/10 group-hover:border-indigo-500/50 transition-all shadow-xl"
                />
                <div className="hidden xl:block">
                  <p className="text-xs font-black text-white leading-none">{user.username}</p>
                  <p className="text-[10px] font-bold text-slate-500 font-mono mt-1">{user.publicUserId}</p>
                </div>
                
                {/* Minimal Logout Dropdown / Link */}
                <button 
                  onClick={onLogout} 
                  className="ml-2 text-slate-500 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <i className="fa-solid fa-power-off text-sm"></i>
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={onLogin}
              className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95"
            >
              <i className="fa-brands fa-google text-sm"></i> Login With Google
            </button>
          )}
          
          {/* Mobile Menu Icon */}
          <button className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <i className="fa-solid fa-bars-staggered text-xl"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
