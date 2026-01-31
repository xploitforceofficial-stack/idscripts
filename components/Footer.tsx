
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#080809] border-t border-white/5 py-16 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <img src="https://files.catbox.moe/wfcthe.png" alt="IDS Logo" className="w-10 h-10" />
              <h2 className="text-2xl font-black text-white">IDScript<span className="text-indigo-400">.hub</span></h2>
            </div>
            <p className="text-slate-500 text-sm max-w-md leading-relaxed font-medium">
              Platform terbesar di Indonesia untuk komunitas exploit Roblox. Berbagi LUA scripts dengan aman dan transparan. Dikembangkan khusus untuk memajukan skena scripting lokal.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://chat.whatsapp.com/I8hG44FLgrRAwQcS3lvEft" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-all border border-white/5 shadow-xl">
                <i className="fa-brands fa-whatsapp text-xl"></i>
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all border border-white/5 shadow-xl">
                <i className="fa-brands fa-github text-xl"></i>
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all border border-white/5 shadow-xl">
                <i className="fa-brands fa-youtube text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Navigasi</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><a href="#" className="hover:text-white transition-colors">Daftar Script</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trending</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Panduan Executor</a></li>
              <li><a href="https://chat.whatsapp.com/I8hG44FLgrRAwQcS3lvEft" className="text-emerald-500 hover:text-emerald-400 transition-colors">Grup WhatsApp</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">Bantuan</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privasi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Lapor Malicious</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hubungi Admin</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">
            &copy; 2024 IDScript.hub. Created for Indonesian Scripters.
          </p>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
            <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Systems Online: Jakarta Region</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
