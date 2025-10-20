/**
 * Survey Data Configuration
 * Defines expected Excel file structure, column mappings, and validation rules
 */

export const SURVEY_CONFIG = {
  // Expected file structure
  files: {
    responses: 'The Speak Out Survey (Responses) - Synthetic.xlsx',
    mapping: 'Data mapping - Synthetic.xlsx',
  },

  // Required columns that must exist in the responses file
  requiredColumns: [
    'Timestamp',
    'Age',
    'Gender',
    'Sector',
    'ReportingType',
  ],

  // Column groups and their prefixes for multi-select questions
  multiSelectGroups: {
    Treatment: {
      prefix: 'Treatment_',
      expectedCount: 26,
      description: 'Types of unfair treatment experienced',
    },
    Discrimination: {
      prefix: 'Discrimination_',
      expectedCount: 14,
      description: 'Types of discrimination experienced',
    },
    SexHarass: {
      prefix: 'SexHarass_',
      expectedCount: 11,
      description: 'Types of sexual harassment experienced',
    },
    Method: {
      prefix: 'Method_',
      expectedCount: 7,
      description: 'Methods of harassment',
    },
    Impact: {
      prefix: 'Impact_',
      expectedCount: 11,
      description: 'Impact categories',
    },
    FormalConsequence: {
      prefix: 'FormalConsequence_',
      expectedCount: 12,
      description: 'Consequences of formal reporting',
    },
    InformalConsequence: {
      prefix: 'InformalConsequence_',
      expectedCount: 12,
      description: 'Consequences of informal reporting',
    },
  },

  // Column data types for validation
  columnTypes: {
    // Dates (Excel serial numbers)
    dates: ['Timestamp', 'StartDate', 'EndDate', 'FormalDate', 'InformalDate'],

    // Numeric fields
    numbers: ['Targets', 'FormalSatisfaction', 'InformalSatisfaction'],

    // Categorical fields
    categorical: [
      'Age',
      'Gender',
      'Sexuality',
      'Ethnicity',
      'Disability',
      'Religion',
      'Marital',
      'Sector',
      'IsUK',
      'Location',
      'Company',
      'Perpetrator',
      'PerpetratorGender',
      'ReportingType',
      'Exit',
    ],

    // Binary fields (0 or 1) - auto-generated from multiSelectGroups
    binary: [
      // Treatment_* (26)
      'Treatment_Microaggressions',
      'Treatment_Gaslighting',
      'Treatment_Language',
      'Treatment_Shouting',
      'Treatment_Threats',
      'Treatment_Comments',
      'Treatment_Banter',
      'Treatment_Circulating',
      'Treatment_Interrupting',
      'Treatment_Interfering',
      'Treatment_Discounting',
      'Treatment_Blaming',
      'Treatment_Credit',
      'Treatment_Misinformation',
      'Treatment_Excluding',
      'Treatment_Tasks',
      'Treatment_Deadlines',
      'Treatment_Performance',
      'Treatment_Undermining',
      'Treatment_Monitoring',
      'Treatment_Withholding',
      'Treatment_Sabotage',
      'Treatment_Retaliation',
      'Treatment_Demotion',
      'Treatment_Dismissal',
      'Treatment_None',
      'Treatment_Other',
      // Discrimination_* (14)
      'Discrimination_Age',
      'Discrimination_Disability',
      'Discrimination_Reassignment',
      'Discrimination_Marriage',
      'Discrimination_Maternity',
      'Discrimination_Race',
      'Discrimination_Religion',
      'Discrimination_Sex',
      'Discrimination_Orientation',
      'Discrimination_Complaint',
      'Discrimination_Socio',
      'Discrimination_Parental',
      'Discrimination_None',
      'Discrimination_Other',
      // SexHarass_* (11)
      'SexHarass_Comments',
      'SexHarass_Leering',
      'SexHarass_Banter',
      'SexHarass_Messages',
      'SexHarass_Exposure',
      'SexHarass_Invasion',
      'SexHarass_Advances',
      'SexHarass_Touching',
      'SexHarass_Assault',
      'SexHarass_None',
      'SexHarass_None_Filter',
      // Method_* (7)
      'Method_OutsideWork',
      'Method_AtWork',
      'Method_InPerson',
      'Method_Virtually',
      'Method_WithWitnesses',
      'Method_WithoutWitnesses',
      'Method_Other',
      // Impact_* (11)
      'Impact_Avoided',
      'Impact_TimeOff',
      'Impact_SocialiseLess',
      'Impact_Confidence',
      'Impact_Performance',
      'Impact_Opportunities',
      'Impact_MentalHealth',
      'Impact_PhysicalHealth',
      'Impact_Leave',
      'Impact_Unknown',
      'Impact_Other',
      // FormalConsequence_* (12)
      'FormalConsequence_HarasserMoved',
      'FormalConsequence_VictimMoved',
      'FormalConsequence_HarasserReeducated',
      'FormalConsequence_Dismissed',
      'FormalConsequence_LowPerformance',
      'FormalConsequence_Exclusion',
      'FormalConsequence_PhysicalHealth',
      'FormalConsequence_MentalHealth',
      'FormalConsequence_NoIntervention',
      'FormalConsequence_HarasserLeft',
      'FormalConsequence_VictimLeft',
      'FormalConsequence_Other',
      // InformalConsequence_* (12)
      'InformalConsequence_HarasserMoved',
      'InformalConsequence_VictimMoved',
      'InformalConsequence_HarasserReeducated',
      'InformalConsequence_Dismissed',
      'InformalConsequence_LowPerformance',
      'InformalConsequence_Exclusion',
      'InformalConsequence_PhysicalHealth',
      'InformalConsequence_MentalHealth',
      'InformalConsequence_NoIntervention',
      'InformalConsequence_HarasserLeft',
      'InformalConsequence_VictimLeft',
      'InformalConsequence_Other',
    ],
  },

  // Validation rules
  validation: {
    minResponses: 1,
    maxResponses: 10000,
    expectedColumnCount: 206,
    requiredCompletionRate: 0.5, // At least 50% of responses should have core fields
  },

  // Human-readable labels for column groups
  labels: {
    Treatment_Microaggressions: 'Microaggressions',
    Treatment_Gaslighting: 'Gaslighting',
    Treatment_Language: 'Offensive Language',
    Treatment_Shouting: 'Shouting/Yelling',
    Treatment_Threats: 'Threats',
    Treatment_Comments: 'Negative Comments',
    Treatment_Banter: 'Inappropriate Banter',
    Treatment_Circulating: 'Circulating Rumors',
    Treatment_Interrupting: 'Constant Interrupting',
    Treatment_Interfering: 'Interfering with Work',
    Treatment_Discounting: 'Discounting Ideas',
    Treatment_Blaming: 'Unfair Blaming',
    Treatment_Credit: 'Taking Credit',
    Treatment_Misinformation: 'Spreading Misinformation',
    Treatment_Excluding: 'Exclusion',
    Treatment_Tasks: 'Unreasonable Tasks',
    Treatment_Deadlines: 'Unrealistic Deadlines',
    Treatment_Performance: 'Performance Criticism',
    Treatment_Undermining: 'Undermining Authority',
    Treatment_Monitoring: 'Excessive Monitoring',
    Treatment_Withholding: 'Withholding Information',
    Treatment_Sabotage: 'Sabotage',
    Treatment_Retaliation: 'Retaliation',
    Treatment_Demotion: 'Demotion',
    Treatment_Dismissal: 'Dismissal',
    Treatment_None: 'None',
    Treatment_Other: 'Other',

    Impact_MentalHealth: 'Mental Health',
    Impact_PhysicalHealth: 'Physical Health',
    Impact_Confidence: 'Confidence',
    Impact_Performance: 'Work Performance',
    Impact_Opportunities: 'Career Opportunities',
    Impact_Leave: 'Forced to Leave',
    Impact_Avoided: 'Avoided Perpetrator',
    Impact_TimeOff: 'Time Off Work',
    Impact_SocialiseLess: 'Reduced Socializing',
    Impact_Unknown: 'Unknown Impact',
    Impact_Other: 'Other Impact',
  },
};

// Helper function to get all columns of a specific type
export function getColumnsByType(type) {
  return SURVEY_CONFIG.columnTypes[type] || [];
}

// Helper function to get all columns with a specific prefix
export function getColumnsByPrefix(prefix) {
  const group = Object.values(SURVEY_CONFIG.multiSelectGroups).find(
    (g) => g.prefix === prefix
  );
  if (!group) return [];

  return SURVEY_CONFIG.columnTypes.binary.filter((col) =>
    col.startsWith(prefix)
  );
}

// Helper function to get human-readable label
export function getLabel(columnName) {
  return SURVEY_CONFIG.labels[columnName] || columnName;
}
