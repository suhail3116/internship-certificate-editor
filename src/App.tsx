import { useState, useRef } from 'react';
import type { CertificateData, StyleConfig } from './types/certificate';
import { DEFAULT_CERTIFICATE_DATA, DEFAULT_STYLE_CONFIG } from './types/certificate';

import { Header } from './components/Header';
import { IntroScreen } from './components/IntroScreen';
import { CertificateCanvas } from './components/CertificateCanvas';
import { FormPanel } from './components/Sidebar/FormPanel';
import { StylePanel } from './components/Sidebar/StylePanel';
import { BulkPanel } from './components/Sidebar/BulkPanel';

import { downloadCertificatePng, downloadCertificatePdf } from './utils/exportUtils';
import { FileText, Palette, Layers, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export function App() {
  const [certificateData, setCertificateData] = useState<CertificateData>(DEFAULT_CERTIFICATE_DATA);
  const [styleConfig, setStyleConfig] = useState<StyleConfig>(DEFAULT_STYLE_CONFIG);
  const [activeTab, setActiveTab] = useState<'form' | 'style' | 'bulk'>('form');
  const [activeField, setActiveField] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(0.85);
  const [showIntro, setShowIntro] = useState<boolean>(true);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const handleUpdateData = (newData: Partial<CertificateData>) => {
    setCertificateData((prev) => ({ ...prev, ...newData }));
  };

  const handleUpdateStyle = (newStyle: Partial<StyleConfig>) => {
    setStyleConfig((prev) => ({ ...prev, ...newStyle }));
  };

  const handleSelectField = (fieldId: string) => {
    setActiveField(fieldId);
    setActiveTab('form');
  };

  const handleExportPng = () => {
    if (svgRef.current) {
      downloadCertificatePng(svgRef.current, `APEX_${certificateData.studentName.replace(/\s+/g, '_')}.png`);
    }
  };

  const handleExportPdf = () => {
    if (svgRef.current) {
      downloadCertificatePdf(svgRef.current, `APEX_${certificateData.studentName.replace(/\s+/g, '_')}.pdf`);
    }
  };

  return (
    <div className="app-container">
      {/* 🚀 Animated Hero Intro Page Overlay */}
      {showIntro && (
        <IntroScreen
          onStart={() => setShowIntro(false)}
          onLoadSample={() => {
            setCertificateData(DEFAULT_CERTIFICATE_DATA);
            setStyleConfig(DEFAULT_STYLE_CONFIG);
          }}
        />
      )}

      {/* Top Navbar Header */}
      <Header
        onExportPng={handleExportPng}
        onExportPdf={handleExportPdf}
        onShowIntro={() => setShowIntro(true)}
      />

      {/* Main Workspace Layout */}
      <div className="main-content">
        
        {/* Canvas Viewport (Center) */}
        <div className="canvas-viewport">
          
          {/* Floating Field Active Tag Toolbar */}
          {activeField && (
            <div className="field-toolbar">
              <span style={{ fontSize: '12px', color: 'hsl(var(--hsl-text-body))' }}>Active Field:</span>
              <span className="badge-tag">{activeField}</span>
              <button
                onClick={() => setActiveField(null)}
                style={{ background: 'none', border: 'none', color: 'hsl(var(--hsl-text-muted))', cursor: 'pointer', fontSize: '12px' }}
              >
                Clear Selection
              </button>
            </div>
          )}

          {/* Canvas Component */}
          <CertificateCanvas
            data={certificateData}
            style={styleConfig}
            activeField={activeField}
            onSelectField={handleSelectField}
            zoom={zoom}
            svgRef={svgRef}
          />

          {/* Zoom Controls Bar */}
          <div style={{ position: 'absolute', bottom: '20px', left: '24px', display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--glass-bg)', padding: '6px 12px', borderRadius: '12px', border: '1px solid hsl(var(--hsl-border))' }}>
            <button onClick={() => setZoom((z) => Math.max(0.4, z - 0.08))} className="btn btn-secondary" style={{ padding: '6px' }}>
              <ZoomOut style={{ width: '15px', height: '15px' }} />
            </button>
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', minWidth: '42px', textAlign: 'center' }}>
              {Math.round(zoom * 100)}%
            </span>
            <button onClick={() => setZoom((z) => Math.min(1.4, z + 0.08))} className="btn btn-secondary" style={{ padding: '6px' }}>
              <ZoomIn style={{ width: '15px', height: '15px' }} />
            </button>
            <button onClick={() => setZoom(0.85)} className="btn btn-secondary" style={{ padding: '6px' }} title="Reset Zoom">
              <RotateCcw style={{ width: '14px', height: '14px' }} />
            </button>
          </div>
        </div>

        {/* Sidebar Controls (Right) */}
        <aside className="sidebar">
          {/* Navigation Tabs */}
          <div className="sidebar-tabs">
            <button
              onClick={() => setActiveTab('form')}
              className={`tab-btn ${activeTab === 'form' ? 'active' : ''}`}
            >
              <FileText style={{ width: '15px', height: '15px' }} />
              Form Data
            </button>
            <button
              onClick={() => setActiveTab('style')}
              className={`tab-btn ${activeTab === 'style' ? 'active' : ''}`}
            >
              <Palette style={{ width: '15px', height: '15px' }} />
              Font & Style
            </button>
            <button
              onClick={() => setActiveTab('bulk')}
              className={`tab-btn ${activeTab === 'bulk' ? 'active' : ''}`}
            >
              <Layers style={{ width: '15px', height: '15px' }} />
              Bulk CSV
            </button>
          </div>

          {/* Active Tab Panel Content */}
          <div className="sidebar-content">
            {activeTab === 'form' && (
              <FormPanel
                data={certificateData}
                onChange={handleUpdateData}
                activeField={activeField}
                onFocusField={(fieldId) => setActiveField(fieldId)}
                onResetSample={() => setCertificateData(DEFAULT_CERTIFICATE_DATA)}
              />
            )}

            {activeTab === 'style' && (
              <StylePanel
                style={styleConfig}
                onChange={handleUpdateStyle}
              />
            )}

            {activeTab === 'bulk' && (
              <BulkPanel
                currentStyle={styleConfig}
                currentData={certificateData}
                onPreviewCandidate={(candidateData: CertificateData) => setCertificateData(candidateData)}
              />
            )}
          </div>
        </aside>

      </div>
    </div>
  );
}

export default App;
