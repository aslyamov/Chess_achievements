import { loadData, saveData, uid } from '../storage';
import { showModal, closeModal } from '../modal';

const PRESET_MEDALS = [
  { url: 'img/medal-gold-1.svg',   label: 'Золото — стиль 1' },
  { url: 'img/medal-gold-2.svg',   label: 'Золото — стиль 2' },
  { url: 'img/medal-silver-1.svg', label: 'Серебро — стиль 1' },
  { url: 'img/medal-silver-2.svg', label: 'Серебро — стиль 2' },
  { url: 'img/medal-bronze-1.svg', label: 'Бронза — стиль 1' },
  { url: 'img/medal-bronze-2.svg', label: 'Бронза — стиль 2' },
];

export function renderAchievements(): void {
  const app = document.getElementById('app')!;
  const data = loadData();

  app.innerHTML = `
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Медали</h1>
      <button id="btn-add-category"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition text-sm">
        + Добавить категорию
      </button>
    </div>

    ${data.categories.length === 0 ? `
      <div class="text-center py-20 text-gray-400 dark:text-gray-500">
        <div class="text-5xl mb-4">🏆</div>
        <p class="text-lg">Пока нет категорий. Создайте первую!</p>
      </div>
    ` : data.categories.map(cat => {
      const catAchievements = data.achievements.filter(a => a.categoryId === cat.id);
      return `
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow mb-5 overflow-hidden">
          <div class="flex items-center justify-between px-5 py-4 bg-indigo-50 dark:bg-indigo-900/40 border-b border-indigo-100 dark:border-indigo-800">
            <h2 class="font-semibold text-indigo-800 dark:text-indigo-200 text-lg">${escHtml(cat.name)}</h2>
            <div class="flex gap-2">
              <button class="btn-add-achievement bg-indigo-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-indigo-700 transition" data-cat="${cat.id}">
                + Медаль
              </button>
              <button class="btn-delete-category text-red-400 hover:text-red-600 text-xl transition" data-id="${cat.id}" title="Удалить категорию">✕</button>
            </div>
          </div>

          ${catAchievements.length === 0 ? `
            <div class="px-5 py-6 text-gray-400 dark:text-gray-500 text-sm">В категории пока нет медалей.</div>
          ` : `
            <div class="divide-y divide-gray-100 dark:divide-gray-700">
              ${catAchievements.map(ach => `
                <div class="flex items-center gap-4 px-5 py-3">
                  <img src="${escHtml(ach.imageUrl)}" alt=""
                    class="w-12 h-12 object-cover rounded-lg bg-gray-100 dark:bg-gray-700 flex-shrink-0"
                    onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><text y=%2228%22 font-size=%2228%22>🏅</text></svg>'" />
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-gray-800 dark:text-gray-100">${escHtml(ach.name)}</div>
                    ${ach.description ? `<div class="text-sm text-gray-500 dark:text-gray-400 truncate">${escHtml(ach.description)}</div>` : ''}
                  </div>
                  <button class="btn-delete-achievement text-red-400 hover:text-red-600 text-xl transition flex-shrink-0" data-id="${ach.id}" title="Удалить медаль">✕</button>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `;
    }).join('')}
  `;

  // Add category
  document.getElementById('btn-add-category')?.addEventListener('click', () => {
    showModal(`
      <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Новая категория</h2>
      <input id="modal-cat-name" type="text" placeholder="Название категории"
        class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-4
               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
               focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      <div class="flex gap-3 justify-end">
        <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">Отмена</button>
        <button id="modal-save" class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">Добавить</button>
      </div>
    `);
    document.getElementById('modal-cancel')?.addEventListener('click', closeModal);
    const inp = document.getElementById('modal-cat-name') as HTMLInputElement;
    inp.focus();
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') save(); });
    document.getElementById('modal-save')?.addEventListener('click', save);
    function save() {
      const name = inp.value.trim();
      if (!name) { inp.classList.add('border-red-400'); return; }
      const d = loadData();
      d.categories.push({ id: uid(), name });
      saveData(d);
      closeModal();
      renderAchievements();
    }
  });

  // Delete category
  app.querySelectorAll('.btn-delete-category').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.id!;
      const d = loadData();
      const cat = d.categories.find(c => c.id === id);
      if (!cat) return;
      const achCount = d.achievements.filter(a => a.categoryId === id).length;
      showModal(`
        <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">Удалить категорию?</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-2">«${escHtml(cat.name)}»</p>
        ${achCount > 0 ? `<p class="text-red-500 dark:text-red-400 text-sm mb-4">Будет удалено ${achCount} медалей и все выданные награды этой категории.</p>` : '<p class="mb-4"></p>'}
        <div class="flex gap-3 justify-end">
          <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">Отмена</button>
          <button id="modal-confirm" class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">Удалить</button>
        </div>
      `);
      document.getElementById('modal-cancel')?.addEventListener('click', closeModal);
      document.getElementById('modal-confirm')?.addEventListener('click', () => {
        const d2 = loadData();
        const achIds = d2.achievements.filter(a => a.categoryId === id).map(a => a.id);
        d2.categories = d2.categories.filter(c => c.id !== id);
        d2.achievements = d2.achievements.filter(a => a.categoryId !== id);
        d2.studentAchievements = d2.studentAchievements.filter(sa => !achIds.includes(sa.achievementId));
        saveData(d2);
        closeModal();
        renderAchievements();
      });
    });
  });

  // Add achievement
  app.querySelectorAll('.btn-add-achievement').forEach(btn => {
    btn.addEventListener('click', () => {
      const catId = (btn as HTMLElement).dataset.cat!;
      showModal(`
        <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Новая медаль</h2>
        <input id="modal-ach-name" type="text" placeholder="Название медали"
          class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-3
                 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
                 focus:outline-none focus:ring-2 focus:ring-indigo-400" />

        <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Готовые изображения</p>
        <div class="flex gap-2 flex-wrap mb-3">
          ${PRESET_MEDALS.map(p => `
            <button type="button" class="preset-btn p-1 rounded-lg border-2 border-transparent
              hover:border-indigo-400 dark:hover:border-indigo-500 transition bg-gray-50 dark:bg-gray-700"
              data-url="${p.url}" title="${p.label}">
              <img src="${p.url}" class="w-10 h-10 object-contain" alt="${p.label}" />
            </button>
          `).join('')}
        </div>

        <div class="flex items-center gap-3 mb-3">
          <div id="modal-img-preview" class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center text-gray-300 text-xl overflow-hidden">
            🖼
          </div>
          <input id="modal-ach-img" type="text" placeholder="URL картинки (или выберите выше)"
            class="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2
                   bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
                   focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>

        <textarea id="modal-ach-desc" placeholder="Описание (необязательно)" rows="2"
          class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-4
                 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
                 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"></textarea>
        <div class="flex gap-3 justify-end">
          <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">Отмена</button>
          <button id="modal-save" class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">Добавить</button>
        </div>
      `);
      document.getElementById('modal-cancel')?.addEventListener('click', closeModal);
      const nameInp = document.getElementById('modal-ach-name') as HTMLInputElement;
      const imgInp  = document.getElementById('modal-ach-img')  as HTMLInputElement;
      const descInp = document.getElementById('modal-ach-desc') as HTMLTextAreaElement;
      const previewEl = document.getElementById('modal-img-preview')!;

      function updatePreview(url: string) {
        if (url) {
          previewEl.innerHTML = `<img src="${url}" class="w-full h-full object-contain rounded-lg" onerror="this.parentElement.innerHTML='🖼'" />`;
        } else {
          previewEl.innerHTML = '🖼';
        }
      }

      imgInp.addEventListener('input', () => updatePreview(imgInp.value.trim()));

      document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const url = (btn as HTMLElement).dataset.url!;
          imgInp.value = url;
          updatePreview(url);
          imgInp.classList.remove('border-red-400');
          document.querySelectorAll('.preset-btn').forEach(b =>
            b.classList.toggle('border-indigo-500', b === btn)
          );
        });
      });

      nameInp.focus();
      document.getElementById('modal-save')?.addEventListener('click', () => {
        const name = nameInp.value.trim();
        const imageUrl = imgInp.value.trim();
        if (!name) { nameInp.classList.add('border-red-400'); return; }
        if (!imageUrl) { imgInp.classList.add('border-red-400'); return; }
        const d = loadData();
        d.achievements.push({ id: uid(), categoryId: catId, name, description: descInp.value.trim(), imageUrl });
        saveData(d);
        closeModal();
        renderAchievements();
      });
    });
  });

  // Delete achievement
  app.querySelectorAll('.btn-delete-achievement').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.id!;
      const d = loadData();
      const ach = d.achievements.find(a => a.id === id);
      if (!ach) return;
      const grantedCount = d.studentAchievements.filter(sa => sa.achievementId === id).length;
      showModal(`
        <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">Удалить медаль?</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-2">«${escHtml(ach.name)}»</p>
        ${grantedCount > 0 ? `<p class="text-red-500 dark:text-red-400 text-sm mb-4">Эта медаль выдана ${grantedCount} раз — все записи будут удалены.</p>` : '<p class="mb-4"></p>'}
        <div class="flex gap-3 justify-end">
          <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">Отмена</button>
          <button id="modal-confirm" class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">Удалить</button>
        </div>
      `);
      document.getElementById('modal-cancel')?.addEventListener('click', closeModal);
      document.getElementById('modal-confirm')?.addEventListener('click', () => {
        const d2 = loadData();
        d2.achievements = d2.achievements.filter(a => a.id !== id);
        d2.studentAchievements = d2.studentAchievements.filter(sa => sa.achievementId !== id);
        saveData(d2);
        closeModal();
        renderAchievements();
      });
    });
  });
}

function escHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
