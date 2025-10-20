/**
 * TypeScript-style JSDoc type definitions for Survey Response Structure
 * Based on "The Speak Out Survey (Responses) - Synthetic.xlsx" (206 columns, 1,656 responses)
 */

/**
 * @typedef {Object} SurveyResponse
 * @property {number} Timestamp - Excel serial date number
 *
 * DEMOGRAPHICS (8 fields)
 * @property {string} Age - Age range (e.g., "25 - 34 years old")
 * @property {string} Gender - Gender identity
 * @property {string} Sexuality - Sexual orientation
 * @property {string} Ethnicity - Ethnic group
 * @property {string} Disability - Disability status
 * @property {string} Religion - Religious affiliation
 * @property {string} Marital - Marital/relationship status
 *
 * CONTEXT (5 fields)
 * @property {string} Sector - Industry sector
 * @property {string} IsUK - UK or non-UK location
 * @property {string} Location - Geographic location within UK
 * @property {string} Company - Company name/type
 * @property {number} StartDate - Excel serial date when harassment started
 * @property {number} EndDate - Excel serial date when harassment ended
 *
 * INCIDENT DETAILS (4 fields)
 * @property {string} Perpetrator - Who was responsible
 * @property {string} PerpetratorGender - Gender of perpetrator
 * @property {number} Targets - Number of targets (numeric)
 * @property {string} ReportingType - "Formal report" | "Informal report" | "No report"
 *
 * UNFAIR TREATMENT - Binary columns (0 or 1) - 26 fields
 * @property {number} Treatment_Microaggressions
 * @property {number} Treatment_Gaslighting
 * @property {number} Treatment_Language
 * @property {number} Treatment_Shouting
 * @property {number} Treatment_Threats
 * @property {number} Treatment_Comments
 * @property {number} Treatment_Banter
 * @property {number} Treatment_Circulating
 * @property {number} Treatment_Interrupting
 * @property {number} Treatment_Interfering
 * @property {number} Treatment_Discounting
 * @property {number} Treatment_Blaming
 * @property {number} Treatment_Credit
 * @property {number} Treatment_Misinformation
 * @property {number} Treatment_Excluding
 * @property {number} Treatment_Tasks
 * @property {number} Treatment_Deadlines
 * @property {number} Treatment_Performance
 * @property {number} Treatment_Undermining
 * @property {number} Treatment_Monitoring
 * @property {number} Treatment_Withholding
 * @property {number} Treatment_Sabotage
 * @property {number} Treatment_Retaliation
 * @property {number} Treatment_Demotion
 * @property {number} Treatment_Dismissal
 * @property {number} Treatment_None
 * @property {number} Treatment_Other
 *
 * DISCRIMINATION - Binary columns (0 or 1) - 14 fields
 * @property {number} Discrimination_Age
 * @property {number} Discrimination_Disability
 * @property {number} Discrimination_Reassignment
 * @property {number} Discrimination_Marriage
 * @property {number} Discrimination_Maternity
 * @property {number} Discrimination_Race
 * @property {number} Discrimination_Religion
 * @property {number} Discrimination_Sex
 * @property {number} Discrimination_Orientation
 * @property {number} Discrimination_Complaint
 * @property {number} Discrimination_Socio
 * @property {number} Discrimination_Parental
 * @property {number} Discrimination_None
 * @property {number} Discrimination_Other
 *
 * SEXUAL HARASSMENT - Binary columns (0 or 1) - 11 fields
 * @property {number} SexHarass_Comments
 * @property {number} SexHarass_Leering
 * @property {number} SexHarass_Banter
 * @property {number} SexHarass_Messages
 * @property {number} SexHarass_Exposure
 * @property {number} SexHarass_Invasion
 * @property {number} SexHarass_Advances
 * @property {number} SexHarass_Touching
 * @property {number} SexHarass_Assault
 * @property {number} SexHarass_None
 * @property {number} SexHarass_None_Filter
 *
 * METHOD - Binary columns (0 or 1) - 7 fields
 * @property {number} Method_OutsideWork
 * @property {number} Method_AtWork
 * @property {number} Method_InPerson
 * @property {number} Method_Virtually
 * @property {number} Method_WithWitnesses
 * @property {number} Method_WithoutWitnesses
 * @property {number} Method_Other
 *
 * FORMAL REPORTING PATH (6 fields)
 * @property {number} FormalDate - Excel serial date of formal report
 * @property {string} FormalWho - Who was the formal report made to
 * @property {string} FormalImpact - Impact of formal reporting
 * @property {number} FormalSatisfaction - Satisfaction score (0-10)
 * @property {string} FormalPolice - Police involvement
 * @property {string} FormalNDA - NDA signed (Yes/No)
 * @property {string} FormalPriorInformal - Whether informal report came first
 *
 * INFORMAL REPORTING PATH (5 fields)
 * @property {number} InformalDate - Excel serial date of informal report
 * @property {string} InformalWho - Who was the informal report made to
 * @property {string} InformalImpact - Impact of informal reporting
 * @property {number} InformalSatisfaction - Satisfaction score (0-10)
 * @property {string} InformalPolice - Police involvement
 * @property {string} InformalNDA - NDA signed (Yes/No)
 *
 * NO REPORT PATH (1 field)
 * @property {string} NoReportPolice - Police involvement if no report
 *
 * EXIT (1 field)
 * @property {string} Exit - Whether person left the organization
 *
 * IMPACT - Binary columns (0 or 1) - 11 fields
 * @property {number} Impact_Avoided
 * @property {number} Impact_TimeOff
 * @property {number} Impact_SocialiseLess
 * @property {number} Impact_Confidence
 * @property {number} Impact_Performance
 * @property {number} Impact_Opportunities
 * @property {number} Impact_MentalHealth
 * @property {number} Impact_PhysicalHealth
 * @property {number} Impact_Leave
 * @property {number} Impact_Unknown
 * @property {number} Impact_Other
 *
 * FORMAL CONSEQUENCES - Binary columns (0 or 1) - 12 fields
 * @property {number} FormalConsequence_HarasserMoved
 * @property {number} FormalConsequence_VictimMoved
 * @property {number} FormalConsequence_HarasserReeducated
 * @property {number} FormalConsequence_Dismissed
 * @property {number} FormalConsequence_LowPerformance
 * @property {number} FormalConsequence_Exclusion
 * @property {number} FormalConsequence_PhysicalHealth
 * @property {number} FormalConsequence_MentalHealth
 * @property {number} FormalConsequence_NoIntervention
 * @property {number} FormalConsequence_HarasserLeft
 * @property {number} FormalConsequence_VictimLeft
 * @property {number} FormalConsequence_Other
 *
 * INFORMAL CONSEQUENCES - Binary columns (0 or 1) - 12 fields
 * @property {number} InformalConsequence_HarasserMoved
 * @property {number} InformalConsequence_VictimMoved
 * @property {number} InformalConsequence_HarasserReeducated
 * @property {number} InformalConsequence_Dismissed
 * @property {number} InformalConsequence_LowPerformance
 * @property {number} InformalConsequence_Exclusion
 * @property {number} InformalConsequence_PhysicalHealth
 * @property {number} InformalConsequence_MentalHealth
 * @property {number} InformalConsequence_NoIntervention
 * @property {number} InformalConsequence_HarasserLeft
 * @property {number} InformalConsequence_VictimLeft
 * @property {number} InformalConsequence_Other
 */

