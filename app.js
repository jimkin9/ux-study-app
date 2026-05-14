const STORE_PREFIX = "uxStudyApp";
const state = {
  lessonIndex: Number(localStorage.getItem(`${STORE_PREFIX}_lastLesson`) || 0),
  quizIndex: 0,
  quizScore: 0,
  answered: false,
  didAutoResume: false
};

const settings = {
  theme: localStorage.getItem(`${STORE_PREFIX}_mode`) || "light",
  accent: localStorage.getItem(`${STORE_PREFIX}_accent`) || "teal",
  textSize: localStorage.getItem(`${STORE_PREFIX}_textSize`) || "0",
  reducedMotion: localStorage.getItem(`${STORE_PREFIX}_reducedMotion`) === "true"
};

const page = document.body.dataset.page;
const courseId = document.body.dataset.courseId;

init();

function init() {
  applySettings();
  bindSettings();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(resolvePath("service-worker.js")).catch(() => {});
  }

  if (page === "dashboard") renderDashboard();
  if (page === "course") renderCourse();

  if (page === "dashboard") {
    window.addEventListener("pageshow", renderDashboard);
    window.addEventListener("focus", renderDashboard);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) renderDashboard();
    });
  }
}

function resolvePath(path) {
  return page === "course" ? `../${path}` : path;
}

function getCourseData() {
  if (window.UX_CURRENT_COURSE) return window.UX_CURRENT_COURSE;
  if (courseId === "course-03") return window.UX_COURSE_03;
  return null;
}

function renderDashboard() {
  document.querySelectorAll("[data-course-card]").forEach((card) => {
    const course = {
      courseId: card.dataset.courseId,
      totalCards: Number(card.dataset.totalCards || 1)
    };
    const percent = getCoursePercent(course);
    const progress = card.querySelector("[data-course-progress]");
    const fill = progress?.querySelector("span");
    const current = card.querySelector("[data-progress-current]");
    if (progress) progress.setAttribute("aria-label", `${percent}% complete`);
    if (fill) fill.style.width = `${percent}%`;
    if (current) current.textContent = `${percent}%`;
  });
}

function courseCard(course) {
  const percent = getCoursePercent(course);

  return `
    <a class="course-card" href="${course.href}">
      <div class="course-body">
        <div class="course-meta">
          <span class="course-small-number">${course.number}</span>
          <span class="pill">${course.tag}</span>
        </div>
        <h2>${course.title}</h2>
        <p>${course.description}</p>
        <div class="course-progress" aria-label="${percent}% complete">
          <span style="width:${percent}%"></span>
        </div>
        <div class="progress-scale" aria-hidden="true">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </a>
  `;
}

function getStoredProgress() {
  return JSON.parse(localStorage.getItem(`${STORE_PREFIX}_progress`) || "{}");
}

function saveStoredProgress(progress) {
  localStorage.setItem(`${STORE_PREFIX}_progress`, JSON.stringify(progress));
}

function getCourseProgress(courseIdValue) {
  const progress = getStoredProgress();
  return progress[courseIdValue] || { completedCards: [] };
}

function saveCourseProgress(courseIdValue, courseProgress) {
  const progress = getStoredProgress();
  progress[courseIdValue] = courseProgress;
  saveStoredProgress(progress);
}

function getCoursePercent(course) {
  const totalCards = Math.max(1, course.totalCards || 1);
  const completedCards = getCourseProgress(course.courseId).completedCards.length;
  return Math.min(100, Math.round((completedCards / totalCards) * 100));
}

function renderCourse() {
  const course = getCourseData();
  if (!course) return;
  state.lessonIndex = Math.min(state.lessonIndex, course.lessons.length - 1);
  const lesson = course.lessons[state.lessonIndex];

  renderLessonPicker(course);
  renderCourseIntro(course, lesson);
  renderLessonCards(lesson);
  renderQuizPanel(course, lesson);
  bindBottomNav(course);
  resumeLastCard();
}

