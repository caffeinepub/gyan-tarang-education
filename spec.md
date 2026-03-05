# Gyan Tarang Education & Technology

## Current State
New project -- no existing code.

## Requested Changes (Diff)

### Add

**Branding**
- App name: Gyan Tarang Education & Technology
- Slogan (Hindi): "नहीं आता है? सीखो!"
- Founder: Mrityunjay Pandey, BTech CSE

**Authentication**
- Email OTP verification (secure, real working)
- Email/Password login
- Gmail (Google) sign-in option
- All auth fully secured, session-based

**Home / Dashboard**
- Welcome banner with branding and slogan
- Multi-language selector (Hindi / English default, expandable)
- Quick navigation to all major sections

**NCERT Study Material (Class 1-12)**
- Curated copyright-free NCERT official links (ncert.nic.in)
- Books (PDF) by class and subject -- direct open/download
- Notes section with NCERT official PDF links
- No third-party copyrighted content

**Video Lectures**
- YouTube NCERT official channel embedded videos (copyright-free, government approved)
- Organized by class and subject
- Direct play without redirect

**Competitive Exam Preparation**
- JEE, NEET, UPSC, SSC, Banking, Railway, Bihar Police + 50+ exams
- Free study material via official government/NCERT links only
- Previous year papers (copyright-free official sources)
- Exam calendar and notifications

**Placement Preparation (BTech)**
- All BTech branches: CSE, ECE, ME, CE, EE, IT, etc.
- Study material and tools from government-approved copyright-free sources
- Interview prep, aptitude, technical resources

**AI-Style Interactive Features**
- AI Maths Tutor: Step-by-step practice problems (basic to advanced), quiz format
- AI English Coach: Grammar exercises, reading comprehension, speaking tips
- Interactive Quizzes: All subjects, all classes, auto-scored

**Student Wellness & Success Hub**
- Health & Wellness tips
- Time Management tools (study planner, timetable)
- Motivational Hub (quotes, success stories)
- Study Groups: Group-based chat between students

**Government Jobs, Scholarships & Schemes**
- Official links to government job portals (sarkari naukri, NCS)
- Scholarship links (NSP - National Scholarship Portal)
- Government schemes for students (official links)

**Admin Panel**
- Admin login (separate secure access)
- Upload/manage PDF notes, video links, study material links
- Manage NCERT book links by class/subject
- Manage competitive exam resources
- User management

**NEP 2020 Compliance**
- Content organized as per NEP 2020 guidelines
- Multidisciplinary approach, skill-based learning resources
- Holistic education info section

**Security Features**
- Email OTP for all signups
- Session tokens, secure backend data storage
- No external third-party trackers
- All content from government/copyright-free sources only

### Modify
None (new project)

### Remove
None (new project)

## Implementation Plan

**Backend (Motoko)**
1. User authentication: register with email OTP, login with email/password, Google OAuth flag
2. User profiles: name, class/branch, language preference
3. Study groups: create group, join group, send/receive messages within group
4. Admin panel APIs: CRUD for content (video links, PDF links, notes, exam resources)
5. Quiz engine: store questions/answers by subject+class, track user scores
6. Wellness planner: store timetable entries per user
7. Content catalog: organized by category (NCERT class, competitive exam, placement, wellness)

**Frontend**
1. Landing page with branding, slogan, login/signup CTA
2. Auth flow: Email OTP signup, email login, Google login option
3. Dashboard: language selector, quick nav grid
4. NCERT section: class selector -> subject list -> book/PDF links (ncert.nic.in)
5. Video Lectures: class/subject filter -> embedded YouTube NCERT official videos
6. Competitive Exams: exam selector -> resources, links, previous papers
7. Placement Prep: branch selector -> resources
8. AI Maths Tutor: interactive step-by-step problem solver UI
9. AI English Coach: exercises, reading, speaking tips UI
10. Quizzes: subject/class filter, MCQ quiz, auto-score display
11. Wellness Hub: health tips, time planner, motivation section
12. Study Groups: list groups, create group, group chat UI
13. Government section: jobs, scholarships, schemes with official links
14. Admin Panel: protected admin dashboard with content management
15. Founder section: about page with Mrityunjay Pandey info
16. NEP 2020 info section
