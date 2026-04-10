# Clinic Management Platform — Feature Status

This document covers all three projects together: the **API** (.NET 10), the **Dashboard** (React 19), and the **Website** (Next.js 16). Each feature is listed with its status across all layers.

**Live Demo**: https://clinic-dashboard-ecru.vercel.app  
**API Docs**: http://clinic-api.runasp.net/scalar/v1  
**Website**: https://clinic-website-lime.vercel.app

---

## Legend

| Symbol | Meaning                                             |
| ------ | --------------------------------------------------- |
| ✅     | Fully implemented and working                       |
| 🔧     | Backend done, no dashboard UI yet                   |
| 🗂️     | Domain modeled (entities + DB tables), no API or UI |
| ❌     | Not started                                         |

---

## Authentication & User Management

| Feature                               | API | Dashboard | Notes                              |
| ------------------------------------- | --- | --------- | ---------------------------------- |
| Register with email                   | ✅  | ✅        |                                    |
| Email confirmation                    | ✅  | ✅        | Token-based, resend supported      |
| Login (email or username)             | ✅  | ✅        |                                    |
| Logout                                | ✅  | ✅        | Clears cookie + token              |
| Forgot password                       | ✅  | ✅        | Email with reset link              |
| Reset password                        | ✅  | ✅        |                                    |
| Change password                       | ✅  | ✅        | Requires current password          |
| JWT access token + refresh token      | ✅  | ✅        | Auto-refresh via Axios interceptor |
| HTTP-only cookie mode (web)           | ✅  | ✅        | XSS-safe                           |
| Response body token mode (mobile)     | ✅  | —         | Via `X-Client-Type: mobile` header |
| Profile — edit name, username, phone  | ✅  | ✅        |                                    |
| Profile — upload/delete profile image | ✅  | ✅        |                                    |
| In-app notifications                  | 🗂️  | ❌        | Entity modeled, no API or UI       |

---

## Clinic Onboarding

| Feature                                                 | API | Dashboard | Notes                     |
| ------------------------------------------------------- | --- | --------- | ------------------------- |
| Onboarding wizard (clinic name, branch, location, plan) | ✅  | ✅        | Multi-step, single submit |
| Subscription plan selection                             | ✅  | ✅        | Plans seeded from config  |
| Specialization selection                                | ✅  | ✅        |                           |
| Onboarding status check (redirect if incomplete)        | ✅  | ✅        |                           |

---

## Clinic & Branch Management

| Feature                         | API | Dashboard | Notes                                             |
| ------------------------------- | --- | --------- | ------------------------------------------------- |
| View clinic branches            | ✅  | ✅        |                                                   |
| Create branch                   | ✅  | ✅        | With location (bilingual)                         |
| Edit branch                     | ✅  | ✅        |                                                   |
| Activate / deactivate branch    | ✅  | ✅        |                                                   |
| Branch phone numbers            | 🗂️  | ❌        | Entity exists (`ClinicBranchPhoneNumber`)         |
| Branch appointment pricing      | 🗂️  | ❌        | Entity exists (`ClinicBranchAppointmentPrice`)    |
| Clinic subscription management  | 🗂️  | ❌        | `ClinicSubscription` entity modeled               |
| Subscription payment history    | 🗂️  | ❌        | `SubscriptionPayment` entity modeled              |
| Usage metrics / limits tracking | 🔧  | ❌        | `ClinicUsageMetrics` aggregated by background job |

---

## Patient Management

| Feature                            | API | Dashboard | Notes                                       |
| ---------------------------------- | --- | --------- | ------------------------------------------- |
| Patient list — paginated, sortable | ✅  | ✅        |                                             |
| Patient search — relevance ranked  | ✅  | ✅        | Exact code → name → partial → newest        |
| Filter by gender                   | ✅  | ✅        |                                             |
| Filter by region (state)           | ✅  | ✅        | Bilingual, deduped                          |
| Create patient                     | ✅  | ✅        |                                             |
| Edit patient                       | ✅  | ✅        |                                             |
| View patient detail                | ✅  | ✅        | Drawer with full profile                    |
| Soft-delete patient                | ✅  | ✅        |                                             |
| Restore deleted patient            | ✅  | ✅        | SuperAdmin only                             |
| Patient code (unique 8-digit)      | ✅  | ✅        | Auto-generated                              |
| Multiple phone numbers             | ✅  | ✅        | International format validation             |
| Blood type                         | ✅  | ✅        |                                             |
| Date of birth / age                | ✅  | ✅        |                                             |
| Chronic diseases (multi-select)    | ✅  | ✅        |                                             |
| Location — country / state / city  | ✅  | ✅        | Bilingual EN+AR, GeoNames-backed            |
| Patient medical history / visits   | 🗂️  | ❌        | `MedicalVisit` entity modeled               |
| Patient medical files / documents  | 🗂️  | ❌        | `MedicalFile`, `PatientMedicalFile` modeled |

