import { loadData, saveData, uid } from '../storage';
import { showModal, closeModal } from '../modal';
import type { Achievement, AchievementCategory } from '../types';

const ICON_COLORS = [
  { hex: '#f59e0b', label: 'Золото' },
  { hex: '#94a3b8', label: 'Серебро' },
  { hex: '#b45309', label: 'Бронза' },
  { hex: '#3b82f6', label: 'Синий' },
  { hex: '#ef4444', label: 'Красный' },
  { hex: '#22c55e', label: 'Зелёный' },
  { hex: '#a855f7', label: 'Фиолетовый' },
  { hex: '#475569', label: 'Тёмный' },
];

const ICON_LIBRARY = [
  { name: 'trophy',              label: 'Кубок' },
  { name: 'trophy-cup',          label: 'Кубок 2' },
  { name: 'laurel-crown',        label: 'Лавровый венок' },
  { name: 'crown',               label: 'Корона' },
  { name: 'medal',               label: 'Медаль' },
  { name: 'podium',              label: 'Пьедестал' },
  { name: 'rank-1',              label: '1 место' },
  { name: 'rank-2',              label: '2 место' },
  { name: 'rank-3',              label: '3 место' },
  { name: 'gold-bar',            label: 'Слиток' },
  { name: 'diamond-trophy',      label: 'Брилл. кубок' },
  { name: 'open-treasure-chest', label: 'Сундук' },
  { name: 'round-star',          label: 'Звезда' },
  { name: 'falling-star',        label: 'Падающая звезда' },
  { name: 'star-formation',      label: 'Созвездие' },
  { name: 'star-medal',          label: 'Медаль-звезда' },
  { name: 'sparkles',            label: 'Искры' },
  { name: 'chess-queen',         label: 'Ферзь' },
  { name: 'chess-king',          label: 'Король' },
  { name: 'chess-knight',        label: 'Конь' },
  { name: 'chess-rook',          label: 'Ладья' },
  { name: 'chess-bishop',        label: 'Слон' },
  { name: 'chess-pawn',          label: 'Пешка' },
  { name: 'graduate-cap',        label: 'Акад. шапка' },
  { name: 'diploma',             label: 'Диплом' },
  { name: 'open-book',           label: 'Книга' },
  { name: 'brain',               label: 'Мозг' },
  { name: 'idea',                label: 'Идея' },
  { name: 'upgrade',             label: 'Прогресс' },
  { name: 'level-end-flag',      label: 'Уровень вверх' },
  { name: 'lightning-trio',      label: 'Молния' },
  { name: 'fire',                label: 'Огонь' },
  { name: 'rocket',              label: 'Ракета' },
  { name: 'fist',                label: 'Кулак' },
  { name: 'thunder-struck',      label: 'Гром' },
  { name: 'sprint',              label: 'Спринт' },
  { name: 'muscle-fat',          label: 'Мышцы' },
  { name: 'sonic-lightning',     label: 'Вспышка' },
  { name: 'shield',              label: 'Щит' },
  { name: 'cross-shield',        label: 'Щит герб' },
  { name: 'roman-shield',        label: 'Башенный щит' },
  { name: 'shining-sword',       label: 'Меч' },
  { name: 'crossed-swords',      label: 'Мечи скрещ.' },
  { name: 'warhammer',           label: 'Молот войны' },
  { name: 'castle',              label: 'Замок' },
  { name: 'locked-fortress',     label: 'Крепость' },
  { name: 'watchtower',          label: 'Башня' },
  { name: 'spartan-helmet',      label: 'Шлем рыцаря' },
  { name: 'lotus',               label: 'Лотос' },
  { name: 'sunflower',           label: 'Подсолнух' },
  { name: 'butterfly',           label: 'Бабочка' },
  { name: 'clover',              label: 'Клевер' },
  { name: 'pine-tree',           label: 'Ель' },
  { name: 'oak-leaf',            label: 'Дубовый лист' },
  { name: 'dragon-breath',       label: 'Дракон' },
  { name: 'dragon-head',         label: 'Голова дракона' },
  { name: 'eagle-emblem',        label: 'Орёл' },
  { name: 'lion',                label: 'Лев' },
  { name: 'double-dragon',       label: 'Двойной дракон' },
  { name: 'wolf-head',           label: 'Волк' },
  { name: 'bear-head',           label: 'Медведь' },
  { name: 'unicorn',             label: 'Единорог' },
  { name: 'dragon-spiral',       label: 'Феникс' },
  { name: 'shark-fin',           label: 'Акула' },
  { name: 'owl',                 label: 'Сова' },
  { name: 'sun',                 label: 'Солнце' },
  { name: 'moon',                label: 'Луна' },
  { name: 'ringed-planet',       label: 'Планета' },
  { name: 'comet-spark',         label: 'Комета' },
  { name: 'ufo',                 label: 'НЛО' },
  { name: 'flag-objective',      label: 'Цель' },
  { name: 'compass',             label: 'Компас' },
  { name: 'corner-flag',         label: 'Флаг' },
  { name: 'gems',                label: 'Кристалл' },
  { name: 'infinity',            label: 'Бесконечность' },
  { name: 'eye-of-horus',        label: 'Глаз Гора' },
  { name: 'ankh',                label: 'Анкх' },
  { name: 'yin-yang',            label: 'Инь-янь' },
  { name: 'triquetra',           label: 'Трикветр' },
  { name: 'magic-swirl',         label: 'Магия' },
];

