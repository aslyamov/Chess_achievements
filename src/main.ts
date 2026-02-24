import { on, navigate, initRouter } from './router';
import { renderStudents }     from './pages/students';
import { renderAchievements } from './pages/achievements';
import { renderAssign }       from './pages/assign';
import { renderProfile }      from './pages/profile';
import { renderImportExport } from './pages/importExport';
import { getTheme, setTheme } from './storage';

// Theme toggle button
const themeBtn = document.getElementById('btn-theme');
function updateThemeBtn() {
  if (themeBtn) themeBtn.textContent = getTheme() === 'dark' ? '☀️' : '🌙';
}
updateThemeBtn();
themeBtn?.addEventListener('click', () => {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  updateThemeBtn();
});

// Routes
on('/students',      () => renderStudents());
on('/achievements',  () => renderAchievements());
on('/assign',        () => renderAssign());
on('/profile/:id',   (p) => renderProfile(p));
on('/import-export', () => renderImportExport());
on('/',              () => navigate('/students'));

initRouter();
