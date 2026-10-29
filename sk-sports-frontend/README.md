# SK Sports Taekwondo Academy, Lucknow (Frontend)

React website for SK Sports Taekwondo Academy.
Head Trainer: **Mr. Surendra Kumar** · Co-Trainer: **Mr. Shivam Kumar**

Built with **React 19 + Vite + React Router**, plain CSS (one CSS file per page) and **react-icons**.
Works on phone, tablet and desktop.

---

## 1. Run it on your computer

You need **Node.js 20.19 or newer** (check with `node -v`).

```bash
cd sk-sports-frontend
npm install        # downloads the packages (first time only)
npm run dev        # starts the site at http://localhost:5173
```

Other commands:

```bash
npm run build      # makes the production version in /dist
npm run preview    # previews the production build
```

---

## 2. Folder structure

```
sk-sports-frontend/
├── index.html                 # page title, SEO description, Google Fonts
├── public/
│   ├── favicon.png
│   └── images/                # ← PUT YOUR PHOTOS HERE (see list below)
└── src/
    ├── main.jsx               # starts React + the router
    ├── App.jsx                # which URL shows which page
    ├── assets/logo.webp       # SK Sports logo
    ├── styles/global.css      # colours, fonts, buttons, cards, forms (design system)
    ├── data/                  # ← ALL TEXT CONTENT LIVES HERE
    │   ├── siteConfig.js      # phone, WhatsApp, email, address, hours, socials
    │   ├── classes.js         # classes/programs, "why train", fees
    │   ├── schedule.js        # weekly batch timings, special events
    │   ├── belts.js           # belt syllabus
    │   └── content.js         # trainers, about, gallery, testimonials, FAQs, stats
    ├── services/
    │   ├── api.js             # form submissions (connect to Django later)
    │   └── validators.js      # phone / email checks
    ├── hooks/usePageTitle.js  # browser tab title per page
    ├── components/
    │   ├── layout/            # Navbar, Footer, floating WhatsApp, phone bottom bar
    │   └── common/            # reusable pieces: Photo, PageHero, ClassCard, BeltIcon,
    │                          #   Accordion (FAQ), EnquiryForm, MapEmbed, CTABanner, StatsStrip
    └── pages/                 # one component + one CSS file per page
        ├── Home.jsx           /
        ├── Classes.jsx        /classes
        ├── Schedule.jsx       /schedule
        ├── Gallery.jsx        /gallery
        ├── BeltProgress.jsx   /belt-progress
        ├── About.jsx          /about
        ├── Contact.jsx        /contact
        ├── BookTrial.jsx      /book-trial
        └── NotFound.jsx       (any wrong URL)
```

---

## 3. Before going live: things to edit

Search the project for **`EDIT`**: every placeholder is marked.

| What | File |
|---|---|
| Phone, WhatsApp number, email, address, map location, hours, social links | `src/data/siteConfig.js` |
| Real batch timings | `src/data/schedule.js` |
| Fees (currently `₹X,XXX`) | `src/data/classes.js` |
| Trainer ranks, experience, certifications | `src/data/content.js` |
| Stats (`XX+`), established year, milestones, affiliations | `src/data/content.js` |
| Testimonials: **use only real ones, with permission** | `src/data/content.js` |
| Belt syllabus (confirm with Mr. Surendra Kumar) | `src/data/belts.js` |

---

## 4. Adding photos

Put photos in `public/images/` using **exactly** these names.
Until a photo exists, the site shows a placeholder box with the file name, so you can see which photo goes where.

- **Page banners:** `hero-home.jpg`, `hero-classes.jpg`, `hero-schedule.jpg`, `hero-gallery.jpg`,
  `hero-belt-progress.jpg`, `hero-about.jpg`, `hero-contact.jpg`, `hero-book-trial.jpg`
- **Classes:** `class-little-dragons.jpg`, `class-junior-warriors.jpg`, `class-teens.jpg`, `class-adults.jpg`, `class-competition.jpg`
- **Trainers:** `trainer-surendra-kumar.jpg`, `trainer-shivam-kumar.jpg`
- **About:** `about-story-1.jpg`, `about-story-2.jpg`, `about-story-3.jpg`
- **Gallery:** `gallery-1.jpg` … `gallery-12.jpg`, `gallery-featured-1.jpg` … `gallery-featured-3.jpg`
- **Video thumbnails:** `video-1.jpg`, `video-2.jpg`, `video-3.jpg` (add YouTube links in `content.js`)

Tips:
- Resize to max **1600px wide** and compress (e.g. squoosh.app). Aim for under 300 KB each.
- Banner photos look best in landscape with the athlete on the right side.
- Get **parents' consent** before using photos of children.

---

## 5. How the forms work right now

The **Contact / Enquiry** form and the **Book Free Trial** form validate input and show success
messages, but they **don't save anything yet**. `src/services/api.js` only simulates a request.

When we build the Django backend (Phase 3):
1. Copy `.env.example` to `.env` and set `VITE_API_URL` (e.g. `http://127.0.0.1:8000/api`).
2. In `src/services/api.js` set `USE_BACKEND = true`.
3. The forms will then POST to `/api/enquiries/` and `/api/trial-bookings/`.

---

## 6. Deploying

- **Vercel:** import the GitHub repo, framework = Vite. `vercel.json` is already included so page
  refreshes on `/classes` etc. work.
- **Netlify:** build command `npm run build`, publish folder `dist`. `public/_redirects` handles refreshes.

---

## 7. Design notes

- Colours, fonts and button styles are CSS variables in `src/styles/global.css` (`--orange`, `--blue`, …).
- Fonts: *Barlow Condensed* (headings) + *Barlow* (text), loaded from Google Fonts in `index.html`.
- Breakpoints: phone < 640px, tablet 640–1179px (hamburger menu), desktop ≥ 1180px (full navbar).
