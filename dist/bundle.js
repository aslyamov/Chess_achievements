"use strict";(()=>{var J=[];function w(e,r){let n=[],s=new RegExp("^"+e.replace(/:([^/]+)/g,(d,t)=>(n.push(t),"([^/]+)"))+"/?$");J.push({pattern:s,keys:n,handler:r})}function E(e){window.location.hash=e}function F(){let r=(window.location.hash.slice(1)||"/").split("?")[0];for(let n of J){let s=r.match(n.pattern);if(s){let d={};n.keys.forEach((t,i)=>{d[t]=s[i+1]}),n.handler(d),oe(r);return}}}function oe(e){document.querySelectorAll(".nav-link").forEach(r=>{let n=r.getAttribute("href")?.slice(1)??"";r.classList.toggle("active",e.startsWith(n)&&n!=="/")})}function P(){window.addEventListener("hashchange",F),F()}var Y="chess_achievements_data",z={students:[],categories:[],achievements:[],studentAchievements:[]};function g(){try{let e=localStorage.getItem(Y);return e?JSON.parse(e):{...z}}catch{return{...z}}}function b(e){localStorage.setItem(Y,JSON.stringify(e))}function V(){let e=g(),r=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(r),s=document.createElement("a");s.href=n,s.download=`chess_achievements_${new Date().toISOString().slice(0,10)}.json`,s.click(),URL.revokeObjectURL(n)}function W(e){let r=JSON.parse(e);if(!Array.isArray(r.students)||!Array.isArray(r.categories)||!Array.isArray(r.achievements)||!Array.isArray(r.studentAchievements))throw new Error("\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0444\u0430\u0439\u043B\u0430");b(r)}function h(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}function H(){return localStorage.getItem("chess_theme")||"light"}function K(e){localStorage.setItem("chess_theme",e),e==="dark"?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}function G(){return localStorage.getItem("chess_student_view")||"cards"}function T(e){localStorage.setItem("chess_student_view",e)}var L=()=>document.getElementById("modal-overlay"),Q=()=>document.getElementById("modal-box");function p(e){Q().innerHTML=e,L().classList.remove("hidden"),L().classList.add("flex")}function u(){L().classList.add("hidden"),L().classList.remove("flex"),Q().innerHTML=""}document.addEventListener("DOMContentLoaded",()=>{L().addEventListener("click",e=>{e.target===L()&&u()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&u()})});function S(e,r){let n=g(),s=n.students.find(o=>o.id===e);if(!s)return;if(!(n.achievements.length>0)){p(`
      <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">\u041D\u0435\u0442 \u043C\u0435\u0434\u0430\u043B\u0435\u0439</h2>
      <p class="text-gray-600 dark:text-gray-300 mb-5">\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043C\u0435\u0434\u0430\u043B\u0438 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \xAB\u041C\u0435\u0434\u0430\u043B\u0438\xBB.</p>
      <div class="flex justify-end">
        <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">\u0417\u0430\u043A\u0440\u044B\u0442\u044C</button>
      </div>
    `),document.getElementById("modal-cancel")?.addEventListener("click",u);return}let t=new Date().toISOString().slice(0,10),i=n.categories.map(o=>{let l=n.achievements.filter(c=>c.categoryId===o.id);return l.length===0?"":`
      <div class="mb-4">
        <h3 class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
          ${$(o.name)}
        </h3>
        <div class="grid grid-cols-4 gap-2">
          ${l.map(c=>`
            <button type="button"
              class="medal-pick-btn relative group flex flex-col items-center p-2 rounded-xl
                     border-2 border-transparent hover:border-indigo-400
                     hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all text-center"
              data-id="${c.id}">
              <img src="${$(c.imageUrl)}" alt=""
                class="w-12 h-12 object-contain mb-1 pointer-events-none"
                onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><text y=%2228%22 font-size=%2228%22>\u{1F3C5}</text></svg>'" />
              <span class="text-xs text-gray-700 dark:text-gray-300 leading-tight pointer-events-none line-clamp-2">
                ${$(c.name)}
              </span>
              ${c.description?`
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1.5
                            bg-gray-900 text-white text-xs rounded-lg w-36 text-center
                            hidden group-hover:block z-20 pointer-events-none shadow-lg">
                  ${$(c.description)}
                  <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              `:""}
            </button>
          `).join("")}
        </div>
      </div>
    `}).join("");p(`
    <h2 class="text-xl font-bold mb-0.5 text-gray-800 dark:text-gray-100">\u0412\u044B\u0434\u0430\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C</h2>
    <p class="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-4">${$(s.name)}</p>

    <div class="mb-3">${i}</div>

    <div id="assign-selected" class="hidden mb-3 px-3 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/40
         flex items-center gap-3 border border-indigo-200 dark:border-indigo-700">
      <img id="assign-sel-img" src="" alt="" class="w-9 h-9 object-contain rounded flex-shrink-0" />
      <span id="assign-sel-name" class="text-sm font-semibold text-indigo-800 dark:text-indigo-200"></span>
    </div>

    <div id="modal-assign-err"
         class="hidden mb-3 px-3 py-2 rounded-lg text-sm bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300">
      \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0434\u0430\u043B\u044C
    </div>

    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\u0414\u0430\u0442\u0430 \u0432\u044B\u0434\u0430\u0447\u0438</label>
    <input id="modal-ach-date" type="date" value="${t}"
      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-5
             bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
             focus:outline-none focus:ring-2 focus:ring-indigo-400" />

    <div class="flex gap-3 justify-end">
      <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100
        dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
      <button id="modal-assign-save" class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
        \u0412\u044B\u0434\u0430\u0442\u044C
      </button>
    </div>
  `);let a="";document.querySelectorAll(".medal-pick-btn").forEach(o=>{o.addEventListener("click",()=>{a=o.dataset.id;let l=g().achievements.find(c=>c.id===a);document.querySelectorAll(".medal-pick-btn").forEach(c=>{c.classList.remove("border-indigo-500","bg-indigo-50","dark:bg-indigo-900/30"),c.classList.add("border-transparent")}),o.classList.remove("border-transparent"),o.classList.add("border-indigo-500","bg-indigo-50"),l&&(document.getElementById("assign-sel-img").src=l.imageUrl,document.getElementById("assign-sel-name").textContent=l.name,document.getElementById("assign-selected").classList.remove("hidden")),document.getElementById("modal-assign-err").classList.add("hidden")})}),document.getElementById("modal-cancel")?.addEventListener("click",u),document.getElementById("modal-assign-save")?.addEventListener("click",()=>{if(!a){document.getElementById("modal-assign-err").classList.remove("hidden");return}let o=document.getElementById("modal-ach-date").value,l=g();l.studentAchievements.push({id:h(),studentId:e,achievementId:a,grantedAt:o}),b(l),u(),r()})}function $(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}var I="name",A="asc";function j(e){return I!==e?'<span class="text-gray-300 dark:text-gray-600">\u21C5</span>':A==="asc"?"\u25B2":"\u25BC"}function k(){let e=document.getElementById("app"),r=g(),n=G(),s=[...r.students].sort((t,i)=>{let a=0;if(I==="name"&&(a=t.name.localeCompare(i.name,"ru")),I==="date"&&(a=t.createdAt.localeCompare(i.createdAt)),I==="medals"){let o=r.studentAchievements.filter(c=>c.studentId===t.id).length,l=r.studentAchievements.filter(c=>c.studentId===i.id).length;a=o-l}return A==="asc"?a:-a}),d={...r,students:s};e.innerHTML=`
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

    ${r.students.length===0?`
      <div class="text-center py-20 text-gray-400 dark:text-gray-500">
        <div class="text-5xl mb-4">\u265F</div>
        <p class="text-lg">\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0443\u0447\u0435\u043D\u0438\u043A\u043E\u0432. \u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043F\u0435\u0440\u0432\u043E\u0433\u043E!</p>
      </div>
    `:n==="cards"?se(d):le(d)}
  `,document.getElementById("btn-view-cards")?.addEventListener("click",()=>{T("cards"),k()}),document.getElementById("btn-view-table")?.addEventListener("click",()=>{T("table"),k()}),document.getElementById("btn-add-student")?.addEventListener("click",()=>{p(`
      <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">\u041D\u043E\u0432\u044B\u0439 \u0443\u0447\u0435\u043D\u0438\u043A</h2>
      <input id="modal-student-name" type="text" placeholder="\u0418\u043C\u044F \u0443\u0447\u0435\u043D\u0438\u043A\u0430"
        class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-4
               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
               focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      <div class="flex gap-3 justify-end">
        <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
        <button id="modal-save" class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>
      </div>
    `),document.getElementById("modal-cancel")?.addEventListener("click",u);let t=document.getElementById("modal-student-name");t.focus(),t.addEventListener("keydown",a=>{a.key==="Enter"&&i()}),document.getElementById("modal-save")?.addEventListener("click",i);function i(){let a=t.value.trim();if(!a){t.classList.add("border-red-400");return}let o=g();o.students.push({id:h(),name:a,createdAt:new Date().toISOString()}),b(o),u(),k()}}),e.querySelectorAll(".btn-delete-student").forEach(t=>{t.addEventListener("click",i=>{i.stopPropagation();let a=t.dataset.id,l=g().students.find(c=>c.id===a);l&&(p(`
        <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0443\u0447\u0435\u043D\u0438\u043A\u0430?</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-5">\xAB${D(l.name)}\xBB \u0438 \u0432\u0441\u0435 \u0435\u0433\u043E \u043C\u0435\u0434\u0430\u043B\u0438 \u0431\u0443\u0434\u0443\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u044B.</p>
        <div class="flex gap-3 justify-end">
          <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
          <button id="modal-confirm" class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>
        </div>
      `),document.getElementById("modal-cancel")?.addEventListener("click",u),document.getElementById("modal-confirm")?.addEventListener("click",()=>{let c=g();c.students=c.students.filter(m=>m.id!==a),c.studentAchievements=c.studentAchievements.filter(m=>m.studentId!==a),b(c),u(),k()}))})}),e.querySelectorAll(".btn-open-profile").forEach(t=>{t.addEventListener("click",()=>{E(`/profile/${t.dataset.id}`)})}),e.querySelectorAll(".sort-btn").forEach(t=>{t.addEventListener("click",()=>{let i=t.dataset.col;I===i?A=A==="asc"?"desc":"asc":(I=i,A="asc"),k()})}),e.querySelectorAll(".btn-assign").forEach(t=>{t.addEventListener("click",i=>{i.stopPropagation();let a=t.dataset.id;S(a,()=>k())})})}function se(e){return`
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      ${e.students.map(r=>{let n=e.studentAchievements.filter(s=>s.studentId===r.id).length;return`
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex flex-col gap-3 hover:shadow-md transition">
            <div class="flex items-center justify-between">
              <button class="btn-open-profile font-semibold text-lg text-gray-800 dark:text-gray-100 text-left hover:text-indigo-600 dark:hover:text-indigo-400 transition" data-id="${r.id}">
                ${D(r.name)}
              </button>
              <div class="flex items-center gap-1">
                <button class="btn-assign text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition text-xl" data-id="${r.id}" title="\u0412\u044B\u0434\u0430\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C">\u{1F3C6}</button>
                <button class="btn-delete-student text-red-400 hover:text-red-600 transition text-xl" data-id="${r.id}" title="\u0423\u0434\u0430\u043B\u0438\u0442\u044C">\u2715</button>
              </div>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              \u041C\u0435\u0434\u0430\u043B\u0435\u0439: <span class="font-medium text-indigo-600 dark:text-indigo-400">${n}</span>
            </div>
            <div class="text-xs text-gray-400 dark:text-gray-500">${X(r.createdAt)}</div>
          </div>
        `}).join("")}
    </div>
  `}function le(e){return`
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <th class="text-left px-5 py-3">
              <button class="sort-btn flex items-center gap-1 font-semibold text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition" data-col="name">
                \u0418\u043C\u044F ${j("name")}
              </button>
            </th>
            <th class="text-center px-4 py-3">
              <button class="sort-btn flex items-center gap-1 font-semibold text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition mx-auto" data-col="medals">
                \u041C\u0435\u0434\u0430\u043B\u0435\u0439 ${j("medals")}
              </button>
            </th>
            <th class="text-left px-4 py-3 hidden sm:table-cell">
              <button class="sort-btn flex items-center gap-1 font-semibold text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition" data-col="date">
                \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D ${j("date")}
              </button>
            </th>
            <th class="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
          ${e.students.map(r=>{let n=e.studentAchievements.filter(s=>s.studentId===r.id).length;return`
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                <td class="px-5 py-3">
                  <button class="btn-open-profile font-medium text-gray-800 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-left" data-id="${r.id}">
                    ${D(r.name)}
                  </button>
                </td>
                <td class="px-4 py-3 text-center">
                  <span class="font-semibold text-indigo-600 dark:text-indigo-400">${n}</span>
                </td>
                <td class="px-4 py-3 text-gray-400 dark:text-gray-500 hidden sm:table-cell">${X(r.createdAt)}</td>
                <td class="px-4 py-3">
                  <div class="flex items-center justify-end gap-2">
                    <button class="btn-assign text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition text-lg" data-id="${r.id}" title="\u0412\u044B\u0434\u0430\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C">\u{1F3C6}</button>
                    <button class="btn-delete-student text-red-400 hover:text-red-600 transition text-lg" data-id="${r.id}" title="\u0423\u0434\u0430\u043B\u0438\u0442\u044C">\u2715</button>
                  </div>
                </td>
              </tr>
            `}).join("")}
        </tbody>
      </table>
    </div>
  `}function D(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function X(e){return new Date(e).toLocaleDateString("ru-RU")}var q=[{hex:"#f59e0b",label:"\u0417\u043E\u043B\u043E\u0442\u043E"},{hex:"#94a3b8",label:"\u0421\u0435\u0440\u0435\u0431\u0440\u043E"},{hex:"#b45309",label:"\u0411\u0440\u043E\u043D\u0437\u0430"},{hex:"#3b82f6",label:"\u0421\u0438\u043D\u0438\u0439"},{hex:"#ef4444",label:"\u041A\u0440\u0430\u0441\u043D\u044B\u0439"},{hex:"#22c55e",label:"\u0417\u0435\u043B\u0451\u043D\u044B\u0439"},{hex:"#a855f7",label:"\u0424\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439"},{hex:"#475569",label:"\u0422\u0451\u043C\u043D\u044B\u0439"}],ce=[{name:"trophy",label:"\u041A\u0443\u0431\u043E\u043A"},{name:"trophy-cup",label:"\u041A\u0443\u0431\u043E\u043A 2"},{name:"laurel-crown",label:"\u041B\u0430\u0432\u0440\u043E\u0432\u044B\u0439 \u0432\u0435\u043D\u043E\u043A"},{name:"crown",label:"\u041A\u043E\u0440\u043E\u043D\u0430"},{name:"medal",label:"\u041C\u0435\u0434\u0430\u043B\u044C"},{name:"podium",label:"\u041F\u044C\u0435\u0434\u0435\u0441\u0442\u0430\u043B"},{name:"rank-1",label:"1 \u043C\u0435\u0441\u0442\u043E"},{name:"rank-2",label:"2 \u043C\u0435\u0441\u0442\u043E"},{name:"rank-3",label:"3 \u043C\u0435\u0441\u0442\u043E"},{name:"gold-bar",label:"\u0421\u043B\u0438\u0442\u043E\u043A"},{name:"diamond-trophy",label:"\u0411\u0440\u0438\u043B\u043B. \u043A\u0443\u0431\u043E\u043A"},{name:"open-treasure-chest",label:"\u0421\u0443\u043D\u0434\u0443\u043A"},{name:"round-star",label:"\u0417\u0432\u0435\u0437\u0434\u0430"},{name:"falling-star",label:"\u041F\u0430\u0434\u0430\u044E\u0449\u0430\u044F \u0437\u0432\u0435\u0437\u0434\u0430"},{name:"star-formation",label:"\u0421\u043E\u0437\u0432\u0435\u0437\u0434\u0438\u0435"},{name:"star-medal",label:"\u041C\u0435\u0434\u0430\u043B\u044C-\u0437\u0432\u0435\u0437\u0434\u0430"},{name:"sparkles",label:"\u0418\u0441\u043A\u0440\u044B"},{name:"chess-queen",label:"\u0424\u0435\u0440\u0437\u044C"},{name:"chess-king",label:"\u041A\u043E\u0440\u043E\u043B\u044C"},{name:"chess-knight",label:"\u041A\u043E\u043D\u044C"},{name:"chess-rook",label:"\u041B\u0430\u0434\u044C\u044F"},{name:"chess-bishop",label:"\u0421\u043B\u043E\u043D"},{name:"chess-pawn",label:"\u041F\u0435\u0448\u043A\u0430"},{name:"graduate-cap",label:"\u0410\u043A\u0430\u0434. \u0448\u0430\u043F\u043A\u0430"},{name:"diploma",label:"\u0414\u0438\u043F\u043B\u043E\u043C"},{name:"open-book",label:"\u041A\u043D\u0438\u0433\u0430"},{name:"brain",label:"\u041C\u043E\u0437\u0433"},{name:"idea",label:"\u0418\u0434\u0435\u044F"},{name:"upgrade",label:"\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441"},{name:"level-end-flag",label:"\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0432\u0432\u0435\u0440\u0445"},{name:"lightning-trio",label:"\u041C\u043E\u043B\u043D\u0438\u044F"},{name:"fire",label:"\u041E\u0433\u043E\u043D\u044C"},{name:"rocket",label:"\u0420\u0430\u043A\u0435\u0442\u0430"},{name:"fist",label:"\u041A\u0443\u043B\u0430\u043A"},{name:"thunder-struck",label:"\u0413\u0440\u043E\u043C"},{name:"sprint",label:"\u0421\u043F\u0440\u0438\u043D\u0442"},{name:"muscle-fat",label:"\u041C\u044B\u0448\u0446\u044B"},{name:"sonic-lightning",label:"\u0412\u0441\u043F\u044B\u0448\u043A\u0430"},{name:"shield",label:"\u0429\u0438\u0442"},{name:"cross-shield",label:"\u0429\u0438\u0442 \u0433\u0435\u0440\u0431"},{name:"roman-shield",label:"\u0411\u0430\u0448\u0435\u043D\u043D\u044B\u0439 \u0449\u0438\u0442"},{name:"shining-sword",label:"\u041C\u0435\u0447"},{name:"crossed-swords",label:"\u041C\u0435\u0447\u0438 \u0441\u043A\u0440\u0435\u0449."},{name:"warhammer",label:"\u041C\u043E\u043B\u043E\u0442 \u0432\u043E\u0439\u043D\u044B"},{name:"castle",label:"\u0417\u0430\u043C\u043E\u043A"},{name:"locked-fortress",label:"\u041A\u0440\u0435\u043F\u043E\u0441\u0442\u044C"},{name:"watchtower",label:"\u0411\u0430\u0448\u043D\u044F"},{name:"spartan-helmet",label:"\u0428\u043B\u0435\u043C \u0440\u044B\u0446\u0430\u0440\u044F"},{name:"lotus",label:"\u041B\u043E\u0442\u043E\u0441"},{name:"sunflower",label:"\u041F\u043E\u0434\u0441\u043E\u043B\u043D\u0443\u0445"},{name:"butterfly",label:"\u0411\u0430\u0431\u043E\u0447\u043A\u0430"},{name:"clover",label:"\u041A\u043B\u0435\u0432\u0435\u0440"},{name:"pine-tree",label:"\u0415\u043B\u044C"},{name:"oak-leaf",label:"\u0414\u0443\u0431\u043E\u0432\u044B\u0439 \u043B\u0438\u0441\u0442"},{name:"dragon-breath",label:"\u0414\u0440\u0430\u043A\u043E\u043D"},{name:"dragon-head",label:"\u0413\u043E\u043B\u043E\u0432\u0430 \u0434\u0440\u0430\u043A\u043E\u043D\u0430"},{name:"eagle-emblem",label:"\u041E\u0440\u0451\u043B"},{name:"lion",label:"\u041B\u0435\u0432"},{name:"double-dragon",label:"\u0414\u0432\u043E\u0439\u043D\u043E\u0439 \u0434\u0440\u0430\u043A\u043E\u043D"},{name:"wolf-head",label:"\u0412\u043E\u043B\u043A"},{name:"bear-head",label:"\u041C\u0435\u0434\u0432\u0435\u0434\u044C"},{name:"unicorn",label:"\u0415\u0434\u0438\u043D\u043E\u0440\u043E\u0433"},{name:"dragon-spiral",label:"\u0424\u0435\u043D\u0438\u043A\u0441"},{name:"shark-fin",label:"\u0410\u043A\u0443\u043B\u0430"},{name:"owl",label:"\u0421\u043E\u0432\u0430"},{name:"sun",label:"\u0421\u043E\u043B\u043D\u0446\u0435"},{name:"moon",label:"\u041B\u0443\u043D\u0430"},{name:"ringed-planet",label:"\u041F\u043B\u0430\u043D\u0435\u0442\u0430"},{name:"comet-spark",label:"\u041A\u043E\u043C\u0435\u0442\u0430"},{name:"ufo",label:"\u041D\u041B\u041E"},{name:"flag-objective",label:"\u0426\u0435\u043B\u044C"},{name:"compass",label:"\u041A\u043E\u043C\u043F\u0430\u0441"},{name:"corner-flag",label:"\u0424\u043B\u0430\u0433"},{name:"gems",label:"\u041A\u0440\u0438\u0441\u0442\u0430\u043B\u043B"},{name:"infinity",label:"\u0411\u0435\u0441\u043A\u043E\u043D\u0435\u0447\u043D\u043E\u0441\u0442\u044C"},{name:"eye-of-horus",label:"\u0413\u043B\u0430\u0437 \u0413\u043E\u0440\u0430"},{name:"ankh",label:"\u0410\u043D\u043A\u0445"},{name:"yin-yang",label:"\u0418\u043D\u044C-\u044F\u043D\u044C"},{name:"triquetra",label:"\u0422\u0440\u0438\u043A\u0432\u0435\u0442\u0440"},{name:"magic-swirl",label:"\u041C\u0430\u0433\u0438\u044F"}];function O(e,r){return`https://api.iconify.design/game-icons/${e}.svg?color=${encodeURIComponent(r)}`}function Z(e,r={}){let n=q[0].hex,s=r.imageUrl?`<img src="${y(r.imageUrl)}" class="w-full h-full object-contain rounded-lg" />`:"\u{1F5BC}";return`
    <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">${e}</h2>

    <input id="modal-ach-name" type="text" placeholder="\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043C\u0435\u0434\u0430\u043B\u0438" value="${y(r.name??"")}"
      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-3
             bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
             focus:outline-none focus:ring-2 focus:ring-indigo-400" />

    <div class="flex items-center gap-2 mb-2">
      <div id="modal-img-preview" class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex-shrink-0
        flex items-center justify-center text-xl overflow-hidden">${s}</div>
      <input id="modal-ach-img" type="text" placeholder="URL \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0438"
        value="${y(r.imageUrl??"")}"
        class="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2
               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
               focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      <button id="btn-library-toggle" type="button" title="\u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 \u0438\u043A\u043E\u043D\u043E\u043A"
        class="flex-shrink-0 w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600
               bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/40
               hover:border-indigo-400 transition flex items-center justify-center text-lg">
        \u{1F3A8}
      </button>
    </div>

    <div id="icon-library" class="hidden mb-3 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
      <div class="flex items-center gap-1.5 mb-2 flex-wrap">
        <span class="text-xs text-gray-500 dark:text-gray-400 mr-1">\u0426\u0432\u0435\u0442:</span>
        ${q.map((d,t)=>`
          <button type="button" class="color-btn w-6 h-6 rounded-full border-2 transition
            ${t===0?"border-indigo-500 ring-1 ring-indigo-500":"border-gray-300 dark:border-gray-600"}"
            style="background:${d.hex}" data-hex="${d.hex}" title="${d.label}"></button>
        `).join("")}
      </div>
      <input id="icon-search" type="text" placeholder="\u041F\u043E\u0438\u0441\u043A \u0438\u043A\u043E\u043D\u043A\u0438..."
        class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 mb-2 text-sm
               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
               focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      <div id="icon-grid" class="grid grid-cols-9 gap-0.5 max-h-44 overflow-y-auto">
        ${ce.map(d=>`
          <button type="button" class="icon-btn flex flex-col items-center p-1 rounded-lg border border-transparent
            hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition"
            data-name="${d.name}" title="${d.label}">
            <img src="${O(d.name,n)}"
              class="w-7 h-7 object-contain pointer-events-none" alt="${d.label}" />
          </button>
        `).join("")}
      </div>
    </div>

    <textarea id="modal-ach-desc" placeholder="\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)" rows="2"
      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-4
             bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
             focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none">${y(r.description??"")}</textarea>

    <div class="flex gap-3 justify-end">
      <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100
        dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
      <button id="modal-save" class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
        ${r.name?"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C":"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C"}
      </button>
    </div>
  `}function ee(e){document.getElementById("modal-cancel")?.addEventListener("click",u);let r=document.getElementById("modal-ach-name"),n=document.getElementById("modal-ach-img"),s=document.getElementById("modal-ach-desc"),d=document.getElementById("modal-img-preview"),t=q[0].hex;function i(a){d.innerHTML=a?`<img src="${a}" class="w-full h-full object-contain rounded-lg" onerror="this.parentElement.innerHTML='\u{1F5BC}'" />`:"\u{1F5BC}"}n.addEventListener("input",()=>i(n.value.trim())),document.getElementById("btn-library-toggle")?.addEventListener("click",()=>{document.getElementById("icon-library").classList.toggle("hidden")}),document.querySelectorAll(".color-btn").forEach(a=>{a.addEventListener("click",()=>{t=a.dataset.hex,document.querySelectorAll(".color-btn").forEach(o=>{o.classList.remove("border-indigo-500","ring-1","ring-indigo-500"),o.classList.add("border-gray-300")}),a.classList.add("border-indigo-500","ring-1","ring-indigo-500"),a.classList.remove("border-gray-300"),document.querySelectorAll(".icon-btn img").forEach(o=>{let l=o.closest(".icon-btn").dataset.name;o.src=O(l,t)})})}),document.getElementById("icon-search")?.addEventListener("input",a=>{let o=a.target.value.toLowerCase();document.querySelectorAll(".icon-btn").forEach(l=>{let c=l,m=c.title.toLowerCase().includes(o)||c.dataset.name.includes(o);c.style.display=m?"":"none"})}),document.querySelectorAll(".icon-btn").forEach(a=>{a.addEventListener("click",()=>{let o=a.dataset.name,l=O(o,t);n.value=l,i(l),n.classList.remove("border-red-400"),document.querySelectorAll(".icon-btn").forEach(c=>c.classList.remove("border-indigo-400","bg-indigo-50")),a.classList.add("border-indigo-400","bg-indigo-50")})}),r.focus(),document.getElementById("modal-save")?.addEventListener("click",()=>{let a=r.value.trim(),o=n.value.trim();if(!a){r.classList.add("border-red-400");return}if(!o){n.classList.add("border-red-400");return}e(a,o,s.value.trim())})}function te(e){let r=!!e;p(`
    <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
      ${r?"\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E":"\u041D\u043E\u0432\u0430\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F"}
    </h2>
    <input id="modal-cat-name" type="text" placeholder="\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438"
      value="${y(e?.name??"")}"
      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-4
             bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
             focus:outline-none focus:ring-2 focus:ring-indigo-400" />
    <div class="flex gap-3 justify-end">
      <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100
        dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
      <button id="modal-save" class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
        ${r?"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C":"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C"}
      </button>
    </div>
  `),document.getElementById("modal-cancel")?.addEventListener("click",u);let n=document.getElementById("modal-cat-name");n.focus(),e&&n.select(),n.addEventListener("keydown",d=>{d.key==="Enter"&&s()}),document.getElementById("modal-save")?.addEventListener("click",s);function s(){let d=n.value.trim();if(!d){n.classList.add("border-red-400");return}let t=g();if(r&&e){let i=t.categories.find(a=>a.id===e.id);i&&(i.name=d)}else t.categories.push({id:h(),name:d});b(t),u(),f()}}function f(){let e=document.getElementById("app"),r=g();e.innerHTML=`
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">\u041C\u0435\u0434\u0430\u043B\u0438</h1>
      <button id="btn-add-category"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition text-sm">
        + \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E
      </button>
    </div>

    ${r.categories.length===0?`
      <div class="text-center py-20 text-gray-400 dark:text-gray-500">
        <div class="text-5xl mb-4">\u{1F3C6}</div>
        <p class="text-lg">\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439. \u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0432\u0443\u044E!</p>
      </div>
    `:r.categories.map(n=>{let s=r.achievements.filter(d=>d.categoryId===n.id);return`
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow mb-5 overflow-hidden">
          <div class="flex items-center justify-between px-5 py-4 bg-indigo-50 dark:bg-indigo-900/40
            border-b border-indigo-100 dark:border-indigo-800">
            <h2 class="font-semibold text-indigo-800 dark:text-indigo-200 text-lg">${y(n.name)}</h2>
            <div class="flex items-center gap-1">
              <button class="btn-add-achievement bg-indigo-600 text-white text-sm px-3 py-1 rounded-lg
                hover:bg-indigo-700 transition" data-cat="${n.id}">+ \u041C\u0435\u0434\u0430\u043B\u044C</button>
              <button class="btn-edit-category p-1.5 rounded-lg text-gray-400 hover:text-indigo-600
                dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition"
                data-id="${n.id}" title="\u041F\u0435\u0440\u0435\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u0442\u044C">\u270F\uFE0F</button>
              <button class="btn-delete-category p-1.5 rounded-lg text-gray-400 hover:text-red-500
                hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                data-id="${n.id}" title="\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E">\u{1F5D1}</button>
            </div>
          </div>
          ${s.length===0?`
            <div class="px-5 py-6 text-gray-400 dark:text-gray-500 text-sm">\u0412 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043C\u0435\u0434\u0430\u043B\u0435\u0439.</div>
          `:`
            <div class="divide-y divide-gray-100 dark:divide-gray-700">
              ${s.map((d,t)=>`
                <div class="flex items-center gap-4 px-5 py-3">
                  <img src="${y(d.imageUrl)}" alt=""
                    class="w-12 h-12 object-contain rounded-lg bg-gray-100 dark:bg-gray-700 flex-shrink-0 p-1"
                    onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><text y=%2228%22 font-size=%2228%22>\u{1F3C5}</text></svg>'" />
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-gray-800 dark:text-gray-100">${y(d.name)}</div>
                    ${d.description?`<div class="text-sm text-gray-500 dark:text-gray-400 truncate">${y(d.description)}</div>`:""}
                  </div>
                  <div class="flex items-center gap-1 flex-shrink-0">
                    <button class="btn-move-up p-1.5 rounded-lg transition
                      ${t===0?"text-gray-200 dark:text-gray-700 cursor-default":"text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"}"
                      data-id="${d.id}" data-cat="${n.id}" title="\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u0432\u0435\u0440\u0445" ${t===0?"disabled":""}>\u2191</button>
                    <button class="btn-move-down p-1.5 rounded-lg transition
                      ${t===s.length-1?"text-gray-200 dark:text-gray-700 cursor-default":"text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"}"
                      data-id="${d.id}" data-cat="${n.id}" title="\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u043D\u0438\u0437" ${t===s.length-1?"disabled":""}>\u2193</button>
                    <button class="btn-duplicate-achievement p-1.5 rounded-lg text-gray-400 hover:text-green-600
                      dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition"
                      data-id="${d.id}" title="\u0414\u0443\u0431\u043B\u0438\u0440\u043E\u0432\u0430\u0442\u044C">\u{1F4CB}</button>
                    <button class="btn-edit-achievement p-1.5 rounded-lg text-gray-400 hover:text-indigo-600
                      dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition"
                      data-id="${d.id}" title="\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C">\u270F\uFE0F</button>
                    <button class="btn-delete-achievement p-1.5 rounded-lg text-gray-400 hover:text-red-500
                      hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                      data-id="${d.id}" title="\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C">\u{1F5D1}</button>
                  </div>
                </div>
              `).join("")}
            </div>
          `}
        </div>
      `}).join("")}
  `,document.getElementById("btn-add-category")?.addEventListener("click",()=>te()),e.querySelectorAll(".btn-edit-category").forEach(n=>{n.addEventListener("click",()=>{let s=n.dataset.id,d=g().categories.find(t=>t.id===s);d&&te(d)})}),e.querySelectorAll(".btn-delete-category").forEach(n=>{n.addEventListener("click",()=>{let s=n.dataset.id,d=g(),t=d.categories.find(a=>a.id===s);if(!t)return;let i=d.achievements.filter(a=>a.categoryId===s).length;p(`
        <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E?</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-2">\xAB${y(t.name)}\xBB</p>
        ${i>0?`<p class="text-red-500 dark:text-red-400 text-sm mb-4">\u0411\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u043E ${i} \u043C\u0435\u0434\u0430\u043B\u0435\u0439 \u0438 \u0432\u0441\u0435 \u0432\u044B\u0434\u0430\u043D\u043D\u044B\u0435 \u043D\u0430\u0433\u0440\u0430\u0434\u044B \u044D\u0442\u043E\u0439 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438.</p>`:'<p class="mb-4"></p>'}
        <div class="flex gap-3 justify-end">
          <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100
            dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
          <button id="modal-confirm" class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>
        </div>
      `),document.getElementById("modal-cancel")?.addEventListener("click",u),document.getElementById("modal-confirm")?.addEventListener("click",()=>{let a=g(),o=a.achievements.filter(l=>l.categoryId===s).map(l=>l.id);a.categories=a.categories.filter(l=>l.id!==s),a.achievements=a.achievements.filter(l=>l.categoryId!==s),a.studentAchievements=a.studentAchievements.filter(l=>!o.includes(l.achievementId)),b(a),u(),f()})})}),e.querySelectorAll(".btn-add-achievement").forEach(n=>{n.addEventListener("click",()=>{let s=n.dataset.cat;p(Z("\u041D\u043E\u0432\u0430\u044F \u043C\u0435\u0434\u0430\u043B\u044C")),ee((d,t,i)=>{let a=g();a.achievements.push({id:h(),categoryId:s,name:d,description:i,imageUrl:t}),b(a),u(),f()})})}),e.querySelectorAll(".btn-edit-achievement").forEach(n=>{n.addEventListener("click",()=>{let s=n.dataset.id,d=g().achievements.find(t=>t.id===s);d&&(p(Z("\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C",d)),ee((t,i,a)=>{let o=g(),l=o.achievements.find(c=>c.id===s);l&&(l.name=t,l.imageUrl=i,l.description=a),b(o),u(),f()}))})}),e.querySelectorAll(".btn-delete-achievement").forEach(n=>{n.addEventListener("click",()=>{let s=n.dataset.id,d=g(),t=d.achievements.find(a=>a.id===s);if(!t)return;let i=d.studentAchievements.filter(a=>a.achievementId===s).length;p(`
        <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C?</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-2">\xAB${y(t.name)}\xBB</p>
        ${i>0?`<p class="text-red-500 dark:text-red-400 text-sm mb-4">\u042D\u0442\u0430 \u043C\u0435\u0434\u0430\u043B\u044C \u0432\u044B\u0434\u0430\u043D\u0430 ${i} \u0440\u0430\u0437 \u2014 \u0432\u0441\u0435 \u0437\u0430\u043F\u0438\u0441\u0438 \u0431\u0443\u0434\u0443\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u044B.</p>`:'<p class="mb-4"></p>'}
        <div class="flex gap-3 justify-end">
          <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100
            dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
          <button id="modal-confirm" class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>
        </div>
      `),document.getElementById("modal-cancel")?.addEventListener("click",u),document.getElementById("modal-confirm")?.addEventListener("click",()=>{let a=g();a.achievements=a.achievements.filter(o=>o.id!==s),a.studentAchievements=a.studentAchievements.filter(o=>o.achievementId!==s),b(a),u(),f()})})}),e.querySelectorAll(".btn-move-up").forEach(n=>{n.addEventListener("click",()=>{let s=n.dataset.id,d=n.dataset.cat,t=g(),i=t.achievements.filter(c=>c.categoryId===d),a=i.findIndex(c=>c.id===s);if(a<=0)return;let o=t.achievements.indexOf(i[a]),l=t.achievements.indexOf(i[a-1]);[t.achievements[o],t.achievements[l]]=[t.achievements[l],t.achievements[o]],b(t),f()})}),e.querySelectorAll(".btn-move-down").forEach(n=>{n.addEventListener("click",()=>{let s=n.dataset.id,d=n.dataset.cat,t=g(),i=t.achievements.filter(c=>c.categoryId===d),a=i.findIndex(c=>c.id===s);if(a<0||a>=i.length-1)return;let o=t.achievements.indexOf(i[a]),l=t.achievements.indexOf(i[a+1]);[t.achievements[o],t.achievements[l]]=[t.achievements[l],t.achievements[o]],b(t),f()})}),e.querySelectorAll(".btn-duplicate-achievement").forEach(n=>{n.addEventListener("click",()=>{let s=n.dataset.id,d=g(),t=d.achievements.find(o=>o.id===s);if(!t)return;let i={...t,id:h(),name:t.name+" (\u043A\u043E\u043F\u0438\u044F)"},a=d.achievements.indexOf(t);d.achievements.splice(a+1,0,i),b(d),f()})})}function y(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ne(){let e=document.getElementById("app"),r=g(),n=new Date().toISOString().slice(0,10);e.innerHTML=`
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">\u0412\u044B\u0434\u0430\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C</h1>

    ${r.students.length===0||r.achievements.length===0?`
      <div class="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6 text-yellow-800 dark:text-yellow-200">
        <p class="font-medium mb-1">\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0434\u0430\u043D\u043D\u044B\u0445</p>
        <p class="text-sm">
          ${r.students.length===0?"\u2022 \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0443\u0447\u0435\u043D\u0438\u043A\u043E\u0432<br>":""}
          ${r.achievements.length===0?"\u2022 \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043C\u0435\u0434\u0430\u043B\u0438":""}
        </p>
      </div>
    `:`
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 max-w-lg">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\u0423\u0447\u0435\u043D\u0438\u043A</label>
          <select id="sel-student" class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2
            bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="">\u2014 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u0447\u0435\u043D\u0438\u043A\u0430 \u2014</option>
            ${r.students.map(d=>`<option value="${d.id}">${C(d.name)}</option>`).join("")}
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\u041C\u0435\u0434\u0430\u043B\u044C</label>
          <select id="sel-achievement" class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2
            bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="">\u2014 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0434\u0430\u043B\u044C \u2014</option>
            ${r.categories.map(d=>{let t=r.achievements.filter(i=>i.categoryId===d.id);return t.length===0?"":`
                <optgroup label="${C(d.name)}">
                  ${t.map(i=>`<option value="${i.id}">${C(i.name)}</option>`).join("")}
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
  `;let s=document.getElementById("sel-achievement");s?.addEventListener("change",()=>{let d=s.value,t=document.getElementById("assign-preview");if(!d){t.classList.add("hidden");return}let a=g().achievements.find(o=>o.id===d);a&&(document.getElementById("preview-img").src=a.imageUrl,document.getElementById("preview-name").textContent=a.name,document.getElementById("preview-desc").textContent=a.description||"",t.classList.remove("hidden"))}),document.getElementById("btn-assign")?.addEventListener("click",()=>{let d=document.getElementById("sel-student").value,t=document.getElementById("sel-achievement").value,i=document.getElementById("inp-date").value,a=document.getElementById("assign-msg");if(!d||!t||!i){ae(a,"\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432\u0441\u0435 \u043F\u043E\u043B\u044F","error");return}let o=g();o.studentAchievements.push({id:h(),studentId:d,achievementId:t,grantedAt:i}),b(o);let l=o.students.find(m=>m.id===d),c=o.achievements.find(m=>m.id===t);ae(a,`\u2713 \xAB${c?.name}\xBB \u0432\u044B\u0434\u0430\u043D\u0430 \u0443\u0447\u0435\u043D\u0438\u043A\u0443 ${l?.name}`,"success"),document.getElementById("sel-student").value="",document.getElementById("sel-achievement").value="",document.getElementById("assign-preview")?.classList.add("hidden")})}function ae(e,r,n){e.className=`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${n==="success"?"bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300":"bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300"}`,e.textContent=r,e.classList.remove("hidden"),setTimeout(()=>e.classList.add("hidden"),4e3)}function C(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function M(e){let r=e.id,n=document.getElementById("app"),s=g(),d=s.students.find(m=>m.id===r);if(!d){n.innerHTML=`
      <div class="text-center py-20 text-gray-400 dark:text-gray-500">
        <p class="text-lg">\u0423\u0447\u0435\u043D\u0438\u043A \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.</p>
        <button id="btn-back-notfound" class="mt-4 text-indigo-600 hover:underline">\u2190 \u041D\u0430\u0437\u0430\u0434 \u043A \u0443\u0447\u0435\u043D\u0438\u043A\u0430\u043C</button>
      </div>
    `,document.getElementById("btn-back-notfound")?.addEventListener("click",()=>E("/students"));return}let t=new URLSearchParams(window.location.hash.split("?")[1]||"").get("filter")||"all",i=new Date,a=s.studentAchievements.filter(m=>{if(m.studentId!==r)return!1;if(t==="all")return!0;let v=new Date(m.grantedAt);if(t==="year")return v.getFullYear()===i.getFullYear();if(t==="month")return v.getFullYear()===i.getFullYear()&&v.getMonth()===i.getMonth();if(t==="week"){let x=new Date(i);return x.setDate(i.getDate()-i.getDay()),x.setHours(0,0,0,0),v>=x}return t==="day"?v.toDateString()===i.toDateString():!0}),o={};for(let m of a)o[m.achievementId]||(o[m.achievementId]={count:0,dates:[]}),o[m.achievementId].count++,o[m.achievementId].dates.push(m.grantedAt);let l=a.length,c=[{label:"\u0412\u0441\u0451 \u0432\u0440\u0435\u043C\u044F",value:"all"},{label:"\u0413\u043E\u0434",value:"year"},{label:"\u041C\u0435\u0441\u044F\u0446",value:"month"},{label:"\u041D\u0435\u0434\u0435\u043B\u044F",value:"week"},{label:"\u0414\u0435\u043D\u044C",value:"day"}];n.innerHTML=`
    <div class="mb-4">
      <button id="btn-back" class="text-indigo-600 dark:text-indigo-400 hover:underline text-sm">\u2190 \u0412\u0441\u0435 \u0443\u0447\u0435\u043D\u0438\u043A\u0438</button>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">${B(d.name)}</h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D: ${re(d.createdAt)}</p>
        </div>
        <div class="flex items-start gap-3">
          <button id="btn-assign-medal"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition text-sm flex items-center gap-1.5">
            \u{1F3C6} \u0412\u044B\u0434\u0430\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C
          </button>
          <div class="text-right">
            <div class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">${l}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">\u043C\u0435\u0434\u0430\u043B\u0435\u0439 \u0437\u0430 \u043F\u0435\u0440\u0438\u043E\u0434</div>
          </div>
        </div>
      </div>

      <!-- Date filters -->
      <div class="flex gap-2 mt-5 flex-wrap">
        ${c.map(m=>`
          <button class="filter-btn px-3 py-1 rounded-full text-sm font-medium transition
            ${t===m.value?"bg-indigo-600 text-white":"bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}"
            data-filter="${m.value}">${m.label}</button>
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
        ${Object.entries(o).map(([m,v])=>{let x=s.achievements.find(ie=>ie.id===m);if(!x)return"";let _=v.dates.sort().reverse()[0];return`
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex items-center gap-4">
              <div class="relative flex-shrink-0">
                <img src="${B(x.imageUrl)}" alt=""
                  class="w-16 h-16 object-cover rounded-xl bg-gray-100 dark:bg-gray-700"
                  onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><text y=%2228%22 font-size=%2228%22>\u{1F3C5}</text></svg>'" />
                ${v.count>1?`
                  <span class="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold
                    rounded-full w-6 h-6 flex items-center justify-center shadow">
                    ${v.count}
                  </span>
                `:""}
              </div>
              <div class="min-w-0">
                ${v.count>1?`<div class="text-xs text-indigo-500 dark:text-indigo-400 font-semibold mb-0.5">${v.count} \xD7</div>`:""}
                <div class="font-semibold text-gray-800 dark:text-gray-100 leading-tight">${B(x.name)}</div>
                ${x.description?`<div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">${B(x.description)}</div>`:""}
                <div class="text-xs text-gray-400 dark:text-gray-500 mt-1">\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F: ${re(_)}</div>
              </div>
            </div>
          `}).join("")}
      </div>
    `}
  `,document.getElementById("btn-back")?.addEventListener("click",()=>E("/students")),document.getElementById("btn-assign-medal")?.addEventListener("click",()=>{S(r,()=>M(e))}),n.querySelectorAll(".filter-btn").forEach(m=>{m.addEventListener("click",()=>{let v=m.dataset.filter,x=v==="all"?`/profile/${r}`:`/profile/${r}?filter=${v}`;window.location.hash.slice(1)===x?M(e):window.location.hash=x})})}function B(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function re(e){return new Date(e).toLocaleDateString("ru-RU")}function U(){let e=document.getElementById("app"),r=g(),n={students:r.students.length,categories:r.categories.length,achievements:r.achievements.length,records:r.studentAchievements.length};e.innerHTML=`
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
  `,document.getElementById("btn-export")?.addEventListener("click",V),document.getElementById("btn-import")?.addEventListener("click",()=>{let s=document.getElementById("inp-import"),d=document.getElementById("import-msg"),t=s.files?.[0];if(!t){R(d,"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B","error");return}let i=new FileReader;i.onload=()=>{try{W(i.result),R(d,"\u2713 \u0414\u0430\u043D\u043D\u044B\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u043C\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u044B","success"),s.value="",setTimeout(()=>U(),1200)}catch(a){let o=a instanceof Error?a.message:"\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430";R(d,`\u041E\u0448\u0438\u0431\u043A\u0430: ${o}`,"error")}},i.readAsText(t)})}function R(e,r,n){e.className=`mb-3 px-4 py-2 rounded-lg text-sm font-medium ${n==="success"?"bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300":"bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300"}`,e.textContent=r,e.classList.remove("hidden")}var N=document.getElementById("btn-theme");function de(){N&&(N.textContent=H()==="dark"?"\u2600\uFE0F":"\u{1F319}")}de();N?.addEventListener("click",()=>{K(H()==="dark"?"light":"dark"),de()});w("/students",()=>k());w("/achievements",()=>f());w("/assign",()=>ne());w("/profile/:id",e=>M(e));w("/import-export",()=>U());w("/",()=>E("/students"));P();})();
