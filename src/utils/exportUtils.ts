import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import saveAs from 'file-saver';
import type { CertificateData, StyleConfig } from '../types/certificate';

/**
 * Helper to split text across two lines cleanly at word boundaries
 */
export function splitTextIntoTwoLines(text: string, maxCharsLine1: number = 30): { line1: string; line2: string } {
  const trimmed = (text || '').trim();
  if (trimmed.length <= maxCharsLine1) {
    return { line1: trimmed, line2: '' };
  }

  let splitIdx = trimmed.lastIndexOf(' ', maxCharsLine1);
  if (splitIdx <= 0 || splitIdx < maxCharsLine1 - 10) {
    splitIdx = maxCharsLine1;
  }

  return {
    line1: trimmed.slice(0, splitIdx).trim(),
    line2: trimmed.slice(splitIdx).trim(),
  };
}

/**
 * Prepares an SVG element for clean export by cloning it and stripping out any active editing highlight boxes or badges.
 */
export function prepareSvgForExport(svgElement: SVGSVGElement, scale: number = 3): { svgClone: SVGSVGElement; width: number; height: number } {
  const width = (svgElement.viewBox.baseVal.width || 800) * scale;
  const height = (svgElement.viewBox.baseVal.height || 1000) * scale;

  // Clone SVG to avoid modifying live DOM
  const svgClone = svgElement.cloneNode(true) as SVGSVGElement;
  svgClone.setAttribute('width', `${width}`);
  svgClone.setAttribute('height', `${height}`);

  // REMOVE all selection highlight rectangles, badges, and editing indicators
  const highlightElements = svgClone.querySelectorAll('.field-active-highlight, .field-active-badge');
  highlightElements.forEach((el) => el.remove());

  // Also remove any remaining interactive outline rectangles
  const rects = svgClone.querySelectorAll('rect');
  rects.forEach((rect) => {
    if (rect.getAttribute('stroke') === '#10b981' || rect.getAttribute('fill')?.includes('16, 185, 129')) {
      rect.setAttribute('stroke', 'transparent');
      rect.setAttribute('fill', 'transparent');
    }
  });

  return { svgClone, width, height };
}

/**
 * Converts an SVG element into a high-resolution PNG Data URL without editing artifacts
 */
export async function svgToPngDataUrl(
  svgElement: SVGSVGElement,
  scale: number = 3
): Promise<string> {
  const { svgClone, width, height } = prepareSvgForExport(svgElement, scale);

  const svgData = new XMLSerializer().serializeToString(svgClone);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Render white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/png', 1.0));
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
}

/**
 * Downloads single certificate as PNG
 */
export async function downloadCertificatePng(
  svgElement: SVGSVGElement,
  filename: string = 'APEX_Certificate.png'
) {
  const dataUrl = await svgToPngDataUrl(svgElement, 3);
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

/**
 * Downloads single certificate as standard A4 Portrait PDF (210mm x 297mm)
 */
export async function downloadCertificatePdf(
  svgElement: SVGSVGElement,
  filename: string = 'APEX_Certificate.pdf'
) {
  const dataUrl = await svgToPngDataUrl(svgElement, 3);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297);
  pdf.save(filename);
}

/**
 * Generates a clean A4-proportioned SVG string (800x1000) for batch processing
 */
