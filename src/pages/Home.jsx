import { Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Home.css';

export default function Home() {
  const [greeting, setGreeting] = useState('Bom dia');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const companies = ['Anjos Decora', 'Azul', 'Bradesco', 'Dahruj', 'GrupoQ', 'HEV', 'InBot', 'Puríssima', 'SBT', 'VAB'];
  const departments = ['dashboard', 'marketing', 'testes'];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showFilterModal) {
        setShowFilterModal(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFilterModal]);

  const handleApplyFilter = () => {
    setActiveFilters((selectedCompanies.length > 0 ? 1 : 0) + (selectedDepartments.length > 0 ? 1 : 0));
    setShowFilterModal(false);
  };

  const handleClearFilter = () => {
    setSelectedCompanies([]);
    setSelectedDepartments([]);
    setActiveFilters(0);
  };

  const toggleCompany = (c) => {
    setSelectedCompanies(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const toggleDepartment = (d) => {
    setSelectedDepartments(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  };

  return (
    <div className="home-page fade-in">
      
      {/* BLOCO 1 - BOAS-VINDAS */}
      <section className="greeting-block glass-card">
        <h1>{greeting}, Renato</h1>
        <p style={{ marginTop: '12px', lineHeight: '1.6' }}>
          Plataforma de banco de dados visual da InBot para criar, organizar e gerenciar dados com atualização imediata em produção.
        </p>
      </section>

      {/* BLOCO 2 - FILTRO */}
      <section className="filter-block">
        <button className="btn-filter" onClick={() => setShowFilterModal(true)}>
          <Filter size={14} />
          Filtros
          {activeFilters > 0 && <span className="filter-badge">{activeFilters}</span>}
        </button>
      </section>

      {/* BLOCO 3 - NÚMEROS DA OPERAÇÃO */}
      <section className="metrics-block">
        <div className="metric-card">
          <div className="metric-value">105</div>
          <div className="metric-label">Bases de dados</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">1.751.985</div>
          <div className="metric-label">Total de registros</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">84</div>
          <div className="metric-label">Tabelas ativas na semana</div>
        </div>
      </section>

      {/* BLOCO 4 - PULSOS DO ECOSSISTEMA */}
      <section className="pulses-block">
        <div className="pulses-header">
          <h3>Pulsos do ecossistema</h3>
          <a href="#">Ver todas &rarr;</a>
        </div>
        <div className="pulses-list">
          {[
            { name: 'jornada_identificacao', env: 'dellamed / dashboard', rows: '4.199 linhas', time: 'há 15 min' },
            { name: 'rastreio_de_pedido', env: 'purissima / dashboard', rows: '1.834 linhas', time: 'há 42 min' },
            { name: 'meus_agendamentos', env: 'hev / agendamento', rows: '1.239 linhas', time: 'há 2 horas' },
            { name: 'identificacao_de_usuario', env: 'hev / agendamento', rows: '13.754 linhas', time: 'há 5 horas' },
            { name: 'log_acessos_api', env: 'system / core', rows: '89.441 linhas', time: 'há 1 dia' },
          ].map((pulse, i) => (
            <div key={i} className="pulse-item">
              <div className="pulse-dot"></div>
              <div className="pulse-name">{pulse.name}</div>
              <div className="pulse-env">{pulse.env}</div>
              <div className="pulse-rows">{pulse.rows}</div>
              <div className="pulse-time">{pulse.time}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="modal-overlay" onClick={() => { setShowFilterModal(false); setOpenDropdown(null); }}>
          <div className="apple-filter-modal" onClick={e => { e.stopPropagation(); setOpenDropdown(null); }}>
            <button className="btn-close-modal" onClick={() => setShowFilterModal(false)}>
              <X size={18} />
            </button>
            <div className="filter-header">
              <h3>Filtrar resultados</h3>
              <span className="filter-results-count">105 resultados</span>
            </div>
            
            <div className="filter-body">
              <div className="apple-input-group">
                <label>Empresa</label>
                <div className="custom-select-wrapper" onClick={e => e.stopPropagation()}>
                  <div className="custom-select-box" onClick={() => setOpenDropdown(openDropdown === 'empresa' ? null : 'empresa')}>
                    {selectedCompanies.length === 0 ? (
                      <span className="select-placeholder">Selecionar empresa</span>
                    ) : (
                      <div className="pills-container">
                        {selectedCompanies.map(c => (
                          <span key={c} className="filter-pill" onClick={(e) => { e.stopPropagation(); toggleCompany(c); }}>
                            {c} <X size={12} />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {openDropdown === 'empresa' && (
                    <div className="custom-select-menu">
                      {companies.map(c => (
                        <div key={c} className="custom-select-option" onClick={() => toggleCompany(c)}>
                          <input type="checkbox" checked={selectedCompanies.includes(c)} readOnly />
                          {c}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="apple-input-group">
                <label>Departamento</label>
                <div className="custom-select-wrapper" onClick={e => e.stopPropagation()}>
                  <div className="custom-select-box" onClick={() => setOpenDropdown(openDropdown === 'depto' ? null : 'depto')}>
                    {selectedDepartments.length === 0 ? (
                      <span className="select-placeholder">Selecionar departamento</span>
                    ) : (
                      <div className="pills-container">
                        {selectedDepartments.map(d => (
                          <span key={d} className="filter-pill" onClick={(e) => { e.stopPropagation(); toggleDepartment(d); }}>
                            {d} <X size={12} />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {openDropdown === 'depto' && (
                    <div className="custom-select-menu">
                      {departments.map(d => (
                        <div key={d} className="custom-select-option" onClick={() => toggleDepartment(d)}>
                          <input type="checkbox" checked={selectedDepartments.includes(d)} readOnly />
                          {d}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="filter-footer">
              <button className="apple-btn-ghost" onClick={handleClearFilter}>Limpar filtros</button>
              <button className="apple-btn-primary" onClick={handleApplyFilter}>Aplicar Filtros</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
