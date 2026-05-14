# Simple Guide: Upload the Full Project Folder to GitHub

This guide is for your mobile study app.

Use it every time you add a new course and want to upload the full updated project to GitHub.

## Important Idea

You do not need to upload only one file.

You can upload the whole project folder every time.

The important files are:

```text
index.html
style.css
app.js
manifest.json
service-worker.js
courses/
assets/
data/
```

Your iPhone will open the app from:

```text
index.html
```

## Step 1: Test the App on Your Computer

Open Terminal and run:

```bash
cd "/Users/jimking/Documents/New project"
python3 -m http.server 4173
```

Open:

```text
http://localhost:4173
```

Check:

- home page opens
- course cards open
- lessons show
- images show
- quiz works
- complete checkmarks work

## Step 2: Open Your GitHub Repository

Go to:

```text
https://github.com
```

Open the repository for this study app.

## Step 3: Upload the Full Folder With Git

In Terminal, run:

```bash
cd "/Users/jimking/Documents/New project"
git add index.html style.css app.js manifest.json service-worker.js courses assets data *.md
git commit -m "Update study app"
git push
```

That uploads the latest version of the full app.

## Step 4: If Git Says There Is Nothing To Commit

That means GitHub already has the latest version.

You do not need to do anything.

## Step 5: Open It on Your iPhone

If you use GitHub Pages, open your GitHub Pages link in Safari on your iPhone.

Then:

```text
Share -> Add to Home Screen
```

Now the app opens like an iPhone app.

## Step 6: After Adding a New Course

Each time you add a course:

1. Put the new course HTML in:

```text
courses/
```

2. Put course images in:

```text
assets/course-XX/
```

3. Make sure the new course card is already inside:

```text
index.html
```

4. Test locally.

5. Run:

```bash
git add index.html courses assets data *.md
git commit -m "Add new course"
git push
```

## Step 7: Refresh on iPhone

Because this is a PWA, your iPhone may cache old files.

If the new course does not show:

1. Open Safari.
2. Open the GitHub Pages link directly.
3. Refresh the page.
4. Close and reopen the Home Screen app.

If it still shows the old version, change the version number in `index.html` script links or wait a little for the cache to update.

## Simple Rule

Every update follows this loop:

```text
Add course files -> test locally -> git add -> git commit -> git push -> refresh iPhone
```
