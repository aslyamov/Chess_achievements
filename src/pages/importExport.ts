import { exportJSON, importJSON, loadData } from '../storage';

export function renderImportExport(): void {
  const app = document.getElementById('app')!;
  const data = loadData();

  const stats = {
    students: data.students.length,
    categories: data.categories.length,
    achievements: data.achievements.length,
    records: data.studentAchievements.length,
  };

  app.innerHTML = `
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Импорт / Экспорт</h1>

    <div class="grid gap-6 sm:grid-cols-2 max-w-2xl">

      <!-- Export -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">Экспорт данных</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Сохранить все данные в JSON-файл</p>

        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <div class="flex justify-between"><span>Учеников:</span><span class="font-medium">${stats.students}</span></div>
          <div class="flex justify-between"><span>Категорий:</span><span class="font-medium">${stats.categories}</span></div>
          <div class="flex justify-between"><span>Медалей:</span><span class="font-medium">${stats.achievements}</span></div>
          <div class="flex justify-between"><span>Выданных наград:</span><span class="font-medium">${stats.records}</span></div>
        </div>

        <button id="btn-export"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition">
          ↓ Скачать JSON
        </button>
      </div>

      <!-- Import -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">Импорт данных</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Загрузить данные из JSON-файла</p>

        <div class="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 mb-4 text-sm text-yellow-800 dark:text-yellow-200">
          ⚠ Импорт <strong>заменит</strong> все текущие данные
        </div>

        <label class="block mb-3">
          <span class="sr-only">Выберите файл</span>
          <input id="inp-import" type="file" accept=".json"
            class="block w-full text-sm text-gray-500 dark:text-gray-400
              file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium
              file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100
              dark:file:bg-indigo-900/40 dark:file:text-indigo-300 cursor-pointer" />
        </label>

        <div id="import-msg" class="mb-3 hidden"></div>

        <button id="btn-import"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition">
          ↑ Импортировать
        </button>
      </div>

    </div>
  `;

  document.getElementById('btn-export')?.addEventListener('click', exportJSON);

  document.getElementById('btn-import')?.addEventListener('click', () => {
    const fileInput = document.getElementById('inp-import') as HTMLInputElement;
    const msgEl = document.getElementById('import-msg')!;
    const file = fileInput.files?.[0];
    if (!file) {
      showMsg(msgEl, 'Выберите файл', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importJSON(reader.result as string);
        showMsg(msgEl, '✓ Данные успешно импортированы', 'success');
        fileInput.value = '';
        setTimeout(() => renderImportExport(), 1200);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Неизвестная ошибка';
        showMsg(msgEl, `Ошибка: ${msg}`, 'error');
      }
    };
    reader.readAsText(file);
  });
}

function showMsg(el: HTMLElement, text: string, type: 'success' | 'error') {
  el.className = `mb-3 px-4 py-2 rounded-lg text-sm font-medium ${
    type === 'success'
      ? 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300'
      : 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300'
  }`;
  el.textContent = text;
  el.classList.remove('hidden');
}
