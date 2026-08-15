import React, { useState } from 'react';
import Papa from 'papaparse';
import type { CertificateData, StyleConfig } from '../../types/certificate';
import { exportBulkCertificatesZip } from '../../utils/exportUtils';
import { FileSpreadsheet, Download, Upload, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';

interface BulkPanelProps {
  currentStyle: StyleConfig;
  currentData: CertificateData;
  onPreviewCandidate: (candidateData: CertificateData) => void;
}

const SAMPLE_CSV_DATA = `Student Name,Roll No,College Name,Course Name,Duration,Start Date,End Date,Issue Date
Aman Sharma,210482010045,Delhi Technological University,Full Stack Web Development & AI,15 days,5/08/26,20/08/26,15/08/2026
Priya Verma,210482010089,IIT Delhi,Machine Learning & Python,15 days,5/08/26,20/08/26,15/08/2026
Rohan Mehta,210482010112,NSUT Delhi,Cyber Security & Ethical Hacking,15 days,5/08/26,20/08/26,15/08/2026
Sneha Patel,210482010156,BITS Pilani,Cloud Computing & DevOps,15 days,5/08/26,20/08/26,15/08/2026`;

export const BulkPanel: React.FC<BulkPanelProps> = ({
  currentStyle,
  currentData,
  onPreviewCandidate,
}) => {
  const [candidates, setCandidates] = useState<CertificateData[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const parseCsvContent = (csvText: string) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedRows = results.data as Record<string, string>[];
        const newCandidates: CertificateData[] = parsedRows.map((row) => ({
          ...currentData,
          studentName: row['Student Name'] || row['Name'] || row['studentName'] || 'Student Name',
          rollNo: row['Roll No'] || row['RollNo'] || row['rollNo'] || 'Roll No',
          collegeName: row['College Name'] || row['College'] || row['collegeName'] || currentData.collegeName,
          courseName: row['Course Name'] || row['Course'] || row['courseName'] || currentData.courseName,
          duration: row['Duration'] || row['duration'] || currentData.duration,
          startDate: row['Start Date'] || row['startDate'] || currentData.startDate,
          endDate: row['End Date'] || row['endDate'] || currentData.endDate,
          issueDate: row['Issue Date'] || row['issueDate'] || currentData.issueDate,
        }));

        setCandidates(newCandidates);
        setStatusMsg(`Successfully loaded ${newCandidates.length} candidate certificates!`);
        if (newCandidates.length > 0) {
          onPreviewCandidate(newCandidates[0]);
        }
      },
      error: (err: { message: string }) => {
        setStatusMsg(`CSV Error: ${err.message}`);
      },
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target?.result as string;
        parseCsvContent(text);
      };
      reader.readAsText(file);
    }
  };

  const handleLoadSampleCsv = () => {
    parseCsvContent(SAMPLE_CSV_DATA);
  };

  const handleGenerateBatchZip = async () => {
    if (candidates.length === 0) return;
    setIsGenerating(true);
    setProgress({ current: 0, total: candidates.length });

    try {
      await exportBulkCertificatesZip(candidates, currentStyle, (curr, tot) => {
        setProgress({ current: curr, total: tot });
      });
      setStatusMsg(`Successfully generated and downloaded ${candidates.length} certificates ZIP!`);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setStatusMsg(`Failed to generate batch ZIP: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Overview Banner */}
      <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), hsl(var(--hsl-bg)))', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'hsl(var(--hsl-primary))', fontWeight: 800, fontSize: '14px' }}>
          <FileSpreadsheet style={{ width: '18px', height: '18px' }} />
          Bulk Certificate Generator
        </div>
        <p style={{ fontSize: '12.5px', color: 'hsl(var(--hsl-text-body))', lineHeight: '1.5' }}>
          Upload a CSV file containing multiple students to auto-generate customized certificates for everyone at once.
        </p>
        <button
          onClick={handleLoadSampleCsv}
          className="btn btn-primary"
          style={{ padding: '8px 14px', fontSize: '12px', alignSelf: 'flex-start' }}
        >
          <Sparkles style={{ width: '14px', height: '14px' }} />
          Load Sample 4 Candidates CSV
        </button>
      </div>

      {/* CSV Upload Area */}
      <div className="form-group">
        <label className="form-label">Upload CSV File</label>
        <div style={{ position: 'relative', border: '2px dashed hsl(var(--hsl-border))', borderRadius: '12px', padding: '20px', textAlign: 'center', background: 'hsl(var(--hsl-bg))' }}>
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileUpload}
            style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
          />
          <Upload style={{ width: '24px', height: '24px', color: 'hsl(var(--hsl-primary))', margin: '0 auto 8px' }} />
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'hsl(var(--hsl-text-heading))', display: 'block' }}>
            Click or drag CSV file here to upload
          </span>
          <span style={{ fontSize: '11px', color: 'hsl(var(--hsl-text-muted))', display: 'block', marginTop: '4px' }}>
            Columns: Student Name, Roll No, College Name, Course Name, Duration, Start Date, End Date
          </span>
        </div>
      </div>

      {/* Status Message */}
      {statusMsg && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'hsl(var(--hsl-bg))', border: '1px solid hsl(var(--hsl-border))', padding: '12px', borderRadius: '10px', fontSize: '12.5px', color: 'hsl(var(--hsl-text-heading))' }}>
          <CheckCircle2 style={{ width: '16px', height: '16px', color: 'hsl(var(--hsl-primary))', flexShrink: 0 }} />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Candidate List Table Preview */}
      {candidates.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span className="section-title">
            Loaded Candidates ({candidates.length})
          </span>

          <div style={{ maxHeight: '240px', overflowY: 'auto', border: '1px solid hsl(var(--hsl-border))', borderRadius: '12px', background: 'hsl(var(--hsl-bg))' }}>
            {candidates.map((cand, idx) => (
              <div
                key={idx}
                onClick={() => onPreviewCandidate(cand)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderBottom: idx === candidates.length - 1 ? 'none' : '1px solid hsl(var(--hsl-border))',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: 'hsl(var(--hsl-text-heading))' }}>{cand.studentName}</div>
                  <div style={{ fontSize: '11px', color: 'hsl(var(--hsl-text-muted))', fontFamily: 'var(--font-mono)' }}>
                    {cand.rollNo} • {cand.courseName.slice(0, 25)}
                  </div>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 800, color: 'hsl(var(--hsl-primary))', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  Preview
                </span>
              </div>
            ))}
          </div>

          {/* Download ZIP Button */}
          <button
            onClick={handleGenerateBatchZip}
            disabled={isGenerating}
            className="btn btn-gold"
            style={{ width: '100%', padding: '12px', fontSize: '13.5px', marginTop: '6px' }}
          >
            {isGenerating ? (
              <>
                <Loader2 style={{ width: '16px', height: '16px' }} />
                Generating ({progress.current}/{progress.total})...
              </>
            ) : (
              <>
                <Download style={{ width: '16px', height: '16px' }} />
                Generate & Download All ({candidates.length}) Certificates (ZIP)
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
