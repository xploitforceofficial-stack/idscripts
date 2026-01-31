
import React from 'react';
import { RobloxScript } from '../types';

interface ScriptCardProps {
  script: RobloxScript;
  onClick: () => void;
}

const ScriptCard: React.FC<ScriptCardProps> = ({ script, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative flex flex-col bg-[#0d0d0f] border border-white/5 rounded-3xl overflow-hidden cursor-pointer hover:border-indigo-500/40 hover:translate-y-[-6px] transition-all duration-300 card-shadow"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={script.thumbnailUrl} 
          alt={script.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-transparent to-transparent opacity-90"></div>
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest ${script.hasKeySystem ? 'bg-amber-500 text-black' : 'bg-emerald-500 text-white'}`}>
            {script.hasKeySystem ? 'Key System' : 'Free'}
          </span>
        </div>

        {/* Game Title Overlay */}
        <div className="absolute bottom-4 left-5 right-5">
           <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-1 block">{script.gameName}</span>
           <h3 className="text-lg font-extrabold text-white leading-tight line-clamp-2 group-hover:text-indigo-400 transition-colors">
             {script.title}
           </h3>
        </div>
      </div>

      {/* Details */}
      <div className="p-6 flex flex-col flex-grow space-y-5">
        <div className="flex flex-wrap gap-1.5">
          {script.executors.slice(0, 3).map(ex => (
            <span key={ex} className="text-[9px] font-black bg-white/5 text-slate-400 px-2 py-1 rounded-md border border-white/5">
              {ex.toUpperCase()}
            </span>
          ))}
          {script.executors.length > 3 && (
            <span className="text-[9px] font-black bg-white/5 text-slate-500 px-2 py-1 rounded-md">+{script.executors.length - 3}</span>
          )}
        </div>

        <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={script.uploader.avatarUrl} alt="" className="w-6 h-6 rounded-lg border border-white/10" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-300 truncate max-w-[80px] leading-none uppercase">{script.uploader.username}</span>
              <span className="text-[8px] font-bold text-slate-600 font-mono mt-0.5">{script.uploader.publicUserId}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-500 text-[10px] font-black">
            <div className="flex items-center gap-1.5">
              <i className="fa-solid fa-eye text-indigo-500"></i>
              {script.views >= 1000 ? `${(script.views / 1000).toFixed(1)}k` : script.views}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptCard;
