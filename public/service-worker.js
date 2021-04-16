const APP_PREFIX = 'budget-';     
const VERSION = 'version_01'; 
const CACHE_NAME = APP_PREFIX + VERSION
const FILES_TO_CACHE = [
  "./index.html",
  "./manifest.json",
  "./css/styles.css",
  "./js/index.js",
  "./js/idb.js",
  "./icons/icon-72x72.png",
  "./icons/icon-96x96.png",
  "./icons/icon-128x128.png",
  "./icons/icon-144x144.png",
  "./icons/icon-152x152.png",
  "./icons/icon-192x192.png",
  "./icons/icon-384x384.png",
  "./icons/icon-512x512.png"
];

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  if (e.request.url=="http://localhost:3001/"){
    const init = { 
      method: 'GET',
      mode: 'no-cors',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const url = new URL("http://localhost:3001/index.html")
    const newRequest = new Request(
      url.toString(),
      new Request(e.request, init),
    )

    console.log('fetch request : ' + newRequest.url)
    console.log(caches);
    e.respondWith(
      caches.match(newRequest).then(function (newRequest) {
        if (newRequest) { // if cache is available, respond with cache
          console.log('responding with cache : ' + newRequest.url)
          return newRequest
        } else {       // if there are no cache, try fetching request
          console.log('file is not cached, fetching : ' + newRequest.url)
          return fetch(newRequest)
        }
  
        // You can omit if/else for console.log & put one line below like this too.
        // return request || fetch(e.request)
      })
    )

  }

 else if (e.request.url=="https://powerful-peak-64523.herokuapp.com/"){
    const init = { 
      method: 'GET',
      mode: 'no-cors',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const url = new URL("https://powerful-peak-64523.herokuapp.com/index.html")
    const newRequest = new Request(
      url.toString(),
      new Request(e.request, init),
    )

    console.log('fetch request : ' + newRequest.url)
    console.log(caches);
    e.respondWith(
      caches.match(newRequest).then(function (newRequest) {
        if (newRequest) { // if cache is available, respond with cache
          console.log('responding with cache : ' + newRequest.url)
          return newRequest
        } else {       // if there are no cache, try fetching request
          console.log('file is not cached, fetching : ' + newRequest.url)
          return fetch(newRequest)
        }
  
        // You can omit if/else for console.log & put one line below like this too.
        // return request || fetch(e.request)
      })
    )

  }

  else {
        console.log('fetch request : ' + e.request.url)
        e.respondWith(
          caches.match(e.request).then(function (request) {
            if (request) { // if cache is available, respond with cache
              console.log('responding with cache : ' + e.request.url)
              return request
            } else {       // if there are no cache, try fetching request
              console.log('file is not cached, fetching : ' + e.request.url)
              return fetch(e.request)
            }

            // You can omit if/else for console.log & put one line below like this too.
            // return request || fetch(e.request)
          })
        )
  }


})

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(FILES_TO_CACHE)
    })
  )
})


// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create keeplist
      let cacheKeeplist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      })
      // add current cache name to keeplist
      cacheKeeplist.push(CACHE_NAME);

      return Promise.all(keyList.map(function (key, i) {
        if (cacheKeeplist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i] );
          return caches.delete(keyList[i]);
        }
      }));
    })
  );
});