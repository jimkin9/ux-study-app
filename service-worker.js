const CACHE_NAME = "ux-study-app-v11";
const CORE_ASSETS = [
  "index.html",
  "style.css",
  "app.js",
  "manifest.json",
  "data/course-03-mobile-ux-design.js",
  "courses/course-03-mobile-ux-design.html",
  "assets/app-icon.svg",
  "assets/Logo.svg",
  "assets/course-03/image1.jpeg",
  "assets/course-03/image2.jpeg",
  "assets/course-03/image3.jpeg",
  "assets/course-03/image4.jpeg",
  "assets/course-03/image5.jpeg",
  "assets/course-03/image6.gif",
  "assets/course-03/image7.jpeg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