function iconifyUrl(name: string, color: string): string {
  return `https://api.iconify.design/game-icons/${name}.svg?color=${encodeURIComponent(color)}`;
}

function buildMedalModalHtml(title: string, prefill: Partial<Achievement> = {}): string {
  const defaultColor = ICON_COLORS[0].hex;
  const previewHtml = prefill.imageUrl
    ? `<img src="${escHtml(prefill.imageUrl)}" class="w-full h-full object-contain rounded-lg" />`
    : '🖼';

  return `
    <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">${title}</h2>

    <input id="modal-ach-name" type="text" placeholder="Название медали" value="${escHtml(prefill.name ?? '')}"
      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-3
             bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
             focus:outline-none focus:ring-2 focus:ring-indigo-400" />

    <div class="flex items-center gap-2 mb-2">
      <div id="modal-img-preview" class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex-shrink-0
        flex items-center justify-center text-xl overflow-hidden">${previewHtml}</div>
      <input id="modal-ach-img" type="text" placeholder="URL картинки"
        value="${escHtml(prefill.imageUrl ?? '')}"
        class="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2
               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
               focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      <button id="btn-library-toggle" type="button" title="Библиотека иконок"
        class="flex-shrink-0 w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600
               bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/40
               hover:border-indigo-400 transition flex items-center justify-center text-lg">
        🎨
      </button>
    </div>

    <div id="icon-library" class="hidden mb-3 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
      <div class="flex items-center gap-1.5 mb-2 flex-wrap">
        <span class="text-xs text-gray-500 dark:text-gray-400 mr-1">Цвет:</span>
        ${ICON_COLORS.map((c, i) => `
          <button type="button" class="color-btn w-6 h-6 rounded-full border-2 transition
            ${i === 0 ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-gray-300 dark:border-gray-600'}"
            style="background:${c.hex}" data-hex="${c.hex}" title="${c.label}"></button>
        `).join('')}
      </div>
      <input id="icon-search" type="text" placeholder="Поиск иконки..."
        class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 mb-2 text-sm
               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
               focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      <div id="icon-grid" class="grid grid-cols-9 gap-0.5 max-h-44 overflow-y-auto">
        ${ICON_LIBRARY.map(icon => `
          <button type="button" class="icon-btn flex flex-col items-center p-1 rounded-lg border border-transparent
            hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition"
            data-name="${icon.name}" title="${icon.label}">
            <img src="${iconifyUrl(icon.name, defaultColor)}"
              class="w-7 h-7 object-contain pointer-events-none" alt="${icon.label}" />
          </button>
        `).join('')}
      </div>
    </div>

    <textarea id="modal-ach-desc" placeholder="Описание (необязательно)" rows="2"
      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-4
             bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
             focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none">${escHtml(prefill.description ?? '')}</textarea>

    <div class="flex gap-3 justify-end">
      <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100
        dark:hover:bg-gray-700 dark:text-gray-200 transition">Отмена</button>
      <button id="modal-save" class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
        ${prefill.name ? 'Сохранить' : 'Добавить'}
      </button>
    </div>
  `;
}

function setupMedalModalHandlers(onSave: (name: string, imageUrl: string, description: string) => void): void {
  document.getElementById('modal-cancel')?.addEventListener('click', closeModal);

  const nameInp   = document.getElementById('modal-ach-name') as HTMLInputElement;
  const imgInp    = document.getElementById('modal-ach-img')  as HTMLInputElement;
  const descInp   = document.getElementById('modal-ach-desc') as HTMLTextAreaElement;
  const previewEl = document.getElementById('modal-img-preview')!;

  let selectedColor = ICON_COLORS[0].hex;

  function updatePreview(url: string) {
    previewEl.innerHTML = url
      ? `<img src="${url}" class="w-full h-full object-contain rounded-lg" onerror="this.parentElement.innerHTML='🖼'" />`
      : '🖼';
  }

  imgInp.addEventListener('input', () => updatePreview(imgInp.value.trim()));

  document.getElementById('btn-library-toggle')?.addEventListener('click', () => {
    document.getElementById('icon-library')!.classList.toggle('hidden');
  });

  document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedColor = (btn as HTMLElement).dataset.hex!;
      document.querySelectorAll('.color-btn').forEach(b => {
        b.classList.remove('border-indigo-500', 'ring-1', 'ring-indigo-500');
        b.classList.add('border-gray-300');
      });
      btn.classList.add('border-indigo-500', 'ring-1', 'ring-indigo-500');
      btn.classList.remove('border-gray-300');
      document.querySelectorAll<HTMLImageElement>('.icon-btn img').forEach(img => {
        const name = (img.closest('.icon-btn') as HTMLElement).dataset.name!;
        img.src = iconifyUrl(name, selectedColor);
      });
    });
  });

  document.getElementById('icon-search')?.addEventListener('input', e => {
    const q = (e.target as HTMLInputElement).value.toLowerCase();
    document.querySelectorAll('.icon-btn').forEach(btn => {
      const el = btn as HTMLElement;
      const match = el.title.toLowerCase().includes(q) || el.dataset.name!.includes(q);
      el.style.display = match ? '' : 'none';
    });
  });

  document.querySelectorAll('.icon-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = (btn as HTMLElement).dataset.name!;
      const url = iconifyUrl(name, selectedColor);
      imgInp.value = url;
      updatePreview(url);
      imgInp.classList.remove('border-red-400');
      document.querySelectorAll('.icon-btn').forEach(b =>
        b.classList.remove('border-indigo-400', 'bg-indigo-50')
      );
      btn.classList.add('border-indigo-400', 'bg-indigo-50');
    });
  });

  nameInp.focus();
  document.getElementById('modal-save')?.addEventListener('click', () => {
    const name     = nameInp.value.trim();
    const imageUrl = imgInp.value.trim();
    if (!name)     { nameInp.classList.add('border-red-400'); return; }
    if (!imageUrl) { imgInp.classList.add('border-red-400');  return; }
    onSave(name, imageUrl, descInp.value.trim());
  });
}

