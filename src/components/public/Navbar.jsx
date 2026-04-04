import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import GoatLogo from '../common/GoatLogo';
import Button from '../common/Button';
import { cn } from '../../utils/cn';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';
  const showPortalButton = location.pathname === '/';
  
  // Force the scrolled style (dark text, white bg) on pages without a dark hero section
  const effectiveIsScrolled = isScrolled || isContactPage;

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
              "text-2xl font-display font-bold tracking-tight transition-colors",
              effectiveIsScrolled || isMobileMenuOpen ? "text-stone-900" : "text-white"
            )}>
              Bukhari <span className={effectiveIsScrolled || isMobileMenuOpen ? "text-emerald-600" : "text-emerald-400"}>Farm</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
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
          </nav>

          {/* CTA Button */}
          {showPortalButton && (
            <div className="hidden md:flex items-center">
              <Link to="/dashboard">
                <Button variant={effectiveIsScrolled ? 'primary' : 'secondary'} className={!effectiveIsScrolled ? "bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm" : ""}>
                  Farm Portal
                </Button>
              </Link>
            </div>
          )}

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
              {navLinks.map((link) => (
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
              {showPortalButton && (
                <div className="pt-4 pb-2">
                  <Link to="/dashboard" className="block w-full">
                    <Button className="w-full">Farm Portal</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
