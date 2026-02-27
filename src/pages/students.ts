import { loadData, saveData, uid, getStudentView, setStudentView } from '../storage';
import { navigate } from '../router';
import { showModal, closeModal } from '../modal';
import { openAssignModal } from '../assignModal';

export function renderStudents(): void {
  const app = document.getElementById('app')!;
  const data = loadData();
  const view = getStudentView();

  app.innerHTML = `
    <div class="flex items-center justify-between mb-6 gap-3 flex-wrap">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Ученики</h1>
      <div class="flex items-center gap-2">
        <!-- View toggle -->
        <div class="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-0.5 gap-0.5">
          <button id="btn-view-cards" title="Карточки"
            class="px-3 py-1.5 rounded-md text-sm font-medium transition
              ${view === 'cards' ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}">
            ▦
          </button>
          <button id="btn-view-table" title="Таблица"
            class="px-3 py-1.5 rounded-md text-sm font-medium transition
              ${view === 'table' ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}">
            ☰
          </button>
        </div>
        <button id="btn-add-student"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition text-sm">
          + Добавить ученика
        </button>
      </div>
    </div>

    ${data.students.length === 0 ? `
      <div class="text-center py-20 text-gray-400 dark:text-gray-500">
        <div class="text-5xl mb-4">♟</div>
        <p class="text-lg">Пока нет учеников. Добавьте первого!</p>
      </div>
    ` : view === 'cards' ? renderCards(data) : renderTable(data)}
  `;

  // View toggle handlers
  document.getElementById('btn-view-cards')?.addEventListener('click', () => {
    setStudentView('cards'); renderStudents();
  });
  document.getElementById('btn-view-table')?.addEventListener('click', () => {
    setStudentView('table'); renderStudents();
  });

  // Add student
  document.getElementById('btn-add-student')?.addEventListener('click', () => {
    showModal(`
      <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Новый ученик</h2>
      <input id="modal-student-name" type="text" placeholder="Имя ученика"
        class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-4
               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
               focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      <div class="flex gap-3 justify-end">
        <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">Отмена</button>
        <button id="modal-save" class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">Добавить</button>
      </div>
    `);
    document.getElementById('modal-cancel')?.addEventListener('click', closeModal);
    const nameInput = document.getElementById('modal-student-name') as HTMLInputElement;
    nameInput.focus();
    nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') saveStudent(); });
    document.getElementById('modal-save')?.addEventListener('click', saveStudent);
    function saveStudent() {
      const name = nameInput.value.trim();
      if (!name) { nameInput.classList.add('border-red-400'); return; }
      const d = loadData();
      d.students.push({ id: uid(), name, createdAt: new Date().toISOString() });
      saveData(d);
      closeModal();
      renderStudents();
    }
  });

  // Delete student buttons
  app.querySelectorAll('.btn-delete-student').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = (btn as HTMLElement).dataset.id!;
      const d = loadData();
      const student = d.students.find(s => s.id === id);
      if (!student) return;
      showModal(`
        <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">Удалить ученика?</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-5">«${escHtml(student.name)}» и все его медали будут удалены.</p>
        <div class="flex gap-3 justify-end">
          <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">Отмена</button>
          <button id="modal-confirm" class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">Удалить</button>
        </div>
      `);
      document.getElementById('modal-cancel')?.addEventListener('click', closeModal);
      document.getElementById('modal-confirm')?.addEventListener('click', () => {
        const d2 = loadData();
        d2.students = d2.students.filter(s => s.id !== id);
        d2.studentAchievements = d2.studentAchievements.filter(sa => sa.studentId !== id);
        saveData(d2);
        closeModal();
        renderStudents();
      });
    });
  });

  // Profile navigation
  app.querySelectorAll('.btn-open-profile').forEach(btn => {
    btn.addEventListener('click', () => {
      navigate(`/profile/${(btn as HTMLElement).dataset.id}`);
    });
  });

  // Quick assign buttons
  app.querySelectorAll('.btn-assign').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const studentId = (btn as HTMLElement).dataset.id!;
      openAssignModal(studentId, () => renderStudents());
    });
  });
}

function renderCards(data: ReturnType<typeof loadData>): string {
  return `
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      ${data.students.map(s => {
        const count = data.studentAchievements.filter(sa => sa.studentId === s.id).length;
        return `
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex flex-col gap-3 hover:shadow-md transition">
            <div class="flex items-center justify-between">
              <button class="btn-open-profile font-semibold text-lg text-gray-800 dark:text-gray-100 text-left hover:text-indigo-600 dark:hover:text-indigo-400 transition" data-id="${s.id}">
                ${escHtml(s.name)}
              </button>
              <div class="flex items-center gap-1">
                <button class="btn-assign text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition text-xl" data-id="${s.id}" title="Выдать медаль">🏆</button>
                <button class="btn-delete-student text-red-400 hover:text-red-600 transition text-xl" data-id="${s.id}" title="Удалить">✕</button>
              </div>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              Медалей: <span class="font-medium text-indigo-600 dark:text-indigo-400">${count}</span>
            </div>
            <div class="text-xs text-gray-400 dark:text-gray-500">${formatDate(s.createdAt)}</div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderTable(data: ReturnType<typeof loadData>): string {
  return `
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <th class="text-left px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">Имя</th>
            <th class="text-center px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Медалей</th>
            <th class="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300 hidden sm:table-cell">Добавлен</th>
            <th class="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
          ${data.students.map(s => {
            const count = data.studentAchievements.filter(sa => sa.studentId === s.id).length;
            return `
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                <td class="px-5 py-3">
                  <button class="btn-open-profile font-medium text-gray-800 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-left" data-id="${s.id}">
                    ${escHtml(s.name)}
                  </button>
                </td>
                <td class="px-4 py-3 text-center">
                  <span class="font-semibold text-indigo-600 dark:text-indigo-400">${count}</span>
                </td>
                <td class="px-4 py-3 text-gray-400 dark:text-gray-500 hidden sm:table-cell">${formatDate(s.createdAt)}</td>
                <td class="px-4 py-3">
                  <div class="flex items-center justify-end gap-2">
                    <button class="btn-assign text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition text-lg" data-id="${s.id}" title="Выдать медаль">🏆</button>
                    <button class="btn-delete-student text-red-400 hover:text-red-600 transition text-lg" data-id="${s.id}" title="Удалить">✕</button>
                  </div>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function escHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU');
}
