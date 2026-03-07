# Gyan Tarang Education & Technology

## Current State
Previous version had multiple pages but faced issues: video lectures not loading, logo not showing, OTP not working, and several features were incomplete or broken. App needs a full clean rebuild with all features working correctly.

## Requested Changes (Diff)

### Add
- Official Gyan Tarang logo (diya + Ashoka chakra design) shown on every page/navbar
- Hindi slogan: "नहीं आता है? सीखो!" displayed prominently
- Founder section: Mrityunjay Pandey, BTech CSE
- Phone OTP verification (simulated) + Email login + Google sign-up (UI flow)
- Study Tracker: daily study hours log, subject-wise progress, streaks
- National Digital Library direct link (ndl.gov.in) - opens in new tab
- BTech All Branches dedicated dashboard panel with subject-wise resources, tools, notes, video lectures
- NCERT Video Lectures (Class 1-12, Hindi medium) - YouTube official playlist cards, direct open in new tab
- Admin panel in Dashboard: founder can add PDF links, notes, video links, motivational quotes
- Handwriting Notes PDF section with official NCERT/government links
- Previous Year Question Papers with official answer sheets (CBSE, JEE, NEET, UPSC, SSC, Bihar Police)
- Government Jobs/Scholarships/Schemes with direct apply links
- Study Groups chat (students can message each other)
- Student Wellness Hub: Health tips, Time Management timetable builder, Motivation Hub, Study Groups
- AI Maths Tutor (interactive step-by-step practice problems)
- AI English Coach (grammar practice, vocabulary, reading comprehension)
- Competitive Exams: JEE, NEET, UPSC, SSC, Banking, Railway, Bihar Police and 30+ exams
- Placement Preparation: BTech all branches with official NPTEL/government links
- Interactive Quizzes with score saving
- Multi-language support: Hindi/English toggle in navbar
- UGC/AICTE approved content labels
- 100% Free Forever badge

### Modify
- Rebuild entire app from scratch - clean, fully working codebase
- All external links open in new tab (target="_blank")
- Video lectures: no iframe embedding, only direct YouTube/NCERT links as cards
- Logo: show on all pages, with text fallback if image fails

### Remove
- Broken iframe video players
- Non-functional OTP flows

## Implementation Plan
1. Generate official logo image (diya + book + Ashoka chakra, saffron/navy/white)
2. Select components: authorization, blob-storage
3. Generate Motoko backend: user profiles, content items, quiz scores, study tracker, groups, quotes
4. Build frontend:
   - Landing page with hero, features, founder section
   - Auth page: Email login, Phone OTP (simulated), Google sign-in
   - Dashboard with Study Tracker, Admin Panel (admin only)
   - NCERT page: Class 1-12 all subjects, direct YouTube links
   - Video Lectures page: Class-wise YouTube official playlist cards
   - Notes & PDF page: Handwriting notes, NCERT PDF links
   - Previous Year Papers page
   - BTech Dashboard: All branches (CSE, ECE, ME, CE, EE, IT) with NPTEL resources
   - Competitive Exams page: 30+ exams with official preparation links
   - Placement Prep page
   - Government Jobs/Scholarships page
   - AI Maths Tutor page
   - AI English Coach page
   - Quizzes page
   - Wellness Hub page
   - Study Groups page
   - National Digital Library link integration
5. Validate, fix errors, deploy
