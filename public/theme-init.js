// Runs before first paint so the saved theme never flashes. Default is light.
(function () {
  var t = null;
  try { t = localStorage.getItem('theme'); } catch (e) {}
  document.documentElement.setAttribute('data-theme', t === 'dark' ? 'dark' : 'light');
})();