---

## Staff Management

| Feature                                       | API | Dashboard | Notes                                                  |
| --------------------------------------------- | --- | --------- | ------------------------------------------------------ |
| View staff list                               | ✅  | ✅        | With role and status filters                           |
| Invite staff by email (Doctor / Receptionist) | ✅  | ✅        | 7-day expiry token                                     |
| Resend invitation                             | ✅  | ✅        |                                                        |
| Cancel invitation                             | ✅  | ✅        |                                                        |
| Accept invitation (register + join clinic)    | ✅  | ✅        |                                                        |
| View pending invitations                      | ✅  | ✅        |                                                        |
| Activate / deactivate staff member            | ✅  | ✅        |                                                        |
| Register clinic owner as doctor               | ✅  | ✅        |                                                        |
| Doctor profile — specialization               | ✅  | ✅        | Set during invitation                                  |
| Doctor working schedule                       | 🔧  | ❌        | API exists (`GET/PUT /staff/{id}/working-days`), no UI |
| Staff detail view                             | ✅  | ✅        | Drawer with role, status, contact                      |

---

## Appointments

| Feature                                                               | API | Dashboard | Notes                                                |
| --------------------------------------------------------------------- | --- | --------- | ---------------------------------------------------- |
| Book appointment                                                      | 🗂️  | ❌        | `Appointment` entity with status, queue number, type |
| Appointment types (bilingual)                                         | 🗂️  | ❌        | `AppointmentType` entity modeled                     |
| Appointment status flow (Pending → Confirmed → Completed / Cancelled) | 🗂️  | ❌        | Status enum modeled                                  |
| Appointment calendar view                                             | ❌  | ❌        |                                                      |
| Queue management                                                      | 🗂️  | ❌        | `QueueNumber` field on appointment                   |
| Appointment linked to invoice                                         | 🗂️  | ❌        | FK on `Appointment.InvoiceId`                        |

---

## Medical Visits

| Feature                                      | API | Dashboard | Notes                                                                                                    |
| -------------------------------------------- | --- | --------- | -------------------------------------------------------------------------------------------------------- |
| Create medical visit (linked to appointment) | 🗂️  | ❌        | `MedicalVisit` with diagnosis                                                                            |
| Prescriptions                                | 🗂️  | ❌        | `Prescription` + `PrescriptionItem` (dosage, frequency, duration, instructions)                          |
| Lab test orders                              | 🗂️  | ❌        | Full lifecycle: Ordered → InProgress → ResultsAvailable → Reviewed                                       |
| Radiology orders                             | 🗂️  | ❌        | Same lifecycle as lab tests, with image/report file paths                                                |
| Vital measurements (EAV model)               | 🗂️  | ❌        | `MeasurementAttribute` + `MedicalVisitMeasurement` — each doctor configures their own measurement fields |
| Upload medical files                         | 🗂️  | ❌        | `MedicalFile` entity with file type enum                                                                 |
| Lab test catalog (per clinic)                | 🗂️  | ❌        | `LabTest` entity                                                                                         |
| Radiology test catalog (per clinic)          | 🗂️  | ❌        | `RadiologyTest` entity                                                                                   |

---

## Inventory

| Feature                         | API | Dashboard | Notes                                                              |
| ------------------------------- | --- | --------- | ------------------------------------------------------------------ |
| Medicine inventory (per branch) | 🗂️  | ❌        | Stock tracking: boxes, strips, expiry, low-stock alerts            |
| Medicine dispensing             | 🗂️  | ❌        | `MedicineDispensing` with status (Dispensed / Partial / Cancelled) |
| Medical supplies                | 🗂️  | ❌        | Simple quantity + price per unit                                   |
| Medical services catalog        | 🗂️  | ❌        | Per-branch, supports surgical operations flag                      |
| Low stock alerts                | 🗂️  | ❌        | Domain logic exists (`IsLowStock`, `NeedsReorder`)                 |
| Expiry tracking                 | 🗂️  | ❌        | `IsExpired`, `IsExpiringSoon` on `Medicine`                        |

---

## Billing

