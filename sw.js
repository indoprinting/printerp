/**
 * Executed when install app.
 */
self.addEventListener('install', function(event) {
  console.log('Service worker is being installed.');
});

/**
 * Executed when installed app make request.
 */
self.addEventListener('fetch', function(event) {
  console.log('Service worker making request.');
  return event.request;
});