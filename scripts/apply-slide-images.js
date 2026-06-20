/**
 * Maps slide titles to contextually appropriate kissflow.com assets.
 * Run: node scripts/apply-slide-images.js
 */
const fs = require('fs');
const path = require('path');

const K = 'https://kissflow.com';
const H = `${K}/hubfs`;
const HS = `${K}/hs-fs/hubfs`;

const IMG = {
  hero: `${HS}/new-paradigm-1.webp`,
  og: `${H}/OG%20Homepage.webp`,
  aiEnterprise: `${HS}/AI%20for%20Enterprise%20Use%20Cases%20(1).webp`,
  aiApp: `${H}/AI%20App%20Creation%20Video.mp4`,
  aiForms: `${H}/Forms%20AI.mp4`,
  aiReports: `${H}/AI%20Report%20Creation.mp4`,
  aiPortals: `${H}/AI%20Portal%20Creation%20No%20Background.mp4`,
  aiBoards: `${H}/Board%20Creation%20AI.mp4`,
  workflows: `${H}/Workflows.svg`,
  workflowsMp4: `${H}/Workflows.mp4`,
  integrations: `${H}/Integrations.mp4`,
  reports: `${H}/Reports.svg`,
  reportsCio: `${H}/CIO-Reports.png`,
  portals: `${H}/Portals.svg`,
  boards: `${H}/Boards%202.svg`,
  dataPolicies: `${H}/Data%20policies.svg`,
  dataPoliciesWebp: `${H}/Data%20Policies.webp`,
  appMonitoring: `${H}/App%20Monitoring.webp`,
  appMonitoringSvg: `${H}/App%20monitoring.svg`,
  userMonitoring: `${H}/User%20Monitoring.webp`,
  userMonitoringSvg: `${H}/User%20monitoring.svg`,
  roleAccess: `${H}/Role-based%20Access.webp`,
  roleAccessSvg: `${H}/Role-based%20access.svg`,
  auditLogs: `${H}/Audit%20Logs.webp`,
  auditLogSvg: `${H}/Audit%20log.svg`,
  governance: `${HS}/Mature%20Governance%20Tools%20(1).webp`,
  roi: `${HS}/Proven%20451%25%20ROI.webp`,
  simple: `${HS}/Simple%20and%20Sophisticated%20(1).webp`,
  value: `${HS}/Value%20to%20Delivery.webp`,
  leaders: `${HS}/For%20Leaders%20with%20a%20Big%20Vision%20(1).webp`,
  newProductApp: `${H}/New%20Product%20Dev%20App.webp`,
  partnerPortal: `${H}/Partner%20Portal.webp`,
  vendorPortal: `${H}/Vendor%20Portal.svg`,
  retailStore: `${H}/Retail%20Store%20Management-1.webp`,
  production: `${H}/Production%20Tracking.webp`,
  fleet: `${H}/Fleet%20Management.webp`,
  loan: `${H}/Loan%20Origination.webp`,
  claims: `${H}/Claims%20Processing.webp`,
  ticketing: `${H}/Ticketing%20System.svg`,
  incident: `${H}/Incident%20management.svg`,
  inventory: `${H}/Inventory%20management-Oct-06-2025-06-56-19-2386-AM.svg`,
  itAsset: `${H}/IT%20Asset%20Management-1.svg`,
  maintenance: `${H}/Maintenance%20Work%20Order.svg`,
  spend: `${H}/Spend%20Management.svg`,
  supplier: `${H}/Supplier%20Performance.svg`,
  inspection: `${H}/Inspection%20Management.svg`,
  dt: `${H}/DT.png`,
  kfIt: `${H}/KF_IT.png`,
  feature: `${H}/feature_image.webp`,
  section1: `${H}/Section%201.webp`,
  section1Tab: `${H}/Section%201%20Tab.webp`,
  section1Mobile: `${H}/Section%201%20Mobile.webp`,
  section2: `${H}/Section%202.webp`,
  cheeta: `${H}/Cheeta%20529x400.webp`,
  lastSection: `${H}/Last%20Section%20%281%29.webp`,
  mobBanner: `${H}/mob-banner.png`,
  resourceMenu: `${H}/resource_menu.webp`,
  learn1: `${H}/learn%20(1).svg`,
  learn2: `${H}/learn%20(2).svg`,
  discover: `${H}/discover%20(1).svg`,
  watchVideo: `${H}/watch-video-1.svg`,
  capabilities: `${H}/capabilities%20(2).svg`,
  initiatives: `${H}/initiatives.svg`,
  templates: `${H}/templates%20(1).svg`,
  topResources: `${H}/top%20resources.svg`,
  roiReport: `${H}/ROI-Report-1.webp`,
  mcdermott: `${H}/kissflow-mcdermott.webp`,
  motorola: `${H}/Motorola%20Solutions.png`,
  logo: `${H}/kissflow_logo_web.svg`,
  favicon: `${H}/kissflow-fav-new.png`,
  frame: `${H}/Frame%201000005390.png`,
};

