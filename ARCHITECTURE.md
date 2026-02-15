# HireMe Backend Architecture

## 1) Goal
This architecture supports a hiring platform where:
- User can apply to jobs, fill forms, and attempt tests.
- Company Owner can create company and add employees using company code.
- HR can create/manage jobs.
- Interviewer can create tests/questions and update user status (selected/rejected).

## 2) Core Roles
- **Company Owner (`admin`)**
  - Register/Login company
  - Manage company employees
  - Update employee role (admin-only)
- **HR (`hr`)**
  - Create, update, publish jobs
  - Review applications
  - Update final candidate status
- **Interviewer (`interviewer`)**
  - Create tests and questions for jobs
  - Evaluate submissions
  - Update candidate interview stage/status
- **User (`user`)**
  - Register/Login
  - Browse jobs and apply
  - Fill job form
  - Give tests

## 3) Domain Modules (Recommended)

### Auth Module
Handles login/register and JWT generation for:
- User
- Company Owner
- Employee

JWT payload should include:
- `id`
- `role`
- `companyId` (if available)
- `companyCode` (if available)

### Company Module
Entities:
- `Company`
- `Employee`

Features:
- Company create/login
- Employee create/login
- Employee list by `companyId` from token
- Employee role update (only `admin`)

### Jobs Module
Entities:
- `Job`

Features:
- HR creates/updates/deletes jobs
- Jobs listing for users
- Job to company relation

### Application Module
Entities:
- `Application`

Features:
- User applies to job
- Application status pipeline:
  - `applied`
  - `reviewed`
  - `interview_scheduled`
  - `rejected`
  - `accepted`

### Form Module
Entities:
- `Form`

Features:
- Dynamic job/application forms
- User submits form data per application

### Test Module
Entities:
- `Test`
- `Question`

Features:
- Interviewer creates tests/questions
- User attempts tests
- Test result linked with application

### Profile Module
Entities:
- `Profile`

Features:
- User profile, resumes, skills, experience

## 4) Main Flow

### A. Company Setup
1. Company Owner creates company account.
2. System generates `companyCode`.
3. Company Owner shares `companyCode` with employees.
4. Employee registers with `companyCode` and is linked to company.

### B. Job Lifecycle
1. HR creates job.
2. User browses and applies.
3. User fills required form.
4. Interviewer assigns test and questions.
5. User completes test.
6. HR/Interviewer updates status to selected/rejected.

## 5) API Ownership (High-Level)
- `/companyowner/*`
  - create/login company
  - get company employees
  - update employee role (admin only)
- `/employees/*`
  - employee register/login
- `/user/*`
  - user register/login/profile
  - apply jobs, submit forms, give tests
- `/jobs/*`
  - HR job operations
- `/tests/*` and `/questions/*`
  - interviewer test/question operations
- `/applications/*`
  - application create/update/status tracking

## 6) Authorization Rules
- `JwtAuthGuard` checks token and attaches user payload.
- Route-level checks by role:
  - `admin`: company and employee management
  - `hr`: job management + status updates
  - `interviewer`: tests/questions + interview evaluation
  - `user`: apply/form/test submission
- Company-scoped data access:
  - Always filter by `companyId` from token for employee/company resources.

## 7) Data Relationships
- `Company` 1 -> many `Employee`
- `Company` 1 -> many `Job`
- `User` 1 -> many `Application`
- `Job` 1 -> many `Application`
- `Job` 1 -> one/many `Test`
- `Test` 1 -> many `Question`
- `Application` -> links `User`, `Job`, `Form`, `Test result/status`

## 8) Suggested Folder Structure (Current Codebase Compatible)
- `src/app/api/controller/`
  - `companyowner.controller.ts`
  - `employees.controller.ts`
  - `user.controller.ts`
  - `jobs.controller.ts` (add)
  - `applications.controller.ts` (add)
  - `tests.controller.ts` (add)
  - `questions.controller.ts` (add)
- `src/app/api/service/`
  - matching services for each controller
- `src/db/entity/`
  - entities already aligned to this architecture

## 9) Next Implementation Milestones
1. Add dedicated controllers/services for jobs, applications, tests, questions.
2. Add role guard/decorator for reusable role checks.
3. Add endpoint to update application status (`selected`/`rejected`).
4. Add DTO + Zod validation for each new endpoint.
5. Add migrations (avoid relying on `synchronize: true` in production).
