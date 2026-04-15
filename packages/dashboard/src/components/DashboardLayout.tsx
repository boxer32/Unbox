import { Link } from '@tanstack/react-router';
import { Activity, Shield, LayoutDashboard, BarChart3, Wallet, CheckCircle, Info, HelpCircle } from 'lucide-react';
import { WalletConnect } from './WalletConnect.js';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-unbox-green selection:text-black">
      {/* Tool Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030303]/80 backdrop-blur-xl px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-unbox-green rounded-lg flex items-center justify-center font-black text-black text-xs group-hover:rotate-12 transition-transform">U</div>
            <div className="flex flex-col">
              <span className="font-black tracking-widest text-sm uppercase">Unbox</span>
              <span className="text-[7px] uppercase tracking-[0.4em] text-unbox-green font-bold">Forensic Analyst</span>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-2 p-1 bg-white/[0.03] rounded-xl border border-white/5">
            <NavItem to="/mirror" icon={LayoutDashboard} label="Mirror" />
            <NavItem to="/" icon={Shield} label="Score" />
            <NavItem to="/feed" icon={Activity} label="Feed" />
          </nav>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-unbox-green/20 bg-unbox-green/5 text-[9px] font-bold uppercase tracking-widest text-unbox-green">
            <div className="w-1.5 h-1.5 rounded-full bg-unbox-green animate-pulse" />
            X Layer Testnet Live
          </div>

          <div className="flex items-center gap-6">
            <WalletConnect />
            <div className="w-px h-6 bg-white/10" />
            <div className="w-8 h-8 rounded-lg bg-unbox-green/10 border border-unbox-green/30 flex items-center justify-center">
            </div>
          </div>

          <button className="p-2 text-white/20 hover:text-unbox-green transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-unbox-green/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        {children}
      </div>
    </div>
  );
};

function NavItem({ to, icon: Icon, label }: { to: string, icon: any, label: string }) {
  return (
    <Link 
      to={to} 
      className="flex items-center gap-2.5 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white hover:bg-white/5 transition-all"
      activeProps={{ className: 'text-unbox-green bg-white/5 shadow-[inset_0_0_10px_rgba(16,185,129,0.05)] border border-unbox-green/10' }}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );
}
