# Breaking the Silence - NDA Impact Dashboard

**Data Evidence to Make NDA Reform Watertight**

A production-ready data visualization dashboard built for the hackathon challenge, showcasing the impact of Non-Disclosure Agreements (NDAs) on individuals and organizations. This project is a collaboration between **Tortoise AI**, **Speak Out Revolution**, and **Can't Buy My Silence**.

---

## 🎯 Project Overview

This dashboard provides comprehensive data analysis and visualization tools for policy makers, advocates, and researchers working on NDA reform. It transforms survey data into actionable insights through interactive charts, statistical analysis, and evidence-based arguments.

### Key Features

#### 1. **Data Analysis & Visualization Dashboard**
- Interactive charts using Recharts library
- Bar charts showing NDA impacts by severity level (None/Low/Medium/High/Severe)
- Sector comparison: NDA usage vs transparent resolution
- Pie chart: Repeat offenders vs single incidents
- Line chart: Impact timeline showing duration over years
- Total response count tracking

#### 2. **Evidence Generator for Policy Makers**
- Key statistics cards
- Downloadable briefings (Parliamentary Briefing PDF, Infographic Pack PNG, Full Dataset CSV, Counter-Arguments Document PDF)
- Counter-arguments section comparing industry claims vs data findings

#### 3. **Survey Enhancement Tool**
- Gap analysis showing missing data points
- Suggestions for future survey questions
- Data completeness metrics per field

---

## 🎨 Branding (Tortoise AI)

- **Primary Color**: Tortoise Fuchsia `#D946EF`
- **Secondary Color**: Deep Slate `#334155`
- **Accent Color**: Accent Green `#10B981`
- **Background**: Soft Grey `#F8FAFC`
- **Font**: Inter (from Google Fonts)

---

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account with NDA responses database

---

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (use `.env.example` as template):

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

---

## 🧪 Testing

```bash
npm test              # Run tests
npm run test:ui       # Run tests with UI
npm run test:coverage # Run tests with coverage
```

---

## 📁 Project Structure

```
src/
├── components/       # React components (tabs, cards, charts)
├── utils/           # Utility functions (data transformation)
├── test/            # Test configuration
├── App.jsx          # Main app component
└── supabaseClient.js # Supabase configuration
```

---

## 🤝 Attribution

- **Built by**: [Tortoise AI](https://tortoiseai.co.uk)
- **Data Attribution**: Speak Out Revolution
- **Partnership**: Can't Buy My Silence

---

**Made with 💜 by Tortoise AI**
