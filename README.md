UPDATE SERVICE WORKER: 
1. SW registration (top of <script>) — now includes the updatefound listener that shows a blue toast at the bottom of the screen saying "🔄 New version available! [Update]" whenever a new SW is detected.
2. Settings → PWA Status card — updated the description to reflect the auto-update behavior and added a reminder note about bumping the cache version.
Your deploy workflow going forward:

Edit index.html → push to GitHub
Open sw.js → change const CACHE = 'tardis-v2' to 'tardis-v3' (or any new name) → push
Open the app → the blue update toast appears at the bottom → tap Update

The two-file push (both index.html and sw.js) is the trigger. If you only push index.html without bumping the SW cache version, the browser won't know to swap in the new files.

LOCAL STORAGE
1. Local Storage (data persists on close)
Swapped the storage backend from the in-memory ms object to localStorage. Every save (sv()) now writes to localStorage, and every load (ld()) reads from it. Your data will survive closing the app, rebooting the phone, everything.

INSTALL ON THE iPHONE
To install TARDIS as an app on iPhone via Safari: Open the site in Safari (must be Safari, not Chrome)  Tap the Share button (box with arrow pointing up) at the bottom of the screen
Scroll down and tap "Add to Home Screen"
Tap "Add" in the top right

That's it — it'll appear on your home screen like a regular app with the TARDIS icon.

If you're not seeing "Add to Home Screen":  Make sure you're in Safari specifically — it won't show in Chrome or other browsers on iPhone
The share button is at the bottom center of the Safari toolbar (looks like a box with an arrow pointing up)
If the toolbar is hidden, scroll up on the page to make it reappear

Once it's installed:It opens fullscreen like a native app
Data saves locally to that install. You access it from your home screen, not through Safari
About the export/download issue — once the app is installed as a PWA on your home screen, the export download may behave differently. Try this:

Open TARDIS from Safari browser (not the home screen icon). Do the export from there
The download button in Safari toolbar will have the file ready to share