| Feature                                                 | API | Dashboard | Notes                                                                |
| ------------------------------------------------------- | --- | --------- | -------------------------------------------------------------------- |
| Create invoice                                          | 🗂️  | ❌        | Linked to appointment or visit                                       |
| Invoice line items                                      | 🗂️  | ❌        | Supports services, medicines, supplies, lab tests, radiology         |
| Discounts and tax                                       | 🗂️  | ❌        | Fields on `Invoice`                                                  |
| Invoice status flow (Draft → Issued → Paid / Cancelled) | 🗂️  | ❌        | Status enum + `IsOverdue` logic                                      |
| Payments                                                | 🗂️  | ❌        | `Payment` entity with method (Cash, Card, etc.) and reference number |
| Overdue detection                                       | 🗂️  | ❌        | `Invoice.IsOverdue(currentDate)` domain method                       |

---

## Dashboard & Analytics

| Feature                                                         | API | Dashboard | Notes                             |
| --------------------------------------------------------------- | --- | --------- | --------------------------------- |
| Clinic stats (total patients, staff, invitations, subscription) | ✅  | ✅        |                                   |
| Recent patients widget                                          | ✅  | ✅        | Last 5 registered                 |
| SuperAdmin cross-clinic stats                                   | ✅  | ✅        | Total clinics, patients, staff    |
| Usage metrics aggregation                                       | 🔧  | ❌        | Background job runs hourly, no UI |
| Appointment stats                                               | ❌  | ❌        |                                   |
| Revenue / billing reports                                       | ❌  | ❌        |                                   |

---

## Audit & Compliance

| Feature                                                           | API | Dashboard | Notes                       |
| ----------------------------------------------------------------- | --- | --------- | --------------------------- |
| Field-level change tracking (create / update / delete)            | ✅  | ✅        | All `AuditableEntity` types |
| Security event logging (login, logout, failed attempts, lockouts) | ✅  | ✅        |                             |
| Audit log viewer — filter by entity, action, user, clinic, date   | ✅  | ✅        | SuperAdmin only             |
| Field diff display (old → new values)                             | ✅  | ✅        |                             |
| 12-month retention with auto-cleanup                              | ✅  | —         | Background job              |
| Patient restore from audit trail                                  | ✅  | ✅        | SuperAdmin only             |

---

## Reference Data

| Feature                                       | API | Dashboard | Notes                                |
| --------------------------------------------- | --- | --------- | ------------------------------------ |
| Chronic diseases list                         | ✅  | ✅        | Seeded, bilingual                    |
| Medical specializations                       | ✅  | ✅        | Seeded, bilingual                    |
| Subscription plans                            | ✅  | ✅        | Seeded with limits and feature flags |
| Location lookup (countries / states / cities) | ✅  | ✅        | GeoNames API, cached 24h, bilingual  |

---

## Background Jobs

| Job                               | Status | Notes                                                           |
| --------------------------------- | ------ | --------------------------------------------------------------- |
| Email queue processor             | ✅     | Runs every 5 min, retries up to max attempts, priority ordering |
| Refresh token cleanup             | ✅     | Runs every 6 hours                                              |
| Audit log cleanup                 | ✅     | Runs daily at midnight, 12-month retention                      |
| Usage metrics aggregation         | ✅     | Runs hourly                                                     |
| Subscription expiry notifications | ✅     | Runs daily at 9am                                               |

---

## Website (Marketing)

| Feature                       | Status | Notes                          |
| ----------------------------- | ------ | ------------------------------ |
| Home page                     | ✅     | Hero, features, CTA            |
| About page                    | ✅     |                                |
| Pricing page                  | ✅     | Pulls subscription plans       |
| Contact page                  | ✅     |                                |
| English / Arabic with RTL     | ✅     | next-intl, static pre-rendered |
| SEO (static HTML, Open Graph) | ✅     | Lighthouse 95+                 |

---

## Summary

| Layer         | Done                                                                                           | Partially done                    | Not started                                                                       |
| ------------- | ---------------------------------------------------------------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------- |
| **API**       | Auth, Onboarding, Patients, Staff, Branches, Dashboard, Audit, Reference data, Background jobs | Working days UI, Usage metrics UI | Appointments, Medical visits, Billing, Inventory, Notifications                   |
| **Dashboard** | Auth, Onboarding, Patients, Staff, Branches, Dashboard, Audit, Profile                         | —                                 | Appointments, Medical visits, Billing, Inventory, Notifications, Working schedule |
| **Website**   | All 4 pages, bilingual, SEO                                                                    | —                                 | —                                                                                 |
