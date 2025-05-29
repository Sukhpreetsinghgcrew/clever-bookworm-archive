
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Book, User, BarChart3, Search, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: BarChart3 },
    { path: '/books', label: 'Books', icon: Book },
    { path: '/users', label: 'Users', icon: User },
    { path: '/search', label: 'Search', icon: Search },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 shadow-2xl border-b border-blue-700 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-3 group">
            <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-all duration-300">
              <Book className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">LibraryMS</span>
              <p className="text-xs text-blue-200">Management System</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "secondary" : "ghost"}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive(item.path) 
                      ? 'bg-white text-blue-900 shadow-lg hover:shadow-xl' 
                      : 'text-white hover:bg-white/10 hover:scale-105'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10 rounded-xl"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2 bg-white/5 rounded-xl mt-2 backdrop-blur-sm">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant={isActive(item.path) ? "secondary" : "ghost"}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full justify-start space-x-3 p-3 rounded-xl transition-all duration-300 ${
                      isActive(item.path) 
                        ? 'bg-white text-blue-900 shadow-lg' 
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
