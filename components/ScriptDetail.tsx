
import React, { useState } from 'react';
import { RobloxScript } from '../types';

interface ScriptDetailProps {
  script: RobloxScript;
  onClose: () => void;
}

const ScriptDetail: React.FC<ScriptDetailProps> = ({ script, onClose }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLoadstring, setCopiedLoadstring] = useState(false);

  const copyToClipboard = (text: string, type: 'code' | 'loadstring') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedLoadstring(true);
      setTimeout(() => setCopiedLoadstring(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-4 lg:py-6">
      {/* Header Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onClose}
          className="flex items-center gap-3 text-slate-500 hover:text-white transition-all font-black text-xs uppercase tracking-widest"
        >
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          Kembali
        </button>
        <div className="flex gap-4">
          <button className="w-10 h-10 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all">
            <i className="fa-solid fa-share-nodes"></i>
          </button>
          <button className="w-10 h-10 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all">
            <i className="fa-solid fa-flag"></i>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Main Content (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Hero Banner */}
          <div className="relative rounded-[2rem] overflow-hidden aspect-video shadow-2xl border border-white/10">
            <img src={script.thumbnailUrl} alt={script.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-10 left-10 right-10">
               <span className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em] mb-3 block">{script.gameName}</span>
               <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight">{script.title}</h1>
            </div>
          </div>

          {/* Code Viewer Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-white flex items-center gap-3">
                <i className="fa-solid fa-terminal text-indigo-500"></i> Script Loader
              </h3>
              <div className="flex gap-3">
                <button 
                  onClick={() => copyToClipboard(script.luaCode, 'loadstring')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
                >
                  {copiedLoadstring ? 'COPIED!' : 'COPY LOADSTRING'}
                </button>
              </div>
            </div>
            
            <div className="bg-[#0d0d0f] rounded-3xl border border-white/5 p-8 relative group">
              <div className="absolute top-6 right-6 flex gap-2">
                 <span className="text-[10px] font-bold text-slate-600 uppercase font-mono">LUA SOURCE</span>
              </div>
              <pre className="mono text-indigo-300/90 text-sm overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
                {script.luaCode}
              </pre>
              <button 
                onClick={() => copyToClipboard(script.luaCode, 'code')}
                className="absolute bottom-6 right-6 bg-white/5 hover:bg-white/10 text-white w-12 h-12 rounded-2xl flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                title="Copy Full Code"
              >
                <i className={`fa-solid ${copiedCode ? 'fa-check text-emerald-500' : 'fa-copy'}`}></i>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
             <h3 className="text-xl font-black text-white">Tentang Script</h3>
             <p className="text-slate-400 font-medium leading-relaxed">
               {script.description || "Uploader tidak memberikan deskripsi tambahan untuk script ini."}
             </p>
          </div>
        </div>

        {/* Right: Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Uploader Card */}
          <div className="bg-[#0d0d0f] rounded-3xl border border-white/5 p-8 space-y-6">
            <div className="flex items-center gap-4">
              <img src={script.uploader.avatarUrl} alt="" className="w-16 h-16 rounded-[1.5rem] border border-white/10 shadow-2xl" />
              <div>
                <h4 className="font-black text-white text-lg uppercase tracking-tight">{script.uploader.username}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-slate-500 font-mono tracking-widest uppercase">{script.uploader.publicUserId}</span>
                  <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{script.uploader.badge}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl text-center">
                 <p className="text-[10px] font-black text-slate-600 uppercase mb-1">Uploads</p>
                 <p className="text-xl font-black text-white">{script.uploader.uploadCount}</p>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl text-center">
                 <p className="text-[10px] font-black text-slate-600 uppercase mb-1">Views</p>
                 <p className="text-xl font-black text-white">{script.views >= 1000 ? `${(script.views/1000).toFixed(1)}k` : script.views}</p>
              </div>
            </div>
            <button className="w-full py-4 rounded-2xl border border-white/10 text-xs font-black text-slate-300 hover:bg-white hover:text-black transition-all uppercase tracking-widest">Lihat Profile</button>
          </div>

          {/* Technical Info */}
          <div className="bg-[#0d0d0f] rounded-3xl border border-white/5 p-8 space-y-6">
            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
               Technical Info
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-[11px] font-black text-slate-500 uppercase">Executors</span>
                <div className="flex gap-1">
                   {script.executors.map(ex => (
                     <span key={ex} className="text-[9px] font-bold bg-white/5 px-2 py-1 rounded-md text-slate-400">{ex}</span>
                   ))}
                </div>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-[11px] font-black text-slate-500 uppercase">Platforms</span>
                <div className="flex gap-1">
                   {script.platforms.map(p => (
                     <span key={p} className="text-[9px] font-bold bg-white/5 px-2 py-1 rounded-md text-slate-400">{p}</span>
                   ))}
                </div>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-[11px] font-black text-slate-500 uppercase">Key System</span>
                <span className={`text-[11px] font-black uppercase ${script.hasKeySystem ? 'text-amber-500' : 'text-emerald-500'}`}>
                   {script.hasKeySystem ? 'REQUIRED' : 'NO KEY'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-black text-slate-500 uppercase">Updated</span>
                <span className="text-[11px] font-black text-white uppercase">{new Date(script.createdAt).toLocaleDateString('id-ID')}</span>
              </div>
            </div>
          </div>

          {/* Safety Reminder */}
          <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl space-y-4">
             <div className="flex items-center gap-3 text-red-500">
                <i className="fa-solid fa-triangle-exclamation text-xl"></i>
                <h4 className="font-black text-sm uppercase tracking-widest">Peringatan Keamanan</h4>
             </div>
             <p className="text-[11px] text-red-200/50 font-bold leading-relaxed uppercase">
                Selalu gunakan AKUN ALTERNATIF saat menjalankan script baru. Jangan pernah memberikan password atau cookie ROBLOX anda kepada siapapun.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptDetail;