export function generateCertificateSvgString(
  data: CertificateData,
  style: StyleConfig
): string {
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

  const { line1: courseLine1, line2: courseLine2 } = splitTextIntoTwoLines(course, 30);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000" style="background:#ffffff; font-family:'${style.bodyFont || style.fontFamily || 'Montserrat'}', sans-serif;">
      <defs>
        <linearGradient id="apexSilverMetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#717d8c" />
          <stop offset="25%" stop-color="#b8c4d2" />
          <stop offset="50%" stop-color="#e2e8f0" />
          <stop offset="75%" stop-color="#94a3b8" />
          <stop offset="100%" stop-color="#475569" />
        </linearGradient>

        <linearGradient id="apexSilverDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#475569" />
          <stop offset="50%" stop-color="#334155" />
          <stop offset="100%" stop-color="#1e293b" />
        </linearGradient>
      </defs>

      <!-- Background Canvas White -->
      <rect x="0" y="0" width="800" height="1000" fill="#ffffff" />

      <!-- Outer & Inner Double Borders (A4 Dimensions 800x1000) -->
      <rect x="22" y="22" width="756" height="956" fill="none" stroke="${style.borderColor || '#2b323c'}" stroke-width="2.5"/>
      <rect x="28" y="28" width="744" height="944" fill="none" stroke="${style.borderColor || '#3a424d'}" stroke-width="1.2"/>

      <!-- Watermark -->
      <g opacity="${style.watermarkOpacity}" transform="translate(400, 480) scale(2.6) translate(-75, -75)">
        <path d="M 30 115 L 72 25 L 82 25 L 42 115 Z" fill="#64748b" />
        <path d="M 77 15 L 90 42 L 64 42 Z" fill="#94a3b8" />
        <path d="M 40 115 L 75 55 L 92 82 L 110 60 L 135 115 L 122 115 L 110 75 L 92 98 L 75 70 L 52 115 Z" fill="#475569" />
        <path d="M 25 110 Q 80 95 140 110 L 140 117 Q 80 102 25 117 Z" fill="#94a3b8" />
      </g>

      <!-- Top Header Logo -->
      <g transform="translate(50, 45)">
        ${data.logoType === 'custom' && data.customLogoImage ? `
          <image href="${data.customLogoImage}" x="0" y="0" width="160" height="100" preserveAspectRatio="xMinYMin meet" />
        ` : `
          <g>
            <path d="M 35 110 L 73 22 L 85 22 L 48 110 Z" fill="url(#apexSilverMetal)" />
            <path d="M 79 12 L 95 40 L 63 40 Z" fill="url(#apexSilverMetal)" />
            <path d="M 45 110 L 76 52 L 94 80 L 112 56 L 138 110 L 124 110 L 112 72 L 94 96 L 76 68 L 56 110 Z" fill="url(#apexSilverDark)" />
            <path d="M 28 106 Q 80 92 144 106 Q 80 99 28 113 Z" fill="url(#apexSilverMetal)" />
            <text x="85" y="142" text-anchor="middle" font-size="22" font-weight="800" fill="#1e293b" letter-spacing="5">APEX</text>
          </g>
        `}
        <text x="0" y="162" font-size="17" font-weight="800" fill="#0f172a" letter-spacing="0.8">APEX TECHNICAL SOLUTIONZ</text>
      </g>

      <!-- Date Top Right -->
      <g transform="translate(735, 100)" text-anchor="end">
        <text x="-135" y="0" font-size="15" font-weight="500" fill="#1e293b" text-anchor="end">Date:</text>
        <line x1="-125" y1="4" x2="0" y2="4" stroke="#1e293b" stroke-width="1.2"/>
        <text x="-62" y="-3" text-anchor="middle" font-family="${style.filledTextFont}" font-weight="${style.filledTextWeight}" font-size="${style.filledFontSize}" fill="${style.filledTextColor}">${issueDate}</text>
      </g>

      <!-- Title -->
      <text x="400" y="235" text-anchor="middle" font-size="24" font-weight="800" fill="#0f172a" letter-spacing="1.2" font-family="${style.headerFont || 'Montserrat'}">TO WHOMSOEVER IT MAY CONCERN</text>

      <!-- Body Content (Spacious Line Layout) -->
      <g transform="translate(60, 285)" font-size="17" fill="#1e293b" font-family="${style.bodyFont || 'Montserrat'}">
        <!-- Line 1: Name -->
        <text x="0" y="0" font-weight="500">This is to certify that ${salutation}</text>
        <line x1="260" y1="5" x2="680" y2="5" stroke="#1e293b" stroke-width="1.2"/>
        <text x="470" y="-3" text-anchor="middle" font-family="${style.filledTextFont}" font-weight="${style.filledTextWeight}" font-size="${style.filledFontSize + 1}" fill="${style.filledTextColor}">${name}</text>

        <!-- Line 2: Roll No -->
        <line x1="0" y1="50" x2="420" y2="50" stroke="#1e293b" stroke-width="1.2"/>
        <text x="435" y="45" font-weight="500">[Roll No.</text>
        <line x1="520" y1="50" x2="670" y2="50" stroke="#1e293b" stroke-width="1.2"/>
        <text x="672" y="45" font-weight="500">],</text>
        <text x="595" y="42" text-anchor="middle" font-family="${style.filledTextFont}" font-weight="${style.filledTextWeight}" font-size="${style.filledFontSize}" fill="${style.filledTextColor}">${rollNo}</text>

        <!-- Line 3: College Name -->
        <text x="0" y="100" font-weight="500">a student of</text>
        <line x1="110" y1="105" x2="675" y2="105" stroke="#1e293b" stroke-width="1.2"/>
        <text x="677" y="100" font-weight="500">,</text>
        <text x="392" y="97" text-anchor="middle" font-family="${style.filledTextFont}" font-weight="${style.filledTextWeight}" font-size="${style.filledFontSize}" fill="${style.filledTextColor}">${college}</text>

        <!-- Line 4 & 5: Course Name -->
        <text x="0" y="150" font-weight="500">has successfully completed the course in</text>
        <line x1="365" y1="155" x2="680" y2="155" stroke="#1e293b" stroke-width="1.2"/>
        <text x="520" y="147" text-anchor="middle" font-family="${style.filledTextFont}" font-weight="${style.filledTextWeight}" font-size="${style.filledFontSize}" fill="${style.filledTextColor}">${courseLine1}</text>

        <line x1="0" y1="205" x2="675" y2="205" stroke="#1e293b" stroke-width="1.2"/>
        <text x="677" y="200" font-weight="500">,</text>
        ${courseLine2 ? `<text x="337" y="197" text-anchor="middle" font-family="${style.filledTextFont}" font-weight="${style.filledTextWeight}" font-size="${style.filledFontSize}" fill="${style.filledTextColor}">${courseLine2}</text>` : ''}

        <!-- Line 6: Duration -->
        <text x="0" y="255" font-weight="500">at Apex Technical Solutionz for a period of</text>
        <line x1="375" y1="260" x2="675" y2="260" stroke="#1e293b" stroke-width="1.2"/>
        <text x="677" y="255" font-weight="500">,</text>
        <text x="525" y="252" text-anchor="middle" font-family="${style.filledTextFont}" font-weight="${style.filledTextWeight}" font-size="${style.filledFontSize}" fill="${style.filledTextColor}">${duration}</text>

        <!-- Line 7: Dates -->
        <text x="0" y="310" font-weight="500">from</text>
        <line x1="48" y1="315" x2="230" y2="315" stroke="#1e293b" stroke-width="1.2"/>
        <text x="139" y="307" text-anchor="middle" font-family="${style.filledTextFont}" font-weight="${style.filledTextWeight}" font-size="${style.filledFontSize}" fill="${style.filledTextColor}">${startDate}</text>

        <text x="245" y="310" font-weight="500">to</text>
        <line x1="270" y1="315" x2="450" y2="315" stroke="#1e293b" stroke-width="1.2"/>
        <text x="360" y="307" text-anchor="middle" font-family="${style.filledTextFont}" font-weight="${style.filledTextWeight}" font-size="${style.filledFontSize}" fill="${style.filledTextColor}">${endDate}</text>
        <text x="452" y="310" font-weight="500">.</text>

        <!-- Line 8: Closing -->
        <text x="0" y="375" font-weight="500">We wish <tspan font-weight="700" fill="${style.filledTextColor}">${pronoun}</tspan> continued success in all future endeavors.</text>
      </g>

      <!-- Bottom Right Sign-off (Clean positioning at y=720 with zero overlap!) -->
      <g transform="translate(735, 720)" text-anchor="end">
        <text x="0" y="0" font-size="16" font-weight="700" fill="#0f172a">For APEX TECHNICAL SOLUTIONZ</text>

        ${data.signatureType === 'image' && data.signatureImage ? `
          <image href="${data.signatureImage}" x="-180" y="15" width="140" height="45" preserveAspectRatio="xMidYMid meet" />
        ` : data.signatureType === 'text' && signatureText ? `
          <text x="-120" y="42" text-anchor="middle" font-size="26" fill="#0f172a" font-family="${style.signatureFont}">${signatureText}</text>
        ` : ''}

        <text x="0" y="58" font-size="13" font-style="italic" fill="#475569">(Signature of Founder)</text>
        <line x1="-250" y1="66" x2="0" y2="66" stroke="#0f172a" stroke-width="1.5"/>

        <text x="0" y="90" font-size="17" font-weight="800" fill="#0f172a">${founderName}</text>
        <text x="0" y="112" font-size="14" font-weight="500" fill="#334155">${founderTitle}</text>
      </g>

      <!-- Footer bar -->
      <line x1="40" y1="940" x2="760" y2="940" stroke="#0f172a" stroke-width="1.4"/>
      <text x="400" y="962" text-anchor="middle" font-size="12.5" font-weight="600" fill="#1e293b">
        Email: <tspan font-weight="400">${data.email}</tspan> • Website: <tspan font-weight="400">${data.website}</tspan>
      </text>
    </svg>
  `;
}

/**
 * Bulk exports certificates for multiple items into a ZIP file
 */
export async function exportBulkCertificatesZip(
  items: CertificateData[],
  style: StyleConfig,
  onProgress?: (current: number, total: number) => void
) {
  const zip = new JSZip();
  const folder = zip.folder('APEX_Certificates');

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const svgStr = generateCertificateSvgString(item, style);

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgStr, 'image/svg+xml');
    const svgEl = doc.documentElement as unknown as SVGSVGElement;
    document.body.appendChild(svgEl);

    try {
      const pngDataUrl = await svgToPngDataUrl(svgEl, 2);
      const base64Data = pngDataUrl.replace(/^data:image\/png;base64,/, '');

      const safeName = item.studentName.replace(/[^a-zA-Z0-9_-]/g, '_') || `Certificate_${i + 1}`;
      folder?.file(`${safeName}_${item.rollNo || i + 1}.png`, base64Data, { base64: true });
    } finally {
      document.body.removeChild(svgEl);
    }

    if (onProgress) {
      onProgress(i + 1, items.length);
    }
  }

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'APEX_Certificates_Batch.zip');
}
