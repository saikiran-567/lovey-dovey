# Our Little World ♡

A romantic, interactive, static React website made to feel like a love story, digital scrapbook, tiny game, and handwritten letter all in one. It uses **React + Vite + Tailwind CSS + Framer Motion + Lucide React**. No backend or database is required.

> Before sharing it: customize `src/config/loveConfig.js`, replace the illustrated photo placeholders, and change the demo access password.

## What is included

- A romantic password-gate experience with show/hide password, gentle errors, a welcome animation, session-only unlock state, and relock controls.
- A cinematic welcome screen and floating navigation with reading progress.
- Clickable relationship timeline cards with detail dialogs.
- A scrapbook-style gallery with full-screen lightbox, previous/next controls, Escape-key support, and mobile swipe navigation.
- Flip-over reason cards plus a button that reveals additional reasons without repeating them before a round has shown every reason.
- Original romantic quotes, with favorite quotes saved in local storage.
- A one-question-at-a-time quiz with configurable scored and unscored questions, immediate feedback, adjustable points and result thresholds, replay, and saved latest score.
- An animated gift surprise and an opening/closable letter with enlarge, replay, and print actions.
- Optional user-supplied background music, reduced-motion support, mobile layouts, keyboard focus styles, and no database.
- Vercel and GitHub Pages deployment support.

The photo assets supplied in `public/images/` are clearly labeled **illustrated placeholders**, not real relationship photographs.

## Requirements

- Node.js 20 or newer (Node.js 22 is recommended).
- npm, installed with Node.js.

Check your versions:

```bash
node --version
npm --version
```

