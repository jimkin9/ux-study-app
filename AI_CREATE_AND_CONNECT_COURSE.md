# AI Instructions: Create and Connect a New Course

Use this file when you give a Word course file to an AI model.

Your job is to convert the Word file into a complete course for this existing UX Study App.

Important: do not redesign the app.

Do not change:

- `style.css`
- `app.js`
- the visual style
- colors
- spacing
- card design
- quiz behavior
- settings panel
- navigation behavior

Only create or update the course content files needed to add the new course.

## What You Must Produce

Return a complete set of project-ready files:

```text
courses/course-XX-course-name.html
assets/course-XX/image files
updated index.html
```

The goal is that the user can replace/upload the full project folder to GitHub without manually connecting separate files.

## Existing Project Structure

The project uses this structure:

```text
UX-Study-App/
├── index.html
├── style.css
├── app.js
├── manifest.json
├── service-worker.js
├── courses/
│   └── course-03-mobile-ux-design.html
├── assets/
│   ├── app-icon.svg
│   └── course-03/
└── data/
    └── course-03-mobile-ux-design.js
```

The home page course cards are inside:

```text
index.html
```

Do not use or create a separate home course index unless the user specifically asks.

## Course Numbering

Pick the next course number.

Examples:

```text
course-02
course-04
course-05
```

Use the same course ID everywhere.

If the new course is course 04, all of these must match:

```html
data-course-id="course-04"
```

```js
courseId: "course-04"
```

```text
assets/course-04/
```

```text
courses/course-04-course-name.html
```

## Step 1: Read the Word File

Read the full Word file carefully.

Extract:

- headings
- lesson topics
- definitions
- frameworks
- methods
- examples
- diagrams
- screenshots
- activities
- practical advice
- mistakes to avoid
- assessment points

Do not create a short summary only. This is for mobile studying.

## Step 2: Divide the Course Into Lessons

Divide the course into clear numbered lessons.

Use lesson IDs like:

```text
4.1
4.2
4.3
```

Each lesson should teach one main topic.

Each lesson needs:

- lesson title
- learning objective
- overview
- study cards
- quiz
- takeaways

## Step 3: Create Rich Study Cards

Each lesson should have around:

```text
8-15 cards
```

Long lessons may need more.

Each card must teach one idea.

Use this card structure:

```js
{
  id: "4.1-card-01",
  title: "Card Title",
  type: "concept",
  summary: "One clear sentence.",
  details: "A useful explanation for mobile studying.",
  example: "A practical UX example.",
  image: "../assets/course-04/course-04-lesson-4-1-image-01.jpeg",
  imageCaption: "Clear caption.",
  notice: "What the learner should notice.",
  takeaway: "One memorable takeaway."
}
```

If there is no image:

```js
image: "",
imageCaption: "",
notice: ""
```

Recommended card types:

```text
concept
definition
framework
example
image-analysis
method
mistake
checklist
case-study
reflection
```

## Step 4: Handle Images

Use images only when they help learning.

Save images in:

```text
assets/course-XX/
```

Use clear names:

```text
course-04-lesson-4-1-image-01.jpeg
course-04-lesson-4-1-image-02.jpeg
```

Image paths inside the course HTML must start with:

```text
../assets/course-XX/
```

Do not embed Base64 images in the HTML.

Do not add decorative images.

## Step 5: Create Quizzes

Each lesson must have exactly 10 quiz questions.

Use this mix:

```text
3 concept questions
2 practical application questions
2 scenario questions
1 image-based question if images are available
1 common mistake question
1 final review question
```

If there are no useful images, replace the image-based question with another scenario question.

Each question must use this structure:

```js
{
  id: "4.1-q01",
  type: "multiple-choice",
  question: "Question text?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  correctAnswer: "Option B",
  explanation: "Explain why this answer is correct.",
  relatedCardId: "4.1-card-01"
}
```

## Step 6: Create the Course HTML

Create one course HTML file in:

```text
courses/
```

Use this exact structure.

Only replace:

- title
- `data-course-id`
- `window.UX_CURRENT_COURSE`
- course content