/**
 * @typedef {Object} ProcessedResponse
 * @description Transformed format compatible with existing dashboard components
 *
 * @property {string} id - Unique identifier
 * @property {string} sector - Industry sector
 * @property {boolean} nda_signed - Whether NDA was signed
 * @property {boolean} repeat_offender - Organization repeat offender status (derived)
 * @property {number} years_since_signing - Years since incident (calculated from dates)
 * @property {number} impact_mental_health - Mental health impact score (0-10)
 * @property {number} impact_career - Career impact score (0-10)
 * @property {number} impact_financial - Financial impact score (0-10)
 * @property {number} impact_isolation - Isolation impact score (0-10)
 * @property {number} impact_fear_speaking - Fear of speaking score (0-10)
 * @property {Date} created_at - Timestamp
 *
 * Extended properties for detailed analysis
 * @property {Object} demographics - Age, Gender, Sexuality, Ethnicity, etc.
 * @property {Object} incident - Perpetrator, dates, reporting type
 * @property {Object} treatment - All Treatment_* columns
 * @property {Object} discrimination - All Discrimination_* columns
 * @property {Object} sexualHarassment - All SexHarass_* columns
 * @property {Object} impacts - All Impact_* columns
 * @property {Object} consequences - All consequence columns
 */

export default {};