Download Node.js from [https://nodejs.org/](https://nodejs.org/) if it is not installed.

## Run it locally

From the project directory:

```bash
npm install
npm run dev
```

Open the local URL printed in your terminal (usually `http://localhost:5173`). Stop the server with `Ctrl+C`.

Create a production build:

```bash
npm run build
npm run preview
```

Vite writes the production site to `dist/`. The project is static and does not need a server-side runtime after build.

## Personalize the website

All normal personal details live in **`src/config/loveConfig.js`**. Open that file and change the values at the top:

- `girlfriendName`: her name.
- `yourName`: your name.
- `personalNickname`: your nickname for her.
- `anniversaryDate`: the anniversary date.
- `firstMeetingDate`: the first-meeting date or milestone.
- `accessPassword`: the demo password required by the entry screen.
- `intro` and `welcomeNote`: the welcome copy.
- `memories`: your relationship timeline.
- `photos`: gallery image paths, captions, dates, categories and featured states.
- `reasons`: the front and reverse copy for the reason cards.
- `quotes`: romantic notes displayed in the quotes section.
- `quiz`: question text, answer choices, correct answer, scored/unscored mode, and answer feedback.
- `quizScoring`: points per correct answer and the percentage thresholds/messages.
- `surpriseMessage`: the note inside the gift.
- `letterDate`, `letterGreeting`, `letterBody`, `signature`, and `finalMessage`: the final letter.
- `music`: optional local audio settings.

The sample relationship memories and quiz content are examples/placeholders, not claims about your real relationship. Replace them with your own details before sharing the site. Text in `letterBody` is an array: each string becomes a separate paragraph.

### Set the entry password

Change `accessPassword` in `src/config/loveConfig.js`. The initial demo password is `our-little-secret`.

**Security limitation:** this is only a playful client-side gate. The password is included in the public JavaScript bundle and can be discovered by inspecting the deployed site's code. The gate does not protect photographs or the letter from someone who can access the site files. The unlocked flag is kept in `sessionStorage` for the current browser session; the password is not stored there. Do not deploy private or sensitive material under the assumption that this gate provides authentication. For genuine privacy, host the site behind server-side authentication or a trusted access-control layer.

### Add, replace, remove or reorder photos

1. Place optimized images in `public/images/`. For example: `public/images/photo-01.webp`, `public/images/photo-02.jpg`.
2. Prefer WebP or optimized JPEG/PNG files at the display size you need. Large camera originals make pages slow; resize/compress them before adding.
3. In `src/config/loveConfig.js`, edit the `photos` array. Set `src` to a path relative to `public/`, such as `images/photo-01.webp` (do not start it with `/`). Add a useful `alt` description and caption.
4. Delete an item from the array to remove it, or change the order of items to rearrange the gallery. The timeline `memories` array can use the same image-path pattern.
5. You may delete the SVG placeholder only after no config item uses it.

The supplied SVG placeholders are lightweight and keep the gallery looking intentional before your own photographs are added. They explicitly say they should be replaced with your photo.

### Customize the story and reasons

Each item under `memories` supports `date`, `title`, `description`, optional `image`, and `icon`. Each `reasons` item contains `front` and `back`. Replace the sample text with specific details that matter to you both. You can copy an item to add a new entry; use a unique title for each memory.

### Customize quiz questions and scoring

Every question has:

- `question`: the text shown.
- `choices`: an array of answer strings (four choices are recommended for the current layout).
- `correctAnswer`: exact string that matches one of `choices` when `scored: true`.
- `scored`: `true` for a scored question or `false` for a just-for-fun question.
- `correctFeedback` and `incorrectFeedback`: affectionate feedback after selection.

Scored questions add `quizScoring.pointsPerCorrect` (default 10) only when the selected choice matches `correctAnswer`; unscored questions never add points. Edit `quizScoring.thresholds` to change the result messages and thresholds. The latest total and percentage are stored in `localStorage` under `loveLatestQuizScore` and do not need a database. Replaying resets the current run without reloading the page.

### Quotes and favorites

Edit `quotes` to change the quote pool. The **Save My Favorite** control stores the selected quote on the current device in `localStorage` under `loveFavoriteQuotes`. This is a local preference, not a server-synced favorite.

### Edit the love letter and surprise

Update `surpriseMessage` for the gift reveal. The final letter is made from `letterDate`, `letterGreeting`, `letterBody`, `signature`, and `finalMessage`. The letter's **Print this letter** action opens the browser's print dialog with a simplified print layout. You can write your own full letter by replacing every paragraph in `letterBody`.

### Add background music (optional)

1. Add an MP3 you have permission to use to `public/audio/`, for example `public/audio/our-song.mp3`.
2. In `loveConfig.js`, set `music.enabled` to `true` and keep `music.src` as `audio/our-song.mp3` (or set it to your filename).
3. Rebuild and deploy.

Music never starts automatically with sound. The user must press the play control in the navigation. If music is disabled in config, no music control is shown. There are no bundled copyrighted audio files.

## Deploy to Vercel

1. Push the project to a GitHub repository.
2. Open [Vercel](https://vercel.com/) and import that repository.
3. Vercel normally detects Vite. Confirm the settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Install command:** `npm install` (or the platform's default)
4. Click deploy. The project uses `/` as its default asset base, which is appropriate for a Vercel domain or custom domain.
5. To update the website, commit and push your changes. Vercel will run another deployment automatically when its Git integration is enabled.

## Deploy to GitHub Pages

A GitHub Actions workflow is included at `.github/workflows/deploy.yml`.

1. Create a GitHub repository and push the project to its default branch named `main` (or update the workflow's branch name to match yours).
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Ensure the workflow has permission to deploy Pages if GitHub prompts you for a repository setting.
5. Push to `main` or run the workflow from the **Actions** tab. It builds Vite with `VITE_BASE_PATH=/<repository-name>/`, which keeps the image, favicon, and audio paths working under the repository subpath.
6. When the Actions deployment finishes, open the published URL shown by GitHub Pages.

The workflow assumes the repository is deployed at `https://<user>.github.io/<repository-name>/`. For a user/organization site deployed at the root (`https://<user>.github.io/`), change the workflow's `VITE_BASE_PATH` to `/`.

## Local browser storage

- `sessionStorage`: the temporary unlocked flag; cleared when you relock or the browser session ends.
- `localStorage`: saved favorite quotes, optional music preference, the latest quiz score, and visited-section progress used by the navigation counter.

Storage failures are handled gracefully; those preferences may simply not persist in browsers that disable storage.

## Accessibility and performance notes

- Layouts adapt to phones, tablets, laptops and large screens.
- Controls have visible keyboard focus states and accessible labels.
- Dialogs close with Escape and by clicking the backdrop.
- The photo viewer supports Escape, arrow keys, and basic touch swipes.
- Photo cards lazy-load; use optimized images for best results.
- The ambient layer uses a small fixed set of CSS particles, not a heavy particle engine.
- `prefers-reduced-motion: reduce` disables most motion and transitions.
- There is no backend, database, analytics tracker, or external photo host.

## Final testing checklist

- [ ] Replace `GIRLFRIEND_NAME`, `MY_NAME`, dates, example memories, reasons, quiz answers, and the demo letter.
- [ ] Change `accessPassword` and remember that it is not genuine authentication.
- [ ] Replace placeholder gallery art with real photos and add accurate alt text/captions.
- [ ] Confirm the correct answer in every scored quiz question exactly matches one choice.
- [ ] Try wrong and correct login passwords, then relock and refresh during a session.
- [ ] Open timeline dialogs, use Escape to close them, and test the photo lightbox previous/next controls.
- [ ] Flip reason cards, reveal more reasons, save a quote, finish/replay the quiz, open the surprise, and open/fold/replay/print the letter.
- [ ] Check a narrow phone viewport and a desktop viewport, then test keyboard focus and reduced-motion settings.
- [ ] Run `npm run build` before deployment.
- [ ] Test the deployed URL, image paths, and direct page refresh after each deployment.
# lovey-dovey
