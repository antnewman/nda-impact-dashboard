# Data Import Guide

## Overview

This guide explains how to add new survey data to the NDA Impact Dashboard. The dashboard is designed to be extensible, allowing you to easily add new survey responses without modifying code.

## Data File Format

### Expected Excel Structure

The dashboard expects Excel files with the following structure:

**File Name**: `The Speak Out Survey (Responses) - [Identifier].xlsx`

**Sheet Name**: `Sheet1` (first sheet will be used)

**Columns**: 206 columns including:

#### Demographics (8 columns)
- `Timestamp` - Survey submission time (Excel serial date)
- `Age` - Age range
- `Gender` - Gender identity
- `Sexuality` - Sexual orientation
- `Ethnicity` - Ethnic group
- `Disability` - Disability status
- `Religion` - Religious affiliation
- `Marital` - Marital/relationship status

#### Context (5 columns)
- `Sector` - Industry sector
- `IsUK` - UK or non-UK location
- `Location` - Geographic location
- `Company` - Company name/type
- `StartDate` - When harassment started (Excel serial date)
- `EndDate` - When harassment ended (Excel serial date)

#### Incident Details (4 columns)
- `Perpetrator` - Who was responsible
- `PerpetratorGender` - Gender of perpetrator
- `Targets` - Number of targets (numeric)
- `ReportingType` - Type of report ("Formal report", "Informal report", "No report")

#### Multi-Select Binary Columns (0 or 1)

**Treatment Types (26 columns)**: `Treatment_*`
- Treatment_Microaggressions
- Treatment_Gaslighting
- Treatment_Language
- Treatment_Shouting
- ... (see src/config/surveyConfig.js for full list)

**Discrimination Types (14 columns)**: `Discrimination_*`
- Discrimination_Age
- Discrimination_Disability
- Discrimination_Race
- ... (see config for full list)

**Sexual Harassment (11 columns)**: `SexHarass_*`
**Methods (7 columns)**: `Method_*`
**Impacts (11 columns)**: `Impact_*`
**Formal Consequences (12 columns)**: `FormalConsequence_*`
**Informal Consequences (12 columns)**: `InformalConsequence_*`

#### Reporting Paths
- **Formal**: FormalDate, FormalWho, FormalImpact, FormalSatisfaction, FormalPolice, FormalNDA, FormalPriorInformal
- **Informal**: InformalDate, InformalWho, InformalImpact, InformalSatisfaction, InformalPolice, InformalNDA
- **No Report**: NoReportPolice

#### Exit
- `Exit` - Whether person left the organization

## Adding New Data

### Step 1: Prepare Your Excel File

Ensure your Excel file matches the expected structure:

