import { loadData, saveData, uid } from './storage';
import { showModal, closeModal } from './modal';

export function openAssignModal(studentId: string, onGranted: () => void): void {
  const data = loadData();
  const student = data.students.find(s => s.id === studentId);
  if (!student) return;

  const hasAchievements = data.achievements.length > 0;

  if (!hasAchievements) {
    showModal(`
      <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">Нет медалей</h2>
      <p class="text-gray-600 dark:text-gray-300 mb-5">Сначала добавьте медали в разделе «Медали».</p>
      <div class="flex justify-end">
        <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">Закрыть</button>
      </div>
    `);
    document.getElementById('modal-cancel')?.addEventListener('click', closeModal);
    return;
  }

  const today = new Date().toISOString().slice(0, 10);

  const categoriesHtml = data.categories.map(cat => {
    const catAchs = data.achievements.filter(a => a.categoryId === cat.id);
    if (catAchs.length === 0) return '';
    return `
      <div class="mb-4">
        <h3 class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
          ${escHtml(cat.name)}
        </h3>
        <div class="grid grid-cols-4 gap-2">
          ${catAchs.map(ach => `
            <button type="button"
              class="medal-pick-btn relative group flex flex-col items-center p-2 rounded-xl
                     border-2 border-transparent hover:border-indigo-400
                     hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all text-center"
              data-id="${ach.id}">
              <img src="${escHtml(ach.imageUrl)}" alt=""
                class="w-12 h-12 object-contain mb-1 pointer-events-none"
                onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><text y=%2228%22 font-size=%2228%22>🏅</text></svg>'" />
              <span class="text-xs text-gray-700 dark:text-gray-300 leading-tight pointer-events-none line-clamp-2">
                ${escHtml(ach.name)}
              </span>
              ${ach.description ? `
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1.5
                            bg-gray-900 text-white text-xs rounded-lg w-36 text-center
                            hidden group-hover:block z-20 pointer-events-none shadow-lg">
                  ${escHtml(ach.description)}
                  <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              ` : ''}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  showModal(`
    <h2 class="text-xl font-bold mb-0.5 text-gray-800 dark:text-gray-100">Выдать медаль</h2>
    <p class="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-4">${escHtml(student.name)}</p>

    <div class="mb-3">${categoriesHtml}</div>

    <div id="assign-selected" class="hidden mb-3 px-3 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/40
         flex items-center gap-3 border border-indigo-200 dark:border-indigo-700">
      <img id="assign-sel-img" src="" alt="" class="w-9 h-9 object-contain rounded flex-shrink-0" />
      <span id="assign-sel-name" class="text-sm font-semibold text-indigo-800 dark:text-indigo-200"></span>
    </div>

    <div id="modal-assign-err"
         class="hidden mb-3 px-3 py-2 rounded-lg text-sm bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300">
      Выберите медаль
    </div>

    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Дата выдачи</label>
    <input id="modal-ach-date" type="date" value="${today}"
      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-5
             bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
             focus:outline-none focus:ring-2 focus:ring-indigo-400" />

    <div class="flex gap-3 justify-end">
      <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100
        dark:hover:bg-gray-700 dark:text-gray-200 transition">Отмена</button>
      <button id="modal-assign-save" class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
        Выдать
      </button>
    </div>
  `);

  let selectedId = '';

  document.querySelectorAll('.medal-pick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedId = (btn as HTMLElement).dataset.id!;
      const ach = loadData().achievements.find(a => a.id === selectedId);

      document.querySelectorAll('.medal-pick-btn').forEach(b => {
        b.classList.remove('border-indigo-500', 'bg-indigo-50', 'dark:bg-indigo-900/30');
        b.classList.add('border-transparent');
      });
      btn.classList.remove('border-transparent');
      btn.classList.add('border-indigo-500', 'bg-indigo-50');

      if (ach) {
        (document.getElementById('assign-sel-img') as HTMLImageElement).src = ach.imageUrl;
        document.getElementById('assign-sel-name')!.textContent = ach.name;
        document.getElementById('assign-selected')!.classList.remove('hidden');
      }
      document.getElementById('modal-assign-err')!.classList.add('hidden');
    });
  });

  document.getElementById('modal-cancel')?.addEventListener('click', closeModal);

  document.getElementById('modal-assign-save')?.addEventListener('click', () => {
    if (!selectedId) {
      document.getElementById('modal-assign-err')!.classList.remove('hidden');
      return;
    }
    const grantedAt = (document.getElementById('modal-ach-date') as HTMLInputElement).value;
    const d = loadData();
    d.studentAchievements.push({ id: uid(), studentId, achievementId: selectedId, grantedAt });
    saveData(d);
    closeModal();
    onGranted();
  });
}

function escHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
