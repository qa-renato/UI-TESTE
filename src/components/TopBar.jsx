import { Bell, Moon, Sun, Settings, LogOut } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import './TopBar.css';

export default function TopBar() {
  const [theme, setTheme] = useState('light');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="topbar liquid-glass">
      <div className="topbar-left">
        {/* Can be used for dynamic title or breadcrumbs if needed */}
        <span className="topbar-title">InTable Platform</span>
      </div>
      
      <div className="topbar-right">
        <button className="topbar-btn">
          <Bell size={20} />
        </button>
        <button className="topbar-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        <div className="user-profile-wrapper" ref={menuRef}>
          <div 
            className={`user-profile ${showUserMenu ? 'active' : ''}`}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="avatar">RN</div>
          </div>

          {showUserMenu && (
            <div className="user-menu liquid-glass">
              <div className="user-menu-header">
                <div className="avatar large mb-2">RN</div>
                <span className="user-name">Renato Nato</span>
                <span className="user-email">renato@inbot.com.br</span>
              </div>
              <button className="menu-item">
                <Settings size={16} /> Minha Conta
              </button>
              <div className="menu-divider"></div>
              <button className="menu-item logout">
                <LogOut size={16} /> Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
