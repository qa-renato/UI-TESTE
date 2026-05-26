import { Bell, X, Trash2, Info, CheckCircle2, Download, XCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import ToggleTheme from './ToggleTheme';
import './Header.css';

export default function Header({ isDark, theme, setTheme, isHomeLayout }) {
  const [showNotifications, setShowNotifications] = useState(false);
const notifRef = useRef(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      dotClass: 'purple-dot',
      iconType: 'download',
      title: 'Exportação: Unique login',
      subtitle: 'azul / bots',
      statusClass: 'success-status',
      statusIconType: 'success',
      statusText: 'Pronto para download',
      date: '24 de abr. de 2026, 22:01',
      hasDownload: true
    },
    {
      id: 2,
      dotClass: 'purple-dot',
      iconType: 'download',
      title: 'Exportação: jornada_check_in',
      subtitle: 'azul / dashboard',
      statusClass: 'error-status',
      statusIconType: 'error',
      statusText: 'Erro ao processar',
      date: '24 de abr. de 2026, 21:55',
      errorDetails: 'Failed to fetch',
      hasDownload: false
    }
  ]);

  const handleDeleteNotif = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleMarkAll = () => {
    setNotifications([]);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifRef]);


  return (
    <header className="page-header">
      <div className="header-left">
        {/* Left spacer to balance the right actions */}
      </div>

      <div className="header-center">
        <h2 className="header-title">InTable</h2>
      </div>

      <div className="header-right">
        
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button 
            className="header-action-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            <span className="notification-badge">{notifications.length}</span>
          </button>

          {showNotifications && (
            <div className="apple-notification-modal">
              <div className="notif-header">
                <h3>Notificações</h3>
                <button className="btn-close-notif" onClick={() => setShowNotifications(false)}><X size={16} /></button>
              </div>

              <div className="notif-body">
                {notifications.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)', fontSize: '13px' }}>
                    Nenhuma notificação no momento.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div key={notif.id} className="notif-card">
                      <div className="notif-card-header">
                        <div className="notif-card-title">
                          <div className={`notif-dot ${notif.dotClass}`}></div>
                          {notif.iconType === 'download' ? <Download size={14} className="notif-card-icon" /> : <Database size={14} className="notif-card-icon" />}
                          <span className="notif-title-text">{notif.title}</span>
                        </div>
                        <button className="btn-notif-trash" title="Limpar notificação" onClick={() => handleDeleteNotif(notif.id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="notif-card-content">
                        <span className="notif-subtitle">{notif.subtitle}</span>
                        <div className={`notif-status ${notif.statusClass}`}>
                          {notif.statusIconType === 'success' && <CheckCircle2 size={12} />}
                          {notif.statusIconType === 'error' && <XCircle size={12} />}
                          {notif.statusIconType === 'info' && <Info size={12} />}
                          {notif.statusText}
                        </div>
                        <span className="notif-date">{notif.date}</span>
                        {notif.errorDetails && (
                          <span className="notif-error-details" style={{ color: '#E24B4A', fontSize: '12px', marginTop: '2px' }}>
                            {notif.errorDetails}
                          </span>
                        )}
                        {notif.hasDownload && (
                          <button className="btn-notif-download">
                            <Download size={14} /> Baixar CSV
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="notif-footer">
                <button className="btn-mark-all" onClick={handleMarkAll}>Marcar todas como lidas</button>
              </div>
            </div>
          )}
        </div>

        <ToggleTheme theme={theme} setTheme={setTheme} />

      </div>
    </header>
  );
}
