import { Link } from 'react-router-dom';
import GoatLogo from '../common/GoatLogo';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400">
                <GoatLogo className="w-5 h-5" />
              </div>
              <span className="text-xl font-display font-bold text-white tracking-tight truncate">
                Bukhari Farm
              </span>
            </Link>
            <p className="text-sm text-stone-500 max-w-sm">
              Premium goat breeding and modern farm management. We combine traditional farming values with data-driven technology to raise the healthiest herds.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Portal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Staff Login</Link></li>
              <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Management Dashboard</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-stone-800 text-sm text-stone-600 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Bukhari Farm. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
