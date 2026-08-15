import React from 'react';
import { Sparkles, Edit3, Palette, FileSpreadsheet, ArrowRight, Zap, CheckCircle } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
  onLoadSample: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart, onLoadSample }) => {
  return (
    <div className="intro-overlay">
      <div className="intro-content-card animate-scale-up">
        
        {/* Top Hero Pill Badge */}
        <div className="intro-badge">
          <Sparkles style={{ width: '14px', height: '14px', color: '#f59e0b' }} />
          <span>APEX TECHNICAL SOLUTIONZ • PRO CANVA STUDIO</span>
        </div>

        {/* Main Title */}
        <h1 className="intro-headline">
          Design & Customise Official <br />
          <span className="gradient-text">APEX Certificates</span> Effortlessly
        </h1>

        {/* Subtitle */}
        <p className="intro-subtitle">
          An interactive Canva-style certificate editor with real-time field click-editing, smart multi-line course wrapping, custom color wheels, signature management, and bulk CSV batch ZIP export.
        </p>

        {/* Feature Cards Grid */}
        <div className="intro-features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              <Edit3 style={{ width: '20px', height: '20px' }} />
            </div>
            <div className="feature-title">Canva Click-to-Edit</div>
            <div className="feature-desc">Click directly on any blank underline space on the certificate to edit content live.</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
              <Palette style={{ width: '20px', height: '20px' }} />
            </div>
            <div className="feature-title">Color Wheel & Font Suite</div>
            <div className="feature-desc">Full spectrum color wheel pickers and 25+ Google Fonts for header, body & signatures.</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
              <FileSpreadsheet style={{ width: '20px', height: '20px' }} />
            </div>
            <div className="feature-title">Bulk CSV Generator</div>
            <div className="feature-desc">Upload student datasets to batch-generate hundreds of certificates in a single ZIP.</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="intro-actions">
          <button onClick={onStart} className="btn btn-primary btn-hero">
            <span>Launch Certificate Studio</span>
            <ArrowRight style={{ width: '18px', height: '18px' }} />
          </button>

          <button
            onClick={() => {
              onLoadSample();
              onStart();
            }}
            className="btn btn-secondary"
            style={{ padding: '14px 22px', fontSize: '14px' }}
          >
            <Zap style={{ width: '16px', height: '16px', color: '#f59e0b' }} />
            Load Sample Candidate Data
          </button>
        </div>

        {/* Footer info */}
        <div className="intro-footer-text">
          <CheckCircle style={{ width: '14px', height: '14px', color: '#10b981' }} />
          <span>A4 Landscape/Portrait Ready • High-Res PDF & PNG Downloads • Official APEX Silver Metallic Logo</span>
        </div>

      </div>
    </div>
  );
};