Do not change class names.
Do not add new CSS.
Do not change the layout.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#28666e" />
    <title>COURSE TITLE | UX Study App</title>
    <link rel="icon" href="../assets/app-icon.svg" type="image/svg+xml" />
    <link rel="manifest" href="../manifest.json" />
    <link rel="stylesheet" href="../style.css" />
  </head>
  <body data-page="course" data-course-id="course-XX">
    <header class="app-topbar simple-topbar">
      <a class="back-link" href="../index.html">&lt; Courses</a>
      <button class="icon-button" type="button" data-open-settings aria-label="Open settings">
        <span aria-hidden="true">⚙︎</span>
      </button>
    </header>

    <main class="course-shell">
      <section class="lesson-picker">
        <span class="lesson-label">Lesson</span>
        <div class="lesson-menu" data-lesson-menu>
          <button class="lesson-menu-button" type="button" data-lesson-menu-button aria-expanded="false"></button>
          <div class="lesson-menu-list" data-lesson-menu-list hidden></div>
        </div>
      </section>
      <section class="course-intro" data-course-intro></section>
      <section data-mode-panel="learn"></section>
      <section data-mode-panel="quiz" hidden></section>
    </main>

    <nav class="bottom-nav" aria-label="Lesson navigation">
      <button class="circle-nav" type="button" data-prev-lesson aria-label="Previous lesson">‹</button>
      <button class="quiz-launch" type="button" data-open-quiz>Start Quiz</button>
      <button class="circle-nav" type="button" data-next-lesson aria-label="Next lesson">›</button>
    </nav>

    COPY THE SAME SETTINGS PANEL FROM AN EXISTING COURSE PAGE HERE.

    <script>
      window.UX_CURRENT_COURSE = {
        courseId: "course-XX",
        courseTitle: "COURSE TITLE",
        courseDescription: "COURSE DESCRIPTION",
        lessons: []
      };
    </script>
    <script src="../app.js"></script>
  </body>
</html>
```

## Step 7: Update `index.html`

Add one new course card inside:

```html
<section class="course-grid" data-course-grid aria-label="Courses">
```

Use this exact card structure:

```html
<a
  class="course-card"
  href="courses/course-XX-course-name.html"
  data-course-card
  data-course-id="course-XX"
  data-total-cards="TOTAL_CARD_COUNT"
>
  <div class="course-body">
    <div class="course-meta">
      <span class="course-small-number">02</span>
      <span class="pill">SHORT TAG</span>
    </div>
    <h2>COURSE TITLE</h2>
    <p>SHORT COURSE SUBTITLE.</p>
    <div class="course-progress" aria-label="0% complete" data-course-progress>
      <span style="width: 0%"></span>
    </div>
    <div class="progress-scale" aria-hidden="true">
      <span>0%</span>
      <span>100%</span>
    </div>
  </div>
</a>
```

Important:

`data-total-cards` must equal the total number of cards across all lessons.

## Step 8: Do Not Touch Styling

Do not edit:

```text
style.css
```

Do not add inline styles.

Do not add new visual design.

Do not change class names.

Use the existing classes only.

The app already controls:

- glass cards
- colors
- dark mode
- text size
- progress bars
- lesson dropdown
- complete checkmarks
- quiz buttons
- mobile spacing

## Step 9: Final Checklist

Before returning the files, check:

- New course HTML is inside `courses/`.
- New assets are inside `assets/course-XX/`.
- `index.html` includes the new course card.
- `data-course-id` matches `courseId`.
- Every card ID is unique.
- Every quiz has exactly 10 questions.
- Every quiz `relatedCardId` points to an existing card.
- Image paths are correct.
- No Base64 images are embedded.
- `style.css` was not edited.
- `app.js` was not edited unless the user explicitly asked.
- The user can upload the whole folder to GitHub without manually connecting files.

## What To Return To The User

Return:

1. The updated full project folder, or a zip file if possible.
2. A short list of added files.
3. The total card count used in `data-total-cards`.
4. Any images that could not be extracted.
