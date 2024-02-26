(function () {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  const $ = (id) => document.getElementById(id);
  const setMode = (mode) => {
    document.body.classList.remove('dark-theme', 'light-theme');
    if (mode === 'dark') {
      document.body.classList.add('dark-theme');
      $themeDark.classList.add('selected');
    } else if (mode === 'light') {
      document.body.classList.add('light-theme');
      $themeLight.classList.add('selected');
    }
    localStorage.setItem('theme', mode);
    currentTheme = mode;
    $themeAuto.classList.toggle('selected', !mode);
  };

  const $themeAuto = $('theme-auto');
  const $themeLight = $('theme-light');
  const $themeDark = $('theme-dark');

  let currentTheme = localStorage.getItem('theme');
  setMode(currentTheme);

  $themeAuto.addEventListener('click', () => setMode(currentTheme ? '' : 'dark'));
  $themeLight.addEventListener('click', () => setMode(currentTheme === 'light' ? '' : 'light'));
  $themeDark.addEventListener('click', () => setMode(currentTheme === 'dark' ? '' : 'dark'));

  if (!currentTheme) setMode(prefersDark ? 'dark' : prefersLight ? 'light' : '');
})();
