
import React, { useState, useRef } from 'react';
import { ExecutorType, PlatformType, RobloxScript, User } from '../types';
import { EXECUTORS, PLATFORMS, GENRES, BLACKLISTED_KEYWORDS } from '../constants';

interface UploadFormProps {
  user: User | null;
  onClose: () => void;
  onSuccess: (script: RobloxScript) => void;
}

const CAPTCHA_IMAGES = [
  { id: 1, type: 'executor', url: 'https://cdn-icons-png.flaticon.com/512/3596/3596091.png' },
  { id: 2, type: 'other', url: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
  { id: 3, type: 'other', url: 'https://cdn-icons-png.flaticon.com/512/2822/2822295.png' },
  { id: 4, type: 'other', url: 'https://cdn-icons-png.flaticon.com/512/743/743224.png' },
];

const UploadForm: React.FC<UploadFormProps> = ({ user, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    gameName: '',
    gameId: '',
    genre: 'Action',
    description: '',
    luaCode: '',
    hasKeySystem: false,
    selectedExecutors: [] as ExecutorType[],
    selectedPlatforms: [PlatformType.PC, PlatformType.ANDROID] as PlatformType[],
    features: ''
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'none' | 'success' | 'bot'>('none');
  
  const openTimeRef = useRef<number>(0);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center space-y-8 animate-fade-in">
        <div className="w-24 h-24 bg-red-500/10 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl">
          <i className="fa-solid fa-lock text-4xl text-red-500"></i>
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Login Required</h2>
          <p className="text-slate-500 font-bold max-w-xs mx-auto">
            Kamu harus login menggunakan akun Google untuk bisa mengunggah script ke komunitas IDScript.hub.
          </p>
        </div>
        <button 
          onClick={onClose}
          className="bg-white text-black px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
        >
          Kembali
        </button>
      </div>
    );
  }

  const validateForm = () => {
    const errs = [];
    if (formData.title.length < 5) errs.push("Judul script terlalu singkat.");
    if (!formData.gameId.match(/^\d+$/)) errs.push("Roblox Game ID tidak valid.");
    if (formData.luaCode.length < 5) errs.push("Isi LUA script atau loadstring.");
    if (formData.selectedExecutors.length === 0) errs.push("Pilih minimal 1 executor.");
    
    const hasBlacklisted = BLACKLISTED_KEYWORDS.some(word => 
      formData.luaCode.toLowerCase().includes(word)
    );
    if (hasBlacklisted) errs.push("Logger / Webhook terdeteksi. Script ditolak.");

    setErrors(errs);
    return errs.length === 0;
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowCaptcha(true);
    openTimeRef.current = Date.now();
  };

  const verifyHuman = (img: typeof CAPTCHA_IMAGES[0], e: React.MouseEvent) => {
    const duration = Date.now() - openTimeRef.current;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const isExactCenter = Math.abs((e.clientX - rect.left) - rect.width / 2) < 0.1;

    if (img.type !== 'executor' || duration < 600 || isExactCenter) {
      setVerificationResult('bot');
      setTimeout(() => onClose(), 2000);
      return;
    }

    setVerificationResult('success');
    setIsUploading(true);
    
    setTimeout(() => {
      const newScript: RobloxScript = {
        id: Math.random().toString(36).substring(7),
        title: formData.title,
        gameId: formData.gameId,
        gameName: formData.gameName,
        genre: formData.genre,
        thumbnailUrl: `https://picsum.photos/seed/${formData.gameId}/800/450`,
        description: formData.description,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f),
        executors: formData.selectedExecutors,
        platforms: formData.selectedPlatforms,
        hasKeySystem: formData.hasKeySystem,
        luaCode: formData.luaCode,
        uploader: user,
        views: 0,
        createdAt: new Date().toISOString()
      };
      onSuccess(newScript);
    }, 1200);
  };

  const toggleExecutor = (ex: ExecutorType) => {
    setFormData(prev => ({
      ...prev,
      selectedExecutors: prev.selectedExecutors.includes(ex)
        ? prev.selectedExecutors.filter(i => i !== ex)
        : [...prev.selectedExecutors, ex]
    }));
  };

  return (
    <div className="max-w-5xl mx-auto bg-[#0d0d0f] p-8 lg:p-14 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
      
      {showCaptcha && (
        <div className="absolute inset-0 bg-black/95 z-[100] flex items-center justify-center p-10 animate-fade-in">
          {verificationResult === 'bot' ? (
            <div className="text-center space-y-6 text-red-500">
               <i className="fa-solid fa-robot text-7xl"></i>
               <h3 className="text-3xl font-black uppercase tracking-tighter">Bot Detected</h3>
               <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Akses diblokir sementara.</p>
            </div>
          ) : verificationResult === 'success' ? (
            <div className="text-center space-y-6 text-emerald-500">
               <div className="w-24 h-24 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
               <h3 className="text-3xl font-black uppercase tracking-tighter">Human Verified</h3>
               <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Memproses database...</p>
            </div>
          ) : (
            <div className="bg-[#16161a] p-10 rounded-[2.5rem] border border-white/10 max-w-sm w-full space-y-8 text-center shadow-3xl">
               <div className="space-y-3">
                 <h3 className="text-xl font-black text-white uppercase tracking-tight">Security Check</h3>
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Pilih icon <span className="text-indigo-500 underline">Petir (Lightning)</span></p>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 {CAPTCHA_IMAGES.map(img => (
                   <button 
                     key={img.id}
                     onClick={(e) => verifyHuman(img, e)}
                     className="bg-black/50 border-2 border-transparent hover:border-indigo-500 rounded-2xl p-6 transition-all active:scale-90"
                   >
                     <img src={img.url} alt="captcha" className="w-16 h-16 mx-auto pointer-events-none" />
                   </button>
                 ))}
               </div>
               <button onClick={() => setShowCaptcha(false)} className="text-[10px] font-black text-slate-600 hover:text-white uppercase tracking-[0.2em] transition-colors">Batal</button>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between items-center mb-14">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-indigo-600/30">
            <i className="fa-solid fa-upload text-white text-2xl"></i>
          </div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Publish Script</h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">IDScript Content System v2.0</p>
          </div>
        </div>
        <button onClick={onClose} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all">
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

      {errors.length > 0 && (
        <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-2xl mb-10 space-y-1">
          {errors.map((err, i) => <p key={i} className="text-red-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
             <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> {err}
          </p>)}
        </div>
      )}

      <form onSubmit={handleInitialSubmit} className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Col 1 */}
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block ml-1">Script Title</label>
              <input 
                className="w-full bg-black/40 border border-white/10 rounded-[1.2rem] px-6 py-5 text-sm font-bold text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                placeholder="Misal: Autofarm OP & ESP Full"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block ml-1">Game Name</label>
                <input 
                  className="w-full bg-black/40 border border-white/10 rounded-[1.2rem] px-6 py-5 text-sm font-bold text-white"
                  placeholder="Blox Fruit"
                  value={formData.gameName}
                  onChange={e => setFormData({...formData, gameName: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block ml-1">Game ID</label>
                <input 
                  className="w-full bg-black/40 border border-white/10 rounded-[1.2rem] px-6 py-5 text-sm font-bold text-white"
                  placeholder="2753915549"
                  value={formData.gameId}
                  onChange={e => setFormData({...formData, gameId: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block ml-1">List Fitur (Gunakan Koma)</label>
              <input 
                className="w-full bg-black/40 border border-white/10 rounded-[1.2rem] px-6 py-5 text-sm font-bold text-white"
                placeholder="Auto Farm, ESP Players, Speedhack..."
                value={formData.features}
                onChange={e => setFormData({...formData, features: e.target.value})}
              />
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block ml-1">Supported Executors</label>
              <div className="flex flex-wrap gap-2">
                {EXECUTORS.map(ex => (
                  <button
                    type="button"
                    key={ex}
                    onClick={() => toggleExecutor(ex as ExecutorType)}
                    className={`px-5 py-2.5 rounded-xl text-[10px] font-black border-2 transition-all ${
                      formData.selectedExecutors.includes(ex as ExecutorType)
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                      : 'bg-black/40 border-white/5 text-slate-500 hover:border-white/20'
                    }`}
                  >
                    {ex.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-6 bg-white/[0.02] rounded-[1.5rem] border border-white/5">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                    <i className="fa-solid fa-key"></i>
                 </div>
                 <span className="text-xs font-black text-white uppercase tracking-widest">Key System Required?</span>
               </div>
               <input 
                 type="checkbox" 
                 className="w-6 h-6 accent-indigo-500 rounded-lg cursor-pointer"
                 checked={formData.hasKeySystem}
                 onChange={e => setFormData({...formData, hasKeySystem: e.target.checked})}
               />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block ml-1">Source LUA / Loadstring</label>
              <textarea 
                className="w-full bg-black/60 border border-white/10 rounded-[1.2rem] px-6 py-5 text-xs mono text-indigo-400 h-44 focus:outline-none focus:border-indigo-500/50 transition-all leading-relaxed"
                placeholder='loadstring(game:HttpGet("https://raw.github..."))()'
                value={formData.luaCode}
                onChange={e => setFormData({...formData, luaCode: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/5">
          <div className="flex items-center gap-4 text-slate-600">
             <i className="fa-solid fa-shield-halved text-xl"></i>
             <p className="text-[10px] font-bold uppercase tracking-widest max-w-xs leading-relaxed">
               Semua script akan melewati filter bot-detection dan blacklist kata kunci secara real-time.
             </p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 md:flex-none px-10 py-4 font-black text-slate-500 hover:text-white transition-colors text-[10px] uppercase tracking-widest"
            >
              Cancel
            </button>
            <button 
              className="flex-1 md:flex-none bg-white text-black px-12 py-5 rounded-[1.2rem] font-black transition-all active:scale-95 text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-200"
            >
              Verify & Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
