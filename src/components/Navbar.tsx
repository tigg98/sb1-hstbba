import React, { useState, useEffect } from 'react';
import { Activity, BarChart3, Calendar, Home, Settings, Bell, Trophy } from 'lucide-react';

type Page = 'dashboard' | 'log' | 'exercise' | 'insights' | 'settings' | 'achievements';

interface Props {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export default function Navbar({ currentPage, onPageChange }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(2);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'dashboard' as Page, icon: Home, text: 'Dashboard', description: 'View your health dashboard' },
    { id: 'log' as Page, icon: Calendar, text: 'Log', description: 'Record daily activities and symptoms' },
    { id: 'exercise' as Page, icon: Activity, text: 'Exercise', description: 'Track your exercise activities' },
    { id: 'insights' as Page, icon: BarChart3, text: 'Insights', description: 'View health analytics and trends' },
    { id: 'achievements' as Page, icon: Trophy, text: 'Achievements', description: 'Check your progress and rewards' },
    { id: 'settings' as Page, icon: Settings, text: 'Settings', description: 'Manage your preferences' }
  ];

  const handleKeyPress = (event: React.KeyboardEvent, page: Page) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onPageChange(page);
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-white shadow-sm'
      } border-b border-gray-100`}
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Activity 
              className="h-8 w-8 text-primary-500 transition-transform duration-300 hover:scale-110 cursor-pointer" 
              aria-hidden="true"
              onMouseEnter={() => setIsHovered('logo')}
              onMouseLeave={() => setIsHovered(null)}
            />
            <div>
              <span className="text-xl font-semibold text-gray-800 tracking-tight">IBSed</span>
              <span 
                className={`ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full transition-all duration-300 ${
                  isHovered === 'logo' ? 'bg-blue-200' : ''
                }`}
                role="status"
              >
                HIPAA Compliant
              </span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <NavLink 
                key={link.id}
                icon={<link.icon className="h-5 w-5" aria-hidden="true" />} 
                text={link.text} 
                description={link.description}
                active={currentPage === link.id}
                onClick={() => onPageChange(link.id)}
                onKeyPress={(e) => handleKeyPress(e, link.id)}
              />
            ))}
            <button 
              className="relative p-2 text-gray-600 hover:text-primary-500 transition-all duration-300 hover:bg-primary-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={`${notifications} unread notifications`}
              role="button"
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
              {notifications > 0 && (
                <span 
                  className="absolute -top-1 -right-1 h-4 w-4 bg-primary-500 text-white text-xs flex items-center justify-center rounded-full transition-transform duration-300 animate-pulse"
                  aria-hidden="true"
                >
                  {notifications}
                </span>
              )}
            </button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-gray-600 transition-all duration-300 transform ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`} />
              <span className={`h-0.5 bg-gray-600 transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0' : 'w-full'
              }`} />
              <span className={`h-0.5 w-full bg-gray-600 transition-all duration-300 transform ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-label="Navigation menu"
        >
          <div className="py-4 space-y-2">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  onPageChange(link.id);
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentPage === link.id
                    ? 'text-primary-600 bg-primary-50 shadow-sm'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
                role="menuitem"
                aria-current={currentPage === link.id ? 'page' : undefined}
              >
                <link.icon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">{link.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

interface NavLinkProps {
  icon: React.ReactNode;
  text: string;
  description: string;
  active?: boolean;
  onClick: () => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
}

function NavLink({ icon, text, description, active = false, onClick, onKeyPress }: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onKeyPress={onKeyPress}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
        active
          ? 'text-primary-600 bg-primary-50 shadow-sm'
          : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
      }`}
      role="link"
      tabIndex={0}
      aria-current={active ? 'page' : undefined}
      aria-label={description}
    >
      <span className={`transition-all duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
        {icon}
      </span>
      <span className="font-medium transition-colors duration-300">{text}</span>
    </button>
  );
}