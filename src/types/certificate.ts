export interface CertificateData {
  issueDate: string;
  salutation: string;
  studentName: string;
  rollNo: string;
  collegeName: string;
  courseName: string;
  duration: string;
  startDate: string;
  endDate: string;
  pronoun: string;
  founderName: string;
  founderTitle: string;
  companyName: string;
  signatureType: 'text' | 'image' | 'none';
  signatureText: string;
  signatureImage: string | null;
  logoType: 'official' | 'custom';
  customLogoImage: string | null;
  email: string;
  website: string;
}

export interface StyleConfig {
  fontFamily: string;
  headerFont: string;
  bodyFont: string;
  filledTextFont: string;
  filledTextColor: string;
  filledTextWeight: string;
  filledFontSize: number;
  signatureFont: string;
  watermarkOpacity: number;
  borderColor: string;
  showUnderlines: boolean;
  borderStyle: 'classic' | 'ornate' | 'modern' | 'minimal';
}

export interface FieldOffsets {
  issueDate: { x: number; y: number };
  studentName: { x: number; y: number };
  rollNo: { x: number; y: number };
  collegeName: { x: number; y: number };
  courseName: { x: number; y: number };
  duration: { x: number; y: number };
  startDate: { x: number; y: number };
  endDate: { x: number; y: number };
}

export const DEFAULT_CERTIFICATE_DATA: CertificateData = {
  issueDate: '15/08/2026',
  salutation: 'Mr. / Ms.',
  studentName: 'Aman Sharma',
  rollNo: '210482010045',
  collegeName: 'Delhi Technological University',
  courseName: 'Full Stack Web Development & AI Engineering',
  duration: '15 days',
  startDate: '5/08/26',
  endDate: '20/08/26',
  pronoun: 'him/her',
  founderName: 'Dileep kumar',
  founderTitle: 'Software Engineer',
  companyName: 'APEX TECHNICAL SOLUTIONZ',
  signatureType: 'text',
  signatureText: 'Dileep Kumar',
  signatureImage: null,
  logoType: 'official',
  customLogoImage: null,
  email: 'apextechnicalsolutionz@gmail.com',
  website: 'https://apextechsolution.netlify.app/',
};

export const DEFAULT_STYLE_CONFIG: StyleConfig = {
  fontFamily: 'Montserrat',
  headerFont: 'Montserrat',
  bodyFont: 'Montserrat',
  filledTextFont: 'Montserrat',
  filledTextColor: '#0f172a',
  filledTextWeight: '600',
  filledFontSize: 16,
  signatureFont: 'Great Vibes',
  watermarkOpacity: 0.12,
  borderColor: '#2b323c',
  showUnderlines: true,
  borderStyle: 'classic',
};
