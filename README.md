# NDA Impact Dashboard - Hackathon Resource Guide

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://nda-dashboard.tortoiseai.co.uk)
[![GitHub Stars](https://img.shields.io/github/stars/yourusername/nda-dashboard?style=social)](https://github.com/yourusername/nda-dashboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with React](https://img.shields.io/badge/Built%20with-React-61dafb)](https://reactjs.org/)

**A ready-to-use data platform for Challenge 3 hackathon participants to generate insights and evidence for Can't Buy My Silence's NDA reform advocacy**

🔗 **[Live Demo](https://nda-dashboard.tortoiseai.co.uk)** | **[GitHub Repository](https://github.com/yourusername/nda-dashboard)**

**Built by [Tortoise AI](https://tortoiseai.co.uk) for Speak Out Revolution & Can't Buy My Silence**

---

## 🎯 What This Is

### **This is a RESOURCE for you, not a competitor**

This dashboard is **NOT a hackathon submission** — it's a **foundation for YOUR hackathon project**. We built this so you can:

✅ **Focus your time** on analysis, insights, and innovative solutions
✅ **Skip the boring parts** like database setup and basic visualization
✅ **Build complementary tools** that add unique value to CBMS's advocacy
✅ **Generate evidence-based insights** that policy makers can actually use

❌ **DON'T rebuild** what's already here
❌ **DON'T submit** this as-is (that's not a valid entry!)
❌ **DON'T waste time** on infrastructure when you could be creating insights

### 💡 Think of this as your data API + visualization starter kit

You have **limited hackathon time**. Use it wisely. This platform gives you:
- 🗄️ **Pre-configured database** with real NDA survey data
- 📊 **Working visualizations** you can extend or learn from
- 🔌 **API access** to query data however you need
- 🚀 **Deployment-ready** codebase if you want to fork and extend

---

## 🚀 Quick Start for Hackathon Participants

### Option 1: Use the Live Dashboard (Fastest)

**Time to start: 0 minutes**

1. Visit **[https://nda-dashboard.tortoiseai.co.uk](https://nda-dashboard.tortoiseai.co.uk)**
2. Explore the data visualizations
3. Use insights to inform YOUR hackathon project
4. Reference this data in your submission

**Best for:** Non-technical participants, teams focusing on analysis/strategy

### Option 2: Clone & Extend (For Developers)

**Time to start: 5 minutes**

```bash
# Clone the repository
git clone https://github.com/yourusername/nda-dashboard.git
cd nda-dashboard

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your Supabase credentials (see below)

# Start development server
npm run dev
```

**Best for:** Teams building custom features, new visualizations, or complementary tools

### Option 3: Access the Data Directly

**Time to start: 2 minutes**

Connect to our Supabase database and query the data yourself:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'YOUR_SUPABASE_URL',  // Get from .env.example
  'YOUR_SUPABASE_KEY'
)

// Example: Fetch all NDA responses
const { data, error } = await supabase
  .from('nda_responses')
  .select('*')

// Now build whatever you want with this data!
```

**Best for:** Data scientists, analysts, teams building totally new tools

---

## 💎 How to Generate Insights for CBMS

### Method 1: Use the Live Dashboard

**What you get:** Pre-built charts, statistics, and downloads

**Example insights you can extract:**
- Which sectors have the highest NDA usage?
- What's the correlation between NDA severity and impact?
- Are NDAs hiding repeat offenders?
- What's the typical duration of NDA impacts?

**How to use for hackathon:**
1. Explore the dashboard
2. Screenshot key insights
3. Reference in your analysis/presentation
4. Build recommendations based on the data

### Method 2: Fork & Extend the Codebase

**What you get:** Full control to add new features

**Example extensions:**

```javascript
// Add a new chart component
import { BarChart, Bar, XAxis, YAxis } from 'recharts'

export function SectorImpactChart({ data }) {
  const sectorData = calculateSectorImpact(data) // Your analysis

  return (
    <BarChart data={sectorData}>
      <Bar dataKey="impact_score" fill="#D946EF" />
      <XAxis dataKey="sector" />
      <YAxis />
    </BarChart>
  )
}
```

**How to use for hackathon:**
1. Fork this repo
2. Add your unique analysis/features
3. Deploy your enhanced version
4. Submit YOUR enhanced tool as your entry

### Method 3: Build Complementary Tools

**What you get:** Freedom to innovate in any direction

**Your tool + This platform = Strong submission**

**Examples:**
- AI chatbot that answers questions using this data
- Automated report generator pulling from this API
- Mobile app for survivors using this backend
- Policy brief generator querying this database

---

## 🏆 Example Hackathon Submission Ideas

Here are **5 complete project ideas** that build ON TOP of this platform:

### 1. 📋 NDA Sector Report Generator

**What it is:** An automated tool that generates sector-specific PDF reports for advocates

**How to build:**
- Query the Supabase database filtered by sector
- Use a template engine (like PDFKit or Puppeteer)
- Generate professional reports with charts, stats, and recommendations
- Add email/download functionality

**Value to CBMS:** Instantly create targeted briefings for different industries (tech, healthcare, entertainment)

**Code snippet:**
```javascript
async function generateSectorReport(sector) {
  const { data } = await supabase
    .from('nda_responses')
    .select('*')
    .eq('sector', sector)

  const insights = analyzeData(data)
  return createPDF(insights, sector)
}
```

### 2. 🎯 Counter-Argument Response Library

**What it is:** A searchable database of evidence-based responses to common pro-NDA arguments

**How to build:**
- Identify common industry claims (from existing data)
- Create a matching algorithm to pair claims with data
- Build a search interface or API
- Export formatted responses for different audiences

**Value to CBMS:** Equip advocates with instant, data-backed responses to opposition

**Example:**
```
Industry Claim: "NDAs protect company confidential information"
Data Response: "87% of NDA survey respondents reported NDAs covering
misconduct, not trade secrets. Only 3% involved actual confidential
business information."
```

### 3. 💬 Impact Story Matcher

**What it is:** Tool that matches policy makers with relevant survivor stories based on their interests

**How to build:**
- Tag NDA responses with themes (sector, severity, duration)
- Create matching algorithm based on MP/stakeholder profiles
- Build email template generator
- Privacy-preserving anonymization

**Value to CBMS:** Personalized advocacy that connects decision-makers with relevant human impact

### 4. 📊 Data Completeness Analyzer

**What it is:** Dashboard showing gaps in current data and recommendations for future research

**How to build:**
- Analyze existing survey responses for missing fields
- Calculate statistical significance of current sample
- Identify underrepresented demographics/sectors
- Generate targeted outreach recommendations

**Value to CBMS:** Improve future data collection to strengthen advocacy

**Code snippet:**
```javascript
function analyzeCompleteness(data) {
  return {
    missingFields: countNulls(data),
    sectorGaps: findUnderrepresentedSectors(data),
    recommendedSampleSize: calculatePowerAnalysis(data),
    targetDemographics: identifyGaps(data)
  }
}
```

### 5. 🏛️ Parliamentary Brief Assistant

**What it is:** AI tool that generates parliamentary questions, briefings, and amendments using this data

**How to build:**
- Use OpenAI/Anthropic API with NDA data as context
- Create templates for different parliamentary formats
- Add citation generation for statistics
- Export in required government formats

**Value to CBMS:** Speed up policy engagement and make data more accessible to MPs

**Example output:**
```
Parliamentary Question Template:
"To ask the Secretary of State for Business and Trade, what assessment
they have made of the prevalence of non-disclosure agreements covering
workplace misconduct, given that [X]% of survey respondents in the
[SECTOR] sector reported..."
```

---

## 📈 Example Insights You Can Generate

Here are specific questions this data can answer:

### 🎯 Which sector needs strongest regulation?

**Query the data:**
```javascript
const { data } = await supabase
  .from('nda_responses')
  .select('sector, severity_level')

const bySector = groupBy(data, 'sector')
const avgSeverity = calculateAverage(bySector, 'severity_level')
```

**Insight example:** "Healthcare sector shows 34% higher average severity ratings than other sectors, suggesting targeted regulation needed"

### 💰 What's the real cost of NDAs?

**Analyze impact duration × severity:**
```javascript
const economicImpact = data.map(response => ({
  sector: response.sector,
  estimatedCost: response.impact_duration_years * response.severity_multiplier
}))
```

**Insight example:** "Average NDA impact spans 4.7 years, with estimated £X economic cost per survivor in lost wages and healthcare"

### 🔁 Are NDAs hiding serial abusers?

**Check repeat offender patterns:**
```javascript
const repeatOffenders = data.filter(r => r.repeat_offender === true)
const percentRepeat = (repeatOffenders.length / data.length) * 100
```

**Insight example:** "X% of NDA cases involve repeat offenders, suggesting NDAs enable pattern behavior"

---

## 🛠️ Technical Documentation

### Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Netlify/Vercel compatible
- **Testing:** Vitest + React Testing Library

### Installation & Setup

#### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account (optional if using provided instance)

#### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**For hackathon participants:** Contact organizers for shared Supabase credentials, or set up your own instance.

#### Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server (localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
```

### Database Schema

**Table: `nda_responses`**

```sql
CREATE TABLE nda_responses (
  id SERIAL PRIMARY KEY,
  sector VARCHAR(100),
  nda_used BOOLEAN,
  severity_level VARCHAR(20), -- 'None', 'Low', 'Medium', 'High', 'Severe'
  impact_duration_years INTEGER,
  repeat_offender BOOLEAN,
  -- Additional fields for mental health impact, financial impact, etc.
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Example query:**
```javascript
// Fetch all responses where severity is High or Severe
const { data } = await supabase
  .from('nda_responses')
  .select('*')
  .in('severity_level', ['High', 'Severe'])
```

### Project Structure

```
nda-dashboard/
├── src/
│   ├── components/          # React components
│   │   ├── DashboardTab.jsx      # Main visualization dashboard
│   │   ├── EvidenceTab.jsx       # Evidence generator for policy makers
│   │   ├── SurveyTab.jsx         # Survey enhancement tool
│   │   └── StatsCard.jsx         # Reusable statistics card
│   ├── utils/              # Utility functions
│   │   └── dataTransform.js      # Data transformation helpers
│   ├── test/               # Test files
│   ├── App.jsx             # Main application component
│   ├── supabaseClient.js   # Supabase configuration
│   └── main.jsx            # Application entry point
├── public/                 # Static assets
├── .env.example            # Environment variables template
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

### Running Tests

```bash
# Run all tests
npm test

# Run with UI (interactive)
npm run test:ui

# Run with coverage report
npm run test:coverage
```

Tests are located in `src/test/` and use Vitest + React Testing Library.

### Deployment

**Netlify (Recommended):**
```bash
# Build command
npm run build

# Publish directory
dist
```

**Vercel:**
```bash
vercel --prod
```

**Environment variables:** Add your `.env` variables in the hosting platform's dashboard.

---

## 📚 Resources for Participants

### Background Reading

- **[Can't Buy My Silence Campaign](https://www.cantbuymysilence.com/)** - Learn about the NDA reform movement
- **[Speak Out Revolution](https://www.speakoutrevolution.com/)** - Survey data source
- **UK NDA Law Overview** - Understanding current legislation
- **NDA Statistics Report** - Key findings from existing research

### Key Statistics to Know

- **X%** of workplace NDAs cover misconduct (not trade secrets)
- **X years** average duration of NDA impact on survivors
- **£X** estimated economic cost per NDA case
- **X%** of cases involve repeat offenders

*(Note: Replace with actual statistics from your data)*

### Helpful Libraries & Tools

**For Data Analysis:**
- [D3.js](https://d3js.org/) - Advanced visualizations
- [Chart.js](https://www.chartjs.org/) - Simple charts
- [Pandas (Python)](https://pandas.pydata.org/) - Data analysis
- [R + ggplot2](https://ggplot2.tidyverse.org/) - Statistical visualization

**For AI/NLP:**
- [OpenAI API](https://platform.openai.com/) - GPT for text generation
- [Anthropic Claude](https://www.anthropic.com/) - AI analysis
- [Hugging Face](https://huggingface.co/) - Open-source models
- [LangChain](https://www.langchain.com/) - LLM application framework

**For PDFs/Reports:**
- [PDFKit](https://pdfkit.org/) - PDF generation
- [Puppeteer](https://pptr.dev/) - HTML to PDF
- [React-PDF](https://react-pdf.org/) - React PDF components

**For APIs:**
- [FastAPI (Python)](https://fastapi.tiangolo.com/) - Quick API development
- [Express (Node.js)](https://expressjs.com/) - Web framework
- [Supabase Functions](https://supabase.com/docs/guides/functions) - Serverless functions

### API Examples

**Querying Supabase:**

```javascript
// Filter by sector
const { data } = await supabase
  .from('nda_responses')
  .select('*')
  .eq('sector', 'Healthcare')

// Aggregate statistics
const { data } = await supabase
  .from('nda_responses')
  .select('severity_level')

const severityCounts = data.reduce((acc, curr) => {
  acc[curr.severity_level] = (acc[curr.severity_level] || 0) + 1
  return acc
}, {})

// Complex queries with joins
const { data } = await supabase
  .from('nda_responses')
  .select(`
    *,
    sector_info:sectors(name, description)
  `)
  .gte('impact_duration_years', 5)
```

**Creating a simple API endpoint (if you extend this):**

```javascript
// api/insights/[sector].js (Vercel/Netlify function)
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  const { sector } = req.query
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

  const { data } = await supabase
    .from('nda_responses')
    .select('*')
    .eq('sector', sector)

  const insights = generateInsights(data)
  res.json(insights)
}
```

---

## ⭐ What Makes a Strong Submission

### Judging Criteria Alignment

Based on the hackathon rubric:

**🎯 Impact (40%)** - How valuable is your tool to CBMS's advocacy?
- Does it generate actionable policy insights?
- Can CBMS use it immediately?
- Does it strengthen evidence-based arguments?

**💡 Innovation (30%)** - How creative/original is your approach?
- Are you using this data in a novel way?
- Does your tool do something unique?
- Have you combined multiple technologies creatively?

**🛠️ Technical Excellence (20%)** - Is it well-built?
- Clean, documented code
- Works reliably
- Good UX/UI
- Proper error handling

**🎨 Presentation (10%)** - Can you explain it clearly?
- Clear demo
- Compelling story
- Visual aids
- Shows impact potential

### DO ✅

- **Build something CBMS can actually use** tomorrow
- **Focus on insights**, not infrastructure
- **Cite this platform** as your data source
- **Add unique value** beyond what's here
- **Make it user-friendly** for non-technical advocates
- **Document your approach** clearly
- **Show real examples** of how CBMS would use it
- **Align with advocacy goals** (policy change, public awareness, survivor support)

### DON'T ❌

- **Don't submit this dashboard as-is** (that's not a valid entry)
- **Don't rebuild** basic visualization (it's already here)
- **Don't ignore** the impact criteria (tech alone isn't enough)
- **Don't make it too complex** (CBMS staff need to use it)
- **Don't forget** to actually answer a policy question
- **Don't skip** user testing (even quick feedback helps)
- **Don't work in isolation** (ask organizers questions!)

### 🎯 Evaluation Checklist

Before you submit, ask yourself:

- [ ] Does this answer a specific question CBMS needs answered?
- [ ] Can a non-technical person use this tool?
- [ ] Is the output something CBMS can show to an MP?
- [ ] Did I build on this platform (not rebuild it)?
- [ ] Have I properly credited all data sources?
- [ ] Is my code documented and reusable?
- [ ] Can I demo this in 3 minutes?
- [ ] Does this work reliably (no bugs in demo)?

---

## 💬 Support & Questions

### For Hackathon Participants

**Have questions about using this platform?**

1. **Check Issues First:** [GitHub Issues](https://github.com/yourusername/nda-dashboard/issues)
2. **Tag your question:** Use label `hackathon-participant`
3. **Ask in the forum:** Use the hackathon Slack/Discord

**Sample questions we can help with:**
- "How do I query data for a specific sector?"
- "What format should my analysis output be in?"
- "Can I use this data in a Python notebook?"
- "How do I deploy my forked version?"

### Contact Information

**Technical Questions (This Platform):**
- **GitHub Issues:** [yourusername/nda-dashboard/issues](https://github.com/yourusername/nda-dashboard/issues)
- **Tortoise AI:** [hello@tortoiseai.co.uk](mailto:hello@tortoiseai.co.uk)

**Hackathon Questions:**
- **Speak Out Revolution:** [contact info]
- **Hackathon Organizers:** [contact info]

**NDA Reform & CBMS:**
- **Can't Buy My Silence:** [www.cantbuymysilence.com](https://www.cantbuymysilence.com)
- **Policy Questions:** [contact info]

**Response Time:**
- GitHub issues: Within 24 hours during hackathon
- Email: 1-2 business days

---

## 📝 How to Credit This Resource

### In Your Submission Document

Use this citation format:

```
Data Source: NDA Impact Survey conducted by Speak Out Revolution in
partnership with Can't Buy My Silence. Visualization platform built
by Tortoise AI. Available at: https://nda-dashboard.tortoiseai.co.uk
```

### In Your Code

If you fork or extend this codebase:

```javascript
/**
 * NDA Impact Dashboard - Hackathon Resource
 *
 * Built by: Tortoise AI (https://tortoiseai.co.uk)
 * Data: Speak Out Revolution & Can't Buy My Silence
 *
 * Extended by: [Your Team Name]
 * Extensions: [Brief description of what you added]
 *
 * Licensed under MIT License
 */
```

### In Your Presentation

Recommended slide:

```
Data & Platform Credits
------------------------
📊 Survey Data: Speak Out Revolution
🤝 Partnership: Can't Buy My Silence
🛠️ Platform: Tortoise AI
💡 Our Innovation: [What YOU built on top]
```

---

## 📄 License & Attribution

### MIT License

This project is licensed under the **MIT License** - you are free to:

✅ Use commercially
✅ Modify
✅ Distribute
✅ Use privately

**Requirements:**
- Include original license and copyright notice
- Attribute Tortoise AI, Speak Out Revolution, and Can't Buy My Silence

### Full Attribution

**Platform Development:**
- Built by [Tortoise AI](https://tortoiseai.co.uk)

**Data & Partnership:**
- Survey data collected by **Speak Out Revolution**
- In partnership with **Can't Buy My Silence**

**Open Source Libraries:**
- React, Vite, Tailwind CSS, Recharts, Supabase
- See `package.json` for full dependency list

---

## 🎨 Branding

### Tortoise AI Brand Colors

If you're extending this platform and want to maintain visual consistency:

- **Primary Color (Fuchsia):** `#D946EF`
- **Secondary Color (Deep Slate):** `#334155`
- **Accent Color (Green):** `#10B981`
- **Background (Soft Grey):** `#F8FAFC`
- **Font:** Inter (from Google Fonts)

**Usage in Tailwind:**
```javascript
<div className="bg-[#D946EF] text-white">
  Your content
</div>
```

---

## 🚀 Ready to Build?

### Next Steps

1. **Choose your approach:**
   - 🎯 Use live dashboard for analysis
   - 🔧 Fork and extend
   - 🆕 Build complementary tool

2. **Review example ideas** (see section above)

3. **Access the data:**
   - Get Supabase credentials from organizers
   - OR use the live dashboard API

4. **Start building!**
   - Focus on impact to CBMS
   - Make it usable by non-technical advocates
   - Answer a specific policy question

5. **Document your work:**
   - README with clear instructions
   - Demo video (3-5 minutes)
   - Submit before deadline!

---

## 🙏 Thank You

To all hackathon participants: **Thank you for dedicating your time and skills to NDA reform.**

This work matters. Every insight you generate, every tool you build, and every story you help tell brings us closer to meaningful policy change.

The survivors who shared their experiences in this data deserve a system that protects them. You're helping build that future.

**Let's break the silence together.**

---

**Made with 💜 by Tortoise AI**

*For Speak Out Revolution & Can't Buy My Silence*

---

## 📌 Quick Links

- 🌐 [Live Dashboard](https://nda-dashboard.tortoiseai.co.uk)
- 💻 [GitHub Repository](https://github.com/yourusername/nda-dashboard)
- 📖 [Hackathon Details](https://hackathon-link.com)
- 🤝 [Can't Buy My Silence](https://www.cantbuymysilence.com/)
- 🎯 [Speak Out Revolution](https://www.speakoutrevolution.com/)
- 🐢 [Tortoise AI](https://tortoiseai.co.uk)
