# Gyan Tarang Education & Technology

## Current State
- Full-stack Caffeine app with Motoko backend and React frontend
- Backend has: ContentItem CRUD, UserProfile management, Quiz scores, User roles (admin/user/guest), Groups, Quotes
- Frontend has multiple pages but has been failing builds due to excessive complexity
- Previous builds had issues with logo not showing, videos not loading, and too many features causing build failures

## Requested Changes (Diff)

### Add
- Official Gyan Tarang logo (diya + Ashoka chakra, saffron/navy colors) in navbar and hero
- Gyan Mitra AI Doubt Solver -- interactive chat-style doubt clearing for all subjects (simulated AI responses for Maths, Science, English, History, GK, Career)
- Mock Tests section -- CBSE, JEE, NEET, UPSC, SSC (copyright-free, government-approved style questions)
- Study Tracker page -- daily study log, weekly chart, streak counter
- Wellness Hub -- Pomodoro timer, health tips, motivation quotes
- Admin Panel with category-wise sections: Content Management, User Management, Mock Tests Management, Announcements
- BTech section with all 8 branches (CSE, ECE, ME, CE, EE, IT, Chemical, Biotech) linking to NPTEL
- Competitive Exams section (30+ exams with official government links)
- Government Jobs/Scholarships page with NSP, NCS, official links

### Modify
- Video Lectures page: replace iframe embeds with direct YouTube link cards (Hindi + English tabs), use NCERT/DIKSHA/NPTEL/SWAYAM official playlists
- NCERT Books page: class 1-12 with ncert.nic.in direct links
- Login page: Email + Phone OTP (simulated) + Internet Identity
- Dashboard: Admin users see glowing Admin Panel card; all users see personalized welcome with quick links
- Overall color theme: saffron (#FF6B00) primary, deep navy (#0A1628) secondary, white accents
- Slogan: "नहीं आता है? सीखो!" visible on hero/landing

### Remove
- No features removed -- simplify implementation to avoid build failures
- Remove iframe video embeds that cause "not found" errors

## Implementation Plan

1. Generate official Gyan Tarang logo image (saffron diya + Ashoka chakra)
2. Build frontend with these pages (keep each page focused and lean):
   - `/` -- Landing page with hero, features grid, slogan, logo
   - `/login` -- Auth page (Email, Phone OTP, Internet Identity)
   - `/dashboard` -- User dashboard with quick access cards, admin card if admin
   - `/ncert` -- NCERT Books class 1-12, subject links to ncert.nic.in
   - `/videos` -- Video Lectures with Hindi/English tabs, YouTube direct links
   - `/notes` -- Notes & PDF section (NCERT, BTech NPTEL, Competitive)
   - `/pyq` -- Previous Year Question Papers
   - `/btech` -- BTech section, 8 branches, NPTEL links
   - `/competitive` -- 30+ Competitive Exams
   - `/gyan-mitra` -- AI Doubt Solver chat interface
   - `/mock-tests` -- Mock Tests with subject selection and quiz UI
   - `/study-tracker` -- Study log, streak, weekly chart
   - `/wellness` -- Pomodoro, tips, motivation
   - `/govt-jobs` -- Government jobs, scholarships, schemes
   - `/admin` -- Admin Panel (Content, Users, Mock Tests, Announcements tabs)
3. Wire backend APIs: content items (admin), user profiles, quiz scores, user roles
4. Apply saffron theme throughout, logo in navbar and hero
5. All external links open in new tab with rel="noopener noreferrer"
