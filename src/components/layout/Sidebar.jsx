import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Settings, X, Globe } from 'lucide-react';
import { cn } from '../../utils/cn';
import GoatLogo from '../common/GoatLogo';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Add Goat', path: '/dashboard/add', icon: PlusCircle },
  { name: 'Settings', path: '/dashboard/settings', icon: Settings },
];

export default function Sidebar({ onClose }) {
  return (
    <aside className="w-64 h-full bg-stone-900 border-r border-stone-800 flex flex-col shadow-2xl lg:shadow-none">
      <div className="h-16 flex items-center justify-between px-6 border-b border-stone-800 bg-stone-950/50">
        <Link to="/" className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 mr-3">
            <GoatLogo className="w-5 h-5" />
          </div>
          <span className="text-xl font-display font-bold text-white tracking-tight">Bukhari <span className="text-emerald-400">Farm</span></span>
        </Link>
        {onClose && (
          <button 
            onClick={onClose} 
            className="lg:hidden p-1 text-stone-400 hover:text-white hover:bg-stone-800 rounded-md transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/dashboard'}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                'flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 border',
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50'
                  : 'text-stone-400 border-transparent hover:bg-stone-800/50 hover:text-stone-200'
              )
            }
          >
            <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-stone-800 space-y-4">
        <Link to="/" className="flex items-center justify-center w-full py-2 text-sm text-stone-400 hover:text-white transition-colors">
          <Globe className="w-4 h-4 mr-2" /> Back to Website
        </Link>
        <div className="flex items-center bg-stone-800/50 p-3 rounded-xl border border-stone-700/50">
          <div className="h-9 w-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-inner">
            A
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-stone-400">Farm Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

