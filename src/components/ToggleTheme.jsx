import { Monitor, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ToggleTheme.css';

const OPTIONS = [
  { icon: Monitor, value: 'system', label: 'Tema do sistema' },
  { icon: Sun,     value: 'light',  label: 'Tema claro' },
  { icon: Moon,    value: 'dark',   label: 'Tema escuro' },
];

export default function ToggleTheme({ theme, setTheme }) {
  return (
    <div className="toggle-theme" role="radiogroup" aria-label="Preferência de tema">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          className={`toggle-theme-btn${theme === opt.value ? ' active' : ''}`}
          role="radio"
          aria-checked={theme === opt.value}
          aria-label={opt.label}
          title={opt.label}
          onClick={() => setTheme(opt.value)}
        >
          <AnimatePresence>
            {theme === opt.value && (
              <motion.span
                layoutId="theme-indicator"
                className="toggle-theme-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
              />
            )}
          </AnimatePresence>
          <opt.icon size={13} className="toggle-theme-icon" />
        </button>
      ))}
    </div>
  );
}