/** Exact title → image URL */
const TITLE_MAP = {
  // Platform Overview
  'Kissflow Platform Overview': IMG.hero,
  'What is Kissflow?': IMG.og,
  'Platform Vision — Build for the AI Era': IMG.aiEnterprise,
  'Application Development Capability': IMG.newProductApp,
  'Workflow Automation Capability': IMG.workflowsMp4,
  'Case Management Capability': IMG.aiBoards,
  'What Makes Kissflow Different': IMG.roi,
  'Industry Solutions': IMG.mcdermott,
  'Kissflow Plans Overview': IMG.feature,

  // Getting Started
  'Getting Started with Kissflow': IMG.section1,
  'Signing In and Account Access': IMG.og,
  'Home Page and Navigation': IMG.section1Tab,
  'My Tasks — Your Work Inbox': IMG.ticketing,
  'User Roles and Permissions': IMG.roleAccess,
  'Community Documentation Map': IMG.learn1,
  'Developer Guide Essentials': IMG.learn2,
  'Mobile Guide Highlights': IMG.section1Mobile,
  'First Week Action Plan': IMG.discover,
  'Support and Help Resources': IMG.lastSection,

  // Processes
  'Processes & Workflows': IMG.workflowsMp4,
  'What is a Kissflow Process?': IMG.simple,
  'Process Builder Interface': IMG.section2,
  'Workflow Step Types': IMG.workflows,
  'Assigning Participants': IMG.userMonitoring,
  'Process Item Lifecycle': IMG.loan,
  'Notifications and SLAs': IMG.appMonitoring,
  'Process Permissions': IMG.roleAccessSvg,
  'Process Watchers': IMG.userMonitoringSvg,
  'Lookup Columns in Process Tables': IMG.inventory,
  'Process Reports — Overview': IMG.reportsCio,
  'Creating Process Reports': IMG.aiReports,
  'Process Report Types and Use Cases': IMG.production,
  'Report Scheduling and Distribution': IMG.reports,
  'Processes Inside Apps': IMG.newProductApp,
  'Process Best Practices': IMG.value,

  // Forms
  'Forms & Expressions': IMG.aiForms,
  'Form Designer Overview': IMG.frame,
  'Basic Field Types': IMG.feature,
  'Advanced Field Types': IMG.inventory,
  'Lookup Fields Deep Dive': IMG.supplier,
  'Field Validation Rules': IMG.inspection,
  'Expressions and Formulas': IMG.dt,
  'Conditional Visibility': IMG.workflows,
  'Default Values and Auto-Population': IMG.userMonitoringSvg,
  'AI Form Creation': IMG.aiEnterprise,
  'Datasets — Centralized Reference Data': IMG.dataPoliciesWebp,
  'Decision Tables': IMG.dt,
  'Forms Best Practices': IMG.simple,

  // Dataforms
  'Dataforms in Kissflow Apps': IMG.dataPoliciesWebp,
  'What is a Dataform?': IMG.newProductApp,
  'Creating a New Dataform': IMG.aiApp,
  'Dataform Editor Layout': IMG.section2,
  'Dataform Field Types': IMG.aiForms,
  'Dataform Views — Overview': IMG.section1,
  'Data Table View': IMG.retailStore,
  'Data Table — Advanced Configuration': IMG.production,
  'Gallery View': IMG.retailStore,
  'Gallery View — Sorting and Display': IMG.vendorPortal,
  'Sheet View': IMG.cheeta,
  'Sheet View — Page Component Settings': IMG.section1Tab,
  'Configuring Field Permissions in Views': IMG.roleAccess,
  'Data Filters — Advanced and Quick': IMG.appMonitoringSvg,
  'Importing and Exporting Data': IMG.integrations,
  'Dataform Reports': IMG.aiReports,
  'Adding Dataform Views to App Pages': IMG.partnerPortal,
  'Dataform Best Practices': IMG.governance,

  // Apps
  'Kissflow Apps & Portals': IMG.newProductApp,
  'What are Kissflow Apps?': IMG.aiApp,
  'App Builder Interface': IMG.section1,
  'App Pages and Navigation': IMG.section1Tab,
  'Page Components': IMG.feature,
  'AI Custom Page Components': IMG.aiEnterprise,
  'App Roles and Permissions': IMG.roleAccess,
  'What is a Portal?': IMG.aiPortals,
  'Portal Configuration': IMG.vendorPortal,
  'App Publishing and Lifecycle': IMG.appMonitoring,
  'Apps Best Practices': IMG.leaders,

  // Boards
  'Boards & Case Management': IMG.boards,
  'What are Kissflow Boards?': IMG.ticketing,
  'Board Builder': IMG.aiBoards,
  'Working with Board Cards': IMG.incident,
  'SLA and Assignment Rules': IMG.maintenance,
  'AI Board Creation': IMG.aiBoards,
  'Boards in Apps': IMG.newProductApp,
  'Board Reports': IMG.reportsCio,
  'Boards Best Practices': IMG.value,

  // Integrations
  'Kissflow Integrations': IMG.integrations,
  'Integration Landscape': IMG.capabilities,
  'Pre-Built Connectors': IMG.initiatives,
  'Connector Builder': IMG.integrations,
  'Creating Triggers': IMG.workflowsMp4,
  'Integration Actions': IMG.fleet,
  'Cryptography Connector': IMG.auditLogs,
  'REST API Integration': IMG.kfIt,
  'Webhooks': IMG.integrations,
  'Integration in Workflows': IMG.production,
  'Integrations Best Practices': IMG.governance,

  // Analytics
  'Analytics & Reports': IMG.reports,
  'Reporting in Kissflow': IMG.aiReports,
  'Creating a Report': IMG.reportsCio,
  'Report Visualization Types': IMG.production,
  'Filters, Grouping, and Aggregation': IMG.spend,
  'AI Report Creation': IMG.aiEnterprise,
  'Report Permissions': IMG.roleAccess,
  'Report Scheduling': IMG.reportsCio,
  'Dashboards in Apps': IMG.lastSection,
  'Admin Analytics': IMG.appMonitoring,
  'Export and External BI': IMG.integrations,
  'Analytics Best Practices': IMG.roi,

  // Governance
  'Governance & Security': IMG.governance,
  'Data Policies': IMG.dataPoliciesWebp,
  'App Monitoring': IMG.appMonitoring,
  'User Monitoring': IMG.userMonitoring,
  'Role-Based Access Control': IMG.roleAccess,
  'Audit Log': IMG.auditLogs,
  'Authentication and API Security': IMG.auditLogSvg,
  'Data Backup': IMG.dataPoliciesWebp,
  'Compliance and Certifications': IMG.roleAccess,
  'Citizen Development Governance': IMG.leaders,
  'Governance Best Practices': IMG.governance,

  // Developer Hub
  'Kissflow Developer Hub': IMG.kfIt,
  'Developer Hub Overview': IMG.learn2,
  'Kissflow REST API': IMG.integrations,
  'API Authentication': IMG.auditLogs,
  'Common API Operations': IMG.workflowsMp4,
  'Kissflow JavaScript SDK': IMG.learn1,
  'Custom Scripting in Apps': IMG.newProductApp,
  'Webhooks and Event-Driven Integration': IMG.integrations,
  'External Data Objects': IMG.dataPoliciesWebp,
  'API Rate Limits and Best Practices': IMG.governance,
  'Developer Resources and Next Steps': IMG.topResources,

  // Academy
  'Kissflow Academy': IMG.resourceMenu,
  'Academy Platform Overview': IMG.section1,
  'Apps Course': IMG.newProductApp,
  'Workflow Automation Course': IMG.workflowsMp4,
  'Integrations Course': IMG.integrations,
  'Community Resources': IMG.learn1,
  'Recommended Learning Sequence': IMG.watchVideo,
  'Training Complete — Next Steps': IMG.roiReport,
};

