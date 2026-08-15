import React from 'react';
import { Award, Download, FileCode, Sparkles } from 'lucide-react';

interface HeaderProps {
  onExportPng: () => void;
  onExportPdf: () => void;
  onShowIntro: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onExportPng,
  onExportPdf,
  onShowIntro,
}) => {
  return (
    <header className="studio-header">
      {/* Brand Logo & Title */}
      <div className="brand-badge">
        <div className="brand-logo-icon">
          <Award style={{ width: '22px', height: '22px' }} />
        </div>
        <div>
          <div className="brand-text">APEX Certificate Studio</div>
          <div className="brand-subtext">APEX Technical Solutionz • Interactive Canva Editor</div>
        </div>
      </div>

      {/* Header Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={onShowIntro}
          className="btn btn-secondary"
          style={{ padding: '8px 14px', fontSize: '12px' }}
          title="Play Intro Welcome Animation"
        >
          <Sparkles style={{ width: '14px', height: '14px', color: '#f59e0b' }} />
          <span>Intro Overview</span>
        </button>

        <button onClick={onExportPng} className="btn btn-secondary">
          <Download style={{ width: '15px', height: '15px' }} />
          <span>Export PNG</span>
        </button>

        <button onClick={onExportPdf} className="btn btn-gold">
          <FileCode style={{ width: '15px', height: '15px' }} />
          <span>Export A4 PDF</span>
        </button>
      </div>
    </header>
  );
};
