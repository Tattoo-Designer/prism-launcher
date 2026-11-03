# Putting the site online (GitHub Pages)

The site is plain HTML, CSS and JS in this `website/` folder. No build step. Takes about 15 minutes.

## 1. Fill in the placeholders
Search and replace in `index.html`, `launcher.html` and `player.html`:
- `YOUR-USER` -> your GitHub username (appears in repo links, the QR code and GitHub Sponsors)
- `YOUR-NAME` -> your Ko-fi page name (`https://ko-fi.com/prismapps`)
- `prism-launcher` / `prism-player` -> the repo names you create in step 2, if different
- In the Download card: `v1.0.0`, `~12 MB`, and `paste-from-release` for the SHA-256 (`certutil -hashfile app-release.apk SHA256` on Windows)

## 2. Create the repos
On github.com, New repository, public, named `prism-launcher` (and later `prism-player`). Add a GPL-3.0 license when it asks. Push the launcher code there.

## 3. Add the site to the launcher repo
Copy this `website/` folder into the repo as `docs/` (GitHub Pages can serve from `/docs` on `main`):

    xcopy /E /I website <repo>\docs

Commit and push.

## 4. Turn on Pages
Repo -> Settings -> Pages -> Build and deployment -> Source: Deploy from a branch -> Branch: `main`, folder `/docs` -> Save.
After a minute the site is at `https://YOUR-USER.github.io/prism-launcher/`. Pages are `.../launcher.html` and `.../player.html`.

## 5. Make the download buttons work
Repo -> Releases -> Draft a new release -> tag `v1.0.0` -> attach the signed `app-release.apk` -> publish.
"Latest APK" and the QR code point at `releases/latest`, so they work from the first release on. For Obtainium, the "Add to Obtainium" button uses the repo URL; nothing else to set up.

## 6. Donations
- Ko-fi: sign up at ko-fi.com, pick your page name, add a Payment method (PayPal or Stripe). Tips have no Ko-fi fee.
- Add `.github/FUNDING.yml` to each repo with `ko_fi: prismapps` and the Sponsor button appears on the repo page.
- GitHub Sponsors (optional, later): github.com/sponsors, needs a bank account and a short review.

## 7. Optional: a custom domain
Buy a domain, add a `CNAME` file in `docs/` with the domain, and point the domain's DNS at GitHub Pages (Settings -> Pages shows the records). Enforce HTTPS once it verifies.

## Updating the site later
Edit the HTML, commit, push. Pages redeploys in about a minute. To replace screenshots, drop new files into `docs/media/` with the same names.

## Media still to add
- Player screenshots: `player-01-home.png`, `player-02-nowplaying.png`, `player-03-music.png`, `player-theme-{aurora,ink,rose,mint}.png`, `player-np-{theme}.png`. Until they exist the page shows CSS mock-ups.
- Launcher theme shots: `launcher-theme-{aurora,ink,rose,mint}.png`.
- `media/og.png` (1200x630) for link previews, and a launcher icon PNG.
