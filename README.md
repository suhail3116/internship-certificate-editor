# 📜 APEX Certificate Studio — Interactive Canva-Style Editor & Bulk Generator

![APEX Technical Solutionz Banner](https://img.shields.io/badge/APEX-Certificate%20Studio-10b981?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.2-646cff?style=for-the-badge&logo=vite)
![PDF Export](https://img.shields.io/badge/Export-A4%20PDF%20%26%20PNG-f59e0b?style=for-the-badge)

---

## 🌟 Overview

**APEX Certificate Studio** is a state-of-the-art web application designed for **APEX Technical Solutionz**. It allows users to dynamically fill, customize, and generate official certificates of completion with a seamless, Canva-like live editing experience.

Featuring real-time click-to-edit canvas interaction, smart multi-line course text auto-wrapping, custom signature modes, full color wheel spectrum pickers, 25+ Google Web Fonts, and bulk CSV batch ZIP export, APEX Certificate Studio simplifies generating professional certificates at scale.

---

## 📸 Reference Certificate Preview

Below is the official **APEX TECHNICAL SOLUTIONZ** certificate reference template generated and customized by the platform:

![Official APEX Certificate Reference Image](./public/certificate_reference.jpg)

> **Key Fillable Certificate Fields**:
> 1. **Issue Date**: Top-right certificate issuance timestamp (`Date: 15/08/2026`).
> 2. **Salutation & Student Name**: First line (`This is to certify that Mr. / Ms. [Student Name]`).
> 3. **Roll No. / Student ID**: Second line (`[Roll No. [Roll No]]`).
> 4. **College / Institution Name**: Third line (`a student of [College Name]`).
> 5. **Course / Training Program**: Fourth & Fifth lines with **Smart Auto-Wrapping** (`has successfully completed the course in [Course Name]`).
> 6. **Duration**: Sixth line (`for a period of [15 days]`).
> 7. **Start & End Timeline Dates**: Seventh line (`from [5/08/26] to [20/08/26]`).
> 8. **Closing Statement & Pronouns**: Eighth line (`We wish him/her continued success...`).
> 9. **Founder & Signatory**: Bottom-right signature line with Founder details (`Dileep kumar`, `Software Engineer`).

---

## ✨ Core Features

### 🎯 1. Canva-Like Interactive Canvas Editor
- **Click-to-Edit**: Click directly on any fillable underline field on the certificate to open and edit its content in real-time.
- **Active Field Badging**: Visual active field highlights and floating badge indicator showing which field is currently selected.

### 📜 2. Smart Multi-Line Course Wrapping
- Automatically splits long course titles across multiple lines at natural word boundaries without text overlap or truncation.

### ✍️ 3. Flexible Founder Signature Modes
- **Cursive Script**: Stylized calligraphy script (`Great Vibes`, `Alex Brush`, `Dancing Script`).
- **PNG Signature Upload**: Upload a transparent PNG signature graphic.
- **Remove Signature Option**: Leaves the signature space blank above the line for physical pen signing on printed certificates.

### 🎨 4. Color Wheel & 25+ Google Fonts Suite
- **Interactive Color Wheels**: Full spectrum color wheel pickers for filled field text and certificate frame/border lines.
- **Typography Suite**: Custom font selection for Headings, Body Text, Filled Content, and Signatures across Modern Sans-Serif, Classic Serif, and Script categories.

### 📦 5. Bulk CSV Batch Generator
- **CSV Data Upload**: Import candidate datasets via CSV file upload.
- **Sample Datasets**: Built-in candidate dataset for quick demonstration.
- **Batch ZIP Export**: Generate and download a zipped package (`APEX_Certificates_Batch.zip`) of all candidate certificates in high-resolution PNG format.

### 📄 6. Standard A4 Portrait PDF & PNG Downloads
- **Standard A4 Portrait Export**: One-click download as print-ready A4 Portrait PDF (`210mm x 297mm`) or 300 DPI PNG image without editing outlines or badges.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.0 or higher)
- `npm` or `yarn`

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/apex-certificate-studio.git
   cd apex-certificate-studio
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🛠️ Tech Stack

- **Core**: React 18, TypeScript, Vite
- **Styling**: Pure Vanilla CSS, HSL Design Tokens, CSS Keyframe Motion
- **Icons**: Lucide React
- **Export Engines**: jsPDF, JSZip, FileSaver, PapaParse

---

## 🤝 Contact & Credits

**APEX TECHNICAL SOLUTIONZ**
- **Email**: apextechnicalsolutionz@gmail.com
- **Website**: [apextechsolution.netlify.app](https://apextechsolution.netlify.app/)
