import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useState, useEffect } from 'react';

function applyTheme(preference) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = preference === 'dark' || (preference === 'system' && prefersDark);
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

export default function Layout() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem('inbot-theme') || 'system'
  );
  const location = useLocation();
  const isHomeLayout = location.pathname === '/';

  useEffect(() => {
    localStorage.setItem('inbot-theme', theme);
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme('system');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div className="app-container">
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
        isHomeLayout={isHomeLayout}
        isDark={isDark}
        toggleTheme={() => setTheme(isDark ? 'light' : 'dark')}
      />
      <main className="main-content" style={{ marginLeft: isSidebarExpanded ? '240px' : '72px' }}>
        <Header
          isDark={isDark}
          theme={theme}
          setTheme={setTheme}
          isHomeLayout={isHomeLayout}
        />
        <Outlet />
      </main>
    </div>
  );
}
