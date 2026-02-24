import type { AppData } from './types';

const KEY = 'chess_achievements_data';

const defaultData: AppData = {
  students: [],
  categories: [],
  achievements: [],
  studentAchievements: [],
};

export function loadData(): AppData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...defaultData };
    return JSON.parse(raw) as AppData;
  } catch {
    return { ...defaultData };
  }
}

export function saveData(data: AppData): void {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function exportJSON(): void {
  const data = loadData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chess_achievements_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importJSON(json: string): void {
  const data = JSON.parse(json) as AppData;
  // basic validation
  if (!Array.isArray(data.students) || !Array.isArray(data.categories) ||
      !Array.isArray(data.achievements) || !Array.isArray(data.studentAchievements)) {
    throw new Error('Неверный формат файла');
  }
  saveData(data);
}

export function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function getTheme(): 'light' | 'dark' {
  return (localStorage.getItem('chess_theme') as 'light' | 'dark') || 'light';
}

export function setTheme(theme: 'light' | 'dark'): void {
  localStorage.setItem('chess_theme', theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export function getStudentView(): 'cards' | 'table' {
  return (localStorage.getItem('chess_student_view') as 'cards' | 'table') || 'cards';
}

export function setStudentView(view: 'cards' | 'table'): void {
  localStorage.setItem('chess_student_view', view);
}
