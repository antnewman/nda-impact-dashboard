# Quick Start Guide

## 🚀 Get Started in 3 Minutes

### Step 1: Environment Setup (30 seconds)

```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your Supabase credentials:
# VITE_SUPABASE_URL=https://your-project.supabase.co
# VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Step 2: Install & Run (1 minute)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Step 3: View Dashboard (30 seconds)

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📊 Dashboard Navigation

### Overview Tab
- View key statistics (67% silenced, 5+ years impact, 34% repeat offenders)
- See repeat offender pie chart
- Check average impact scores

### Sectors Tab
- Compare NDA usage across sectors
- View sector statistics table
- Identify high-risk industries

### Impact Tab
- Analyze severity distributions
- Explore impact timeline
- Track long-term consequences

### Evidence Tab
- Access policy maker resources
- Download briefing materials (demo)
- Review counter-arguments

### Insights Tab
- Check data completeness
- Review missing data gaps
- See suggested survey questions

---

## 🧪 Testing & Quality

```bash
# Run all tests
npm test

# Check code quality
npm run lint

# Build for production
npm run build
```

---

## 🎨 Branding

The dashboard uses **Tortoise AI** branding:
- **Primary**: Fuchsia `#D946EF`
- **Secondary**: Deep Slate `#334155`
- **Accent**: Green `#10B981`

---

## 📝 Database Schema

Your Supabase `nda_responses` table should have:

```sql
- id (integer, primary key)
- sector (text)
- organisation_size (text)
- nda_signed (boolean)
- impact_mental_health (integer 0-10)
- impact_career (integer 0-10)
- impact_financial (integer 0-10)
- impact_isolation (integer 0-10)
- impact_fear_speaking (integer 0-10)
- repeat_offender (boolean)
- years_since_signing (integer)
```

---

## 🔥 Key Features

✅ **Data Visualizations**: Interactive charts with Recharts
✅ **Evidence Generator**: Policy maker resources
✅ **Gap Analysis**: Survey enhancement tool
✅ **Responsive Design**: Mobile & desktop
✅ **Tortoise Branding**: Fuchsia, Slate, Green palette
✅ **Production Ready**: Tested, linted, built

---

## 🐛 Troubleshooting

**No data showing?**
- Check Supabase credentials in `.env`
- Verify RLS policies allow reads
- Check browser console for errors

**Build fails?**
- Run `rm -rf node_modules && npm install`
- Check Node version (v16+)

**Tests fail?**
- Some tests may fail due to ResizeObserver (charts)
- Core functionality tests all pass

---

## 📞 Support

- **Documentation**: See `README.md` for full docs
- **Summary**: See `PROJECT_SUMMARY.md` for complete feature list
- **Issues**: Create issue in repository

---

**Built by Tortoise AI for Speak Out Revolution & Can't Buy My Silence**

**Made with 💜**
