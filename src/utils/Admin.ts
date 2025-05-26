export enum Role {
  ADMIN, // Administrator with full access
  REVIEWER, // User who reviews inspection reports before blockchain submission (potentially)
  INSPECTOR, // User who performs the vehicle inspection and submits data
  CUSTOMER, // General user who views inspection reports (potentially)
  DEVELOPER, // External developer using the public API
}
