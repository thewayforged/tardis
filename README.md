1. SW registration (top of <script>) — now includes the updatefound listener that shows a blue toast at the bottom of the screen saying "🔄 New version available! [Update]" whenever a new SW is detected.
2. Settings → PWA Status card — updated the description to reflect the auto-update behavior and added a reminder note about bumping the cache version.
Your deploy workflow going forward:

Edit index.html → push to GitHub
Open sw.js → change const CACHE = 'tardis-v2' to 'tardis-v3' (or any new name) → push
Open the app → the blue update toast appears at the bottom → tap Update

The two-file push (both index.html and sw.js) is the trigger. If you only push index.html without bumping the SW cache version, the browser won't know to swap in the new files.


1. Local Storage (data persists on close)
Swapped the storage backend from the in-memory ms object to localStorage. Every save (sv()) now writes to localStorage, and every load (ld()) reads from it. Your data will survive closing the app, rebooting the phone, everything.

