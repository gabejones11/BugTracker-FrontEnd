const themeMap = {
  dark: 'light',
  light: 'dark',
};

export function initializeTheme() {
  let theme = localStorage.getItem('theme');

  if (!theme || !themeMap.hasOwnProperty(theme)) {
    theme = Object.keys(themeMap)[1];
    localStorage.setItem('theme', theme);
  }

  document.body.classList.add(theme);
}

export function toggleTheme() {
  const current = localStorage.getItem('theme');
  const next = themeMap[current];

  localStorage.setItem('theme', next);
  document.body.classList.replace(current, next);
}