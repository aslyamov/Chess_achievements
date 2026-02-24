import { loadData, saveData, uid } from '../storage';

export function renderAssign(): void {
  const app = document.getElementById('app')!;
  const data = loadData();

  const today = new Date().toISOString().slice(0, 10);

  app.innerHTML = `
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Выдать медаль</h1>

    ${data.students.length === 0 || data.achievements.length === 0 ? `
      <div class="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6 text-yellow-800 dark:text-yellow-200">
        <p class="font-medium mb-1">Недостаточно данных</p>
        <p class="text-sm">
          ${data.students.length === 0 ? '• Сначала добавьте учеников<br>' : ''}
          ${data.achievements.length === 0 ? '• Сначала добавьте медали' : ''}
        </p>
      </div>
    ` : `
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 max-w-lg">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ученик</label>
          <select id="sel-student" class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2
            bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="">— выберите ученика —</option>
            ${data.students.map(s => `<option value="${s.id}">${escHtml(s.name)}</option>`).join('')}
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Медаль</label>
          <select id="sel-achievement" class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2
            bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="">— выберите медаль —</option>
            ${data.categories.map(cat => {
              const catAchs = data.achievements.filter(a => a.categoryId === cat.id);
              if (catAchs.length === 0) return '';
              return `
                <optgroup label="${escHtml(cat.name)}">
                  ${catAchs.map(a => `<option value="${a.id}">${escHtml(a.name)}</option>`).join('')}
                </optgroup>
              `;
            }).join('')}
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Дата выдачи</label>
          <input id="inp-date" type="date" value="${today}"
            class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2
              bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>

        <div id="assign-preview" class="mb-5 hidden">
          <div class="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/40 rounded-lg p-3">
            <img id="preview-img" src="" alt="" class="w-12 h-12 object-cover rounded-lg bg-gray-200 dark:bg-gray-700"
              onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><text y=%2228%22 font-size=%2228%22>🏅</text></svg>'" />
            <div>
              <div id="preview-name" class="font-medium text-indigo-800 dark:text-indigo-200"></div>
              <div id="preview-desc" class="text-sm text-indigo-600 dark:text-indigo-400"></div>
            </div>
          </div>
        </div>

        <div id="assign-msg" class="mb-4 hidden"></div>

        <button id="btn-assign"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition">
          Выдать медаль
        </button>
      </div>
    `}
  `;

  const selAch = document.getElementById('sel-achievement') as HTMLSelectElement | null;
  selAch?.addEventListener('change', () => {
    const id = selAch.value;
    const preview = document.getElementById('assign-preview')!;
    if (!id) { preview.classList.add('hidden'); return; }
    const d = loadData();
    const ach = d.achievements.find(a => a.id === id);
    if (!ach) return;
    (document.getElementById('preview-img') as HTMLImageElement).src = ach.imageUrl;
    document.getElementById('preview-name')!.textContent = ach.name;
    document.getElementById('preview-desc')!.textContent = ach.description || '';
    preview.classList.remove('hidden');
  });

  document.getElementById('btn-assign')?.addEventListener('click', () => {
    const studentId = (document.getElementById('sel-student') as HTMLSelectElement).value;
    const achievementId = (document.getElementById('sel-achievement') as HTMLSelectElement).value;
    const grantedAt = (document.getElementById('inp-date') as HTMLInputElement).value;
    const msgEl = document.getElementById('assign-msg')!;

    if (!studentId || !achievementId || !grantedAt) {
      showMsg(msgEl, 'Заполните все поля', 'error');
      return;
    }

    const d = loadData();
    d.studentAchievements.push({ id: uid(), studentId, achievementId, grantedAt });
    saveData(d);

    const student = d.students.find(s => s.id === studentId);
    const ach = d.achievements.find(a => a.id === achievementId);
    showMsg(msgEl, `✓ «${ach?.name}» выдана ученику ${student?.name}`, 'success');

    // reset selects
    (document.getElementById('sel-student') as HTMLSelectElement).value = '';
    (document.getElementById('sel-achievement') as HTMLSelectElement).value = '';
    document.getElementById('assign-preview')?.classList.add('hidden');
  });
}

function showMsg(el: HTMLElement, text: string, type: 'success' | 'error') {
  el.className = `mb-4 px-4 py-3 rounded-lg text-sm font-medium ${type === 'success' ? 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300'}`;
  el.textContent = text;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 4000);
}

function escHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
