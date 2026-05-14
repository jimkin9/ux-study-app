window.UX_COURSE_03 = {
  courseId: "course-03",
  courseTitle: "Mobile UX Design: The Beginner's Guide",
  courseDescription: "A practical mobile UX lesson on responsive design, flexible layouts, breakpoints, fluid media, and accessible multi-device experiences.",
  lessons: [
    {
      lessonId: "3.1",
      lessonTitle: "Responsive Design: Best Practices",
      sourceTitle: "2.4 Responsive Design: Best Practices",
      estimatedTime: "17 mins",
      learningObjective: "Explain how responsive design supports device switching, accessibility, and usable layouts across phones, tablets, and desktops.",
      overview: "Responsive design is the default approach for modern web experiences because people move between phones, tablets, laptops, and desktop screens throughout the same journey. A responsive interface does not simply shrink a desktop page. It changes layout, spacing, media, and content priority so the experience still feels intentional in each viewport. The lesson introduces three core mechanisms: fluid grids, fluid images, and media queries. Fluid grids use relative sizing so layouts can adapt to available space. Fluid images resize within their containers instead of breaking the page. Media queries let designers and developers adjust layout at breakpoints, such as moving from one column on phones to multiple columns on larger screens. Responsive design also matters for accessibility because WCAG includes reflow expectations, and it matters for SEO because mobile-friendly pages are easier for people and search engines to use. A strong responsive process begins mobile-first, tests real content, and prioritizes what users need most in each context.",
      keyConcepts: [
        {
          name: "Responsive design",
          explanation: "An approach to web design where content and layout adapt to different viewport sizes and device contexts.",
          whyItMatters: "Users expect the same product to work naturally as they move between devices.",
          example: "A course dashboard may show one card per row on a phone, two on a tablet, and four on a desktop.",
          mistakeToAvoid: "Treating responsiveness as a last-minute resize of a desktop layout."
        },
        {
          name: "Fluid grid",
          explanation: "A layout system based on relative widths rather than fixed pixel widths.",
          whyItMatters: "Relative sizing lets content use the available screen space without horizontal scrolling.",
          example: "A card uses width: 100% inside a mobile column, then participates in a flexible grid on larger screens.",
          mistakeToAvoid: "Locking core containers to fixed desktop widths."
        },
        {
          name: "Fluid image",
          explanation: "An image that scales with its container while preserving its proportions.",
          whyItMatters: "Images can otherwise overflow, become unreadable, or dominate small screens.",
          example: "A diagram uses max-width: 100% and opens larger on tap for closer inspection.",
          mistakeToAvoid: "Uploading a large image and assuming the browser will make it usable in every context."
        },
        {
          name: "Media query",
          explanation: "A CSS rule that changes styling when conditions such as viewport width are met.",
          whyItMatters: "It lets the interface change structure at moments where the current layout stops working.",
          example: "A three-column layout becomes two columns on tablets and one column on phones.",
          mistakeToAvoid: "Choosing breakpoints only from popular device sizes instead of testing where content actually needs to change."
        },
        {
          name: "Mobile-first design",
          explanation: "A design and implementation strategy that starts with the smallest useful screen, then enhances for larger screens.",
          whyItMatters: "It forces teams to prioritize essential content and actions before adding complexity.",
          example: "A mobile course page shows the current lesson first, then adds side navigation on wider screens.",
          mistakeToAvoid: "Designing every feature for desktop and then hiding half of it on phones."
        }
      ],
      cards: [
        {
          id: "3.1-card-01",
          title: "Responsive Design Is Device-Aware",
          type: "concept",
          summary: "Responsive design adapts content and layout to the device and viewport.",
          details: "A responsive page changes how information flows so it remains readable, reachable, and useful on phones, tablets, and desktops. The goal is not visual sameness; it is functional continuity across contexts.",
          example: "A study app dashboard can show stacked course cards on a phone, a two-column grid on iPad, and a denser grid on desktop.",
          image: "../assets/course-03/image1.jpeg",
          imageCaption: "Responsive content adapts to fit the available viewport.",
          notice: "Look for how the same content keeps its meaning while the arrangement changes.",
          takeaway: "Responsive UX preserves usefulness across screen sizes."
        },
        {
          id: "3.1-card-02",
          title: "People Switch Devices",
          type: "example",
          summary: "Responsive design supports journeys that move between desktop, phone, and tablet.",
          details: "A user might begin a task at work on a desktop, continue on a phone while commuting, and finish later on a tablet. Mobile UX decisions should assume this movement instead of treating mobile as a separate, reduced product.",
          example: "A learner starts a quiz on an iPad, reviews weak cards on a phone, then returns to a laptop to study images in detail.",
          image: "",
          imageCaption: "",
          notice: "",
          takeaway: "Design for continuity, not isolated screens."
        },
        {
          id: "3.1-card-03",
          title: "Reflow Supports Accessibility",
          type: "framework",
          summary: "WCAG treats reflow as part of accessible content.",
          details: "When content can reflow, people who zoom, use small screens, or need larger text can still read and interact without awkward horizontal scrolling. Responsive design and accessibility often reinforce each other.",
          example: "A lesson page that reflows from two columns to one column helps users who zoom text to 200%.",
          image: "",
          imageCaption: "",
          notice: "",
          takeaway: "Responsive behavior is also an accessibility behavior."
        },
        {
          id: "3.1-card-04",
          title: "Fluid Grids Use Relative Space",
          type: "method",
          summary: "Fluid grids use proportions instead of fixed widths.",
          details: "Fixed pixel layouts assume a stable canvas. Fluid grids define columns and containers in relative units so the layout can expand, contract, and wrap gracefully as screen space changes.",
          example: "A card grid might use minmax() so cards remain readable while the browser decides how many fit per row.",
          image: "../assets/course-03/image4.jpeg",
          imageCaption: "Fixed content keeps one width; fluid content fills the available screen space.",
          notice: "Compare the fixed version against the fluid version and watch how the fluid layout avoids wasted or broken space.",
          takeaway: "Relative layout rules make responsive interfaces possible."
        },
        {
          id: "3.1-card-05",
          title: "Fixed Pixel Thinking Breaks",
          type: "mistake",
          summary: "Absolute sizing does not survive the variety of modern devices.",
          details: "Pixel-perfect layout thinking came from print and early web habits. It becomes fragile when devices have different widths, resolutions, orientations, and zoom settings.",
          example: "A 960px-wide content area may look fine on desktop but cause horizontal scrolling on a phone.",
          image: "../assets/course-03/image3.jpeg",
          imageCaption: "Pixel dimensions describe fixed media sizes, not flexible product layouts.",
          notice: "Notice how a fixed numeric size can describe media while still being unsuitable as a complete layout strategy.",
          takeaway: "Use fixed sizes sparingly and only where the interface truly needs them."
        },
        {
          id: "3.1-card-06",
          title: "Fluid Images Stay Inside Their Containers",
          type: "method",
          summary: "Images need responsive rules just like layouts do.",
          details: "When layouts use relative widths, images must also resize. A fluid image scales within its parent container so it does not overflow the screen or become disconnected from nearby text.",
          example: "A responsive lesson image uses max-width: 100%, height: auto, lazy loading, alt text, and tap-to-enlarge behavior.",
          image: "../assets/course-03/image5.jpeg",
          imageCaption: "Fluid images adapt to the container available to them.",
          notice: "Watch how the image remains contained instead of forcing the page wider.",
          takeaway: "Responsive media prevents visual examples from becoming layout problems."
        },
        {
          id: "3.1-card-07",
          title: "SVG Helps Non-Photographic Graphics",
          type: "definition",
          summary: "SVGs scale cleanly for icons, diagrams, and simple illustrations.",
          details: "Unlike raster images, SVG files are vector-based. They are often lightweight and can scale to different resolutions without becoming blurry, which makes them helpful for interface icons and simple diagrams.",
          example: "A settings icon can be SVG so it looks crisp on high-density mobile screens.",
          image: "",
          imageCaption: "",
          notice: "",
          takeaway: "Choose image formats based on the job the image needs to do."
        },
        {
          id: "3.1-card-08",
          title: "Media Queries Change Layout Rules",
          type: "method",
          summary: "Media queries let CSS respond to viewport conditions.",
          details: "A media query can change columns, spacing, typography, navigation, or visibility when the available space reaches a breakpoint. The best breakpoint is where the content needs a new layout, not necessarily where a popular device starts.",
          example: "A two-column lesson and image layout becomes a one-column reading flow below 720px.",
          image: "../assets/course-03/image6.gif",
          imageCaption: "Columns rearrange across smartphone, tablet, and desktop viewports.",
          notice: "Notice how column count changes while the content remains available.",
          takeaway: "Breakpoints should protect comprehension and interaction."
        },
        {
          id: "3.1-card-09",
          title: "Mobile First Forces Priority",
          type: "checklist",
          summary: "Starting on mobile helps teams decide what matters most.",
          details: "A mobile-first approach begins with limited space and essential tasks. Larger screens can then add supporting details, secondary navigation, and richer comparison views.",
          example: "A mobile quiz screen shows the question, one answer group, and feedback. A desktop version can add a side panel with related cards.",
          image: "",
          imageCaption: "",
          notice: "",
          takeaway: "Small screens expose weak prioritization quickly."
        },
        {
          id: "3.1-card-10",
          title: "Prioritize and Hide Carefully",
          type: "practical",
          summary: "Responsive design sometimes changes what appears first or later.",
          details: "People need different levels of detail in different contexts. Progressive disclosure, navigation drawers, and careful visual hierarchy can make essential content immediate while keeping nice-to-have content available.",
          example: "A course page may show the active lesson and quiz button first on mobile, with the full lesson list behind a Lessons control.",
          image: "",
          imageCaption: "",
          notice: "",
          takeaway: "Hide secondary content only when users can still find it easily."
        },
        {
          id: "3.1-card-11",
          title: "Minimalism Helps Responsive UX",
          type: "concept",
          summary: "Simpler interfaces adapt more gracefully.",
          details: "Crowded screens, too many controls, and dense content blocks become harder to manage across devices. Minimalism in responsive UX means removing noise so the essential task survives in every layout.",
          example: "A lesson card should avoid competing buttons and keep one clear next action.",
          image: "",
          imageCaption: "",
          notice: "",
          takeaway: "Less clutter means fewer layout failures."
        },
        {
          id: "3.1-card-12",
          title: "Test Breakpoints With Real Content",
          type: "case-study",
          summary: "Responsive quality comes from testing where layouts actually strain.",
          details: "Teams can predict common breakpoints, but real content reveals where text wraps badly, images dominate, buttons crowd, or columns become too narrow. Testing should include actual copy, images, and interaction states.",
          example: "A long course title might force the dashboard card to need a different layout sooner than a generic placeholder would suggest.",
          image: "../assets/course-03/image7.jpeg",
          imageCaption: "Responsive design depends on testing the actual content and layout.",
          notice: "Look for where the design changes to keep content usable rather than decorative.",
          takeaway: "Real content is the best breakpoint detector."
        }
      ],
      quiz: [
        {
          id: "3.1-q01",
          type: "multiple-choice",
          question: "What is the main goal of responsive design?",
          options: ["To make every screen look identical", "To adapt content and layout to different viewports", "To remove desktop experiences", "To replace usability testing"],
          correctAnswer: "To adapt content and layout to different viewports",
          explanation: "Responsive design keeps content usable by changing layout and behavior according to available screen space.",
          relatedCardId: "3.1-card-01"
        },
        {
          id: "3.1-q02",
          type: "multiple-choice",
          question: "Which set contains the three major responsive design principles from the lesson?",
          options: ["Personas, journeys, and wireframes", "Fluid grids, fluid images, and media queries", "Color, typography, and branding", "SEO, analytics, and advertising"],
          correctAnswer: "Fluid grids, fluid images, and media queries",
          explanation: "The lesson identifies fluid grids, fluid image use, and media queries as the three core principles.",
          relatedCardId: "3.1-card-04"
        },
        {
          id: "3.1-q03",
          type: "true-false",
          question: "Responsive design can support accessibility because content reflow helps people using zoom or small screens.",
          options: ["True", "False", "Only for desktop users", "Only when images are removed"],
          correctAnswer: "True",
          explanation: "Reflow is an accessibility concern, and responsive layouts can reduce horizontal scrolling and improve readability.",
          relatedCardId: "3.1-card-03"
        },
        {
          id: "3.1-q04",
          type: "scenario",
          question: "A course dashboard works on desktop but causes horizontal scrolling on phones. What is the best first design response?",
          options: ["Force users to rotate their phones", "Use a fixed desktop width", "Introduce a flexible mobile layout", "Remove all course cards"],
          correctAnswer: "Introduce a flexible mobile layout",
          explanation: "A fluid layout can stack or resize content so it fits the available viewport.",
          relatedCardId: "3.1-card-04"
        },
        {
          id: "3.1-q05",
          type: "practical",
          question: "Why is a mobile-first approach useful?",
          options: ["It makes desktop unnecessary", "It forces teams to prioritize essential content and actions", "It prevents media queries", "It guarantees SEO without testing"],
          correctAnswer: "It forces teams to prioritize essential content and actions",
          explanation: "Starting small makes priority decisions visible before larger screens add complexity.",
          relatedCardId: "3.1-card-09"
        },
        {
          id: "3.1-q06",
          type: "scenario",
          question: "A two-column layout becomes cramped at 680px wide. What should determine the breakpoint?",
          options: ["The moment the content stops working well", "Only the latest phone model width", "The designer's favorite number", "The image file size"],
          correctAnswer: "The moment the content stops working well",
          explanation: "Breakpoints should respond to content and usability strain, not only named devices.",
          relatedCardId: "3.1-card-08"
        },
        {
          id: "3.1-q07",
          type: "image-based",
          question: "A diagram overflows its card on mobile. Which image rule best addresses the issue?",
          options: ["Set the image to max-width: 100% and height: auto", "Use more columns", "Remove alt text", "Make the page fixed-width"],
          correctAnswer: "Set the image to max-width: 100% and height: auto",
          explanation: "Fluid image rules keep media inside its container while preserving proportions.",
          relatedCardId: "3.1-card-06"
        },
        {
          id: "3.1-q08",
          type: "common-mistake",
          question: "Which choice is a common responsive design mistake?",
          options: ["Testing with real content", "Using relative layout units", "Treating mobile as a shrunken desktop page", "Adding accessible focus states"],
          correctAnswer: "Treating mobile as a shrunken desktop page",
          explanation: "Mobile layouts need intentional priority and structure, not just a smaller desktop view.",
          relatedCardId: "3.1-card-05"
        },
        {
          id: "3.1-q09",
          type: "practical",
          question: "When should SVG be prioritized?",
          options: ["For non-photographic graphics such as icons", "For every photo", "Only for long paragraphs", "Only when hiding content"],
          correctAnswer: "For non-photographic graphics such as icons",
          explanation: "SVG scales cleanly and is often efficient for icons and simple diagrams.",
          relatedCardId: "3.1-card-07"
        },
        {
          id: "3.1-q10",
          type: "final-review",
          question: "Which statement best summarizes the lesson?",
          options: ["Responsive design is mainly decoration", "Responsive UX combines flexible grids, media, breakpoints, prioritization, testing, and accessibility", "Responsive design means using one desktop layout everywhere", "Media queries replace content strategy"],
          correctAnswer: "Responsive UX combines flexible grids, media, breakpoints, prioritization, testing, and accessibility",
          explanation: "The lesson connects technical responsive mechanisms with user needs, accessibility, and practical design judgment.",
          relatedCardId: "3.1-card-12"
        }
      ],
      takeaways: [
        "Responsive design supports people as they move between devices.",
        "Fluid grids and fluid images prevent fixed layouts from breaking.",
        "Media queries should respond to content needs, not only device names.",
        "Mobile-first design clarifies priority.",
        "Responsive design supports accessibility through reflow.",
        "Real content is essential for testing breakpoints."
      ]
    }
  ]
};

window.UX_CURRENT_COURSE = window.UX_COURSE_03;