function renderLessonPicker(course) {
  const menu = document.querySelector("[data-lesson-menu]");
  const button = document.querySelector("[data-lesson-menu-button]");
  const list = document.querySelector("[data-lesson-menu-list]");
  const current = course.lessons[state.lessonIndex];

  button.textContent = `${current.lessonId} · ${current.lessonTitle}`;
  button.setAttribute("aria-expanded", "false");
  list.hidden = true;
  list.innerHTML = course.lessons
    .map((lesson, index) => `
      <button class="${index === state.lessonIndex ? "active" : ""}" type="button" data-lesson-option="${index}">
        ${lesson.lessonId} · ${lesson.lessonTitle}
      </button>
    `)
    .join("");

  button.onclick = () => {
    const isOpen = !list.hidden;
    list.hidden = isOpen;
    button.setAttribute("aria-expanded", String(!isOpen));
    menu.classList.toggle("open", !isOpen);
  };

  list.querySelectorAll("[data-lesson-option]").forEach((option) => {
    option.addEventListener("click", () => {
      state.lessonIndex = Number(option.dataset.lessonOption);
      localStorage.setItem(`${STORE_PREFIX}_lastLesson`, String(state.lessonIndex));
      state.quizIndex = 0;
      state.quizScore = 0;
      state.answered = false;
      renderCourse();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function resumeLastCard() {
  if (state.didAutoResume) return;
  const lastCard = localStorage.getItem(`${STORE_PREFIX}_lastCard`);
  if (!lastCard) return;
  state.didAutoResume = true;
  window.setTimeout(() => {
    document.getElementById(lastCard)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 120);
}

function renderCourseIntro(course, lesson) {
  const intro = document.querySelector("[data-course-intro]");
  intro.innerHTML = `
    <div>
      <p class="eyebrow">${lesson.sourceTitle} · ${lesson.estimatedTime}</p>
      <h1>${lesson.lessonTitle}</h1>
      <p>${lesson.learningObjective}</p>
    </div>
  `;
}

function renderLessonCards(lesson) {
  const panel = document.querySelector('[data-mode-panel="learn"]');
  const course = getCourseData();
  const progress = getCourseProgress(course.courseId);
  panel.hidden = false;
  document.querySelector('[data-mode-panel="quiz"]').hidden = true;

  panel.innerHTML = `
    <div class="stacked-cards">
      ${lesson.cards.map((card, index) => stackedCard(card, index, progress)).join("")}
    </div>
  `;

  panel.querySelectorAll("[data-complete-card]").forEach((button) => {
    button.addEventListener("click", () => {
      const cardId = button.dataset.completeCard;
      const latestProgress = getCourseProgress(course.courseId);
      if (latestProgress.completedCards.includes(cardId)) {
        latestProgress.completedCards = latestProgress.completedCards.filter((id) => id !== cardId);
      } else {
        latestProgress.completedCards.push(cardId);
        localStorage.setItem(`${STORE_PREFIX}_lastCard`, cardId);
      }
      saveCourseProgress(course.courseId, latestProgress);
      renderLessonCards(lesson);
    });
  });
}

function stackedCard(card, index, progress) {
  const completed = progress.completedCards.includes(card.id);
  const media = card.image
    ? `
      <figure>
        <img src="${card.image}" alt="${card.imageCaption}" loading="lazy">
        <figcaption>${card.imageCaption}</figcaption>
      </figure>
    `
    : "";

  return `
    <article class="study-card" id="${card.id}">
      <button class="complete-check ${completed ? "done" : ""}" type="button" data-complete-card="${card.id}" aria-label="${completed ? "Mark card incomplete" : "Mark card complete"}">
        ✓
      </button>
      <div class="card-content">
        <p class="eyebrow">${String(index + 1).padStart(2, "0")} · ${card.type}</p>
        <h2>${card.title}</h2>
        <p class="card-summary"><strong>${card.summary}</strong></p>
        <p>${card.details}</p>
        <p><strong>Example:</strong> ${card.example}</p>
        ${card.notice ? `<p><strong>Notice:</strong> ${card.notice}</p>` : ""}
        <p><strong>Takeaway:</strong> ${card.takeaway}</p>
      </div>
      ${media}
    </article>
  `;
}

function renderQuizPanel(course, lesson) {
  const panel = document.querySelector('[data-mode-panel="quiz"]');
  const question = lesson.quiz[state.quizIndex];

  if (!question) {
    panel.innerHTML = `
      <article class="quiz-card">
        <p class="eyebrow">Quiz complete</p>
        <h2>Your score: ${state.quizScore}/${lesson.quiz.length}</h2>
        <p class="quiz-feedback">Nice run. Retry when you want a cleaner pass through the lesson.</p>
        <button class="primary-button" type="button" data-restart-quiz>Retry quiz</button>
      </article>
    `;
    panel.querySelector("[data-restart-quiz]").addEventListener("click", () => {
      state.quizIndex = 0;
      state.quizScore = 0;
      state.answered = false;
      renderQuizPanel(course, lesson);
    });
    return;
  }

  panel.innerHTML = `
    <article class="quiz-card">
      <p class="eyebrow">${question.type} · Question ${state.quizIndex + 1} of ${lesson.quiz.length}</p>
      <h2>${question.question}</h2>
      <div class="quiz-options">
        ${question.options.map((option) => `<button type="button" data-answer="${escapeAttr(option)}">${option}</button>`).join("")}
      </div>
      <div class="quiz-feedback" data-quiz-feedback>Choose the best answer.</div>
      <button class="primary-button" type="button" data-next-question disabled>Next question</button>
    </article>
  `;

  const feedback = panel.querySelector("[data-quiz-feedback]");
  const next = panel.querySelector("[data-next-question]");
  panel.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.answered) return;
      state.answered = true;
      const correct = button.dataset.answer === question.correctAnswer;
      if (correct) state.quizScore += 1;
      button.classList.add(correct ? "correct" : "wrong");
      panel.querySelectorAll("[data-answer]").forEach((optionButton) => {
        if (optionButton.dataset.answer === question.correctAnswer) optionButton.classList.add("correct");
      });
      feedback.textContent = `${correct ? "Correct." : "Not quite."} ${question.explanation}`;
      next.disabled = false;
    });
  });

  next.addEventListener("click", () => {
    state.quizIndex += 1;
    state.answered = false;
    renderQuizPanel(course, lesson);
  });
}

function bindBottomNav(course) {
  const previous = document.querySelector("[data-prev-lesson]");
  const next = document.querySelector("[data-next-lesson]");
  const quiz = document.querySelector("[data-open-quiz]");

  previous.disabled = state.lessonIndex === 0;
  next.disabled = state.lessonIndex === course.lessons.length - 1;

  previous.onclick = () => {
    state.lessonIndex = Math.max(0, state.lessonIndex - 1);
    localStorage.setItem(`${STORE_PREFIX}_lastLesson`, String(state.lessonIndex));
    state.quizIndex = 0;
    state.quizScore = 0;
    renderCourse();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  next.onclick = () => {
    state.lessonIndex = Math.min(course.lessons.length - 1, state.lessonIndex + 1);
    localStorage.setItem(`${STORE_PREFIX}_lastLesson`, String(state.lessonIndex));
    state.quizIndex = 0;
    state.quizScore = 0;
    renderCourse();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  quiz.onclick = () => {
    const learnPanel = document.querySelector('[data-mode-panel="learn"]');
    const quizPanel = document.querySelector('[data-mode-panel="quiz"]');
    const isQuizOpen = !quizPanel.hidden;
    learnPanel.hidden = !isQuizOpen;
    quizPanel.hidden = isQuizOpen;
    quiz.textContent = isQuizOpen ? "Start Quiz" : "Back to Lesson";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}

function bindSettings() {
  const panel = document.querySelector("[data-settings-panel]");
  const open = document.querySelector("[data-open-settings]");
  const close = document.querySelector("[data-close-settings]");
  const motion = document.querySelector("[data-setting-motion]");

  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.addEventListener("click", () => saveSetting("mode", button.dataset.themeChoice));
  });

  document.querySelectorAll("[data-accent-choice]").forEach((button) => {
    button.addEventListener("click", () => saveSetting("accent", button.dataset.accentChoice));
  });

  document.querySelectorAll("[data-text-decrease]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextSize = Math.max(0, Number(settings.textSize) - 1);
      saveSetting("textSize", String(nextSize));
    });
  });

  document.querySelectorAll("[data-text-increase]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextSize = Math.min(2, Number(settings.textSize) + 1);
      saveSetting("textSize", String(nextSize));
    });
  });

  motion.checked = settings.reducedMotion;

  open.addEventListener("click", () => {
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
  });

  close.addEventListener("click", () => {
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
  });

  panel.addEventListener("click", (event) => {
    if (event.target === panel) close.click();
  });

  motion.addEventListener("change", () => saveSetting("reducedMotion", String(motion.checked)));
  syncSettingsControls();
}

