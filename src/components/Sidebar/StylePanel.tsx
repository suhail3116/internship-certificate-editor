import React from 'react';
import type { StyleConfig } from '../../types/certificate';
import { Palette, Type, Eye, Sliders } from 'lucide-react';

interface StylePanelProps {
  style: StyleConfig;
  onChange: (newStyle: Partial<StyleConfig>) => void;
}

// 1. SANS-SERIF MODERN FONTS
const SANS_FONTS = [
  { name: 'Montserrat (Standard Clean)', value: 'Montserrat' },
  { name: 'Inter (Modern Tech)', value: 'Inter' },
  { name: 'Poppins (Geometric)', value: 'Poppins' },
  { name: 'Roboto (Clean Neo-Grotesque)', value: 'Roboto' },
  { name: 'Open Sans (Neutral Legible)', value: 'Open Sans' },
  { name: 'Outfit (Modern Display)', value: 'Outfit' },
  { name: 'Plus Jakarta Sans (Corporate)', value: 'Plus Jakarta Sans' },
  { name: 'Space Grotesk (Tech Futuristic)', value: 'Space Grotesk' },
];

// 2. SERIF & FORMAL CLASSIC FONTS
const SERIF_FONTS = [
  { name: 'Playfair Display (Serif Elegance)', value: 'Playfair Display' },
  { name: 'Cinzel (Roman Imperial Classic)', value: 'Cinzel' },
  { name: 'Cormorant Garamond (Academic)', value: 'Cormorant Garamond' },
  { name: 'Bodoni Moda (High Fashion Serif)', value: 'Bodoni Moda' },
  { name: 'Lora (Editorial Serif)', value: 'Lora' },
  { name: 'Merriweather (Literary Serif)', value: 'Merriweather' },
  { name: 'EB Garamond (Heritage Renaissance)', value: 'EB Garamond' },
  { name: 'Spectral (Formal Professional)', value: 'Spectral' },
];

// 3. CURSIVE & HANDWRITTEN SIGNATURE FONTS
const SCRIPT_FONTS = [
  { name: 'Great Vibes (Flowing Cursive)', value: 'Great Vibes' },
  { name: 'Alex Brush (Classic Calligraphy)', value: 'Alex Brush' },
  { name: 'Dancing Script (Casual Hand)', value: 'Dancing Script' },
  { name: 'Sacramento (Fine Monoline)', value: 'Sacramento' },
  { name: 'Allura (Luxurious Script)', value: 'Allura' },
  { name: 'Satisfy (Smooth Cursive)', value: 'Satisfy' },
  { name: 'Parisienne (French Elegance)', value: 'Parisienne' },
  { name: 'Pinyon Script (Classic Copperplate)', value: 'Pinyon Script' },
  { name: 'Caveat (Natural Pen Hand)', value: 'Caveat' },
  { name: 'Pacifico (Bold Retro Script)', value: 'Pacifico' },
];

// COLOR SWATCH PRESETS
const COLOR_SWATCHES = [
  { label: 'Deep Obsidian', value: '#0f172a' },
  { label: 'Royal Navy Blue', value: '#1e3a8a' },
  { label: 'Emerald Green', value: '#064e3b' },
  { label: 'Dark Burgundy', value: '#701a75' },
  { label: 'Luxury Amber Gold', value: '#b45309' },
  { label: 'Crimson Red', value: '#991b1b' },
  { label: 'Deep Violet', value: '#581c87' },
  { label: 'Classic Pure Black', value: '#000000' },
];

const BORDER_COLOR_SWATCHES = [
  { label: 'Classic Charcoal', value: '#2b323c' },
  { label: 'Royal Navy', value: '#1e3a8a' },
  { label: 'Dark Gold', value: '#b45309' },
  { label: 'Deep Emerald', value: '#064e3b' },
  { label: 'Classic Black', value: '#000000' },
];

