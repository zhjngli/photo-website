const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const cachePrefix = 'photo-website';

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return walk(fullPath);
    }

    return [fullPath];
  });
}

function toPublicPath(filePath) {
  return `/${path.relative(distDir, filePath).split(path.sep).join('/')}`;
}

const files = walk(distDir)
  .filter((filePath) => !filePath.endsWith('service-worker.js'))
  .sort();

const precacheUrls = Array.from(
  new Set(
    ['/', '/index.html'].concat(
      files.map(toPublicPath).filter((url) => {
        return !url.startsWith('/service-worker.js');
      })
    )
  )
);

const versionHash = crypto.createHash('sha1');
files.forEach((filePath) => {
  versionHash.update(fs.readFileSync(filePath));
});
const cacheName = `${cachePrefix}-${versionHash.digest('hex').slice(0, 12)}`;

const serviceWorkerContents = `
const CACHE_PREFIX = ${JSON.stringify(cachePrefix)};
const CACHE_NAME = ${JSON.stringify(cacheName)};
const PRECACHE_URLS = ${JSON.stringify(precacheUrls, null, 2)};

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return Promise.resolve(false);
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('/index.html', responseClone));
          return response;
        })
        .catch(() => caches.match(request).then((match) => match || caches.match('/index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        return networkResponse;
      });
    })
  );
});
`.trimStart();

fs.writeFileSync(path.join(distDir, 'service-worker.js'), serviceWorkerContents);
console.log(`Wrote dist/service-worker.js with ${precacheUrls.length} precached URLs`);