function openCategoryModal(existing?: AchievementCategory): void {
  const isEdit = !!existing;
  showModal(`
    <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
      ${isEdit ? 'Редактировать категорию' : 'Новая категория'}
    </h2>
    <input id="modal-cat-name" type="text" placeholder="Название категории"
      value="${escHtml(existing?.name ?? '')}"
      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-4
             bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
             focus:outline-none focus:ring-2 focus:ring-indigo-400" />
    <div class="flex gap-3 justify-end">
      <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100
        dark:hover:bg-gray-700 dark:text-gray-200 transition">Отмена</button>
      <button id="modal-save" class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
        ${isEdit ? 'Сохранить' : 'Добавить'}
      </button>
    </div>
  `);
  document.getElementById('modal-cancel')?.addEventListener('click', closeModal);
  const inp = document.getElementById('modal-cat-name') as HTMLInputElement;
  inp.focus();
  if (existing) inp.select();
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') save(); });
  document.getElementById('modal-save')?.addEventListener('click', save);

  function save() {
    const name = inp.value.trim();
    if (!name) { inp.classList.add('border-red-400'); return; }
    const d = loadData();
    if (isEdit && existing) {
      const cat = d.categories.find(c => c.id === existing.id);
      if (cat) cat.name = name;
    } else {
      d.categories.push({ id: uid(), name });
    }
    saveData(d);
    closeModal();
    renderAchievements();
  }
}

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
          <div class="flex items-center justify-between px-5 py-4 bg-indigo-50 dark:bg-indigo-900/40
            border-b border-indigo-100 dark:border-indigo-800">
            <h2 class="font-semibold text-indigo-800 dark:text-indigo-200 text-lg">${escHtml(cat.name)}</h2>
            <div class="flex items-center gap-1">
              <button class="btn-add-achievement bg-indigo-600 text-white text-sm px-3 py-1 rounded-lg
                hover:bg-indigo-700 transition" data-cat="${cat.id}">+ Медаль</button>
              <button class="btn-edit-category p-1.5 rounded-lg text-gray-400 hover:text-indigo-600
                dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition"
                data-id="${cat.id}" title="Переименовать">✏️</button>
              <button class="btn-delete-category p-1.5 rounded-lg text-gray-400 hover:text-red-500
                hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                data-id="${cat.id}" title="Удалить категорию">🗑</button>
            </div>
          </div>
          ${catAchievements.length === 0 ? `
            <div class="px-5 py-6 text-gray-400 dark:text-gray-500 text-sm">В категории пока нет медалей.</div>
          ` : `
            <div class="divide-y divide-gray-100 dark:divide-gray-700">
              ${catAchievements.map((ach, idx) => `
                <div class="flex items-center gap-4 px-5 py-3">
                  <img src="${escHtml(ach.imageUrl)}" alt=""
                    class="w-12 h-12 object-contain rounded-lg bg-gray-100 dark:bg-gray-700 flex-shrink-0 p-1"
                    onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><text y=%2228%22 font-size=%2228%22>🏅</text></svg>'" />
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-gray-800 dark:text-gray-100">${escHtml(ach.name)}</div>
                    ${ach.description ? `<div class="text-sm text-gray-500 dark:text-gray-400 truncate">${escHtml(ach.description)}</div>` : ''}
                  </div>
                  <div class="flex items-center gap-1 flex-shrink-0">
                    <button class="btn-move-up p-1.5 rounded-lg transition
                      ${idx === 0 ? 'text-gray-200 dark:text-gray-700 cursor-default' : 'text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'}"
                      data-id="${ach.id}" data-cat="${cat.id}" title="Переместить вверх" ${idx === 0 ? 'disabled' : ''}>↑</button>
                    <button class="btn-move-down p-1.5 rounded-lg transition
                      ${idx === catAchievements.length - 1 ? 'text-gray-200 dark:text-gray-700 cursor-default' : 'text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'}"
                      data-id="${ach.id}" data-cat="${cat.id}" title="Переместить вниз" ${idx === catAchievements.length - 1 ? 'disabled' : ''}>↓</button>
                    <button class="btn-duplicate-achievement p-1.5 rounded-lg text-gray-400 hover:text-green-600
                      dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition"
                      data-id="${ach.id}" title="Дублировать">📋</button>
                    <button class="btn-edit-achievement p-1.5 rounded-lg text-gray-400 hover:text-indigo-600
                      dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition"
                      data-id="${ach.id}" title="Редактировать">✏️</button>
                    <button class="btn-delete-achievement p-1.5 rounded-lg text-gray-400 hover:text-red-500
                      hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                      data-id="${ach.id}" title="Удалить медаль">🗑</button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `;
    }).join('')}
  `;

  document.getElementById('btn-add-category')?.addEventListener('click', () => openCategoryModal());

  app.querySelectorAll('.btn-edit-category').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.id!;
      const cat = loadData().categories.find(c => c.id === id);
      if (cat) openCategoryModal(cat);
    });
  });

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
          <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100
            dark:hover:bg-gray-700 dark:text-gray-200 transition">Отмена</button>
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

  app.querySelectorAll('.btn-add-achievement').forEach(btn => {
    btn.addEventListener('click', () => {
      const catId = (btn as HTMLElement).dataset.cat!;
      showModal(buildMedalModalHtml('Новая медаль'));
      setupMedalModalHandlers((name, imageUrl, description) => {
        const d = loadData();
        d.achievements.push({ id: uid(), categoryId: catId, name, description, imageUrl });
        saveData(d);
        closeModal();
        renderAchievements();
      });
    });
  });

  app.querySelectorAll('.btn-edit-achievement').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.id!;
      const ach = loadData().achievements.find(a => a.id === id);
      if (!ach) return;
      showModal(buildMedalModalHtml('Редактировать медаль', ach));
      setupMedalModalHandlers((name, imageUrl, description) => {
        const d = loadData();
        const target = d.achievements.find(a => a.id === id);
        if (target) { target.name = name; target.imageUrl = imageUrl; target.description = description; }
        saveData(d);
        closeModal();
        renderAchievements();
      });
    });
  });

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
          <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100
            dark:hover:bg-gray-700 dark:text-gray-200 transition">Отмена</button>
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

  app.querySelectorAll('.btn-move-up').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.id!;
      const catId = (btn as HTMLElement).dataset.cat!;
      const d = loadData();
      const catItems = d.achievements.filter(a => a.categoryId === catId);
      const idx = catItems.findIndex(a => a.id === id);
      if (idx <= 0) return;
      const globalA = d.achievements.indexOf(catItems[idx]);
      const globalB = d.achievements.indexOf(catItems[idx - 1]);
      [d.achievements[globalA], d.achievements[globalB]] = [d.achievements[globalB], d.achievements[globalA]];
      saveData(d);
      renderAchievements();
    });
  });

  app.querySelectorAll('.btn-move-down').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.id!;
      const catId = (btn as HTMLElement).dataset.cat!;
      const d = loadData();
      const catItems = d.achievements.filter(a => a.categoryId === catId);
      const idx = catItems.findIndex(a => a.id === id);
      if (idx < 0 || idx >= catItems.length - 1) return;
      const globalA = d.achievements.indexOf(catItems[idx]);
      const globalB = d.achievements.indexOf(catItems[idx + 1]);
      [d.achievements[globalA], d.achievements[globalB]] = [d.achievements[globalB], d.achievements[globalA]];
      saveData(d);
      renderAchievements();
    });
  });

  app.querySelectorAll('.btn-duplicate-achievement').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.id!;
      const d = loadData();
      const ach = d.achievements.find(a => a.id === id);
      if (!ach) return;
      const copy = { ...ach, id: uid(), name: ach.name + ' (копия)' };
      const idx = d.achievements.indexOf(ach);
      d.achievements.splice(idx + 1, 0, copy);
      saveData(d);
      renderAchievements();
    });
  });
}

function escHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
