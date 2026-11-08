# SAHASRASARVIKA Invitation Website

A Next.js 15 invitation website with event details, countdown, gallery, YouTube music, RSVP form, and an optional Supabase-backed admin dashboard.

## Requirements

- Windows 10/11
- Node.js 20.9 or newer (Node.js 22 LTS recommended)
- VS Code

## Run in VS Code (Windows)

1. Extract this ZIP file.
2. In VS Code, choose **File → Open Folder** and open the extracted `sahasrasarvika-invitation` folder (the folder containing `package.json`).
3. Open **Terminal → New Terminal**.
4. Confirm the terminal prompt is inside the project folder. If not, run:
   ```powershell
   cd "path\to\sahasrasarvika-invitation"
   ```
5. Install the packages:
   ```powershell
   npm.cmd install
   ```
   `npm.cmd` is used to avoid the PowerShell script-execution restriction that can block `npm`.
6. Start the development server:
   ```powershell
   npm.cmd run dev
   ```
7. Open **http://localhost:3000** in your browser.
8. Keep the terminal running while using the site. Press **Ctrl + C** in the terminal to stop it.

## RSVP and Admin setup (optional)

The invitation page can open without Supabase. RSVP submissions are saved only after Supabase is configured.

1. In the project folder, copy `.env.example` and rename the copy to `.env.local`.
2. In `.env.local`, fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_USERNAMES`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_SITE_URL` (optional while testing locally)
3. In the Supabase SQL editor, run the SQL in `supabase-schema.sql`.
4. Restart the development server after changing `.env.local`.
5. Open **http://localhost:3000/admin** and sign in with the configured admin username and password.

**Important:** Keep `.env.local` private. Never publish the Supabase service-role key or admin password.

## Production build check

Run:
```powershell
npm.cmd run build
```

Then, if the build succeeds:
```powershell
npm.cmd start
```

## QR code hydration fix

The invitation QR code starts with the same configured fallback URL during server rendering and the browser's first render. After the page mounts, it updates to the current invitation URL. This avoids the React hydration mismatch caused by reading `window.location.href` during render. Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to your deployed URL when preparing the invitation for sharing.

## Troubleshooting

- **`npm.ps1 cannot be loaded because running scripts is disabled`:** use `npm.cmd install` and `npm.cmd run dev` exactly as shown above. You do not need to change the Windows execution policy.
- **`'next' is not recognized`:** run `npm.cmd install` from the folder that contains `package.json`, then run `npm.cmd run dev`.
- **Port 3000 is busy:** stop the other development server with `Ctrl + C`, or use the alternate port command `npm.cmd run dev -- -p 3001` and open `http://localhost:3001`.
- **RSVP says storage is not configured:** configure the Supabase variables and schema described above. The website itself can still be viewed without Supabase.
- **External photos or YouTube do not load:** check the internet connection and confirm those third-party URLs are available.

## Notes

- Replace the sample gallery images with the family's own approved photos before publishing.
- Confirm the event date, venue, and ceremony timings before sharing the public link.

## Updating the invitation content (V2)

Open `lib/event.ts` to edit the invitation text, date, time, venue, and schedule.

- When the ceremony time is confirmed, update `dateISO` with the time in India Standard Time, keeping the `+05:30` offset (example: `2026-11-14T18:30:00+05:30`), and update `timeLabel`.
- Add, remove, or reorder the `celebrationSchedule` entries in the same file. Each entry has `title`, `subtitle`, and `time`.
- Replace `public/images/baby-photo.jpg` with the baby's portrait, keeping the same filename.
- Replace `public/images/family-photo.jpg` with the four-member family photo, keeping the same filename.

## Background music note

The supplied YouTube Short is embedded inside the invitation page and does not open a separate YouTube tab. The page attempts autoplay. Modern browsers may block audible autoplay until the visitor interacts with the page; the music control at the top-right and the **Open Your Invitation** button start playback without navigating away.

## Removed from the public invitation

The gallery, standalone music section, RSVP section, and Save as PDF button have been removed as requested. WhatsApp/share, copy-link, and QR-code sharing remain.