1. ✅ **206 columns** with exact column names (case-sensitive)
2. ✅ **Dates** as Excel serial numbers (not formatted strings)
3. ✅ **Binary columns** (Treatment_*, Discrimination_*, etc.) contain only 0, 1, or blank
4. ✅ **Numeric columns** (Targets, Satisfaction scores) contain only numbers
5. ✅ **First sheet** contains the data (sheet name doesn't matter)

### Step 2: Validate Your File

Run the validation script to check your file:

```bash
npm run data:analyze
```

This will:
- Check column structure
- Identify missing required columns
- Report data type issues
- Show completion statistics

### Step 3: Add File to Project

1. Place your Excel file in the `/data` folder:
   ```
   data/
   ├── The Speak Out Survey (Responses) - Synthetic.xlsx
   └── The Speak Out Survey (Responses) - NewData.xlsx  ← Your new file
   ```

2. Copy the file to the public directory:
   ```bash
   cp "data/Your New File.xlsx" public/data/
   ```

### Step 4: Update App Configuration

Open `src/App.jsx` and update the file name:

```javascript
const result = await loadSurveyDataFromPublic(
  'The Speak Out Survey (Responses) - NewData.xlsx',  // ← Update this
  { enrich: true }
)
```

### Step 5: Process and Validate

Run the data processing script:

```bash
npm run data:process
```

This will:
- Load the Excel file
- Transform the 206-column structure to dashboard format
- Validate data integrity
- Generate summary statistics
- Export processed JSON (optional)

### Step 6: Test the Dashboard

Start the development server:

```bash
npm run dev
```

Navigate to `http://localhost:5173` and verify:
- ✅ Data loads without errors
- ✅ Total response count is correct
- ✅ All tabs display properly
- ✅ Charts render with real data
- ✅ No console errors

## Merging Multiple Survey Files

If you have multiple survey files to combine:

### Option 1: Manual Merge in Excel

1. Copy all rows from File 2 (except headers)
2. Paste into File 1 below existing data
3. Save as combined file
4. Follow steps above

### Option 2: Programmatic Merge

Create a merge script (example):

```javascript
import { loadSurveyData, mergeSurveyDatasets } from './src/utils/dataLoader.js'

async function mergeFiles() {
  const result1 = await loadSurveyData('data/Survey1.xlsx')
  const result2 = await loadSurveyData('data/Survey2.xlsx')

  const merged = mergeSurveyDatasets([result1.data, result2.data])

  console.log(`Merged ${merged.length} total responses`)
  return merged
}
```

## Data Validation Checklist

Before deploying new data, ensure:

- [ ] Excel file has 206 columns
- [ ] All required columns present: Timestamp, Age, Gender, Sector, ReportingType
- [ ] Dates are Excel serial numbers (not text)
- [ ] Binary columns contain only 0/1/blank
- [ ] Validation script passes (`npm run data:analyze`)
- [ ] Processing script succeeds (`npm run data:process`)
- [ ] Dashboard loads and displays data correctly
- [ ] No console errors in browser
- [ ] All 5 tabs render properly

## Troubleshooting

### Error: "Missing required column"

**Solution**: Check column names are exactly correct (case-sensitive). Compare with `src/config/surveyConfig.js`

### Error: "Expected date, got string"

**Solution**: Ensure date columns (Timestamp, StartDate, EndDate, etc.) are stored as Excel numbers, not formatted date strings

### Error: "Column count mismatch"

**Solution**: Verify file has exactly 206 columns. Check for hidden columns or extra columns

### Dashboard shows 0 responses

**Solution**:
1. Check browser console for errors
2. Verify file is in `public/data/` folder
3. Confirm file name matches exactly in `App.jsx`
4. Try hard refresh (Ctrl+Shift+R)

### High severity warnings during validation

**Solution**: Review `printValidationReport()` output. Warnings don't prevent loading but indicate data quality issues

## Configuration Reference

Key configuration files:

- **`src/config/surveyConfig.js`**: Column definitions, validation rules
- **`src/types/surveyTypes.js`**: TypeScript-style type definitions
- **`src/utils/dataLoader.js`**: Data loading orchestration
- **`src/utils/excelParser.js`**: Excel file parsing
- **`src/utils/dataValidator.js`**: Data validation logic
- **`src/utils/surveyDataTransformer.js`**: Transforms 206 columns → dashboard format

## Data Privacy & Security

⚠️ **Important**: Survey data contains sensitive information about harassment and discrimination

### Best Practices

1. **Never commit real data** to version control
   - Add `data/*.xlsx` to `.gitignore`
   - Use synthetic data for testing

2. **Anonymize personal information**
   - Remove names, specific locations, company names
   - Ensure no respondent can be identified

3. **Secure file storage**
   - Store original files securely
   - Limit access to authorized personnel only

4. **Production deployment**
   - Use environment variables for file paths
   - Implement authentication if needed
   - Consider server-side data processing

## Support

For questions or issues:

1. Check this documentation first
2. Review console errors in browser
3. Run validation scripts for diagnostics
4. Consult `PROJECT_SUMMARY.md` for architecture details

---

**Last Updated**: October 2025
**Dashboard Version**: 1.0.0
**Compatible Data Schema**: 206-column survey format
