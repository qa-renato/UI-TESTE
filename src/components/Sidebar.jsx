import { NavLink } from 'react-router-dom';
import { Home, Grid, Settings, ChevronLeft, X, Copy, Check, Shield, Sparkles, Wrench, Lock, SlidersHorizontal, Bell, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import avatarImg from '../assets/avatar-renato.png';
import './Sidebar.css';

export default function Sidebar({ isExpanded, setIsExpanded, isHomeLayout, isDark, toggleTheme }) {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showReleaseNotes, setShowReleaseNotes] = useState(false);
  const [copiedBuildId, setCopiedBuildId] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowAboutModal(false);
        setShowProfileModal(false);
        setShowReleaseNotes(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleCopyBuildId = () => {
    navigator.clipboard.writeText('#98A7F2B');
    setCopiedBuildId(true);
    setTimeout(() => setCopiedBuildId(false), 2000);
  };

  return (
    <>
      <aside className={`sidebar ${isExpanded ? 'expanded' : ''}`}>


        {/* Header: logo + name + collapse toggle */}
        <div 
          className="sidebar-header" 
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ cursor: 'pointer' }}
          title={isExpanded ? "Recolher menu" : "Expandir menu"}
        >
          <div className="sidebar-logo">
            <svg width="22" height="22" viewBox="0 0 20.245 19.902" fill="none">
              <path d="M18.245,17.902L7.316,17.902C4.770,17.902,2.697,15.816,2.697,13.278L2.697,9.832L7.839,9.832C9.993,9.832,11.754,8.069,11.754,5.913L11.754,4.886L13.626,4.886C16.172,4.886,18.245,6.971,18.245,9.510L18.245,17.902Z" fill="var(--blue-mid)"/>
              <path d="M0.000,8.644L7.266,8.644C8.956,8.644,10.335,7.263,10.335,5.571L10.335,3.073C10.335,1.380,8.956,0.000,7.266,0.000L3.069,0.000C1.379,0.000,0.000,1.380,0.000,3.073L0.000,8.644Z" fill="var(--blue-mid)"/>
            </svg>
            <span className="logo-text">InBot</span>
          </div>

          {isExpanded && (
            <button 
              className="collapse-toggle" 
              onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
              aria-label="Recolher menu"
            >
              <ChevronLeft size={14} />
            </button>
          )}
        </div>

        {/* Menu Principal section */}
        <nav className="sidebar-nav">
          <span className="nav-section-label">Menu Principal</span>

          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
            <div className="nav-icon"><Home size={18} /></div>
            <span className="nav-label">Home</span>
            <span className="nav-tooltip">Home</span>
          </NavLink>
          
          <NavLink to="/tables" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <div className="nav-icon"><Grid size={18} /></div>
            <span className="nav-label">Tabelas</span>
            <span className="nav-tooltip">Tabelas</span>
          </NavLink>
        </nav>

        {/* Bottom actions */}
        <div className="sidebar-bottom-actions">
          <button className="nav-item" onClick={() => setShowAboutModal(true)}>
            <div className="nav-icon"><Settings size={18} /></div>
            <span className="nav-label">Sobre o Produto</span>
            <span className="nav-tooltip">Sobre o Produto</span>
          </button>
        </div>

        {/* Footer / Profile */}
        <div className="sidebar-footer" onClick={() => setShowProfileModal(true)} style={{ cursor: 'pointer' }}>
          <div className="sidebar-footer-avatar sidebar-footer-initials">
            RP
          </div>
          <div className="sidebar-footer-info">
            <h4>Renato Paulino</h4>
          </div>
        </div>
      </aside>

      {/* About System Modal */}
      {showAboutModal && (
        <div className="modal-overlay" onClick={() => setShowAboutModal(false)}>
          <div className="apple-about-modal" onClick={e => e.stopPropagation()}>
            <button className="apple-about-close" onClick={() => setShowAboutModal(false)}>
              <X size={18} />
            </button>
            
            <div className="about-header-icon">
              <Shield size={20} />
            </div>

            <h3 className="apple-about-title">Sobre o Sistema</h3>
            <p className="apple-about-subtitle">Informações técnicas e controle de versão</p>
            
            <div className="about-row">
              <span className="about-label">Versão Atual do Sistema</span>
              <span className="about-value pill-version">v3.0.0</span>
            </div>
            
            <div className="about-row">
              <span className="about-label">Data/Hora do Deploy</span>
              <span className="about-value-time vertical">
                <span className="date">24/04/2026</span>
                <span className="time">08:34:25</span>
              </span>
            </div>

            <div className="about-row">
              <span className="about-label">Ambiente</span>
              <span className="about-value pill-env"><span className="dot-green"></span> PRODUÇÃO</span>
            </div>
            
            <div className="about-row" style={{ marginBottom: '48px' }}>
              <span className="about-label">ID da Build</span>
              <div 
                className="about-value interactive-value" 
                onClick={handleCopyBuildId}
              >
                <span className="font-mono">#98A7F2B</span>
                {copiedBuildId ? (
                  <span className="copy-feedback success"><Check size={14} color="#1D9E75" /> Copiado!</span>
                ) : (
                  <span className="copy-feedback default"><Copy size={14} className="copy-icon" /> Copiar</span>
                )}
              </div>
            </div>

            <button className="apple-btn-glass full-width" onClick={() => { setShowAboutModal(false); setShowReleaseNotes(true); }}>
              Ver notas da versão
            </button>
            
            <div className="apple-about-footer">
              InTable – Desenvolvido pela InBot
            </div>
          </div>
        </div>
      )}

      {/* Release Notes Modal */}
      {showReleaseNotes && (
        <div className="modal-overlay" onClick={() => setShowReleaseNotes(false)}>
          <div className="apple-about-modal release-notes-modal" onClick={e => e.stopPropagation()}>
            <button className="apple-about-close" onClick={() => setShowReleaseNotes(false)}>
              <X size={18} />
            </button>
            
            <h3 className="apple-about-title" style={{ marginBottom: '8px' }}>Notas da versão</h3>
            <p className="apple-about-subtitle" style={{ marginBottom: '12px' }}>v3.0.0 • 24 de Abril de 2026</p>
            <div className="release-summary">3 melhorias • 2 correções</div>
            
            <div className="release-scroll-area premium-scroll">
              <div className="release-section">
                <div className="release-section-header">
                  <div className="release-icon-wrapper improvements">
                    <Sparkles size={18} strokeWidth={1.5} />
                  </div>
                  <h4>Melhorias</h4>
                </div>
                
                <div className="release-item">
                  <div className="release-item-title">Novo filtro inteligente na dashboard</div>
                  <div className="release-item-desc">Permite buscar por usuário, canal ou sessão</div>
                </div>
                <div className="release-item">
                  <div className="release-item-title">Redesign do painel "Sobre o Sistema"</div>
                  <div className="release-item-desc">Interface mais limpa com estética Liquid Glass</div>
                </div>
                <div className="release-item">
                  <div className="release-item-title">Exportação rápida de estrutura JSON</div>
                  <div className="release-item-desc">Baixe o mapeamento de campos com um único clique</div>
                </div>
              </div>

              <div className="release-section">
                <div className="release-section-header">
                  <div className="release-icon-wrapper fixes">
                    <Wrench size={18} strokeWidth={1.5} />
                  </div>
                  <h4>Correções</h4>
                </div>
                
                <div className="release-item">
                  <div className="release-item-title">Corrigido erro no carregamento de sessões</div>
                  <div className="release-item-desc">Tabelas densas agora carregam sem interrupções</div>
                </div>
                <div className="release-item">
                  <div className="release-item-title">Ajustado alinhamento em telas menores</div>
                  <div className="release-item-desc">Responsividade da tabela melhorada em tablets</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="apple-about-modal profile-modal" onClick={e => e.stopPropagation()}>
            <button className="apple-about-close" onClick={() => setShowProfileModal(false)}>
              <X size={18} />
            </button>

            <div className="profile-header">
              <div className="profile-avatar profile-avatar-initials">
                RP
              </div>
              <h4 className="profile-name">Renato Paulino</h4>
              <p className="profile-email">renato.paulino@Inbot.com.br</p>
            </div>

            <div className="profile-section">
              <div className="profile-section-title">Conta</div>
              <div className="profile-action">
                <Lock size={16} strokeWidth={1.5} className="profile-action-icon" />
                <span>Alterar senha</span>
              </div>
              <div className="profile-action">
                <SlidersHorizontal size={16} strokeWidth={1.5} className="profile-action-icon" />
                <span>Preferências</span>
              </div>
              <div className="profile-action">
                <Bell size={16} strokeWidth={1.5} className="profile-action-icon" />
                <span>Notificações</span>
              </div>
            </div>

            <div className="profile-section" style={{ marginBottom: 0 }}>
              <div className="profile-action logout-action">
                <LogOut size={16} strokeWidth={1.5} className="profile-action-icon" />
                <span>Sair da conta</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
