import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useState, useEffect } from 'react';

export default function Layout() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const isHomeLayout = location.pathname === '/';

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDark]);

  return (
    <div className="app-container">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} isHomeLayout={isHomeLayout} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      <main className="main-content" style={{ marginLeft: isSidebarExpanded ? '240px' : '72px' }}>
        <Header isDark={isDark} toggleTheme={() => setIsDark(!isDark)} isHomeLayout={isHomeLayout} />
        <Outlet />
      </main>
    </div>
  );
}