export const StylePanel: React.FC<StylePanelProps> = ({ style, onChange }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* 🎨 1. INTERACTIVE COLOR WHEEL & PALETTE */}
      <div className="panel-section">
        <div className="section-title">
          <Palette style={{ width: '16px', height: '16px' }} />
          1. Color Wheel & Palette Controls
        </div>

        {/* Filled Text Color Wheel Picker */}
        <div className="form-group">
          <label className="form-label">Filled Text Color Wheel & Picker</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'hsl(var(--hsl-bg))', border: '1px solid hsl(var(--hsl-border))', padding: '10px 14px', borderRadius: '12px' }}>
            {/* Interactive Color Wheel Input */}
            <div style={{ position: 'relative', width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.4)', cursor: 'pointer' }}>
              <input
                type="color"
                value={style.filledTextColor}
                onChange={(e) => onChange({ filledTextColor: e.target.value })}
                style={{ position: 'absolute', inset: '-10px', width: '60px', height: '60px', cursor: 'pointer', border: 'none', background: 'transparent' }}
                title="Click to open Color Wheel spectrum"
              />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '11px', color: 'hsl(var(--hsl-text-muted))', display: 'block' }}>Hex / RGB Code:</span>
              <input
                type="text"
                value={style.filledTextColor}
                onChange={(e) => onChange({ filledTextColor: e.target.value })}
                className="input-field"
                style={{ padding: '4px 8px', fontSize: '13px', fontFamily: 'var(--font-mono)', height: '28px', marginTop: '2px' }}
              />
            </div>
          </div>

          {/* Quick Swatches */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '6px', marginTop: '8px' }}>
            {COLOR_SWATCHES.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => onChange({ filledTextColor: color.value })}
                style={{
                  height: '28px',
                  borderRadius: '6px',
                  border: style.filledTextColor === color.value ? '2px solid #ffffff' : '1px solid transparent',
                  backgroundColor: color.value,
                  cursor: 'pointer',
                  boxShadow: style.filledTextColor === color.value ? '0 0 8px rgba(255,255,255,0.5)' : 'none',
                  transition: 'transform 0.15s ease',
                }}
                title={color.label}
              />
            ))}
          </div>
        </div>

        {/* Certificate Border Color Wheel Picker */}
        <div className="form-group" style={{ marginTop: '6px' }}>
          <label className="form-label">Certificate Frame & Border Color Wheel</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'hsl(var(--hsl-bg))', border: '1px solid hsl(var(--hsl-border))', padding: '10px 14px', borderRadius: '12px' }}>
            <div style={{ position: 'relative', width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.4)', cursor: 'pointer' }}>
              <input
                type="color"
                value={style.borderColor}
                onChange={(e) => onChange({ borderColor: e.target.value })}
                style={{ position: 'absolute', inset: '-10px', width: '60px', height: '60px', cursor: 'pointer', border: 'none', background: 'transparent' }}
                title="Click to open Border Color Wheel"
              />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '11px', color: 'hsl(var(--hsl-text-muted))', display: 'block' }}>Border Color Hex:</span>
              <input
                type="text"
                value={style.borderColor}
                onChange={(e) => onChange({ borderColor: e.target.value })}
                className="input-field"
                style={{ padding: '4px 8px', fontSize: '13px', fontFamily: 'var(--font-mono)', height: '28px', marginTop: '2px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', marginTop: '8px' }}>
            {BORDER_COLOR_SWATCHES.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => onChange({ borderColor: color.value })}
                style={{
                  height: '26px',
                  borderRadius: '6px',
                  border: style.borderColor === color.value ? '2px solid #ffffff' : '1px solid transparent',
                  backgroundColor: color.value,
                  cursor: 'pointer',
                }}
                title={color.label}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 🔤 2. COMPREHENSIVE FONT STYLES SECTION */}
      <div className="panel-section" style={{ paddingTop: '16px', borderTop: '1px solid hsl(var(--hsl-border))' }}>
        <div className="section-title">
          <Type style={{ width: '16px', height: '16px' }} />
          2. Complete Font Family Suite
        </div>

        {/* Filled Field Text Font */}
        <div className="form-group">
          <label className="form-label">Filled Content Font (Name, Roll No, Course)</label>
          <select
            value={style.filledTextFont}
            onChange={(e) => onChange({ filledTextFont: e.target.value })}
            className="select-field"
          >
            <optgroup label="✨ Sans-Serif Modern">
              {SANS_FONTS.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="📜 Serif & Formal Classic">
              {SERIF_FONTS.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="✍️ Calligraphy & Cursive">
              {SCRIPT_FONTS.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Certificate Heading Font */}
        <div className="form-group">
          <label className="form-label">Certificate Heading Title Font</label>
          <select
            value={style.headerFont}
            onChange={(e) => onChange({ headerFont: e.target.value })}
            className="select-field"
          >
            {SANS_FONTS.concat(SERIF_FONTS).map((font) => (
              <option key={font.value} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        {/* Certificate Body Paragraph Font */}
        <div className="form-group">
          <label className="form-label">Certificate Base Body Paragraph Font</label>
          <select
            value={style.bodyFont}
            onChange={(e) => onChange({ bodyFont: e.target.value })}
            className="select-field"
          >
            {SANS_FONTS.concat(SERIF_FONTS).map((font) => (
              <option key={font.value} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        {/* Signature Font Style */}
        <div className="form-group">
          <label className="form-label">Founder Signature Calligraphy Font</label>
          <select
            value={style.signatureFont}
            onChange={(e) => onChange({ signatureFont: e.target.value })}
            className="select-field"
          >
            {SCRIPT_FONTS.map((font) => (
              <option key={font.value} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 📏 3. FONT WEIGHT & SIZE ADJUSTMENTS */}
      <div className="panel-section" style={{ paddingTop: '16px', borderTop: '1px solid hsl(var(--hsl-border))' }}>
        <div className="section-title">
          <Sliders style={{ width: '16px', height: '16px' }} />
          3. Font Weight & Size Fine-Tuning
        </div>

        {/* Font Weight Buttons */}
        <div className="form-group">
          <label className="form-label">Filled Text Font Weight</label>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['400', '500', '600', '700', '800'].map((weight) => (
              <button
                key={weight}
                type="button"
                onClick={() => onChange({ filledTextWeight: weight })}
                className={style.filledTextWeight === weight ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ flex: 1, padding: '6px', fontSize: '12px' }}
              >
                {weight === '400' ? 'Regular' : weight === '600' ? 'SemiBold' : weight === '700' ? 'Bold' : weight}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size Slider */}
        <div className="form-group">
          <div className="form-label">
            <span>Filled Text Size</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'hsl(var(--hsl-primary))', fontWeight: 700 }}>
              {style.filledFontSize}px
            </span>
          </div>
          <input
            type="range"
            min="12"
            max="26"
            step="1"
            value={style.filledFontSize}
            onChange={(e) => onChange({ filledFontSize: Number(e.target.value) })}
            style={{ width: '100%', accentColor: 'hsl(var(--hsl-primary))', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* 👁️ 4. WATERMARK OPACITY */}
      <div className="panel-section" style={{ paddingTop: '16px', borderTop: '1px solid hsl(var(--hsl-border))' }}>
        <div className="section-title">
          <Eye style={{ width: '16px', height: '16px' }} />
          4. Watermark & Frame Opacity
        </div>

        <div className="form-group">
          <div className="form-label">
            <span>Apex Watermark Opacity</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'hsl(var(--hsl-primary))', fontWeight: 700 }}>
              {Math.round(style.watermarkOpacity * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="0.45"
            step="0.02"
            value={style.watermarkOpacity}
            onChange={(e) => onChange({ watermarkOpacity: Number(e.target.value) })}
            style={{ width: '100%', accentColor: 'hsl(var(--hsl-primary))', cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
};
