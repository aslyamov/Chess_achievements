"use strict";(()=>{var N=[];function k(e,r){let t=[],i=new RegExp("^"+e.replace(/:([^/]+)/g,(n,a)=>(t.push(a),"([^/]+)"))+"/?$");N.push({pattern:i,keys:t,handler:r})}function w(e){window.location.hash=e}function U(){let r=(window.location.hash.slice(1)||"/").split("?")[0];for(let t of N){let i=r.match(t.pattern);if(i){let n={};t.keys.forEach((a,s)=>{n[a]=i[s+1]}),t.handler(n),re(r);return}}}function re(e){document.querySelectorAll(".nav-link").forEach(r=>{let t=r.getAttribute("href")?.slice(1)??"";r.classList.toggle("active",e.startsWith(t)&&t!=="/")})}function _(){window.addEventListener("hashchange",U),U()}var J="chess_achievements_data",F={students:[],categories:[],achievements:[],studentAchievements:[]};function g(){try{let e=localStorage.getItem(J);return e?JSON.parse(e):{...F}}catch{return{...F}}}function b(e){localStorage.setItem(J,JSON.stringify(e))}function P(){let e=g(),r=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),t=URL.createObjectURL(r),i=document.createElement("a");i.href=t,i.download=`chess_achievements_${new Date().toISOString().slice(0,10)}.json`,i.click(),URL.revokeObjectURL(t)}function z(e){let r=JSON.parse(e);if(!Array.isArray(r.students)||!Array.isArray(r.categories)||!Array.isArray(r.achievements)||!Array.isArray(r.studentAchievements))throw new Error("\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0444\u0430\u0439\u043B\u0430");b(r)}function h(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}function M(){return localStorage.getItem("chess_theme")||"light"}function Y(e){localStorage.setItem("chess_theme",e),e==="dark"?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}function V(){return localStorage.getItem("chess_student_view")||"cards"}function S(e){localStorage.setItem("chess_student_view",e)}var L=()=>document.getElementById("modal-overlay"),W=()=>document.getElementById("modal-box");function p(e){W().innerHTML=e,L().classList.remove("hidden"),L().classList.add("flex")}function u(){L().classList.add("hidden"),L().classList.remove("flex"),W().innerHTML=""}document.addEventListener("DOMContentLoaded",()=>{L().addEventListener("click",e=>{e.target===L()&&u()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&u()})});function $(e,r){let t=g(),i=t.students.find(o=>o.id===e);if(!i)return;if(!(t.achievements.length>0)){p(`
      <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">\u041D\u0435\u0442 \u043C\u0435\u0434\u0430\u043B\u0435\u0439</h2>
      <p class="text-gray-600 dark:text-gray-300 mb-5">\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043C\u0435\u0434\u0430\u043B\u0438 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \xAB\u041C\u0435\u0434\u0430\u043B\u0438\xBB.</p>
      <div class="flex justify-end">
        <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">\u0417\u0430\u043A\u0440\u044B\u0442\u044C</button>
      </div>
    `),document.getElementById("modal-cancel")?.addEventListener("click",u);return}let a=new Date().toISOString().slice(0,10),s=t.categories.map(o=>{let l=t.achievements.filter(c=>c.categoryId===o.id);return l.length===0?"":`
      <div class="mb-4">
        <h3 class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
          ${I(o.name)}
        </h3>
        <div class="grid grid-cols-4 gap-2">
          ${l.map(c=>`
            <button type="button"
              class="medal-pick-btn relative group flex flex-col items-center p-2 rounded-xl
                     border-2 border-transparent hover:border-indigo-400
                     hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all text-center"
              data-id="${c.id}">
              <img src="${I(c.imageUrl)}" alt=""
                class="w-12 h-12 object-contain mb-1 pointer-events-none"
                onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><text y=%2228%22 font-size=%2228%22>\u{1F3C5}</text></svg>'" />
              <span class="text-xs text-gray-700 dark:text-gray-300 leading-tight pointer-events-none line-clamp-2">
                ${I(c.name)}
              </span>
              ${c.description?`
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1.5
                            bg-gray-900 text-white text-xs rounded-lg w-36 text-center
                            hidden group-hover:block z-20 pointer-events-none shadow-lg">
                  ${I(c.description)}
                  <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              `:""}
            </button>
          `).join("")}
        </div>
      </div>
    `}).join("");p(`
    <h2 class="text-xl font-bold mb-0.5 text-gray-800 dark:text-gray-100">\u0412\u044B\u0434\u0430\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C</h2>
    <p class="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-4">${I(i.name)}</p>

    <div class="mb-3">${s}</div>

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
    <input id="modal-ach-date" type="date" value="${a}"
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
  `);let d="";document.querySelectorAll(".medal-pick-btn").forEach(o=>{o.addEventListener("click",()=>{d=o.dataset.id;let l=g().achievements.find(c=>c.id===d);document.querySelectorAll(".medal-pick-btn").forEach(c=>{c.classList.remove("border-indigo-500","bg-indigo-50","dark:bg-indigo-900/30"),c.classList.add("border-transparent")}),o.classList.remove("border-transparent"),o.classList.add("border-indigo-500","bg-indigo-50"),l&&(document.getElementById("assign-sel-img").src=l.imageUrl,document.getElementById("assign-sel-name").textContent=l.name,document.getElementById("assign-selected").classList.remove("hidden")),document.getElementById("modal-assign-err").classList.add("hidden")})}),document.getElementById("modal-cancel")?.addEventListener("click",u),document.getElementById("modal-assign-save")?.addEventListener("click",()=>{if(!d){document.getElementById("modal-assign-err").classList.remove("hidden");return}let o=document.getElementById("modal-ach-date").value,l=g();l.studentAchievements.push({id:h(),studentId:e,achievementId:d,grantedAt:o}),b(l),u(),r()})}function I(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function E(){let e=document.getElementById("app"),r=g(),t=V();e.innerHTML=`
    <div class="flex items-center justify-between mb-6 gap-3 flex-wrap">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">\u0423\u0447\u0435\u043D\u0438\u043A\u0438</h1>
      <div class="flex items-center gap-2">
        <!-- View toggle -->
        <div class="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-0.5 gap-0.5">
          <button id="btn-view-cards" title="\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0438"
            class="px-3 py-1.5 rounded-md text-sm font-medium transition
              ${t==="cards"?"bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 shadow-sm":"text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}">
            \u25A6
          </button>
          <button id="btn-view-table" title="\u0422\u0430\u0431\u043B\u0438\u0446\u0430"
            class="px-3 py-1.5 rounded-md text-sm font-medium transition
              ${t==="table"?"bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 shadow-sm":"text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}">
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
    `:t==="cards"?de(r):ie(r)}
  `,document.getElementById("btn-view-cards")?.addEventListener("click",()=>{S("cards"),E()}),document.getElementById("btn-view-table")?.addEventListener("click",()=>{S("table"),E()}),document.getElementById("btn-add-student")?.addEventListener("click",()=>{p(`
      <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">\u041D\u043E\u0432\u044B\u0439 \u0443\u0447\u0435\u043D\u0438\u043A</h2>
      <input id="modal-student-name" type="text" placeholder="\u0418\u043C\u044F \u0443\u0447\u0435\u043D\u0438\u043A\u0430"
        class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-4
               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
               focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      <div class="flex gap-3 justify-end">
        <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
        <button id="modal-save" class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>
      </div>
    `),document.getElementById("modal-cancel")?.addEventListener("click",u);let i=document.getElementById("modal-student-name");i.focus(),i.addEventListener("keydown",a=>{a.key==="Enter"&&n()}),document.getElementById("modal-save")?.addEventListener("click",n);function n(){let a=i.value.trim();if(!a){i.classList.add("border-red-400");return}let s=g();s.students.push({id:h(),name:a,createdAt:new Date().toISOString()}),b(s),u(),E()}}),e.querySelectorAll(".btn-delete-student").forEach(i=>{i.addEventListener("click",n=>{n.stopPropagation();let a=i.dataset.id,d=g().students.find(o=>o.id===a);d&&(p(`
        <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0443\u0447\u0435\u043D\u0438\u043A\u0430?</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-5">\xAB${H(d.name)}\xBB \u0438 \u0432\u0441\u0435 \u0435\u0433\u043E \u043C\u0435\u0434\u0430\u043B\u0438 \u0431\u0443\u0434\u0443\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u044B.</p>
        <div class="flex gap-3 justify-end">
          <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
          <button id="modal-confirm" class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>
        </div>
      `),document.getElementById("modal-cancel")?.addEventListener("click",u),document.getElementById("modal-confirm")?.addEventListener("click",()=>{let o=g();o.students=o.students.filter(l=>l.id!==a),o.studentAchievements=o.studentAchievements.filter(l=>l.studentId!==a),b(o),u(),E()}))})}),e.querySelectorAll(".btn-open-profile").forEach(i=>{i.addEventListener("click",()=>{w(`/profile/${i.dataset.id}`)})}),e.querySelectorAll(".btn-assign").forEach(i=>{i.addEventListener("click",n=>{n.stopPropagation();let a=i.dataset.id;$(a,()=>E())})})}function de(e){return`
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      ${e.students.map(r=>{let t=e.studentAchievements.filter(i=>i.studentId===r.id).length;return`
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex flex-col gap-3 hover:shadow-md transition">
            <div class="flex items-center justify-between">
              <button class="btn-open-profile font-semibold text-lg text-gray-800 dark:text-gray-100 text-left hover:text-indigo-600 dark:hover:text-indigo-400 transition" data-id="${r.id}">
                ${H(r.name)}
              </button>
              <div class="flex items-center gap-1">
                <button class="btn-assign text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition text-xl" data-id="${r.id}" title="\u0412\u044B\u0434\u0430\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C">\u{1F3C6}</button>
                <button class="btn-delete-student text-red-400 hover:text-red-600 transition text-xl" data-id="${r.id}" title="\u0423\u0434\u0430\u043B\u0438\u0442\u044C">\u2715</button>
              </div>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              \u041C\u0435\u0434\u0430\u043B\u0435\u0439: <span class="font-medium text-indigo-600 dark:text-indigo-400">${t}</span>
            </div>
            <div class="text-xs text-gray-400 dark:text-gray-500">${K(r.createdAt)}</div>
          </div>
        `}).join("")}
    </div>
  `}function ie(e){return`
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
          ${e.students.map(r=>{let t=e.studentAchievements.filter(i=>i.studentId===r.id).length;return`
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                <td class="px-5 py-3">
                  <button class="btn-open-profile font-medium text-gray-800 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-left" data-id="${r.id}">
                    ${H(r.name)}
                  </button>
                </td>
                <td class="px-4 py-3 text-center">
                  <span class="font-semibold text-indigo-600 dark:text-indigo-400">${t}</span>
                </td>
                <td class="px-4 py-3 text-gray-400 dark:text-gray-500 hidden sm:table-cell">${K(r.createdAt)}</td>
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
  `}function H(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function K(e){return new Date(e).toLocaleDateString("ru-RU")}var T=[{hex:"#f59e0b",label:"\u0417\u043E\u043B\u043E\u0442\u043E"},{hex:"#94a3b8",label:"\u0421\u0435\u0440\u0435\u0431\u0440\u043E"},{hex:"#b45309",label:"\u0411\u0440\u043E\u043D\u0437\u0430"},{hex:"#3b82f6",label:"\u0421\u0438\u043D\u0438\u0439"},{hex:"#ef4444",label:"\u041A\u0440\u0430\u0441\u043D\u044B\u0439"},{hex:"#22c55e",label:"\u0417\u0435\u043B\u0451\u043D\u044B\u0439"},{hex:"#a855f7",label:"\u0424\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439"},{hex:"#475569",label:"\u0422\u0451\u043C\u043D\u044B\u0439"}],oe=[{name:"trophy",label:"\u041A\u0443\u0431\u043E\u043A"},{name:"trophy-cup",label:"\u041A\u0443\u0431\u043E\u043A 2"},{name:"laurel-crown",label:"\u041B\u0430\u0432\u0440\u043E\u0432\u044B\u0439 \u0432\u0435\u043D\u043E\u043A"},{name:"crown",label:"\u041A\u043E\u0440\u043E\u043D\u0430"},{name:"medal",label:"\u041C\u0435\u0434\u0430\u043B\u044C"},{name:"podium",label:"\u041F\u044C\u0435\u0434\u0435\u0441\u0442\u0430\u043B"},{name:"rank-1",label:"1 \u043C\u0435\u0441\u0442\u043E"},{name:"rank-2",label:"2 \u043C\u0435\u0441\u0442\u043E"},{name:"rank-3",label:"3 \u043C\u0435\u0441\u0442\u043E"},{name:"gold-bar",label:"\u0421\u043B\u0438\u0442\u043E\u043A"},{name:"diamond-trophy",label:"\u0411\u0440\u0438\u043B\u043B. \u043A\u0443\u0431\u043E\u043A"},{name:"open-treasure-chest",label:"\u0421\u0443\u043D\u0434\u0443\u043A"},{name:"round-star",label:"\u0417\u0432\u0435\u0437\u0434\u0430"},{name:"falling-star",label:"\u041F\u0430\u0434\u0430\u044E\u0449\u0430\u044F \u0437\u0432\u0435\u0437\u0434\u0430"},{name:"star-formation",label:"\u0421\u043E\u0437\u0432\u0435\u0437\u0434\u0438\u0435"},{name:"star-medal",label:"\u041C\u0435\u0434\u0430\u043B\u044C-\u0437\u0432\u0435\u0437\u0434\u0430"},{name:"sparkles",label:"\u0418\u0441\u043A\u0440\u044B"},{name:"chess-queen",label:"\u0424\u0435\u0440\u0437\u044C"},{name:"chess-king",label:"\u041A\u043E\u0440\u043E\u043B\u044C"},{name:"chess-knight",label:"\u041A\u043E\u043D\u044C"},{name:"chess-rook",label:"\u041B\u0430\u0434\u044C\u044F"},{name:"chess-bishop",label:"\u0421\u043B\u043E\u043D"},{name:"chess-pawn",label:"\u041F\u0435\u0448\u043A\u0430"},{name:"graduate-cap",label:"\u0410\u043A\u0430\u0434. \u0448\u0430\u043F\u043A\u0430"},{name:"diploma",label:"\u0414\u0438\u043F\u043B\u043E\u043C"},{name:"open-book",label:"\u041A\u043D\u0438\u0433\u0430"},{name:"brain",label:"\u041C\u043E\u0437\u0433"},{name:"idea",label:"\u0418\u0434\u0435\u044F"},{name:"upgrade",label:"\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441"},{name:"level-end-flag",label:"\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0432\u0432\u0435\u0440\u0445"},{name:"lightning-trio",label:"\u041C\u043E\u043B\u043D\u0438\u044F"},{name:"fire",label:"\u041E\u0433\u043E\u043D\u044C"},{name:"rocket",label:"\u0420\u0430\u043A\u0435\u0442\u0430"},{name:"fist",label:"\u041A\u0443\u043B\u0430\u043A"},{name:"thunder-struck",label:"\u0413\u0440\u043E\u043C"},{name:"sprint",label:"\u0421\u043F\u0440\u0438\u043D\u0442"},{name:"muscle-fat",label:"\u041C\u044B\u0448\u0446\u044B"},{name:"sonic-lightning",label:"\u0412\u0441\u043F\u044B\u0448\u043A\u0430"},{name:"shield",label:"\u0429\u0438\u0442"},{name:"cross-shield",label:"\u0429\u0438\u0442 \u0433\u0435\u0440\u0431"},{name:"roman-shield",label:"\u0411\u0430\u0448\u0435\u043D\u043D\u044B\u0439 \u0449\u0438\u0442"},{name:"shining-sword",label:"\u041C\u0435\u0447"},{name:"crossed-swords",label:"\u041C\u0435\u0447\u0438 \u0441\u043A\u0440\u0435\u0449."},{name:"warhammer",label:"\u041C\u043E\u043B\u043E\u0442 \u0432\u043E\u0439\u043D\u044B"},{name:"castle",label:"\u0417\u0430\u043C\u043E\u043A"},{name:"locked-fortress",label:"\u041A\u0440\u0435\u043F\u043E\u0441\u0442\u044C"},{name:"watchtower",label:"\u0411\u0430\u0448\u043D\u044F"},{name:"spartan-helmet",label:"\u0428\u043B\u0435\u043C \u0440\u044B\u0446\u0430\u0440\u044F"},{name:"lotus",label:"\u041B\u043E\u0442\u043E\u0441"},{name:"sunflower",label:"\u041F\u043E\u0434\u0441\u043E\u043B\u043D\u0443\u0445"},{name:"butterfly",label:"\u0411\u0430\u0431\u043E\u0447\u043A\u0430"},{name:"clover",label:"\u041A\u043B\u0435\u0432\u0435\u0440"},{name:"pine-tree",label:"\u0415\u043B\u044C"},{name:"oak-leaf",label:"\u0414\u0443\u0431\u043E\u0432\u044B\u0439 \u043B\u0438\u0441\u0442"},{name:"dragon-breath",label:"\u0414\u0440\u0430\u043A\u043E\u043D"},{name:"dragon-head",label:"\u0413\u043E\u043B\u043E\u0432\u0430 \u0434\u0440\u0430\u043A\u043E\u043D\u0430"},{name:"eagle-emblem",label:"\u041E\u0440\u0451\u043B"},{name:"lion",label:"\u041B\u0435\u0432"},{name:"double-dragon",label:"\u0414\u0432\u043E\u0439\u043D\u043E\u0439 \u0434\u0440\u0430\u043A\u043E\u043D"},{name:"wolf-head",label:"\u0412\u043E\u043B\u043A"},{name:"bear-head",label:"\u041C\u0435\u0434\u0432\u0435\u0434\u044C"},{name:"unicorn",label:"\u0415\u0434\u0438\u043D\u043E\u0440\u043E\u0433"},{name:"dragon-spiral",label:"\u0424\u0435\u043D\u0438\u043A\u0441"},{name:"shark-fin",label:"\u0410\u043A\u0443\u043B\u0430"},{name:"owl",label:"\u0421\u043E\u0432\u0430"},{name:"sun",label:"\u0421\u043E\u043B\u043D\u0446\u0435"},{name:"moon",label:"\u041B\u0443\u043D\u0430"},{name:"ringed-planet",label:"\u041F\u043B\u0430\u043D\u0435\u0442\u0430"},{name:"comet-spark",label:"\u041A\u043E\u043C\u0435\u0442\u0430"},{name:"ufo",label:"\u041D\u041B\u041E"},{name:"flag-objective",label:"\u0426\u0435\u043B\u044C"},{name:"compass",label:"\u041A\u043E\u043C\u043F\u0430\u0441"},{name:"corner-flag",label:"\u0424\u043B\u0430\u0433"},{name:"gems",label:"\u041A\u0440\u0438\u0441\u0442\u0430\u043B\u043B"},{name:"infinity",label:"\u0411\u0435\u0441\u043A\u043E\u043D\u0435\u0447\u043D\u043E\u0441\u0442\u044C"},{name:"eye-of-horus",label:"\u0413\u043B\u0430\u0437 \u0413\u043E\u0440\u0430"},{name:"ankh",label:"\u0410\u043D\u043A\u0445"},{name:"yin-yang",label:"\u0418\u043D\u044C-\u044F\u043D\u044C"},{name:"triquetra",label:"\u0422\u0440\u0438\u043A\u0432\u0435\u0442\u0440"},{name:"magic-swirl",label:"\u041C\u0430\u0433\u0438\u044F"}];function j(e,r){return`https://api.iconify.design/game-icons/${e}.svg?color=${encodeURIComponent(r)}`}function G(e,r={}){let t=T[0].hex,i=r.imageUrl?`<img src="${y(r.imageUrl)}" class="w-full h-full object-contain rounded-lg" />`:"\u{1F5BC}";return`
    <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">${e}</h2>

    <input id="modal-ach-name" type="text" placeholder="\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043C\u0435\u0434\u0430\u043B\u0438" value="${y(r.name??"")}"
      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-3
             bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
             focus:outline-none focus:ring-2 focus:ring-indigo-400" />

    <div class="flex items-center gap-2 mb-2">
      <div id="modal-img-preview" class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex-shrink-0
        flex items-center justify-center text-xl overflow-hidden">${i}</div>
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
        ${T.map((n,a)=>`
          <button type="button" class="color-btn w-6 h-6 rounded-full border-2 transition
            ${a===0?"border-indigo-500 ring-1 ring-indigo-500":"border-gray-300 dark:border-gray-600"}"
            style="background:${n.hex}" data-hex="${n.hex}" title="${n.label}"></button>
        `).join("")}
      </div>
      <input id="icon-search" type="text" placeholder="\u041F\u043E\u0438\u0441\u043A \u0438\u043A\u043E\u043D\u043A\u0438..."
        class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 mb-2 text-sm
               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
               focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      <div id="icon-grid" class="grid grid-cols-9 gap-0.5 max-h-44 overflow-y-auto">
        ${oe.map(n=>`
          <button type="button" class="icon-btn flex flex-col items-center p-1 rounded-lg border border-transparent
            hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition"
            data-name="${n.name}" title="${n.label}">
            <img src="${j(n.name,t)}"
              class="w-7 h-7 object-contain pointer-events-none" alt="${n.label}" />
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
  `}function Q(e){document.getElementById("modal-cancel")?.addEventListener("click",u);let r=document.getElementById("modal-ach-name"),t=document.getElementById("modal-ach-img"),i=document.getElementById("modal-ach-desc"),n=document.getElementById("modal-img-preview"),a=T[0].hex;function s(d){n.innerHTML=d?`<img src="${d}" class="w-full h-full object-contain rounded-lg" onerror="this.parentElement.innerHTML='\u{1F5BC}'" />`:"\u{1F5BC}"}t.addEventListener("input",()=>s(t.value.trim())),document.getElementById("btn-library-toggle")?.addEventListener("click",()=>{document.getElementById("icon-library").classList.toggle("hidden")}),document.querySelectorAll(".color-btn").forEach(d=>{d.addEventListener("click",()=>{a=d.dataset.hex,document.querySelectorAll(".color-btn").forEach(o=>{o.classList.remove("border-indigo-500","ring-1","ring-indigo-500"),o.classList.add("border-gray-300")}),d.classList.add("border-indigo-500","ring-1","ring-indigo-500"),d.classList.remove("border-gray-300"),document.querySelectorAll(".icon-btn img").forEach(o=>{let l=o.closest(".icon-btn").dataset.name;o.src=j(l,a)})})}),document.getElementById("icon-search")?.addEventListener("input",d=>{let o=d.target.value.toLowerCase();document.querySelectorAll(".icon-btn").forEach(l=>{let c=l,m=c.title.toLowerCase().includes(o)||c.dataset.name.includes(o);c.style.display=m?"":"none"})}),document.querySelectorAll(".icon-btn").forEach(d=>{d.addEventListener("click",()=>{let o=d.dataset.name,l=j(o,a);t.value=l,s(l),t.classList.remove("border-red-400"),document.querySelectorAll(".icon-btn").forEach(c=>c.classList.remove("border-indigo-400","bg-indigo-50")),d.classList.add("border-indigo-400","bg-indigo-50")})}),r.focus(),document.getElementById("modal-save")?.addEventListener("click",()=>{let d=r.value.trim(),o=t.value.trim();if(!d){r.classList.add("border-red-400");return}if(!o){t.classList.add("border-red-400");return}e(d,o,i.value.trim())})}function X(e){let r=!!e;p(`
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
  `),document.getElementById("modal-cancel")?.addEventListener("click",u);let t=document.getElementById("modal-cat-name");t.focus(),e&&t.select(),t.addEventListener("keydown",n=>{n.key==="Enter"&&i()}),document.getElementById("modal-save")?.addEventListener("click",i);function i(){let n=t.value.trim();if(!n){t.classList.add("border-red-400");return}let a=g();if(r&&e){let s=a.categories.find(d=>d.id===e.id);s&&(s.name=n)}else a.categories.push({id:h(),name:n});b(a),u(),f()}}function f(){let e=document.getElementById("app"),r=g();e.innerHTML=`
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
    `:r.categories.map(t=>{let i=r.achievements.filter(n=>n.categoryId===t.id);return`
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow mb-5 overflow-hidden">
          <div class="flex items-center justify-between px-5 py-4 bg-indigo-50 dark:bg-indigo-900/40
            border-b border-indigo-100 dark:border-indigo-800">
            <h2 class="font-semibold text-indigo-800 dark:text-indigo-200 text-lg">${y(t.name)}</h2>
            <div class="flex items-center gap-1">
              <button class="btn-add-achievement bg-indigo-600 text-white text-sm px-3 py-1 rounded-lg
                hover:bg-indigo-700 transition" data-cat="${t.id}">+ \u041C\u0435\u0434\u0430\u043B\u044C</button>
              <button class="btn-edit-category p-1.5 rounded-lg text-gray-400 hover:text-indigo-600
                dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition"
                data-id="${t.id}" title="\u041F\u0435\u0440\u0435\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u0442\u044C">\u270F\uFE0F</button>
              <button class="btn-delete-category p-1.5 rounded-lg text-gray-400 hover:text-red-500
                hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                data-id="${t.id}" title="\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E">\u{1F5D1}</button>
            </div>
          </div>
          ${i.length===0?`
            <div class="px-5 py-6 text-gray-400 dark:text-gray-500 text-sm">\u0412 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043C\u0435\u0434\u0430\u043B\u0435\u0439.</div>
          `:`
            <div class="divide-y divide-gray-100 dark:divide-gray-700">
              ${i.map((n,a)=>`
                <div class="flex items-center gap-4 px-5 py-3">
                  <img src="${y(n.imageUrl)}" alt=""
                    class="w-12 h-12 object-contain rounded-lg bg-gray-100 dark:bg-gray-700 flex-shrink-0 p-1"
                    onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><text y=%2228%22 font-size=%2228%22>\u{1F3C5}</text></svg>'" />
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-gray-800 dark:text-gray-100">${y(n.name)}</div>
                    ${n.description?`<div class="text-sm text-gray-500 dark:text-gray-400 truncate">${y(n.description)}</div>`:""}
                  </div>
                  <div class="flex items-center gap-1 flex-shrink-0">
                    <button class="btn-move-up p-1.5 rounded-lg transition
                      ${a===0?"text-gray-200 dark:text-gray-700 cursor-default":"text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"}"
                      data-id="${n.id}" data-cat="${t.id}" title="\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u0432\u0435\u0440\u0445" ${a===0?"disabled":""}>\u2191</button>
                    <button class="btn-move-down p-1.5 rounded-lg transition
                      ${a===i.length-1?"text-gray-200 dark:text-gray-700 cursor-default":"text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"}"
                      data-id="${n.id}" data-cat="${t.id}" title="\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u043D\u0438\u0437" ${a===i.length-1?"disabled":""}>\u2193</button>
                    <button class="btn-duplicate-achievement p-1.5 rounded-lg text-gray-400 hover:text-green-600
                      dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition"
                      data-id="${n.id}" title="\u0414\u0443\u0431\u043B\u0438\u0440\u043E\u0432\u0430\u0442\u044C">\u{1F4CB}</button>
                    <button class="btn-edit-achievement p-1.5 rounded-lg text-gray-400 hover:text-indigo-600
                      dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition"
                      data-id="${n.id}" title="\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C">\u270F\uFE0F</button>
                    <button class="btn-delete-achievement p-1.5 rounded-lg text-gray-400 hover:text-red-500
                      hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                      data-id="${n.id}" title="\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C">\u{1F5D1}</button>
                  </div>
                </div>
              `).join("")}
            </div>
          `}
        </div>
      `}).join("")}
  `,document.getElementById("btn-add-category")?.addEventListener("click",()=>X()),e.querySelectorAll(".btn-edit-category").forEach(t=>{t.addEventListener("click",()=>{let i=t.dataset.id,n=g().categories.find(a=>a.id===i);n&&X(n)})}),e.querySelectorAll(".btn-delete-category").forEach(t=>{t.addEventListener("click",()=>{let i=t.dataset.id,n=g(),a=n.categories.find(d=>d.id===i);if(!a)return;let s=n.achievements.filter(d=>d.categoryId===i).length;p(`
        <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E?</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-2">\xAB${y(a.name)}\xBB</p>
        ${s>0?`<p class="text-red-500 dark:text-red-400 text-sm mb-4">\u0411\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u043E ${s} \u043C\u0435\u0434\u0430\u043B\u0435\u0439 \u0438 \u0432\u0441\u0435 \u0432\u044B\u0434\u0430\u043D\u043D\u044B\u0435 \u043D\u0430\u0433\u0440\u0430\u0434\u044B \u044D\u0442\u043E\u0439 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438.</p>`:'<p class="mb-4"></p>'}
        <div class="flex gap-3 justify-end">
          <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100
            dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
          <button id="modal-confirm" class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>
        </div>
      `),document.getElementById("modal-cancel")?.addEventListener("click",u),document.getElementById("modal-confirm")?.addEventListener("click",()=>{let d=g(),o=d.achievements.filter(l=>l.categoryId===i).map(l=>l.id);d.categories=d.categories.filter(l=>l.id!==i),d.achievements=d.achievements.filter(l=>l.categoryId!==i),d.studentAchievements=d.studentAchievements.filter(l=>!o.includes(l.achievementId)),b(d),u(),f()})})}),e.querySelectorAll(".btn-add-achievement").forEach(t=>{t.addEventListener("click",()=>{let i=t.dataset.cat;p(G("\u041D\u043E\u0432\u0430\u044F \u043C\u0435\u0434\u0430\u043B\u044C")),Q((n,a,s)=>{let d=g();d.achievements.push({id:h(),categoryId:i,name:n,description:s,imageUrl:a}),b(d),u(),f()})})}),e.querySelectorAll(".btn-edit-achievement").forEach(t=>{t.addEventListener("click",()=>{let i=t.dataset.id,n=g().achievements.find(a=>a.id===i);n&&(p(G("\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C",n)),Q((a,s,d)=>{let o=g(),l=o.achievements.find(c=>c.id===i);l&&(l.name=a,l.imageUrl=s,l.description=d),b(o),u(),f()}))})}),e.querySelectorAll(".btn-delete-achievement").forEach(t=>{t.addEventListener("click",()=>{let i=t.dataset.id,n=g(),a=n.achievements.find(d=>d.id===i);if(!a)return;let s=n.studentAchievements.filter(d=>d.achievementId===i).length;p(`
        <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C?</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-2">\xAB${y(a.name)}\xBB</p>
        ${s>0?`<p class="text-red-500 dark:text-red-400 text-sm mb-4">\u042D\u0442\u0430 \u043C\u0435\u0434\u0430\u043B\u044C \u0432\u044B\u0434\u0430\u043D\u0430 ${s} \u0440\u0430\u0437 \u2014 \u0432\u0441\u0435 \u0437\u0430\u043F\u0438\u0441\u0438 \u0431\u0443\u0434\u0443\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u044B.</p>`:'<p class="mb-4"></p>'}
        <div class="flex gap-3 justify-end">
          <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100
            dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
          <button id="modal-confirm" class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>
        </div>
      `),document.getElementById("modal-cancel")?.addEventListener("click",u),document.getElementById("modal-confirm")?.addEventListener("click",()=>{let d=g();d.achievements=d.achievements.filter(o=>o.id!==i),d.studentAchievements=d.studentAchievements.filter(o=>o.achievementId!==i),b(d),u(),f()})})}),e.querySelectorAll(".btn-move-up").forEach(t=>{t.addEventListener("click",()=>{let i=t.dataset.id,n=t.dataset.cat,a=g(),s=a.achievements.filter(c=>c.categoryId===n),d=s.findIndex(c=>c.id===i);if(d<=0)return;let o=a.achievements.indexOf(s[d]),l=a.achievements.indexOf(s[d-1]);[a.achievements[o],a.achievements[l]]=[a.achievements[l],a.achievements[o]],b(a),f()})}),e.querySelectorAll(".btn-move-down").forEach(t=>{t.addEventListener("click",()=>{let i=t.dataset.id,n=t.dataset.cat,a=g(),s=a.achievements.filter(c=>c.categoryId===n),d=s.findIndex(c=>c.id===i);if(d<0||d>=s.length-1)return;let o=a.achievements.indexOf(s[d]),l=a.achievements.indexOf(s[d+1]);[a.achievements[o],a.achievements[l]]=[a.achievements[l],a.achievements[o]],b(a),f()})}),e.querySelectorAll(".btn-duplicate-achievement").forEach(t=>{t.addEventListener("click",()=>{let i=t.dataset.id,n=g(),a=n.achievements.find(o=>o.id===i);if(!a)return;let s={...a,id:h(),name:a.name+" (\u043A\u043E\u043F\u0438\u044F)"},d=n.achievements.indexOf(a);n.achievements.splice(d+1,0,s),b(n),f()})})}function y(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ee(){let e=document.getElementById("app"),r=g(),t=new Date().toISOString().slice(0,10);e.innerHTML=`
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
            ${r.students.map(n=>`<option value="${n.id}">${D(n.name)}</option>`).join("")}
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\u041C\u0435\u0434\u0430\u043B\u044C</label>
          <select id="sel-achievement" class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2
            bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="">\u2014 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0434\u0430\u043B\u044C \u2014</option>
            ${r.categories.map(n=>{let a=r.achievements.filter(s=>s.categoryId===n.id);return a.length===0?"":`
                <optgroup label="${D(n.name)}">
                  ${a.map(s=>`<option value="${s.id}">${D(s.name)}</option>`).join("")}
                </optgroup>
              `}).join("")}
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\u0414\u0430\u0442\u0430 \u0432\u044B\u0434\u0430\u0447\u0438</label>
          <input id="inp-date" type="date" value="${t}"
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
  `;let i=document.getElementById("sel-achievement");i?.addEventListener("change",()=>{let n=i.value,a=document.getElementById("assign-preview");if(!n){a.classList.add("hidden");return}let d=g().achievements.find(o=>o.id===n);d&&(document.getElementById("preview-img").src=d.imageUrl,document.getElementById("preview-name").textContent=d.name,document.getElementById("preview-desc").textContent=d.description||"",a.classList.remove("hidden"))}),document.getElementById("btn-assign")?.addEventListener("click",()=>{let n=document.getElementById("sel-student").value,a=document.getElementById("sel-achievement").value,s=document.getElementById("inp-date").value,d=document.getElementById("assign-msg");if(!n||!a||!s){Z(d,"\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432\u0441\u0435 \u043F\u043E\u043B\u044F","error");return}let o=g();o.studentAchievements.push({id:h(),studentId:n,achievementId:a,grantedAt:s}),b(o);let l=o.students.find(m=>m.id===n),c=o.achievements.find(m=>m.id===a);Z(d,`\u2713 \xAB${c?.name}\xBB \u0432\u044B\u0434\u0430\u043D\u0430 \u0443\u0447\u0435\u043D\u0438\u043A\u0443 ${l?.name}`,"success"),document.getElementById("sel-student").value="",document.getElementById("sel-achievement").value="",document.getElementById("assign-preview")?.classList.add("hidden")})}function Z(e,r,t){e.className=`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${t==="success"?"bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300":"bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300"}`,e.textContent=r,e.classList.remove("hidden"),setTimeout(()=>e.classList.add("hidden"),4e3)}function D(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function B(e){let r=e.id,t=document.getElementById("app"),i=g(),n=i.students.find(m=>m.id===r);if(!n){t.innerHTML=`
      <div class="text-center py-20 text-gray-400 dark:text-gray-500">
        <p class="text-lg">\u0423\u0447\u0435\u043D\u0438\u043A \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.</p>
        <button id="btn-back-notfound" class="mt-4 text-indigo-600 hover:underline">\u2190 \u041D\u0430\u0437\u0430\u0434 \u043A \u0443\u0447\u0435\u043D\u0438\u043A\u0430\u043C</button>
      </div>
    `,document.getElementById("btn-back-notfound")?.addEventListener("click",()=>w("/students"));return}let a=new URLSearchParams(window.location.hash.split("?")[1]||"").get("filter")||"all",s=new Date,d=i.studentAchievements.filter(m=>{if(m.studentId!==r)return!1;if(a==="all")return!0;let v=new Date(m.grantedAt);if(a==="year")return v.getFullYear()===s.getFullYear();if(a==="month")return v.getFullYear()===s.getFullYear()&&v.getMonth()===s.getMonth();if(a==="week"){let x=new Date(s);return x.setDate(s.getDate()-s.getDay()),x.setHours(0,0,0,0),v>=x}return a==="day"?v.toDateString()===s.toDateString():!0}),o={};for(let m of d)o[m.achievementId]||(o[m.achievementId]={count:0,dates:[]}),o[m.achievementId].count++,o[m.achievementId].dates.push(m.grantedAt);let l=d.length,c=[{label:"\u0412\u0441\u0451 \u0432\u0440\u0435\u043C\u044F",value:"all"},{label:"\u0413\u043E\u0434",value:"year"},{label:"\u041C\u0435\u0441\u044F\u0446",value:"month"},{label:"\u041D\u0435\u0434\u0435\u043B\u044F",value:"week"},{label:"\u0414\u0435\u043D\u044C",value:"day"}];t.innerHTML=`
    <div class="mb-4">
      <button id="btn-back" class="text-indigo-600 dark:text-indigo-400 hover:underline text-sm">\u2190 \u0412\u0441\u0435 \u0443\u0447\u0435\u043D\u0438\u043A\u0438</button>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">${A(n.name)}</h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D: ${te(n.createdAt)}</p>
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
            ${a===m.value?"bg-indigo-600 text-white":"bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}"
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
        ${Object.entries(o).map(([m,v])=>{let x=i.achievements.find(ne=>ne.id===m);if(!x)return"";let C=v.dates.sort().reverse()[0];return`
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex items-center gap-4">
              <div class="relative flex-shrink-0">
                <img src="${A(x.imageUrl)}" alt=""
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
                <div class="font-semibold text-gray-800 dark:text-gray-100 leading-tight">${A(x.name)}</div>
                ${x.description?`<div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">${A(x.description)}</div>`:""}
                <div class="text-xs text-gray-400 dark:text-gray-500 mt-1">\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F: ${te(C)}</div>
              </div>
            </div>
          `}).join("")}
      </div>
    `}
  `,document.getElementById("btn-back")?.addEventListener("click",()=>w("/students")),document.getElementById("btn-assign-medal")?.addEventListener("click",()=>{$(r,()=>B(e))}),t.querySelectorAll(".filter-btn").forEach(m=>{m.addEventListener("click",()=>{let v=m.dataset.filter,x=v==="all"?`/profile/${r}`:`/profile/${r}?filter=${v}`;window.location.hash.slice(1)===x?B(e):window.location.hash=x})})}function A(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function te(e){return new Date(e).toLocaleDateString("ru-RU")}function q(){let e=document.getElementById("app"),r=g(),t={students:r.students.length,categories:r.categories.length,achievements:r.achievements.length,records:r.studentAchievements.length};e.innerHTML=`
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">\u0418\u043C\u043F\u043E\u0440\u0442 / \u042D\u043A\u0441\u043F\u043E\u0440\u0442</h1>

    <div class="grid gap-6 sm:grid-cols-2 max-w-2xl">

      <!-- Export -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0434\u0430\u043D\u043D\u044B\u0445</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0432\u0441\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0432 JSON-\u0444\u0430\u0439\u043B</p>

        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <div class="flex justify-between"><span>\u0423\u0447\u0435\u043D\u0438\u043A\u043E\u0432:</span><span class="font-medium">${t.students}</span></div>
          <div class="flex justify-between"><span>\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439:</span><span class="font-medium">${t.categories}</span></div>
          <div class="flex justify-between"><span>\u041C\u0435\u0434\u0430\u043B\u0435\u0439:</span><span class="font-medium">${t.achievements}</span></div>
          <div class="flex justify-between"><span>\u0412\u044B\u0434\u0430\u043D\u043D\u044B\u0445 \u043D\u0430\u0433\u0440\u0430\u0434:</span><span class="font-medium">${t.records}</span></div>
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
  `,document.getElementById("btn-export")?.addEventListener("click",P),document.getElementById("btn-import")?.addEventListener("click",()=>{let i=document.getElementById("inp-import"),n=document.getElementById("import-msg"),a=i.files?.[0];if(!a){O(n,"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B","error");return}let s=new FileReader;s.onload=()=>{try{z(s.result),O(n,"\u2713 \u0414\u0430\u043D\u043D\u044B\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u043C\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u044B","success"),i.value="",setTimeout(()=>q(),1200)}catch(d){let o=d instanceof Error?d.message:"\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430";O(n,`\u041E\u0448\u0438\u0431\u043A\u0430: ${o}`,"error")}},s.readAsText(a)})}function O(e,r,t){e.className=`mb-3 px-4 py-2 rounded-lg text-sm font-medium ${t==="success"?"bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300":"bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300"}`,e.textContent=r,e.classList.remove("hidden")}var R=document.getElementById("btn-theme");function ae(){R&&(R.textContent=M()==="dark"?"\u2600\uFE0F":"\u{1F319}")}ae();R?.addEventListener("click",()=>{Y(M()==="dark"?"light":"dark"),ae()});k("/students",()=>E());k("/achievements",()=>f());k("/assign",()=>ee());k("/profile/:id",e=>B(e));k("/import-export",()=>q());k("/",()=>w("/students"));_();})();
