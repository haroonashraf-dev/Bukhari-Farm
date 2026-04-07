import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import GoatLogo from '../common/GoatLogo';
import Button from '../common/Button';
import { cn } from '../../utils/cn';
import { logout } from '../../features/auth/authSlice';

const publicNavLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const privateNavLinks = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Goats', path: '/dashboard/goats' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const isContactPage = location.pathname === '/contact';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  // Force the scrolled style (dark text, white bg) on pages without a dark hero section
  const effectiveIsScrolled = isScrolled || isContactPage || isAuthPage || isAuthenticated;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const currentNavLinks = isAuthenticated ? privateNavLinks : publicNavLinks;

  return (
    <header 
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b',
        effectiveIsScrolled || isMobileMenuOpen ? 'bg-white/90 backdrop-blur-md border-stone-200 shadow-sm py-3' : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={cn(
              "flex items-center justify-center w-10 h-10 rounded-xl transition-colors",
              effectiveIsScrolled || isMobileMenuOpen ? "bg-emerald-100 text-emerald-600" : "bg-white/20 text-white backdrop-blur-sm group-hover:bg-white/30"
            )}>
              <GoatLogo className="w-6 h-6" />
            </div>
            <span className={cn(
              "text-2xl font-display font-bold tracking-tight transition-colors truncate max-w-[200px] sm:max-w-xs",
              effectiveIsScrolled || isMobileMenuOpen ? "text-stone-900" : "text-white"
            )}>
              Bukhari Farm
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {currentNavLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => cn(
                  "text-sm font-medium transition-colors hover:text-emerald-500",
                  isActive 
                    ? (effectiveIsScrolled ? "text-emerald-600" : "text-emerald-400") 
                    : (effectiveIsScrolled ? "text-stone-600" : "text-stone-200")
                )}
              >
                {link.name}
              </NavLink>
            ))}
            {!isAuthenticated && (
              <NavLink
                to="/login"
                className={({ isActive }) => cn(
                  "text-sm font-medium transition-colors hover:text-emerald-500",
                  isActive 
                    ? (effectiveIsScrolled ? "text-emerald-600" : "text-emerald-400") 
                    : (effectiveIsScrolled ? "text-stone-600" : "text-stone-200")
                )}
              >
                Login
              </NavLink>
            )}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-emerald-500 flex items-center",
                  effectiveIsScrolled ? "text-stone-600" : "text-stone-200"
                )}
              >
                <LogOut className="w-4 h-4 mr-1" /> Logout
              </button>
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant={effectiveIsScrolled ? 'primary' : 'secondary'} className={!effectiveIsScrolled ? "bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm" : ""}>
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant={effectiveIsScrolled ? 'primary' : 'secondary'} className={!effectiveIsScrolled ? "bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm" : ""}>
                  Farm Portal
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={cn("w-6 h-6", effectiveIsScrolled || isMobileMenuOpen ? "text-stone-900" : "text-white")} />
            ) : (
              <Menu className={cn("w-6 h-6", effectiveIsScrolled ? "text-stone-900" : "text-white")} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-stone-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {currentNavLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => cn(
                    "block px-3 py-3 rounded-xl text-base font-medium",
                    isActive ? "bg-emerald-50 text-emerald-600" : "text-stone-600 hover:bg-stone-50"
                  )}
                >
                  {link.name}
                </NavLink>
              ))}
              {!isAuthenticated && (
                <NavLink
                  to="/login"
                  className={({ isActive }) => cn(
                    "block px-3 py-3 rounded-xl text-base font-medium",
                    isActive ? "bg-emerald-50 text-emerald-600" : "text-stone-600 hover:bg-stone-50"
                  )}
                >
                  Login
                </NavLink>
              )}
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-3 rounded-xl text-base font-medium text-stone-600 hover:bg-stone-50 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
              )}
              <div className="pt-4 pb-2">
                {isAuthenticated ? (
                  <Link to="/dashboard" className="block w-full">
                    <Button className="w-full">Dashboard</Button>
                  </Link>
                ) : (
                  <Link to="/login" className="block w-full">
                    <Button className="w-full">Farm Portal</Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
