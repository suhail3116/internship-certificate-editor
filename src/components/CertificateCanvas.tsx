import React, { useRef } from 'react';
import type { CertificateData, StyleConfig } from '../types/certificate';
import { splitTextIntoTwoLines } from '../utils/exportUtils';

interface CertificateCanvasProps {
  data: CertificateData;
  style: StyleConfig;
  activeField: string | null;
  onSelectField: (fieldId: string) => void;
  zoom: number;
  svgRef: React.RefObject<SVGSVGElement | null>;
}

export const CertificateCanvas: React.FC<CertificateCanvasProps> = ({
  data,
  style,
  activeField,
  onSelectField,
  zoom,
  svgRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Field values with defaults
  const issueDate = data.issueDate || '';
  const salutation = data.salutation || 'Mr. / Ms.';
  const name = data.studentName || '';
  const rollNo = data.rollNo || '';
  const college = data.collegeName || '';
  const course = data.courseName || '';
  const duration = data.duration || '';
  const startDate = data.startDate || '';
  const endDate = data.endDate || '';
  const pronoun = data.pronoun || 'him/her';
  const founderName = data.founderName || 'Dileep kumar';
  const founderTitle = data.founderTitle || 'Software Engineer';
  const signatureText = data.signatureText || '';

  // Split course into two lines automatically if it exceeds line 4 space
  const { line1: courseLine1, line2: courseLine2 } = splitTextIntoTwoLines(course, 30);

  // Helper for field interactive hover/click overlay
  const renderInteractiveGroup = (
    fieldId: string,
    label: string,
    content: React.ReactNode,
    boundingX: number,
    boundingY: number,
    boundingWidth: number,
    boundingHeight: number
  ) => {
    const isActive = activeField === fieldId;

    return (
      <g
        className="certificate-field-group cursor-pointer transition-all duration-200"
        onClick={() => onSelectField(fieldId)}
      >
        {/* Content (Underline & Filled Text) */}
        {content}

        {/* Hover / Active selection highlight box */}
        <rect
          x={boundingX}
          y={boundingY}
          width={boundingWidth}
          height={boundingHeight}
          rx={4}
          fill={isActive ? 'rgba(16, 185, 129, 0.12)' : 'transparent'}
          stroke={isActive ? '#10b981' : 'transparent'}
          strokeWidth={isActive ? 2 : 1}
          strokeDasharray={isActive ? 'none' : '4 4'}
          className={`field-active-highlight ${isActive ? 'active-box' : 'hover:stroke-emerald-400 hover:fill-emerald-500/10'} transition-colors duration-150`}
        />

        {/* Floating Field Tag badge on active */}
        {isActive && (
          <g className="field-active-badge" transform={`translate(${boundingX}, ${boundingY - 12})`}>
            <rect
              x={0}
              y={-14}
              width={label.length * 7 + 16}
              height={18}
              rx={3}
              fill="#10b981"
            />
            <text
              x={8}
              y={-2}
              fontSize="10"
              fontWeight="600"
              fill="#ffffff"
              fontFamily="Inter, sans-serif"
            >
              {label}
            </text>
          </g>
        )}
      </g>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center p-4 md:p-8 w-full h-full overflow-auto bg-slate-900/60 rounded-2xl shadow-inner border border-slate-800/80"
    >
      <div
        className="transition-transform duration-200 ease-out shadow-2xl rounded-sm bg-white"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
          width: '800px',
          height: '1000px',
        }}
      >
        <svg
          ref={svgRef}
          id="certificate-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 1000"
          className="w-[800px] h-[1000px] select-none shadow-xl bg-white"
          style={{ fontFamily: style.bodyFont || style.fontFamily }}
        >
          <defs>
            <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.25" />
            </filter>
            
            {/* Brushed Silver Metallic Gradient matching official APEX Logo */}
            <linearGradient id="apexSilverMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#717d8c" />
              <stop offset="25%" stopColor="#b8c4d2" />
              <stop offset="50%" stopColor="#e2e8f0" />
              <stop offset="75%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            <linearGradient id="apexSilverDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>

          {/* Background Canvas White */}
          <rect x="0" y="0" width="800" height="1000" fill="#ffffff" />

          {/* Outer & Inner Double Borders (A4 Aspect Dimensions) */}
          <rect x="22" y="22" width="756" height="956" fill="none" stroke={style.borderColor || '#2b323c'} strokeWidth="2.5" />
          <rect x="28" y="28" width="744" height="944" fill="none" stroke={style.borderColor || '#3a424d'} strokeWidth="1.2" />

          {/* Watermark Logo (Center Background) */}
          <g
            opacity={style.watermarkOpacity}
            transform="translate(400, 480) scale(2.6) translate(-75, -75)"
            style={{ pointerEvents: 'none' }}
          >
            <path d="M 30 115 L 72 25 L 82 25 L 42 115 Z" fill="#64748b" />
            <path d="M 77 15 L 90 42 L 64 42 Z" fill="#94a3b8" />
            <path d="M 40 115 L 75 55 L 92 82 L 110 60 L 135 115 L 122 115 L 110 75 L 92 98 L 75 70 L 52 115 Z" fill="#475569" />
            <path d="M 25 110 Q 80 95 140 110 L 140 117 Q 80 102 25 117 Z" fill="#94a3b8" />
          </g>

          {/* Top Header - APEX Metallic Logo & Title */}
          <g transform="translate(50, 45)">
            {data.logoType === 'custom' && data.customLogoImage ? (
              <image
                href={data.customLogoImage}
                x="0"
                y="0"
                width="160"
                height="100"
                preserveAspectRatio="xMinYMin meet"
              />
            ) : (
              <g filter="url(#logoShadow)">
                <path d="M 35 110 L 73 22 L 85 22 L 48 110 Z" fill="url(#apexSilverMetal)" />
                <path d="M 79 12 L 95 40 L 63 40 Z" fill="url(#apexSilverMetal)" />
                <path d="M 45 110 L 76 52 L 94 80 L 112 56 L 138 110 L 124 110 L 112 72 L 94 96 L 76 68 L 56 110 Z" fill="url(#apexSilverDark)" />
                <path d="M 28 106 Q 80 92 144 106 Q 80 99 28 113 Z" fill="url(#apexSilverMetal)" />
                <text x="85" y="142" textAnchor="middle" fontSize="22" fontWeight="800" fill="#1e293b" letterSpacing="5" fontFamily="Montserrat, sans-serif">
                  APEX
                </text>
              </g>
            )}

            <text
              x="0"
              y="162"
              fontSize="17"
              fontWeight="800"
              fill="#0f172a"
              letterSpacing="0.8"
              fontFamily="Montserrat, sans-serif"
            >
              APEX TECHNICAL SOLUTIONZ
            </text>
          </g>

          {/* Top Right Date Section */}
          {renderInteractiveGroup(
            'issueDate',
            'Issue Date',
            <g transform="translate(735, 100)" textAnchor="end">
              <text x="-135" y="0" fontSize="15" fontWeight="500" fill="#1e293b" textAnchor="end">
                Date:
              </text>
              <line x1="-125" y1="4" x2="0" y2="4" stroke="#1e293b" strokeWidth="1.2" />
              <text
                x="-62"
                y="-3"
                textAnchor="middle"
                fontSize={style.filledFontSize}
                fontWeight={style.filledTextWeight}
                fill={style.filledTextColor}
                fontFamily={style.filledTextFont}
              >
                {issueDate}
              </text>
            </g>,
            590,
            80,
            150,
            30
          )}

          {/* Center Main Heading */}
          <text
            x="400"
            y="235"
            textAnchor="middle"
            fontSize="24"
            fontWeight="800"
            fill="#0f172a"
            letterSpacing="1.2"
            fontFamily={style.headerFont || 'Montserrat, sans-serif'}
          >
            TO WHOMSOEVER IT MAY CONCERN
          </text>

          {/* Certificate Body Paragraph (Spacious Line Layout) */}
          <g transform="translate(60, 285)" fontSize="17" fill="#1e293b" fontFamily={style.bodyFont || 'Montserrat, sans-serif'}>
            {/* Line 1: Salutation + Student Name */}
            <text x="0" y="0" fontWeight="500">
              This is to certify that {salutation}
            </text>
            <line x1="260" y1="5" x2="680" y2="5" stroke="#1e293b" strokeWidth="1.2" />
            
            {renderInteractiveGroup(
              'studentName',
              'Student Name',
              <text
                x="470"
                y="-3"
                textAnchor="middle"
                fontSize={style.filledFontSize + 1}
                fontWeight={style.filledTextWeight}
                fill={style.filledTextColor}
                fontFamily={style.filledTextFont}
              >
                {name}
              </text>,
              255,
              -20,
              430,
              30
            )}

            {/* Line 2: Roll No */}
            <line x1="0" y1="50" x2="420" y2="50" stroke="#1e293b" strokeWidth="1.2" />
            <text x="435" y="45" fontWeight="500">
              [Roll No.
            </text>
            <line x1="520" y1="50" x2="670" y2="50" stroke="#1e293b" strokeWidth="1.2" />
            <text x="672" y="45" fontWeight="500">
              ],
            </text>

            {renderInteractiveGroup(
              'rollNo',
              'Roll No',
              <text
                x="595"
                y="42"
                textAnchor="middle"
                fontSize={style.filledFontSize}
                fontWeight={style.filledTextWeight}
                fill={style.filledTextColor}
                fontFamily={style.filledTextFont}
              >
                {rollNo}
              </text>,
              515,
              25,
              160,
              30
            )}

            {/* Line 3: College Name */}
            <text x="0" y="100" fontWeight="500">
              a student of
            </text>
            <line x1="110" y1="105" x2="675" y2="105" stroke="#1e293b" strokeWidth="1.2" />
            <text x="677" y="100" fontWeight="500">
              ,
            </text>

            {renderInteractiveGroup(
              'collegeName',
              'College Name',
              <text
                x="392"
                y="97"
                textAnchor="middle"
                fontSize={style.filledFontSize}
                fontWeight={style.filledTextWeight}
                fill={style.filledTextColor}
                fontFamily={style.filledTextFont}
              >
                {college}
              </text>,
              105,
              80,
              575,
              30
            )}

            {/* Line 4 & Line 5: Course Name (Smart Multi-line Auto Wrapping!) */}
            <text x="0" y="150" fontWeight="500">
              has successfully completed the course in
            </text>
            <line x1="365" y1="155" x2="680" y2="155" stroke="#1e293b" strokeWidth="1.2" />

            <line x1="0" y1="205" x2="675" y2="205" stroke="#1e293b" strokeWidth="1.2" />
            <text x="677" y="200" fontWeight="500">
              ,
            </text>

            {renderInteractiveGroup(
              'courseName',
              'Course Name',
              <g>
                <text
                  x="520"
                  y="147"
                  textAnchor="middle"
                  fontSize={style.filledFontSize}
                  fontWeight={style.filledTextWeight}
                  fill={style.filledTextColor}
                  fontFamily={style.filledTextFont}
                >
                  {courseLine1}
                </text>

                {courseLine2 && (
                  <text
                    x="337"
                    y="197"
                    textAnchor="middle"
                    fontSize={style.filledFontSize}
                    fontWeight={style.filledTextWeight}
                    fill={style.filledTextColor}
                    fontFamily={style.filledTextFont}
                  >
                    {courseLine2}
                  </text>
                )}
              </g>,
              0,
              128,
              680,
              courseLine2 ? 80 : 32
            )}

            {/* Line 6: Duration */}
            <text x="0" y="255" fontWeight="500">
              at Apex Technical Solutionz for a period of
            </text>
            <line x1="375" y1="260" x2="675" y2="260" stroke="#1e293b" strokeWidth="1.2" />
            <text x="677" y="255" fontWeight="500">
              ,
            </text>

            {renderInteractiveGroup(
              'duration',
              'Duration (e.g. 15 days)',
              <text
                x="525"
                y="252"
                textAnchor="middle"
                fontSize={style.filledFontSize}
                fontWeight={style.filledTextWeight}
                fill={style.filledTextColor}
                fontFamily={style.filledTextFont}
              >
                {duration}
              </text>,
              370,
              235,
              310,
              30
            )}

            {/* Line 7: Start Date to End Date */}
            <text x="0" y="310" fontWeight="500">
              from
            </text>
            <line x1="48" y1="315" x2="230" y2="315" stroke="#1e293b" strokeWidth="1.2" />

            {renderInteractiveGroup(
              'startDate',
              'Start Date',
              <text
                x="139"
                y="307"
                textAnchor="middle"
                fontSize={style.filledFontSize}
                fontWeight={style.filledTextWeight}
                fill={style.filledTextColor}
                fontFamily={style.filledTextFont}
              >
                {startDate}
              </text>,
              45,
              290,
              190,
              30
            )}

            <text x="245" y="310" fontWeight="500">
              to
            </text>
            <line x1="270" y1="315" x2="450" y2="315" stroke="#1e293b" strokeWidth="1.2" />
            <text x="452" y="310" fontWeight="500">
              .
            </text>

            {renderInteractiveGroup(
              'endDate',
              'End Date',
              <text
                x="360"
                y="307"
                textAnchor="middle"
                fontSize={style.filledFontSize}
                fontWeight={style.filledTextWeight}
                fill={style.filledTextColor}
                fontFamily={style.filledTextFont}
              >
                {endDate}
              </text>,
              265,
              290,
              190,
              30
            )}

            {/* Line 8: Closing Statement (Clean position at y=375 with zero collision!) */}
            {renderInteractiveGroup(
              'pronoun',
              'Pronoun',
              <text x="0" y="375" fontWeight="500">
                We wish <tspan fontWeight="700" fill={style.filledTextColor}>{pronoun}</tspan> continued success in all future endeavors.
              </text>,
              0,
              355,
              680,
              30
            )}
          </g>

          {/* Signatory Section (Bottom Right at y=720 with zero overlap!) */}
          <g transform="translate(735, 720)" textAnchor="end">
            <text x="0" y="0" fontSize="16" fontWeight="700" fill="#0f172a">
              For APEX TECHNICAL SOLUTIONZ
            </text>

            {/* Signature Area */}
            {renderInteractiveGroup(
              'signature',
              'Founder Signature',
              <g>
                {data.signatureType === 'image' && data.signatureImage ? (
                  <image
                    href={data.signatureImage}
                    x="-180"
                    y="15"
                    width="140"
                    height="45"
                    preserveAspectRatio="xMidYMid meet"
                  />
                ) : data.signatureType === 'text' && signatureText ? (
                  <text
                    x="-120"
                    y="42"
                    textAnchor="middle"
                    fontSize="26"
                    fill="#0f172a"
                    fontFamily={style.signatureFont}
                  >
                    {signatureText}
                  </text>
                ) : null}

                <text x="0" y="58" fontSize="13" fontStyle="italic" fill="#475569">
                  (Signature of Founder)
                </text>

                <line x1="-250" y1="66" x2="0" y2="66" stroke="#0f172a" strokeWidth="1.5" />
              </g>,
              -260,
              15,
              265,
              55
            )}

            {/* Signatory Name & Title */}
            {renderInteractiveGroup(
              'founderDetails',
              'Signatory Info',
              <g transform="translate(0, 90)">
                <text x="0" y="0" fontSize="17" fontWeight="800" fill="#0f172a">
                  {founderName}
                </text>
                <text x="0" y="22" fontSize="14" fontWeight="500" fill="#334155">
                  {founderTitle}
                </text>
              </g>,
              -220,
              75,
              225,
              45
            )}
          </g>

          {/* Footer Divider & Links (At bottom y=940) */}
          <line x1="40" y1="940" x2="760" y2="940" stroke="#0f172a" strokeWidth="1.4" />
          <text
            x="400"
            y="962"
            textAnchor="middle"
            fontSize="12.5"
            fontWeight="600"
            fill="#1e293b"
            fontFamily="Montserrat, sans-serif"
          >
            Email: <tspan fontWeight="400" fill="#334155">{data.email}</tspan> • Website: <tspan fontWeight="400" fill="#334155">{data.website}</tspan>
          </text>
        </svg>
      </div>
    </div>
  );
};
