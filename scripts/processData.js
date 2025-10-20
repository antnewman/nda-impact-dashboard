/**
 * Data Processing Script
 * Processes survey data from Excel files and generates output for the dashboard
 *
 * Usage:
 *   node scripts/processData.js [options]
 *
 * Options:
 *   --validate    Run validation checks
 *   --merge       Merge multiple survey files
 *   --output      Output directory (default: public/data)
 */

import { loadSurveyData } from '../src/utils/dataLoader.js';
import { printValidationReport } from '../src/utils/dataValidator.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  validate: args.includes('--validate'),
  merge: args.includes('--merge'),
  outputDir: args.includes('--output')
    ? args[args.indexOf('--output') + 1]
    : join(__dirname, '..', 'public', 'data'),
};

async function main() {
  console.log('='.repeat(80));
  console.log('SURVEY DATA PROCESSING');
  console.log('='.repeat(80));

  const dataDir = join(__dirname, '..', 'data');
  const responsesFile = join(
    dataDir,
    'The Speak Out Survey (Responses) - Synthetic.xlsx'
  );

  try {
    // Load and process survey data
    console.log('\n📂 Loading survey data...');
    const result = await loadSurveyData(responsesFile, {
      validate: options.validate,
      enrich: true,
      throwOnValidationError: false,
    });

    if (!result.success) {
      console.error('❌ Failed to load survey data:', result.error);
      process.exit(1);
    }

    console.log(`✅ Successfully loaded ${result.meta.totalResponses} responses`);

    // Display validation report if requested
    if (options.validate && result.validationReport) {
      console.log('\n📊 VALIDATION REPORT');
      console.log('-'.repeat(80));
      printValidationReport(result.validationReport);
    }

    // Display summary statistics
    console.log('\n📈 DATA SUMMARY');
    console.log('-'.repeat(80));
    console.log(`Total Responses: ${result.data.length}`);
    console.log(
      `NDAs Signed: ${result.data.filter((r) => r.nda_signed).length}`
    );
    console.log(
      `Repeat Offenders: ${result.data.filter((r) => r.repeat_offender).length}`
    );

    const sectorCounts = {};
    result.data.forEach((r) => {
      sectorCounts[r.sector] = (sectorCounts[r.sector] || 0) + 1;
    });

    console.log('\nResponses by Sector:');
    Object.entries(sectorCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .forEach(([sector, count]) => {
        console.log(`  ${sector}: ${count}`);
      });

    // Export processed data (optional)
    if (options.outputDir) {
      console.log('\n💾 EXPORTING DATA');
      console.log('-'.repeat(80));

      // Ensure output directory exists
      if (!fs.existsSync(options.outputDir)) {
        fs.mkdirSync(options.outputDir, { recursive: true });
      }

      // Export as JSON
      const jsonOutputPath = join(options.outputDir, 'processed-responses.json');
      fs.writeFileSync(
        jsonOutputPath,
        JSON.stringify(
          {
            meta: result.meta,
            data: result.data,
          },
          null,
          2
        )
      );
      console.log(`✅ Exported JSON to: ${jsonOutputPath}`);

      // Export summary statistics
      const summaryOutputPath = join(options.outputDir, 'data-summary.json');
      fs.writeFileSync(
        summaryOutputPath,
        JSON.stringify(
          {
            totalResponses: result.data.length,
            ndaSignedCount: result.data.filter((r) => r.nda_signed).length,
            repeatOffenderCount: result.data.filter((r) => r.repeat_offender)
              .length,
            sectorCounts,
            generatedAt: new Date().toISOString(),
          },
          null,
          2
        )
      );
      console.log(`✅ Exported summary to: ${summaryOutputPath}`);
    }

    console.log('\n' + '='.repeat(80));
    console.log('✅ DATA PROCESSING COMPLETE');
    console.log('='.repeat(80));
  } catch (error) {
    console.error('\n❌ Error processing data:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
main();
