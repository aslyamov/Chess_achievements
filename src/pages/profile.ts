import { loadData } from '../storage';
import { navigate } from '../router';
import { openAssignModal } from '../assignModal';

type Filter = 'all' | 'year' | 'month' | 'week' | 'day';

export function renderProfile(params: Record<string, string>): void {
  const id = params['id'];
  const app = document.getElementById('app')!;
  const data = loadData();
  const student = data.students.find(s => s.id === id);

  if (!student) {
    app.innerHTML = `
      <div class="text-center py-20 text-gray-400 dark:text-gray-500">
        <p class="text-lg">Ученик не найден.</p>
        <button id="btn-back-notfound" class="mt-4 text-indigo-600 hover:underline">← Назад к ученикам</button>
      </div>
    `;
    document.getElementById('btn-back-notfound')?.addEventListener('click', () => navigate('/students'));
    return;
  }

  const filter: Filter = (new URLSearchParams(window.location.hash.split('?')[1] || '')).get('filter') as Filter || 'all';

  // Filter student achievements by date
  const now = new Date();
  const filtered = data.studentAchievements.filter(sa => {
    if (sa.studentId !== id) return false;
    if (filter === 'all') return true;
    const d = new Date(sa.grantedAt);
    if (filter === 'year')  return d.getFullYear() === now.getFullYear();
    if (filter === 'month') return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    if (filter === 'week') {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      return d >= startOfWeek;
    }
    if (filter === 'day') {
      return d.toDateString() === now.toDateString();
    }
    return true;
  });

  // Group by achievementId + count
  const countMap: Record<string, { count: number; dates: string[] }> = {};
  for (const sa of filtered) {
    if (!countMap[sa.achievementId]) countMap[sa.achievementId] = { count: 0, dates: [] };
    countMap[sa.achievementId].count++;
    countMap[sa.achievementId].dates.push(sa.grantedAt);
  }

  const totalCount = filtered.length;

  const FILTERS: { label: string; value: Filter }[] = [
    { label: 'Всё время', value: 'all' },
    { label: 'Год',       value: 'year' },
    { label: 'Месяц',     value: 'month' },
    { label: 'Неделя',    value: 'week' },
    { label: 'День',      value: 'day' },
  ];

  app.innerHTML = `
    <div class="mb-4">
      <button id="btn-back" class="text-indigo-600 dark:text-indigo-400 hover:underline text-sm">← Все ученики</button>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">${escHtml(student.name)}</h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">Добавлен: ${formatDate(student.createdAt)}</p>
        </div>
        <div class="flex items-start gap-3">
          <button id="btn-assign-medal"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition text-sm flex items-center gap-1.5">
            🏆 Выдать медаль
          </button>
          <div class="text-right">
            <div class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">${totalCount}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">медалей за период</div>
          </div>
        </div>
      </div>

      <!-- Date filters -->
      <div class="flex gap-2 mt-5 flex-wrap">
        ${FILTERS.map(f => `
          <button class="filter-btn px-3 py-1 rounded-full text-sm font-medium transition
            ${filter === f.value
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
            data-filter="${f.value}">${f.label}</button>
        `).join('')}
      </div>
    </div>

    ${Object.keys(countMap).length === 0 ? `
      <div class="text-center py-16 text-gray-400 dark:text-gray-500">
        <div class="text-5xl mb-3">🎯</div>
        <p>Нет медалей за выбранный период</p>
      </div>
    ` : `
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        ${Object.entries(countMap).map(([achId, info]) => {
          const ach = data.achievements.find(a => a.id === achId);
          if (!ach) return '';
          const lastDate = info.dates.sort().reverse()[0];
          return `
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex items-center gap-4">
              <div class="relative flex-shrink-0">
                <img src="${escHtml(ach.imageUrl)}" alt=""
                  class="w-16 h-16 object-cover rounded-xl bg-gray-100 dark:bg-gray-700"
                  onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><text y=%2228%22 font-size=%2228%22>🏅</text></svg>'" />
                ${info.count > 1 ? `
                  <span class="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold
                    rounded-full w-6 h-6 flex items-center justify-center shadow">
                    ${info.count}
                  </span>
                ` : ''}
              </div>
              <div class="min-w-0">
                ${info.count > 1 ? `<div class="text-xs text-indigo-500 dark:text-indigo-400 font-semibold mb-0.5">${info.count} ×</div>` : ''}
                <div class="font-semibold text-gray-800 dark:text-gray-100 leading-tight">${escHtml(ach.name)}</div>
                ${ach.description ? `<div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">${escHtml(ach.description)}</div>` : ''}
                <div class="text-xs text-gray-400 dark:text-gray-500 mt-1">Последняя: ${formatDate(lastDate)}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `}
  `;

  document.getElementById('btn-back')?.addEventListener('click', () => navigate('/students'));

  document.getElementById('btn-assign-medal')?.addEventListener('click', () => {
    openAssignModal(id, () => renderProfile(params));
  });

  app.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const f = (btn as HTMLElement).dataset.filter as Filter;
      const newHash = f === 'all' ? `/profile/${id}` : `/profile/${id}?filter=${f}`;
      const current = window.location.hash.slice(1);
      if (current === newHash) {
        renderProfile(params); // same hash, hashchange won't fire
      } else {
        window.location.hash = newHash; // hashchange fires → router calls renderProfile
      }
    });
  });
}

function escHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU');
}
