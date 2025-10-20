/**
 * Script to analyze Excel file structure
 * Run with: node scripts/analyzeExcelData.js
 */

import * as XLSX from 'xlsx';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// File paths
const DATA_DIR = join(__dirname, '..', 'data');
const RESPONSES_FILE = join(DATA_DIR, 'The Speak Out Survey (Responses) - Synthetic.xlsx');
const MAPPING_FILE = join(DATA_DIR, 'Data mapping - Synthetic.xlsx');

console.log('='.repeat(80));
console.log('EXCEL FILE STRUCTURE ANALYSIS');
console.log('='.repeat(80));

// Analyze Survey Responses File
console.log('\n📊 SURVEY RESPONSES FILE');
console.log('-'.repeat(80));
try {
  const workbook = XLSX.readFile(RESPONSES_FILE);

  console.log(`\nSheet Names: ${workbook.SheetNames.join(', ')}`);

  // Read first sheet
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(firstSheet);

  console.log(`\nTotal Responses: ${data.length}`);

  if (data.length > 0) {
    const headers = Object.keys(data[0]);
    console.log(`\nTotal Columns: ${headers.length}`);
    console.log('\nColumn Headers (first 50):');
    headers.slice(0, 50).forEach((header, idx) => {
      console.log(`  ${idx + 1}. ${header}`);
    });

    // Analyze column patterns
    console.log('\n\nColumn Pattern Analysis:');
    const patterns = {
      Treatment: headers.filter(h => h.startsWith('Treatment_')),
      Discrimination: headers.filter(h => h.startsWith('Discrimination_')),
      SexHarass: headers.filter(h => h.startsWith('SexHarass_')),
      Method: headers.filter(h => h.startsWith('Method_')),
      Impact: headers.filter(h => h.startsWith('Impact_')),
      FormalConsequence: headers.filter(h => h.startsWith('FormalConsequence_')),
      InformalConsequence: headers.filter(h => h.startsWith('InformalConsequence_')),
    };

    Object.entries(patterns).forEach(([pattern, cols]) => {
      console.log(`  ${pattern}_*: ${cols.length} columns`);
      if (cols.length > 0 && cols.length <= 15) {
        cols.forEach(col => console.log(`    - ${col}`));
      }
    });

    // Sample first response
    console.log('\n\nSample Response (Row 1):');
    const sampleResponse = data[0];
    Object.entries(sampleResponse).slice(0, 30).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });
  }
} catch (error) {
  console.error('Error reading responses file:', error.message);
}

// Analyze Data Mapping File
console.log('\n\n📖 DATA MAPPING FILE');
console.log('-'.repeat(80));
try {
  const workbook = XLSX.readFile(MAPPING_FILE);

  console.log(`\nSheet Names (${workbook.SheetNames.length} sheets):`);
  workbook.SheetNames.slice(0, 20).forEach((name, idx) => {
    console.log(`  ${idx + 1}. ${name}`);
  });

  // Read DICT sheet if it exists
  if (workbook.SheetNames.includes('DICT')) {
    const dictSheet = workbook.Sheets['DICT'];
    const dictData = XLSX.utils.sheet_to_json(dictSheet);

    console.log(`\n\nDICT Sheet Analysis:`);
    console.log(`  Total Rows: ${dictData.length}`);

    if (dictData.length > 0) {
      console.log(`\n  Columns: ${Object.keys(dictData[0]).join(', ')}`);

      console.log('\n  Sample Mappings (first 20):');
      dictData.slice(0, 20).forEach((row, idx) => {
        console.log(`    ${idx + 1}. ${row['Full name'] || row['Shortened Code (Raw data)']} → ${row['Question']}`);
      });
    }
  }
} catch (error) {
  console.error('Error reading mapping file:', error.message);
}

console.log('\n' + '='.repeat(80));
console.log('ANALYSIS COMPLETE');
console.log('='.repeat(80));