function saveSetting(key, value) {
  localStorage.setItem(`${STORE_PREFIX}_${key}`, value);
  settings.theme = localStorage.getItem(`${STORE_PREFIX}_mode`) || "light";
  settings.accent = localStorage.getItem(`${STORE_PREFIX}_accent`) || "teal";
  settings.textSize = localStorage.getItem(`${STORE_PREFIX}_textSize`) || "0";
  settings.reducedMotion = localStorage.getItem(`${STORE_PREFIX}_reducedMotion`) === "true";
  applySettings();
  syncSettingsControls();
}

function applySettings() {
  document.documentElement.dataset.theme = settings.theme;
  document.documentElement.dataset.accent = settings.accent;
  document.documentElement.dataset.textSize = settings.textSize;
  document.documentElement.dataset.reducedMotion = String(settings.reducedMotion);
}

function syncSettingsControls() {
  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.classList.toggle("active", button.dataset.themeChoice === settings.theme);
  });
  document.querySelectorAll("[data-accent-choice]").forEach((button) => {
    button.classList.toggle("active", button.dataset.accentChoice === settings.accent);
  });
  document.querySelectorAll("[data-text-size-value]").forEach((value) => {
    value.textContent = String(Number(settings.textSize) + 1);
  });
}

function escapeAttr(value) {
  return value.replaceAll('"', "&quot;");
}