const GRID_ICON_MAP = {
  Workflows: IMG.workflows,
  Integrations: IMG.integrations,
  Apps: IMG.aiApp,
  Forms: IMG.aiForms,
  Reports: IMG.reports,
  Portals: IMG.portals,
  Boards: IMG.boards,
  'Data Policies': IMG.dataPolicies,
  'App Monitoring': IMG.appMonitoringSvg,
  'User Monitoring': IMG.userMonitoringSvg,
  'Role-Based Access': IMG.roleAccessSvg,
  'Audit Log': IMG.auditLogSvg,
  'Retail Store Management': IMG.retailStore,
  'Loan Origination': IMG.loan,
  'Fleet Management': IMG.fleet,
  'Production Tracking': IMG.production,
  'Partner Portal': IMG.partnerPortal,
  'Claims Processing': IMG.claims,
  'Incident Management': IMG.incident,
  'Customer Complaints': IMG.incident,
  'Work Orders': IMG.maintenance,
  'IT Asset Management': IMG.itAsset,
  'Helpdesk': IMG.ticketing,
  'Vendor Portal': IMG.vendorPortal,
  'Vendor Qualification': IMG.vendorPortal,
  'Kissflow Expert': IMG.logo,
  'Workflow Expert': IMG.workflows,
  'Integrations Expert': IMG.integrations,
};

const sectionsDir = path.join(__dirname, '../data/sections');
let updated = 0;

for (const file of fs.readdirSync(sectionsDir).filter((f) => f.endsWith('.json'))) {
  const filePath = path.join(sectionsDir, file);
  const section = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  for (const slide of section.slides) {
    if (slide.type === 'grid' && slide.items) {
      for (const item of slide.items) {
        const mapped = GRID_ICON_MAP[item.label];
        if (mapped) {
          item.icon = mapped;
          updated++;
        }
      }
      continue;
    }

    const title = slide.title;
    if (title && TITLE_MAP[title]) {
      slide.image = TITLE_MAP[title];
      updated++;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(section, null, 2) + '\n');
}

console.log(`Applied ${updated} image mappings across section files.`);
