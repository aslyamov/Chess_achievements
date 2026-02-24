"use strict";(()=>{var O=[];function h(e,t){let n=[],a=new RegExp("^"+e.replace(/:([^/]+)/g,(r,d)=>(n.push(d),"([^/]+)"))+"/?$");O.push({pattern:a,keys:n,handler:t})}function f(e){window.location.hash=e}function R(){let t=(window.location.hash.slice(1)||"/").split("?")[0];for(let n of O){let a=t.match(n.pattern);if(a){let r={};n.keys.forEach((d,s)=>{r[d]=a[s+1]}),n.handler(r),Q(t);return}}}function Q(e){document.querySelectorAll(".nav-link").forEach(t=>{let n=t.getAttribute("href")?.slice(1)??"";t.classList.toggle("active",e.startsWith(n)&&n!=="/")})}function N(){window.addEventListener("hashchange",R),R()}var U="chess_achievements_data",q={students:[],categories:[],achievements:[],studentAchievements:[]};function g(){try{let e=localStorage.getItem(U);return e?JSON.parse(e):{...q}}catch{return{...q}}}function b(e){localStorage.setItem(U,JSON.stringify(e))}function C(){let e=g(),t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(t),a=document.createElement("a");a.href=n,a.download=`chess_achievements_${new Date().toISOString().slice(0,10)}.json`,a.click(),URL.revokeObjectURL(n)}function _(e){let t=JSON.parse(e);if(!Array.isArray(t.students)||!Array.isArray(t.categories)||!Array.isArray(t.achievements)||!Array.isArray(t.studentAchievements))throw new Error("\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0444\u0430\u0439\u043B\u0430");b(t)}function y(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}function B(){return localStorage.getItem("chess_theme")||"light"}function F(e){localStorage.setItem("chess_theme",e),e==="dark"?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}function J(){return localStorage.getItem("chess_student_view")||"cards"}function A(e){localStorage.setItem("chess_student_view",e)}var w=()=>document.getElementById("modal-overlay"),z=()=>document.getElementById("modal-box");function p(e){z().innerHTML=e,w().classList.remove("hidden"),w().classList.add("flex")}function m(){w().classList.add("hidden"),w().classList.remove("flex"),z().innerHTML=""}document.addEventListener("DOMContentLoaded",()=>{w().addEventListener("click",e=>{e.target===w()&&m()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&m()})});function k(){let e=document.getElementById("app"),t=g(),n=J();e.innerHTML=`
    <div class="flex items-center justify-between mb-6 gap-3 flex-wrap">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">\u0423\u0447\u0435\u043D\u0438\u043A\u0438</h1>
      <div class="flex items-center gap-2">
        <!-- View toggle -->
        <div class="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-0.5 gap-0.5">
          <button id="btn-view-cards" title="\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0438"
            class="px-3 py-1.5 rounded-md text-sm font-medium transition
              ${n==="cards"?"bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 shadow-sm":"text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}">
            \u25A6
          </button>
          <button id="btn-view-table" title="\u0422\u0430\u0431\u043B\u0438\u0446\u0430"
            class="px-3 py-1.5 rounded-md text-sm font-medium transition
              ${n==="table"?"bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 shadow-sm":"text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}">
            \u2630
          </button>
        </div>
        <button id="btn-add-student"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition text-sm">
          + \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0443\u0447\u0435\u043D\u0438\u043A\u0430
        </button>
      </div>
    </div>

    ${t.students.length===0?`
      <div class="text-center py-20 text-gray-400 dark:text-gray-500">
        <div class="text-5xl mb-4">\u265F</div>
        <p class="text-lg">\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0443\u0447\u0435\u043D\u0438\u043A\u043E\u0432. \u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043F\u0435\u0440\u0432\u043E\u0433\u043E!</p>
      </div>
    `:n==="cards"?Z(t):ee(t)}
  `,document.getElementById("btn-view-cards")?.addEventListener("click",()=>{A("cards"),k()}),document.getElementById("btn-view-table")?.addEventListener("click",()=>{A("table"),k()}),document.getElementById("btn-add-student")?.addEventListener("click",()=>{p(`
      <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">\u041D\u043E\u0432\u044B\u0439 \u0443\u0447\u0435\u043D\u0438\u043A</h2>
      <input id="modal-student-name" type="text" placeholder="\u0418\u043C\u044F \u0443\u0447\u0435\u043D\u0438\u043A\u0430"
        class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-4
               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
               focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      <div class="flex gap-3 justify-end">
        <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
        <button id="modal-save" class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>
      </div>
    `),document.getElementById("modal-cancel")?.addEventListener("click",m);let a=document.getElementById("modal-student-name");a.focus(),a.addEventListener("keydown",d=>{d.key==="Enter"&&r()}),document.getElementById("modal-save")?.addEventListener("click",r);function r(){let d=a.value.trim();if(!d){a.classList.add("border-red-400");return}let s=g();s.students.push({id:y(),name:d,createdAt:new Date().toISOString()}),b(s),m(),k()}}),e.querySelectorAll(".btn-delete-student").forEach(a=>{a.addEventListener("click",r=>{r.stopPropagation();let d=a.dataset.id,i=g().students.find(o=>o.id===d);i&&(p(`
        <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0443\u0447\u0435\u043D\u0438\u043A\u0430?</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-5">\xAB${E(i.name)}\xBB \u0438 \u0432\u0441\u0435 \u0435\u0433\u043E \u043C\u0435\u0434\u0430\u043B\u0438 \u0431\u0443\u0434\u0443\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u044B.</p>
        <div class="flex gap-3 justify-end">
          <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
          <button id="modal-confirm" class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>
        </div>
      `),document.getElementById("modal-cancel")?.addEventListener("click",m),document.getElementById("modal-confirm")?.addEventListener("click",()=>{let o=g();o.students=o.students.filter(l=>l.id!==d),o.studentAchievements=o.studentAchievements.filter(l=>l.studentId!==d),b(o),m(),k()}))})}),e.querySelectorAll(".btn-open-profile").forEach(a=>{a.addEventListener("click",()=>{f(`/profile/${a.dataset.id}`)})}),e.querySelectorAll(".btn-assign").forEach(a=>{a.addEventListener("click",r=>{r.stopPropagation();let d=a.dataset.id;X(d)})})}function X(e){let t=g(),n=t.students.find(s=>s.id===e);if(!n)return;let a=new Date().toISOString().slice(0,10),r=t.categories.map(s=>{let i=t.achievements.filter(o=>o.categoryId===s.id);return i.length===0?"":`<optgroup label="${E(s.name)}">
      ${i.map(o=>`<option value="${o.id}">${E(o.name)}</option>`).join("")}
    </optgroup>`}).join("");if(!r.trim()){p(`
      <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">\u041D\u0435\u0442 \u043C\u0435\u0434\u0430\u043B\u0435\u0439</h2>
      <p class="text-gray-600 dark:text-gray-300 mb-5">\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043C\u0435\u0434\u0430\u043B\u0438 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \xAB\u041C\u0435\u0434\u0430\u043B\u0438\xBB.</p>
      <div class="flex justify-end">
        <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">\u0417\u0430\u043A\u0440\u044B\u0442\u044C</button>
      </div>
    `),document.getElementById("modal-cancel")?.addEventListener("click",m);return}p(`
    <h2 class="text-xl font-bold mb-1 text-gray-800 dark:text-gray-100">\u0412\u044B\u0434\u0430\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C</h2>
    <p class="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-4">${E(n.name)}</p>

    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\u041C\u0435\u0434\u0430\u043B\u044C</label>
    <select id="modal-ach-sel"
      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-3
             bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
             focus:outline-none focus:ring-2 focus:ring-indigo-400">
      <option value="">\u2014 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0434\u0430\u043B\u044C \u2014</option>
      ${r}
    </select>

    <div id="modal-ach-preview" class="hidden mb-3">
      <div class="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/40 rounded-lg p-2">
        <img id="modal-preview-img" src="" alt="" class="w-10 h-10 object-cover rounded-lg bg-gray-200"
          onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><text y=%2228%22 font-size=%2228%22>\u{1F3C5}</text></svg>'" />
        <span id="modal-preview-name" class="text-sm font-medium text-indigo-800 dark:text-indigo-200"></span>
      </div>
    </div>

    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\u0414\u0430\u0442\u0430</label>
    <input id="modal-ach-date" type="date" value="${a}"
      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-5
             bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
             focus:outline-none focus:ring-2 focus:ring-indigo-400" />

    <div id="modal-assign-msg" class="mb-3 hidden"></div>

    <div class="flex gap-3 justify-end">
      <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
      <button id="modal-assign-save" class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">\u0412\u044B\u0434\u0430\u0442\u044C</button>
    </div>
  `),document.getElementById("modal-cancel")?.addEventListener("click",m);let d=document.getElementById("modal-ach-sel");d.addEventListener("change",()=>{let s=d.value,i=document.getElementById("modal-ach-preview");if(!s){i.classList.add("hidden");return}let l=g().achievements.find(v=>v.id===s);l&&(document.getElementById("modal-preview-img").src=l.imageUrl,document.getElementById("modal-preview-name").textContent=l.name,i.classList.remove("hidden"))}),document.getElementById("modal-assign-save")?.addEventListener("click",()=>{let s=d.value,i=document.getElementById("modal-ach-date").value,o=document.getElementById("modal-assign-msg");if(!s){o.className="mb-3 px-3 py-2 rounded-lg text-sm bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300",o.textContent="\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0434\u0430\u043B\u044C",o.classList.remove("hidden");return}let l=g();l.studentAchievements.push({id:y(),studentId:e,achievementId:s,grantedAt:i}),b(l),m(),k()})}function Z(e){return`
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      ${e.students.map(t=>{let n=e.studentAchievements.filter(a=>a.studentId===t.id).length;return`
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex flex-col gap-3 hover:shadow-md transition">
            <div class="flex items-center justify-between">
              <button class="btn-open-profile font-semibold text-lg text-gray-800 dark:text-gray-100 text-left hover:text-indigo-600 dark:hover:text-indigo-400 transition" data-id="${t.id}">
                ${E(t.name)}
              </button>
              <div class="flex items-center gap-1">
                <button class="btn-assign text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition text-xl" data-id="${t.id}" title="\u0412\u044B\u0434\u0430\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C">\u{1F3C6}</button>
                <button class="btn-delete-student text-red-400 hover:text-red-600 transition text-xl" data-id="${t.id}" title="\u0423\u0434\u0430\u043B\u0438\u0442\u044C">\u2715</button>
              </div>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              \u041C\u0435\u0434\u0430\u043B\u0435\u0439: <span class="font-medium text-indigo-600 dark:text-indigo-400">${n}</span>
            </div>
            <div class="text-xs text-gray-400 dark:text-gray-500">${P(t.createdAt)}</div>
          </div>
        `}).join("")}
    </div>
  `}function ee(e){return`
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <th class="text-left px-5 py-3 font-semibold text-gray-600 dark:text-gray-300">\u0418\u043C\u044F</th>
            <th class="text-center px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">\u041C\u0435\u0434\u0430\u043B\u0435\u0439</th>
            <th class="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300 hidden sm:table-cell">\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D</th>
            <th class="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
          ${e.students.map(t=>{let n=e.studentAchievements.filter(a=>a.studentId===t.id).length;return`
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                <td class="px-5 py-3">
                  <button class="btn-open-profile font-medium text-gray-800 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-left" data-id="${t.id}">
                    ${E(t.name)}
                  </button>
                </td>
                <td class="px-4 py-3 text-center">
                  <span class="font-semibold text-indigo-600 dark:text-indigo-400">${n}</span>
                </td>
                <td class="px-4 py-3 text-gray-400 dark:text-gray-500 hidden sm:table-cell">${P(t.createdAt)}</td>
                <td class="px-4 py-3">
                  <div class="flex items-center justify-end gap-2">
                    <button class="btn-assign text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition text-lg" data-id="${t.id}" title="\u0412\u044B\u0434\u0430\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C">\u{1F3C6}</button>
                    <button class="btn-delete-student text-red-400 hover:text-red-600 transition text-lg" data-id="${t.id}" title="\u0423\u0434\u0430\u043B\u0438\u0442\u044C">\u2715</button>
                  </div>
                </td>
              </tr>
            `}).join("")}
        </tbody>
      </table>
    </div>
  `}function E(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function P(e){return new Date(e).toLocaleDateString("ru-RU")}var te=[{url:"img/medal-gold-1.svg",label:"\u0417\u043E\u043B\u043E\u0442\u043E \u2014 \u0441\u0442\u0438\u043B\u044C 1"},{url:"img/medal-gold-2.svg",label:"\u0417\u043E\u043B\u043E\u0442\u043E \u2014 \u0441\u0442\u0438\u043B\u044C 2"},{url:"img/medal-silver-1.svg",label:"\u0421\u0435\u0440\u0435\u0431\u0440\u043E \u2014 \u0441\u0442\u0438\u043B\u044C 1"},{url:"img/medal-silver-2.svg",label:"\u0421\u0435\u0440\u0435\u0431\u0440\u043E \u2014 \u0441\u0442\u0438\u043B\u044C 2"},{url:"img/medal-bronze-1.svg",label:"\u0411\u0440\u043E\u043D\u0437\u0430 \u2014 \u0441\u0442\u0438\u043B\u044C 1"},{url:"img/medal-bronze-2.svg",label:"\u0411\u0440\u043E\u043D\u0437\u0430 \u2014 \u0441\u0442\u0438\u043B\u044C 2"}];function I(){let e=document.getElementById("app"),t=g();e.innerHTML=`
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">\u041C\u0435\u0434\u0430\u043B\u0438</h1>
      <button id="btn-add-category"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition text-sm">
        + \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E
      </button>
    </div>

    ${t.categories.length===0?`
      <div class="text-center py-20 text-gray-400 dark:text-gray-500">
        <div class="text-5xl mb-4">\u{1F3C6}</div>
        <p class="text-lg">\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439. \u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0432\u0443\u044E!</p>
      </div>
    `:t.categories.map(n=>{let a=t.achievements.filter(r=>r.categoryId===n.id);return`
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow mb-5 overflow-hidden">
          <div class="flex items-center justify-between px-5 py-4 bg-indigo-50 dark:bg-indigo-900/40 border-b border-indigo-100 dark:border-indigo-800">
            <h2 class="font-semibold text-indigo-800 dark:text-indigo-200 text-lg">${L(n.name)}</h2>
            <div class="flex gap-2">
              <button class="btn-add-achievement bg-indigo-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-indigo-700 transition" data-cat="${n.id}">
                + \u041C\u0435\u0434\u0430\u043B\u044C
              </button>
              <button class="btn-delete-category text-red-400 hover:text-red-600 text-xl transition" data-id="${n.id}" title="\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E">\u2715</button>
            </div>
          </div>

          ${a.length===0?`
            <div class="px-5 py-6 text-gray-400 dark:text-gray-500 text-sm">\u0412 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043C\u0435\u0434\u0430\u043B\u0435\u0439.</div>
          `:`
            <div class="divide-y divide-gray-100 dark:divide-gray-700">
              ${a.map(r=>`
                <div class="flex items-center gap-4 px-5 py-3">
                  <img src="${L(r.imageUrl)}" alt=""
                    class="w-12 h-12 object-cover rounded-lg bg-gray-100 dark:bg-gray-700 flex-shrink-0"
                    onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><text y=%2228%22 font-size=%2228%22>\u{1F3C5}</text></svg>'" />
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-gray-800 dark:text-gray-100">${L(r.name)}</div>
                    ${r.description?`<div class="text-sm text-gray-500 dark:text-gray-400 truncate">${L(r.description)}</div>`:""}
                  </div>
                  <button class="btn-delete-achievement text-red-400 hover:text-red-600 text-xl transition flex-shrink-0" data-id="${r.id}" title="\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C">\u2715</button>
                </div>
              `).join("")}
            </div>
          `}
        </div>
      `}).join("")}
  `,document.getElementById("btn-add-category")?.addEventListener("click",()=>{p(`
      <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">\u041D\u043E\u0432\u0430\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F</h2>
      <input id="modal-cat-name" type="text" placeholder="\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438"
        class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-4
               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
               focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      <div class="flex gap-3 justify-end">
        <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
        <button id="modal-save" class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>
      </div>
    `),document.getElementById("modal-cancel")?.addEventListener("click",m);let n=document.getElementById("modal-cat-name");n.focus(),n.addEventListener("keydown",r=>{r.key==="Enter"&&a()}),document.getElementById("modal-save")?.addEventListener("click",a);function a(){let r=n.value.trim();if(!r){n.classList.add("border-red-400");return}let d=g();d.categories.push({id:y(),name:r}),b(d),m(),I()}}),e.querySelectorAll(".btn-delete-category").forEach(n=>{n.addEventListener("click",()=>{let a=n.dataset.id,r=g(),d=r.categories.find(i=>i.id===a);if(!d)return;let s=r.achievements.filter(i=>i.categoryId===a).length;p(`
        <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E?</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-2">\xAB${L(d.name)}\xBB</p>
        ${s>0?`<p class="text-red-500 dark:text-red-400 text-sm mb-4">\u0411\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u043E ${s} \u043C\u0435\u0434\u0430\u043B\u0435\u0439 \u0438 \u0432\u0441\u0435 \u0432\u044B\u0434\u0430\u043D\u043D\u044B\u0435 \u043D\u0430\u0433\u0440\u0430\u0434\u044B \u044D\u0442\u043E\u0439 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438.</p>`:'<p class="mb-4"></p>'}
        <div class="flex gap-3 justify-end">
          <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
          <button id="modal-confirm" class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>
        </div>
      `),document.getElementById("modal-cancel")?.addEventListener("click",m),document.getElementById("modal-confirm")?.addEventListener("click",()=>{let i=g(),o=i.achievements.filter(l=>l.categoryId===a).map(l=>l.id);i.categories=i.categories.filter(l=>l.id!==a),i.achievements=i.achievements.filter(l=>l.categoryId!==a),i.studentAchievements=i.studentAchievements.filter(l=>!o.includes(l.achievementId)),b(i),m(),I()})})}),e.querySelectorAll(".btn-add-achievement").forEach(n=>{n.addEventListener("click",()=>{let a=n.dataset.cat;p(`
        <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">\u041D\u043E\u0432\u0430\u044F \u043C\u0435\u0434\u0430\u043B\u044C</h2>
        <input id="modal-ach-name" type="text" placeholder="\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043C\u0435\u0434\u0430\u043B\u0438"
          class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-3
                 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
                 focus:outline-none focus:ring-2 focus:ring-indigo-400" />

        <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">\u0413\u043E\u0442\u043E\u0432\u044B\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F</p>
        <div class="flex gap-2 flex-wrap mb-3">
          ${te.map(l=>`
            <button type="button" class="preset-btn p-1 rounded-lg border-2 border-transparent
              hover:border-indigo-400 dark:hover:border-indigo-500 transition bg-gray-50 dark:bg-gray-700"
              data-url="${l.url}" title="${l.label}">
              <img src="${l.url}" class="w-10 h-10 object-contain" alt="${l.label}" />
            </button>
          `).join("")}
        </div>

        <div class="flex items-center gap-3 mb-3">
          <div id="modal-img-preview" class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center text-gray-300 text-xl overflow-hidden">
            \u{1F5BC}
          </div>
          <input id="modal-ach-img" type="text" placeholder="URL \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0438 (\u0438\u043B\u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u044B\u0448\u0435)"
            class="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2
                   bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
                   focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>

        <textarea id="modal-ach-desc" placeholder="\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)" rows="2"
          class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-4
                 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
                 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"></textarea>
        <div class="flex gap-3 justify-end">
          <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
          <button id="modal-save" class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>
        </div>
      `),document.getElementById("modal-cancel")?.addEventListener("click",m);let r=document.getElementById("modal-ach-name"),d=document.getElementById("modal-ach-img"),s=document.getElementById("modal-ach-desc"),i=document.getElementById("modal-img-preview");function o(l){l?i.innerHTML=`<img src="${l}" class="w-full h-full object-contain rounded-lg" onerror="this.parentElement.innerHTML='\u{1F5BC}'" />`:i.innerHTML="\u{1F5BC}"}d.addEventListener("input",()=>o(d.value.trim())),document.querySelectorAll(".preset-btn").forEach(l=>{l.addEventListener("click",()=>{let v=l.dataset.url;d.value=v,o(v),d.classList.remove("border-red-400"),document.querySelectorAll(".preset-btn").forEach(c=>c.classList.toggle("border-indigo-500",c===l))})}),r.focus(),document.getElementById("modal-save")?.addEventListener("click",()=>{let l=r.value.trim(),v=d.value.trim();if(!l){r.classList.add("border-red-400");return}if(!v){d.classList.add("border-red-400");return}let c=g();c.achievements.push({id:y(),categoryId:a,name:l,description:s.value.trim(),imageUrl:v}),b(c),m(),I()})})}),e.querySelectorAll(".btn-delete-achievement").forEach(n=>{n.addEventListener("click",()=>{let a=n.dataset.id,r=g(),d=r.achievements.find(i=>i.id===a);if(!d)return;let s=r.studentAchievements.filter(i=>i.achievementId===a).length;p(`
        <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C?</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-2">\xAB${L(d.name)}\xBB</p>
        ${s>0?`<p class="text-red-500 dark:text-red-400 text-sm mb-4">\u042D\u0442\u0430 \u043C\u0435\u0434\u0430\u043B\u044C \u0432\u044B\u0434\u0430\u043D\u0430 ${s} \u0440\u0430\u0437 \u2014 \u0432\u0441\u0435 \u0437\u0430\u043F\u0438\u0441\u0438 \u0431\u0443\u0434\u0443\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u044B.</p>`:'<p class="mb-4"></p>'}
        <div class="flex gap-3 justify-end">
          <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
          <button id="modal-confirm" class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>
        </div>
      `),document.getElementById("modal-cancel")?.addEventListener("click",m),document.getElementById("modal-confirm")?.addEventListener("click",()=>{let i=g();i.achievements=i.achievements.filter(o=>o.id!==a),i.studentAchievements=i.studentAchievements.filter(o=>o.achievementId!==a),b(i),m(),I()})})})}function L(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Y(){let e=document.getElementById("app"),t=g(),n=new Date().toISOString().slice(0,10);e.innerHTML=`
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">\u0412\u044B\u0434\u0430\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C</h1>

    ${t.students.length===0||t.achievements.length===0?`
      <div class="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6 text-yellow-800 dark:text-yellow-200">
        <p class="font-medium mb-1">\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0434\u0430\u043D\u043D\u044B\u0445</p>
        <p class="text-sm">
          ${t.students.length===0?"\u2022 \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0443\u0447\u0435\u043D\u0438\u043A\u043E\u0432<br>":""}
          ${t.achievements.length===0?"\u2022 \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043C\u0435\u0434\u0430\u043B\u0438":""}
        </p>
      </div>
    `:`
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 max-w-lg">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\u0423\u0447\u0435\u043D\u0438\u043A</label>
          <select id="sel-student" class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2
            bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="">\u2014 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u0447\u0435\u043D\u0438\u043A\u0430 \u2014</option>
            ${t.students.map(r=>`<option value="${r.id}">${S(r.name)}</option>`).join("")}
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\u041C\u0435\u0434\u0430\u043B\u044C</label>
          <select id="sel-achievement" class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2
            bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="">\u2014 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0434\u0430\u043B\u044C \u2014</option>
            ${t.categories.map(r=>{let d=t.achievements.filter(s=>s.categoryId===r.id);return d.length===0?"":`
                <optgroup label="${S(r.name)}">
                  ${d.map(s=>`<option value="${s.id}">${S(s.name)}</option>`).join("")}
                </optgroup>
              `}).join("")}
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\u0414\u0430\u0442\u0430 \u0432\u044B\u0434\u0430\u0447\u0438</label>
          <input id="inp-date" type="date" value="${n}"
            class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2
              bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>

        <div id="assign-preview" class="mb-5 hidden">
          <div class="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/40 rounded-lg p-3">
            <img id="preview-img" src="" alt="" class="w-12 h-12 object-cover rounded-lg bg-gray-200 dark:bg-gray-700"
              onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><text y=%2228%22 font-size=%2228%22>\u{1F3C5}</text></svg>'" />
            <div>
              <div id="preview-name" class="font-medium text-indigo-800 dark:text-indigo-200"></div>
              <div id="preview-desc" class="text-sm text-indigo-600 dark:text-indigo-400"></div>
            </div>
          </div>
        </div>

        <div id="assign-msg" class="mb-4 hidden"></div>

        <button id="btn-assign"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition">
          \u0412\u044B\u0434\u0430\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C
        </button>
      </div>
    `}
  `;let a=document.getElementById("sel-achievement");a?.addEventListener("change",()=>{let r=a.value,d=document.getElementById("assign-preview");if(!r){d.classList.add("hidden");return}let i=g().achievements.find(o=>o.id===r);i&&(document.getElementById("preview-img").src=i.imageUrl,document.getElementById("preview-name").textContent=i.name,document.getElementById("preview-desc").textContent=i.description||"",d.classList.remove("hidden"))}),document.getElementById("btn-assign")?.addEventListener("click",()=>{let r=document.getElementById("sel-student").value,d=document.getElementById("sel-achievement").value,s=document.getElementById("inp-date").value,i=document.getElementById("assign-msg");if(!r||!d||!s){V(i,"\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432\u0441\u0435 \u043F\u043E\u043B\u044F","error");return}let o=g();o.studentAchievements.push({id:y(),studentId:r,achievementId:d,grantedAt:s}),b(o);let l=o.students.find(c=>c.id===r),v=o.achievements.find(c=>c.id===d);V(i,`\u2713 \xAB${v?.name}\xBB \u0432\u044B\u0434\u0430\u043D\u0430 \u0443\u0447\u0435\u043D\u0438\u043A\u0443 ${l?.name}`,"success"),document.getElementById("sel-student").value="",document.getElementById("sel-achievement").value="",document.getElementById("assign-preview")?.classList.add("hidden")})}function V(e,t,n){e.className=`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${n==="success"?"bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300":"bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300"}`,e.textContent=t,e.classList.remove("hidden"),setTimeout(()=>e.classList.add("hidden"),4e3)}function S(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function M(e){let t=e.id,n=document.getElementById("app"),a=g(),r=a.students.find(c=>c.id===t);if(!r){n.innerHTML=`
      <div class="text-center py-20 text-gray-400 dark:text-gray-500">
        <p class="text-lg">\u0423\u0447\u0435\u043D\u0438\u043A \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.</p>
        <button id="btn-back-notfound" class="mt-4 text-indigo-600 hover:underline">\u2190 \u041D\u0430\u0437\u0430\u0434 \u043A \u0443\u0447\u0435\u043D\u0438\u043A\u0430\u043C</button>
      </div>
    `,document.getElementById("btn-back-notfound")?.addEventListener("click",()=>f("/students"));return}let d=new URLSearchParams(window.location.hash.split("?")[1]||"").get("filter")||"all",s=new Date,i=a.studentAchievements.filter(c=>{if(c.studentId!==t)return!1;if(d==="all")return!0;let u=new Date(c.grantedAt);if(d==="year")return u.getFullYear()===s.getFullYear();if(d==="month")return u.getFullYear()===s.getFullYear()&&u.getMonth()===s.getMonth();if(d==="week"){let x=new Date(s);return x.setDate(s.getDate()-s.getDay()),x.setHours(0,0,0,0),u>=x}return d==="day"?u.toDateString()===s.toDateString():!0}),o={};for(let c of i)o[c.achievementId]||(o[c.achievementId]={count:0,dates:[]}),o[c.achievementId].count++,o[c.achievementId].dates.push(c.grantedAt);let l=i.length,v=[{label:"\u0412\u0441\u0451 \u0432\u0440\u0435\u043C\u044F",value:"all"},{label:"\u0413\u043E\u0434",value:"year"},{label:"\u041C\u0435\u0441\u044F\u0446",value:"month"},{label:"\u041D\u0435\u0434\u0435\u043B\u044F",value:"week"},{label:"\u0414\u0435\u043D\u044C",value:"day"}];n.innerHTML=`
    <div class="mb-4">
      <button id="btn-back" class="text-indigo-600 dark:text-indigo-400 hover:underline text-sm">\u2190 \u0412\u0441\u0435 \u0443\u0447\u0435\u043D\u0438\u043A\u0438</button>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">${$(r.name)}</h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D: ${W(r.createdAt)}</p>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">${l}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">\u043C\u0435\u0434\u0430\u043B\u0435\u0439 \u0437\u0430 \u043F\u0435\u0440\u0438\u043E\u0434</div>
        </div>
      </div>

      <!-- Date filters -->
      <div class="flex gap-2 mt-5 flex-wrap">
        ${v.map(c=>`
          <button class="filter-btn px-3 py-1 rounded-full text-sm font-medium transition
            ${d===c.value?"bg-indigo-600 text-white":"bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}"
            data-filter="${c.value}">${c.label}</button>
        `).join("")}
      </div>
    </div>

    ${Object.keys(o).length===0?`
      <div class="text-center py-16 text-gray-400 dark:text-gray-500">
        <div class="text-5xl mb-3">\u{1F3AF}</div>
        <p>\u041D\u0435\u0442 \u043C\u0435\u0434\u0430\u043B\u0435\u0439 \u0437\u0430 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0439 \u043F\u0435\u0440\u0438\u043E\u0434</p>
      </div>
    `:`
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        ${Object.entries(o).map(([c,u])=>{let x=a.achievements.find(G=>G.id===c);if(!x)return"";let D=u.dates.sort().reverse()[0];return`
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex items-center gap-4">
              <div class="relative flex-shrink-0">
                <img src="${$(x.imageUrl)}" alt=""
                  class="w-16 h-16 object-cover rounded-xl bg-gray-100 dark:bg-gray-700"
                  onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><text y=%2228%22 font-size=%2228%22>\u{1F3C5}</text></svg>'" />
                ${u.count>1?`
                  <span class="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold
                    rounded-full w-6 h-6 flex items-center justify-center shadow">
                    ${u.count}
                  </span>
                `:""}
              </div>
              <div class="min-w-0">
                ${u.count>1?`<div class="text-xs text-indigo-500 dark:text-indigo-400 font-semibold mb-0.5">${u.count} \xD7</div>`:""}
                <div class="font-semibold text-gray-800 dark:text-gray-100 leading-tight">${$(x.name)}</div>
                ${x.description?`<div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">${$(x.description)}</div>`:""}
                <div class="text-xs text-gray-400 dark:text-gray-500 mt-1">\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F: ${W(D)}</div>
              </div>
            </div>
          `}).join("")}
      </div>
    `}
  `,document.getElementById("btn-back")?.addEventListener("click",()=>f("/students")),n.querySelectorAll(".filter-btn").forEach(c=>{c.addEventListener("click",()=>{let u=c.dataset.filter,x=u==="all"?`/profile/${t}`:`/profile/${t}?filter=${u}`;window.location.hash.slice(1)===x?M(e):window.location.hash=x})})}function $(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function W(e){return new Date(e).toLocaleDateString("ru-RU")}function H(){let e=document.getElementById("app"),t=g(),n={students:t.students.length,categories:t.categories.length,achievements:t.achievements.length,records:t.studentAchievements.length};e.innerHTML=`
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">\u0418\u043C\u043F\u043E\u0440\u0442 / \u042D\u043A\u0441\u043F\u043E\u0440\u0442</h1>

    <div class="grid gap-6 sm:grid-cols-2 max-w-2xl">

      <!-- Export -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0434\u0430\u043D\u043D\u044B\u0445</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0432\u0441\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0432 JSON-\u0444\u0430\u0439\u043B</p>

        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <div class="flex justify-between"><span>\u0423\u0447\u0435\u043D\u0438\u043A\u043E\u0432:</span><span class="font-medium">${n.students}</span></div>
          <div class="flex justify-between"><span>\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439:</span><span class="font-medium">${n.categories}</span></div>
          <div class="flex justify-between"><span>\u041C\u0435\u0434\u0430\u043B\u0435\u0439:</span><span class="font-medium">${n.achievements}</span></div>
          <div class="flex justify-between"><span>\u0412\u044B\u0434\u0430\u043D\u043D\u044B\u0445 \u043D\u0430\u0433\u0440\u0430\u0434:</span><span class="font-medium">${n.records}</span></div>
        </div>

        <button id="btn-export"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition">
          \u2193 \u0421\u043A\u0430\u0447\u0430\u0442\u044C JSON
        </button>
      </div>

      <!-- Import -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">\u0418\u043C\u043F\u043E\u0440\u0442 \u0434\u0430\u043D\u043D\u044B\u0445</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u0438\u0437 JSON-\u0444\u0430\u0439\u043B\u0430</p>

        <div class="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 mb-4 text-sm text-yellow-800 dark:text-yellow-200">
          \u26A0 \u0418\u043C\u043F\u043E\u0440\u0442 <strong>\u0437\u0430\u043C\u0435\u043D\u0438\u0442</strong> \u0432\u0441\u0435 \u0442\u0435\u043A\u0443\u0449\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0435
        </div>

        <label class="block mb-3">
          <span class="sr-only">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B</span>
          <input id="inp-import" type="file" accept=".json"
            class="block w-full text-sm text-gray-500 dark:text-gray-400
              file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium
              file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100
              dark:file:bg-indigo-900/40 dark:file:text-indigo-300 cursor-pointer" />
        </label>

        <div id="import-msg" class="mb-3 hidden"></div>

        <button id="btn-import"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition">
          \u2191 \u0418\u043C\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C
        </button>
      </div>

    </div>
  `,document.getElementById("btn-export")?.addEventListener("click",C),document.getElementById("btn-import")?.addEventListener("click",()=>{let a=document.getElementById("inp-import"),r=document.getElementById("import-msg"),d=a.files?.[0];if(!d){T(r,"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B","error");return}let s=new FileReader;s.onload=()=>{try{_(s.result),T(r,"\u2713 \u0414\u0430\u043D\u043D\u044B\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u043C\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u044B","success"),a.value="",setTimeout(()=>H(),1200)}catch(i){let o=i instanceof Error?i.message:"\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430";T(r,`\u041E\u0448\u0438\u0431\u043A\u0430: ${o}`,"error")}},s.readAsText(d)})}function T(e,t,n){e.className=`mb-3 px-4 py-2 rounded-lg text-sm font-medium ${n==="success"?"bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300":"bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300"}`,e.textContent=t,e.classList.remove("hidden")}var j=document.getElementById("btn-theme");function K(){j&&(j.textContent=B()==="dark"?"\u2600\uFE0F":"\u{1F319}")}K();j?.addEventListener("click",()=>{F(B()==="dark"?"light":"dark"),K()});h("/students",()=>k());h("/achievements",()=>I());h("/assign",()=>Y());h("/profile/:id",e=>M(e));h("/import-export",()=>H());h("/",()=>f("/students"));N();})();
