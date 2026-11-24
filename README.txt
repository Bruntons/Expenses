BRUNTONS EXPENSES - installable app
===================================

What this is
------------
A web app that installs onto a phone's home screen and then works like a
normal app, including offline. Everything in this folder is the app.

  index.html             the app itself
  manifest.webmanifest   name, colours and icons for the home screen
  sw.js                  makes the app work offline
  icon-192.png, icon-512.png, apple-touch-icon.png   app icons


Step 1 - put the folder on the web (once, by whoever manages your website)
---------------------------------------------------------------------------
Upload the CONTENTS of this folder to any HTTPS web address, keeping the
files together in one folder. For example:

  - a folder on the company website, e.g. https://www.example.com/expenses/
  - a free static host such as GitHub Pages, Netlify or Cloudflare Pages

It must be HTTPS. It will not install from an emailed file or a shared drive.


Step 2 - colleagues install it
------------------------------
iPhone:   open the link in Safari, tap Share, then "Add to Home Screen".
Android:  open the link in Chrome, tap the menu, then "Install app"
          (or "Add to Home screen").

Open it once while online so it can store what it needs. After that it
works without a signal.


Things to know
--------------
- Each person's expenses and receipt photos are stored on their own phone.
  Nothing is sent anywhere or collected centrally.
- To hand expenses in, use "Export to PDF" (or the CSV option) and send the
  file. On a phone this opens the share sheet, so it can go straight to email.
- Removing the app, or clearing the browser's website data, erases that
  phone's entries. Export first.
- The fonts and the PDF tool are fetched from the internet the first time
  the app is opened online, then kept on the phone.


Updating the app later
----------------------
Replace the files at the same web address. Phones pick up the new version
the next time the app is opened online. If you change sw.js, also change the
version name on its first line (v1 -> v2) so old stored copies are cleared.
