import React from 'react';
import type { CertificateData } from '../../types/certificate';
import { User, Calendar, GraduationCap, Clock, Award, FileSignature, RefreshCw, Upload, Trash2, Image as ImageIcon } from 'lucide-react';

interface FormPanelProps {
  data: CertificateData;
  onChange: (newData: Partial<CertificateData>) => void;
  activeField: string | null;
  onFocusField: (fieldId: string | null) => void;
  onResetSample: () => void;
}

export const FormPanel: React.FC<FormPanelProps> = ({
  data,
  onChange,
  activeField,
  onFocusField,
  onResetSample,
}) => {
  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({
          signatureType: 'image',
          signatureImage: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({
          logoType: 'custom',
          customLogoImage: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveSignature = () => {
    onChange({
      signatureType: 'none',
      signatureImage: null,
      signatureText: '',
    });
  };

  const getFieldClass = (fieldId: string) => {
    return activeField === fieldId ? 'input-field input-field-active' : 'input-field';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner Quick Action */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'hsl(var(--hsl-bg))', border: '1px solid hsl(var(--hsl-border))', borderRadius: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: 'hsl(var(--hsl-text-heading))' }}>
          <Award style={{ width: '18px', height: '18px', color: 'hsl(var(--hsl-primary))' }} />
          Certificate Details Form
        </div>
        <button
          onClick={onResetSample}
          className="btn btn-secondary"
          style={{ padding: '6px 12px', fontSize: '12px' }}
        >
          <RefreshCw style={{ width: '13px', height: '13px' }} />
          Sample Data
        </button>
      </div>

      {/* 1. Student Identity Section */}
      <div className="panel-section">
        <div className="section-title">
          <User style={{ width: '16px', height: '16px' }} />
          1. Candidate Information
        </div>

        {/* Salutation & Name */}
        <div className="grid-3">
          <div className="form-group">
            <label className="form-label">Title</label>
            <select
              value={data.salutation}
              onChange={(e) => onChange({ salutation: e.target.value })}
              className="select-field"
            >
              <option value="Mr. / Ms.">Mr. / Ms.</option>
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Dr.">Dr.</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Full Name <span className="req">*</span>
            </label>
            <input
              type="text"
              value={data.studentName}
              onFocus={() => onFocusField('studentName')}
              onChange={(e) => onChange({ studentName: e.target.value })}
              placeholder="e.g. Aman Sharma"
              className={getFieldClass('studentName')}
            />
          </div>
        </div>

        {/* Roll No */}
        <div className="form-group">
          <label className="form-label">
            Roll No. / Student ID <span className="req">*</span>
          </label>
          <input
            type="text"
            value={data.rollNo}
            onFocus={() => onFocusField('rollNo')}
            onChange={(e) => onChange({ rollNo: e.target.value })}
            placeholder="e.g. 210482010045"
            className={getFieldClass('rollNo')}
          />
        </div>

        {/* College Name */}
        <div className="form-group">
          <label className="form-label">
            College / Institution Name <span className="req">*</span>
          </label>
          <input
            type="text"
            value={data.collegeName}
            onFocus={() => onFocusField('collegeName')}
            onChange={(e) => onChange({ collegeName: e.target.value })}
            placeholder="e.g. Delhi Technological University"
            className={getFieldClass('collegeName')}
          />
        </div>
      </div>

      {/* 2. Academic Course & Duration */}
      <div className="panel-section" style={{ paddingTop: '16px', borderTop: '1px solid hsl(var(--hsl-border))' }}>
        <div className="section-title">
          <GraduationCap style={{ width: '16px', height: '16px' }} />
          2. Course & Duration
        </div>

        {/* Course Name */}
        <div className="form-group">
          <label className="form-label">
            Course / Training Program <span className="req">*</span>
          </label>
          <input
            type="text"
            value={data.courseName}
            onFocus={() => onFocusField('courseName')}
            onChange={(e) => onChange({ courseName: e.target.value })}
            placeholder="e.g. Full Stack Web Development & AI"
            className={getFieldClass('courseName')}
          />
        </div>

        {/* Duration */}
        <div className="form-group">
          <label className="form-label">
            Duration / Period <span className="req">*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <Clock style={{ position: 'absolute', left: '12px', top: '12px', width: '16px', height: '16px', color: 'hsl(var(--hsl-text-muted))' }} />
            <input
              type="text"
              value={data.duration}
              onFocus={() => onFocusField('duration')}
              onChange={(e) => onChange({ duration: e.target.value })}
              placeholder="e.g. 15 days or 1 Month"
              className={getFieldClass('duration')}
              style={{ paddingLeft: '38px' }}
            />
          </div>
        </div>
      </div>

      {/* 3. Dates & Timeline */}
      <div className="panel-section" style={{ paddingTop: '16px', borderTop: '1px solid hsl(var(--hsl-border))' }}>
        <div className="section-title">
          <Calendar style={{ width: '16px', height: '16px' }} />
          3. Timeline & Issue Date
        </div>

        {/* Start Date & End Date */}
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input
              type="text"
              value={data.startDate}
              onFocus={() => onFocusField('startDate')}
              onChange={(e) => onChange({ startDate: e.target.value })}
              placeholder="5/08/26"
              className={getFieldClass('startDate')}
            />
          </div>

          <div className="form-group">
            <label className="form-label">End Date</label>
            <input
              type="text"
              value={data.endDate}
              onFocus={() => onFocusField('endDate')}
              onChange={(e) => onChange({ endDate: e.target.value })}
              placeholder="20/08/26"
              className={getFieldClass('endDate')}
            />
          </div>
        </div>

        {/* Certificate Issue Date & Pronoun */}
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Certificate Issue Date</label>
            <input
              type="text"
              value={data.issueDate}
              onFocus={() => onFocusField('issueDate')}
              onChange={(e) => onChange({ issueDate: e.target.value })}
              placeholder="15/08/2026"
              className={getFieldClass('issueDate')}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Closing Pronoun</label>
            <select
              value={data.pronoun}
              onChange={(e) => onChange({ pronoun: e.target.value })}
              className="select-field"
            >
              <option value="him/her">him/her</option>
              <option value="him">him</option>
              <option value="her">her</option>
              <option value="them">them</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Logo Management Section */}
      <div className="panel-section" style={{ paddingTop: '16px', borderTop: '1px solid hsl(var(--hsl-border))' }}>
        <div className="section-title">
          <ImageIcon style={{ width: '16px', height: '16px' }} />
          4. Certificate Logo
        </div>

        <div className="form-group">
          <label className="form-label">Logo Source</label>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
            <button
              type="button"
              onClick={() => onChange({ logoType: 'official' })}
              className={data.logoType === 'official' ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ flex: 1, padding: '8px', fontSize: '12px' }}
            >
              APEX Silver Metallic Logo
            </button>
            <button
              type="button"
              onClick={() => onChange({ logoType: 'custom' })}
              className={data.logoType === 'custom' ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ flex: 1, padding: '8px', fontSize: '12px' }}
            >
              Upload Custom Logo
            </button>
          </div>

          {data.logoType === 'custom' && (
            <div style={{ position: 'relative', border: '2px dashed hsl(var(--hsl-border))', borderRadius: '12px', padding: '16px', textAlign: 'center', background: 'hsl(var(--hsl-bg))' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
              />
              <Upload style={{ width: '22px', height: '22px', color: 'hsl(var(--hsl-primary))', margin: '0 auto 6px' }} />
              <span style={{ fontSize: '12px', color: 'hsl(var(--hsl-text-body))', display: 'block' }}>
                {data.customLogoImage ? 'Custom Logo Uploaded (Click to Change)' : 'Upload PNG/SVG Logo image'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 5. Founder & Signatory */}
      <div className="panel-section" style={{ paddingTop: '16px', borderTop: '1px solid hsl(var(--hsl-border))' }}>
        <div className="section-title">
          <FileSignature style={{ width: '16px', height: '16px' }} />
          5. Founder & Signatory
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Founder Name</label>
            <input
              type="text"
              value={data.founderName}
              onChange={(e) => onChange({ founderName: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Founder Title</label>
            <input
              type="text"
              value={data.founderTitle}
              onChange={(e) => onChange({ founderTitle: e.target.value })}
              className="input-field"
            />
          </div>
        </div>

        {/* Signature Options */}
        <div className="form-group">
          <label className="form-label">Signature Mode</label>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
            <button
              type="button"
              onClick={() => onChange({ signatureType: 'text', signatureText: data.signatureText || data.founderName })}
              className={data.signatureType === 'text' ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ flex: 1, padding: '7px', fontSize: '11.5px' }}
            >
              Cursive Script
            </button>
            <button
              type="button"
              onClick={() => onChange({ signatureType: 'image' })}
              className={data.signatureType === 'image' ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ flex: 1, padding: '7px', fontSize: '11.5px' }}
            >
              PNG Upload
            </button>
            <button
              type="button"
              onClick={handleRemoveSignature}
              className={data.signatureType === 'none' ? 'btn btn-gold' : 'btn btn-secondary'}
              style={{ flex: 1, padding: '7px', fontSize: '11.5px', borderColor: data.signatureType === 'none' ? 'transparent' : '#ef4444' }}
            >
              <Trash2 style={{ width: '13px', height: '13px', color: data.signatureType === 'none' ? '#ffffff' : '#ef4444' }} />
              Remove
            </button>
          </div>

          {data.signatureType === 'text' && (
            <input
              type="text"
              value={data.signatureText}
              onChange={(e) => onChange({ signatureText: e.target.value })}
              placeholder="e.g. Dileep Kumar"
              className="input-field"
            />
          )}

          {data.signatureType === 'image' && (
            <div style={{ position: 'relative', border: '2px dashed hsl(var(--hsl-border))', borderRadius: '12px', padding: '16px', textAlign: 'center', background: 'hsl(var(--hsl-bg))' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleSignatureUpload}
                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
              />
              <Upload style={{ width: '22px', height: '22px', color: 'hsl(var(--hsl-primary))', margin: '0 auto 6px' }} />
              <span style={{ fontSize: '12px', color: 'hsl(var(--hsl-text-body))', display: 'block' }}>
                {data.signatureImage ? 'Signature Uploaded (Click to Change)' : 'Upload PNG Signature (transparent background)'}
              </span>
            </div>
          )}

          {data.signatureType === 'none' && (
            <div style={{ padding: '10px 14px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', fontSize: '12px', color: '#fca5a5', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Trash2 style={{ width: '14px', height: '14px', flexShrink: 0 }} />
              <span>Signature is removed. The space above the underline will remain blank for physical signing.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
