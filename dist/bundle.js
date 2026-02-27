"use strict";(()=>{var C=[];function f(e,t){let a=[],d=new RegExp("^"+e.replace(/:([^/]+)/g,(n,i)=>(a.push(i),"([^/]+)"))+"/?$");C.push({pattern:d,keys:a,handler:t})}function k(e){window.location.hash=e}function q(){let t=(window.location.hash.slice(1)||"/").split("?")[0];for(let a of C){let d=t.match(a.pattern);if(d){let n={};a.keys.forEach((i,s)=>{n[i]=d[s+1]}),a.handler(n),ae(t);return}}}function ae(e){document.querySelectorAll(".nav-link").forEach(t=>{let a=t.getAttribute("href")?.slice(1)??"";t.classList.toggle("active",e.startsWith(a)&&a!=="/")})}function U(){window.addEventListener("hashchange",q),q()}var _="chess_achievements_data",N={students:[],categories:[],achievements:[],studentAchievements:[]};function c(){try{let e=localStorage.getItem(_);return e?JSON.parse(e):{...N}}catch{return{...N}}}function x(e){localStorage.setItem(_,JSON.stringify(e))}function F(){let e=c(),t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),a=URL.createObjectURL(t),d=document.createElement("a");d.href=a,d.download=`chess_achievements_${new Date().toISOString().slice(0,10)}.json`,d.click(),URL.revokeObjectURL(a)}function J(e){let t=JSON.parse(e);if(!Array.isArray(t.students)||!Array.isArray(t.categories)||!Array.isArray(t.achievements)||!Array.isArray(t.studentAchievements))throw new Error("\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0444\u0430\u0439\u043B\u0430");x(t)}function h(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}function A(){return localStorage.getItem("chess_theme")||"light"}function P(e){localStorage.setItem("chess_theme",e),e==="dark"?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}function Y(){return localStorage.getItem("chess_student_view")||"cards"}function B(e){localStorage.setItem("chess_student_view",e)}var L=()=>document.getElementById("modal-overlay"),z=()=>document.getElementById("modal-box");function v(e){z().innerHTML=e,L().classList.remove("hidden"),L().classList.add("flex")}function m(){L().classList.add("hidden"),L().classList.remove("flex"),z().innerHTML=""}document.addEventListener("DOMContentLoaded",()=>{L().addEventListener("click",e=>{e.target===L()&&m()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&m()})});function w(){let e=document.getElementById("app"),t=c(),a=Y();e.innerHTML=`
    <div class="flex items-center justify-between mb-6 gap-3 flex-wrap">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">\u0423\u0447\u0435\u043D\u0438\u043A\u0438</h1>
      <div class="flex items-center gap-2">
        <!-- View toggle -->
        <div class="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-0.5 gap-0.5">
          <button id="btn-view-cards" title="\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0438"
            class="px-3 py-1.5 rounded-md text-sm font-medium transition
              ${a==="cards"?"bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 shadow-sm":"text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}">
            \u25A6
          </button>
          <button id="btn-view-table" title="\u0422\u0430\u0431\u043B\u0438\u0446\u0430"
            class="px-3 py-1.5 rounded-md text-sm font-medium transition
              ${a==="table"?"bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 shadow-sm":"text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}">
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
    `:a==="cards"?re(t):de(t)}
  `,document.getElementById("btn-view-cards")?.addEventListener("click",()=>{B("cards"),w()}),document.getElementById("btn-view-table")?.addEventListener("click",()=>{B("table"),w()}),document.getElementById("btn-add-student")?.addEventListener("click",()=>{v(`
      <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">\u041D\u043E\u0432\u044B\u0439 \u0443\u0447\u0435\u043D\u0438\u043A</h2>
      <input id="modal-student-name" type="text" placeholder="\u0418\u043C\u044F \u0443\u0447\u0435\u043D\u0438\u043A\u0430"
        class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-4
               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
               focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      <div class="flex gap-3 justify-end">
        <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
        <button id="modal-save" class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>
      </div>
    `),document.getElementById("modal-cancel")?.addEventListener("click",m);let d=document.getElementById("modal-student-name");d.focus(),d.addEventListener("keydown",i=>{i.key==="Enter"&&n()}),document.getElementById("modal-save")?.addEventListener("click",n);function n(){let i=d.value.trim();if(!i){d.classList.add("border-red-400");return}let s=c();s.students.push({id:h(),name:i,createdAt:new Date().toISOString()}),x(s),m(),w()}}),e.querySelectorAll(".btn-delete-student").forEach(d=>{d.addEventListener("click",n=>{n.stopPropagation();let i=d.dataset.id,r=c().students.find(o=>o.id===i);r&&(v(`
        <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0443\u0447\u0435\u043D\u0438\u043A\u0430?</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-5">\xAB${I(r.name)}\xBB \u0438 \u0432\u0441\u0435 \u0435\u0433\u043E \u043C\u0435\u0434\u0430\u043B\u0438 \u0431\u0443\u0434\u0443\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u044B.</p>
        <div class="flex gap-3 justify-end">
          <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
          <button id="modal-confirm" class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>
        </div>
      `),document.getElementById("modal-cancel")?.addEventListener("click",m),document.getElementById("modal-confirm")?.addEventListener("click",()=>{let o=c();o.students=o.students.filter(l=>l.id!==i),o.studentAchievements=o.studentAchievements.filter(l=>l.studentId!==i),x(o),m(),w()}))})}),e.querySelectorAll(".btn-open-profile").forEach(d=>{d.addEventListener("click",()=>{k(`/profile/${d.dataset.id}`)})}),e.querySelectorAll(".btn-assign").forEach(d=>{d.addEventListener("click",n=>{n.stopPropagation();let i=d.dataset.id;ne(i)})})}function ne(e){let t=c(),a=t.students.find(s=>s.id===e);if(!a)return;let d=new Date().toISOString().slice(0,10),n=t.categories.map(s=>{let r=t.achievements.filter(o=>o.categoryId===s.id);return r.length===0?"":`<optgroup label="${I(s.name)}">
      ${r.map(o=>`<option value="${o.id}">${I(o.name)}</option>`).join("")}
    </optgroup>`}).join("");if(!n.trim()){v(`
      <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">\u041D\u0435\u0442 \u043C\u0435\u0434\u0430\u043B\u0435\u0439</h2>
      <p class="text-gray-600 dark:text-gray-300 mb-5">\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043C\u0435\u0434\u0430\u043B\u0438 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \xAB\u041C\u0435\u0434\u0430\u043B\u0438\xBB.</p>
      <div class="flex justify-end">
        <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">\u0417\u0430\u043A\u0440\u044B\u0442\u044C</button>
      </div>
    `),document.getElementById("modal-cancel")?.addEventListener("click",m);return}v(`
    <h2 class="text-xl font-bold mb-1 text-gray-800 dark:text-gray-100">\u0412\u044B\u0434\u0430\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C</h2>
    <p class="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-4">${I(a.name)}</p>

    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\u041C\u0435\u0434\u0430\u043B\u044C</label>
    <select id="modal-ach-sel"
      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-3
             bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
             focus:outline-none focus:ring-2 focus:ring-indigo-400">
      <option value="">\u2014 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0434\u0430\u043B\u044C \u2014</option>
      ${n}
    </select>

    <div id="modal-ach-preview" class="hidden mb-3">
      <div class="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/40 rounded-lg p-2">
        <img id="modal-preview-img" src="" alt="" class="w-10 h-10 object-cover rounded-lg bg-gray-200"
          onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><text y=%2228%22 font-size=%2228%22>\u{1F3C5}</text></svg>'" />
        <span id="modal-preview-name" class="text-sm font-medium text-indigo-800 dark:text-indigo-200"></span>
      </div>
    </div>

    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\u0414\u0430\u0442\u0430</label>
    <input id="modal-ach-date" type="date" value="${d}"
      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-5
             bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
             focus:outline-none focus:ring-2 focus:ring-indigo-400" />

    <div id="modal-assign-msg" class="mb-3 hidden"></div>

    <div class="flex gap-3 justify-end">
      <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
      <button id="modal-assign-save" class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">\u0412\u044B\u0434\u0430\u0442\u044C</button>
    </div>
  `),document.getElementById("modal-cancel")?.addEventListener("click",m);let i=document.getElementById("modal-ach-sel");i.addEventListener("change",()=>{let s=i.value,r=document.getElementById("modal-ach-preview");if(!s){r.classList.add("hidden");return}let l=c().achievements.find(b=>b.id===s);l&&(document.getElementById("modal-preview-img").src=l.imageUrl,document.getElementById("modal-preview-name").textContent=l.name,r.classList.remove("hidden"))}),document.getElementById("modal-assign-save")?.addEventListener("click",()=>{let s=i.value,r=document.getElementById("modal-ach-date").value,o=document.getElementById("modal-assign-msg");if(!s){o.className="mb-3 px-3 py-2 rounded-lg text-sm bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300",o.textContent="\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0434\u0430\u043B\u044C",o.classList.remove("hidden");return}let l=c();l.studentAchievements.push({id:h(),studentId:e,achievementId:s,grantedAt:r}),x(l),m(),w()})}function re(e){return`
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      ${e.students.map(t=>{let a=e.studentAchievements.filter(d=>d.studentId===t.id).length;return`
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex flex-col gap-3 hover:shadow-md transition">
            <div class="flex items-center justify-between">
              <button class="btn-open-profile font-semibold text-lg text-gray-800 dark:text-gray-100 text-left hover:text-indigo-600 dark:hover:text-indigo-400 transition" data-id="${t.id}">
                ${I(t.name)}
              </button>
              <div class="flex items-center gap-1">
                <button class="btn-assign text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition text-xl" data-id="${t.id}" title="\u0412\u044B\u0434\u0430\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C">\u{1F3C6}</button>
                <button class="btn-delete-student text-red-400 hover:text-red-600 transition text-xl" data-id="${t.id}" title="\u0423\u0434\u0430\u043B\u0438\u0442\u044C">\u2715</button>
              </div>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              \u041C\u0435\u0434\u0430\u043B\u0435\u0439: <span class="font-medium text-indigo-600 dark:text-indigo-400">${a}</span>
            </div>
            <div class="text-xs text-gray-400 dark:text-gray-500">${V(t.createdAt)}</div>
          </div>
        `}).join("")}
    </div>
  `}function de(e){return`
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
          ${e.students.map(t=>{let a=e.studentAchievements.filter(d=>d.studentId===t.id).length;return`
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                <td class="px-5 py-3">
                  <button class="btn-open-profile font-medium text-gray-800 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition text-left" data-id="${t.id}">
                    ${I(t.name)}
                  </button>
                </td>
                <td class="px-4 py-3 text-center">
                  <span class="font-semibold text-indigo-600 dark:text-indigo-400">${a}</span>
                </td>
                <td class="px-4 py-3 text-gray-400 dark:text-gray-500 hidden sm:table-cell">${V(t.createdAt)}</td>
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
  `}function I(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function V(e){return new Date(e).toLocaleDateString("ru-RU")}var S=[{hex:"#f59e0b",label:"\u0417\u043E\u043B\u043E\u0442\u043E"},{hex:"#94a3b8",label:"\u0421\u0435\u0440\u0435\u0431\u0440\u043E"},{hex:"#b45309",label:"\u0411\u0440\u043E\u043D\u0437\u0430"},{hex:"#3b82f6",label:"\u0421\u0438\u043D\u0438\u0439"},{hex:"#ef4444",label:"\u041A\u0440\u0430\u0441\u043D\u044B\u0439"},{hex:"#22c55e",label:"\u0417\u0435\u043B\u0451\u043D\u044B\u0439"},{hex:"#a855f7",label:"\u0424\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439"},{hex:"#475569",label:"\u0422\u0451\u043C\u043D\u044B\u0439"}],ie=[{name:"trophy",label:"\u041A\u0443\u0431\u043E\u043A"},{name:"trophy-cup",label:"\u041A\u0443\u0431\u043E\u043A 2"},{name:"laurel-crown",label:"\u041B\u0430\u0432\u0440\u043E\u0432\u044B\u0439 \u0432\u0435\u043D\u043E\u043A"},{name:"crown",label:"\u041A\u043E\u0440\u043E\u043D\u0430"},{name:"medal",label:"\u041C\u0435\u0434\u0430\u043B\u044C"},{name:"podium",label:"\u041F\u044C\u0435\u0434\u0435\u0441\u0442\u0430\u043B"},{name:"rank1",label:"1 \u043C\u0435\u0441\u0442\u043E"},{name:"rank2",label:"2 \u043C\u0435\u0441\u0442\u043E"},{name:"rank3",label:"3 \u043C\u0435\u0441\u0442\u043E"},{name:"gold-bar",label:"\u0421\u043B\u0438\u0442\u043E\u043A"},{name:"diamond-trophy",label:"\u0411\u0440\u0438\u043B\u043B. \u043A\u0443\u0431\u043E\u043A"},{name:"open-treasure-chest",label:"\u0421\u0443\u043D\u0434\u0443\u043A"},{name:"star",label:"\u0417\u0432\u0435\u0437\u0434\u0430"},{name:"burning-star",label:"\u0413\u043E\u0440\u044F\u0449\u0430\u044F \u0437\u0432\u0435\u0437\u0434\u0430"},{name:"star-formation",label:"\u0421\u043E\u0437\u0432\u0435\u0437\u0434\u0438\u0435"},{name:"shining-star",label:"\u042F\u0440\u043A\u0430\u044F \u0437\u0432\u0435\u0437\u0434\u0430"},{name:"sparkles",label:"\u0418\u0441\u043A\u0440\u044B"},{name:"chess-queen",label:"\u0424\u0435\u0440\u0437\u044C"},{name:"chess-king",label:"\u041A\u043E\u0440\u043E\u043B\u044C"},{name:"chess-knight",label:"\u041A\u043E\u043D\u044C"},{name:"chess-rook",label:"\u041B\u0430\u0434\u044C\u044F"},{name:"chess-bishop",label:"\u0421\u043B\u043E\u043D"},{name:"chess-pawn",label:"\u041F\u0435\u0448\u043A\u0430"},{name:"graduate-cap",label:"\u0410\u043A\u0430\u0434. \u0448\u0430\u043F\u043A\u0430"},{name:"diploma",label:"\u0414\u0438\u043F\u043B\u043E\u043C"},{name:"open-book",label:"\u041A\u043D\u0438\u0433\u0430"},{name:"brain",label:"\u041C\u043E\u0437\u0433"},{name:"idea",label:"\u0418\u0434\u0435\u044F"},{name:"upgrade",label:"\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441"},{name:"level-up",label:"\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0432\u0432\u0435\u0440\u0445"},{name:"lightning-bolt",label:"\u041C\u043E\u043B\u043D\u0438\u044F"},{name:"fire",label:"\u041E\u0433\u043E\u043D\u044C"},{name:"rocket",label:"\u0420\u0430\u043A\u0435\u0442\u0430"},{name:"fist",label:"\u041A\u0443\u043B\u0430\u043A"},{name:"thunder-struck",label:"\u0413\u0440\u043E\u043C"},{name:"sprint",label:"\u0421\u043F\u0440\u0438\u043D\u0442"},{name:"muscle-fat",label:"\u041C\u044B\u0448\u0446\u044B"},{name:"flash",label:"\u0412\u0441\u043F\u044B\u0448\u043A\u0430"},{name:"shield",label:"\u0429\u0438\u0442"},{name:"shield-crest",label:"\u0429\u0438\u0442 \u0433\u0435\u0440\u0431"},{name:"tower-shield",label:"\u0411\u0430\u0448\u0435\u043D\u043D\u044B\u0439 \u0449\u0438\u0442"},{name:"sword",label:"\u041C\u0435\u0447"},{name:"crossed-swords",label:"\u041C\u0435\u0447\u0438 \u0441\u043A\u0440\u0435\u0449."},{name:"war",label:"\u0412\u043E\u0439\u043D\u0430"},{name:"castle",label:"\u0417\u0430\u043C\u043E\u043A"},{name:"fortress",label:"\u041A\u0440\u0435\u043F\u043E\u0441\u0442\u044C"},{name:"tower",label:"\u0411\u0430\u0448\u043D\u044F"},{name:"knight-helmet",label:"\u0428\u043B\u0435\u043C \u0440\u044B\u0446\u0430\u0440\u044F"},{name:"lotus",label:"\u041B\u043E\u0442\u043E\u0441"},{name:"sunflower",label:"\u041F\u043E\u0434\u0441\u043E\u043B\u043D\u0443\u0445"},{name:"butterfly",label:"\u0411\u0430\u0431\u043E\u0447\u043A\u0430"},{name:"clover",label:"\u041A\u043B\u0435\u0432\u0435\u0440"},{name:"pine-tree",label:"\u0415\u043B\u044C"},{name:"oak-leaf",label:"\u0414\u0443\u0431\u043E\u0432\u044B\u0439 \u043B\u0438\u0441\u0442"},{name:"dragon",label:"\u0414\u0440\u0430\u043A\u043E\u043D"},{name:"dragon-head",label:"\u0413\u043E\u043B\u043E\u0432\u0430 \u0434\u0440\u0430\u043A\u043E\u043D\u0430"},{name:"eagle-emblem",label:"\u041E\u0440\u0451\u043B"},{name:"lion",label:"\u041B\u0435\u0432"},{name:"lion-head",label:"\u0413\u043E\u043B\u043E\u0432\u0430 \u043B\u044C\u0432\u0430"},{name:"wolf-head",label:"\u0412\u043E\u043B\u043A"},{name:"bear-head",label:"\u041C\u0435\u0434\u0432\u0435\u0434\u044C"},{name:"unicorn",label:"\u0415\u0434\u0438\u043D\u043E\u0440\u043E\u0433"},{name:"phoenix",label:"\u0424\u0435\u043D\u0438\u043A\u0441"},{name:"shark",label:"\u0410\u043A\u0443\u043B\u0430"},{name:"owl",label:"\u0421\u043E\u0432\u0430"},{name:"sun",label:"\u0421\u043E\u043B\u043D\u0446\u0435"},{name:"moon",label:"\u041B\u0443\u043D\u0430"},{name:"ringed-planet",label:"\u041F\u043B\u0430\u043D\u0435\u0442\u0430"},{name:"comet",label:"\u041A\u043E\u043C\u0435\u0442\u0430"},{name:"ufo",label:"\u041D\u041B\u041E"},{name:"target",label:"\u0426\u0435\u043B\u044C"},{name:"compass",label:"\u041A\u043E\u043C\u043F\u0430\u0441"},{name:"flag",label:"\u0424\u043B\u0430\u0433"},{name:"gem-stone",label:"\u041A\u0440\u0438\u0441\u0442\u0430\u043B\u043B"},{name:"infinity",label:"\u0411\u0435\u0441\u043A\u043E\u043D\u0435\u0447\u043D\u043E\u0441\u0442\u044C"},{name:"eye-of-horus",label:"\u0413\u043B\u0430\u0437 \u0413\u043E\u0440\u0430"},{name:"ankh",label:"\u0410\u043D\u043A\u0445"},{name:"yin-yang",label:"\u0418\u043D\u044C-\u044F\u043D\u044C"},{name:"triquetra",label:"\u0422\u0440\u0438\u043A\u0432\u0435\u0442\u0440"},{name:"magic-swirl",label:"\u041C\u0430\u0433\u0438\u044F"}];function M(e,t){return`https://api.iconify.design/game-icons/${e}.svg?color=${encodeURIComponent(t)}`}function W(e,t={}){let a=S[0].hex,d=t.imageUrl?`<img src="${y(t.imageUrl)}" class="w-full h-full object-contain rounded-lg" />`:"\u{1F5BC}";return`
    <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">${e}</h2>

    <input id="modal-ach-name" type="text" placeholder="\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043C\u0435\u0434\u0430\u043B\u0438" value="${y(t.name??"")}"
      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-3
             bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
             focus:outline-none focus:ring-2 focus:ring-indigo-400" />

    <div class="flex items-center gap-2 mb-2">
      <div id="modal-img-preview" class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex-shrink-0
        flex items-center justify-center text-xl overflow-hidden">${d}</div>
      <input id="modal-ach-img" type="text" placeholder="URL \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0438"
        value="${y(t.imageUrl??"")}"
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
        ${S.map((n,i)=>`
          <button type="button" class="color-btn w-6 h-6 rounded-full border-2 transition
            ${i===0?"border-indigo-500 ring-1 ring-indigo-500":"border-gray-300 dark:border-gray-600"}"
            style="background:${n.hex}" data-hex="${n.hex}" title="${n.label}"></button>
        `).join("")}
      </div>
      <input id="icon-search" type="text" placeholder="\u041F\u043E\u0438\u0441\u043A \u0438\u043A\u043E\u043D\u043A\u0438..."
        class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 mb-2 text-sm
               bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
               focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      <div id="icon-grid" class="grid grid-cols-9 gap-0.5 max-h-44 overflow-y-auto">
        ${ie.map(n=>`
          <button type="button" class="icon-btn flex flex-col items-center p-1 rounded-lg border border-transparent
            hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition"
            data-name="${n.name}" title="${n.label}">
            <img src="${M(n.name,a)}"
              class="w-7 h-7 object-contain pointer-events-none" alt="${n.label}" />
          </button>
        `).join("")}
      </div>
    </div>

    <textarea id="modal-ach-desc" placeholder="\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)" rows="2"
      class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mb-4
             bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
             focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none">${y(t.description??"")}</textarea>

    <div class="flex gap-3 justify-end">
      <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100
        dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
      <button id="modal-save" class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
        ${t.name?"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C":"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C"}
      </button>
    </div>
  `}function K(e){document.getElementById("modal-cancel")?.addEventListener("click",m);let t=document.getElementById("modal-ach-name"),a=document.getElementById("modal-ach-img"),d=document.getElementById("modal-ach-desc"),n=document.getElementById("modal-img-preview"),i=S[0].hex;function s(r){n.innerHTML=r?`<img src="${r}" class="w-full h-full object-contain rounded-lg" onerror="this.parentElement.innerHTML='\u{1F5BC}'" />`:"\u{1F5BC}"}a.addEventListener("input",()=>s(a.value.trim())),document.getElementById("btn-library-toggle")?.addEventListener("click",()=>{document.getElementById("icon-library").classList.toggle("hidden")}),document.querySelectorAll(".color-btn").forEach(r=>{r.addEventListener("click",()=>{i=r.dataset.hex,document.querySelectorAll(".color-btn").forEach(o=>{o.classList.remove("border-indigo-500","ring-1","ring-indigo-500"),o.classList.add("border-gray-300")}),r.classList.add("border-indigo-500","ring-1","ring-indigo-500"),r.classList.remove("border-gray-300"),document.querySelectorAll(".icon-btn img").forEach(o=>{let l=o.closest(".icon-btn").dataset.name;o.src=M(l,i)})})}),document.getElementById("icon-search")?.addEventListener("input",r=>{let o=r.target.value.toLowerCase();document.querySelectorAll(".icon-btn").forEach(l=>{let b=l,g=b.title.toLowerCase().includes(o)||b.dataset.name.includes(o);b.style.display=g?"":"none"})}),document.querySelectorAll(".icon-btn").forEach(r=>{r.addEventListener("click",()=>{let o=r.dataset.name,l=M(o,i);a.value=l,s(l),a.classList.remove("border-red-400"),document.querySelectorAll(".icon-btn").forEach(b=>b.classList.remove("border-indigo-400","bg-indigo-50")),r.classList.add("border-indigo-400","bg-indigo-50")})}),t.focus(),document.getElementById("modal-save")?.addEventListener("click",()=>{let r=t.value.trim(),o=a.value.trim();if(!r){t.classList.add("border-red-400");return}if(!o){a.classList.add("border-red-400");return}e(r,o,d.value.trim())})}function G(e){let t=!!e;v(`
    <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
      ${t?"\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E":"\u041D\u043E\u0432\u0430\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F"}
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
        ${t?"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C":"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C"}
      </button>
    </div>
  `),document.getElementById("modal-cancel")?.addEventListener("click",m);let a=document.getElementById("modal-cat-name");a.focus(),e&&a.select(),a.addEventListener("keydown",n=>{n.key==="Enter"&&d()}),document.getElementById("modal-save")?.addEventListener("click",d);function d(){let n=a.value.trim();if(!n){a.classList.add("border-red-400");return}let i=c();if(t&&e){let s=i.categories.find(r=>r.id===e.id);s&&(s.name=n)}else i.categories.push({id:h(),name:n});x(i),m(),E()}}function E(){let e=document.getElementById("app"),t=c();e.innerHTML=`
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
    `:t.categories.map(a=>{let d=t.achievements.filter(n=>n.categoryId===a.id);return`
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow mb-5 overflow-hidden">
          <div class="flex items-center justify-between px-5 py-4 bg-indigo-50 dark:bg-indigo-900/40
            border-b border-indigo-100 dark:border-indigo-800">
            <h2 class="font-semibold text-indigo-800 dark:text-indigo-200 text-lg">${y(a.name)}</h2>
            <div class="flex items-center gap-1">
              <button class="btn-add-achievement bg-indigo-600 text-white text-sm px-3 py-1 rounded-lg
                hover:bg-indigo-700 transition" data-cat="${a.id}">+ \u041C\u0435\u0434\u0430\u043B\u044C</button>
              <button class="btn-edit-category p-1.5 rounded-lg text-gray-400 hover:text-indigo-600
                dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition"
                data-id="${a.id}" title="\u041F\u0435\u0440\u0435\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u0442\u044C">\u270F\uFE0F</button>
              <button class="btn-delete-category p-1.5 rounded-lg text-gray-400 hover:text-red-500
                hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                data-id="${a.id}" title="\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E">\u{1F5D1}</button>
            </div>
          </div>
          ${d.length===0?`
            <div class="px-5 py-6 text-gray-400 dark:text-gray-500 text-sm">\u0412 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043C\u0435\u0434\u0430\u043B\u0435\u0439.</div>
          `:`
            <div class="divide-y divide-gray-100 dark:divide-gray-700">
              ${d.map(n=>`
                <div class="flex items-center gap-4 px-5 py-3">
                  <img src="${y(n.imageUrl)}" alt=""
                    class="w-12 h-12 object-contain rounded-lg bg-gray-100 dark:bg-gray-700 flex-shrink-0 p-1"
                    onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><text y=%2228%22 font-size=%2228%22>\u{1F3C5}</text></svg>'" />
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-gray-800 dark:text-gray-100">${y(n.name)}</div>
                    ${n.description?`<div class="text-sm text-gray-500 dark:text-gray-400 truncate">${y(n.description)}</div>`:""}
                  </div>
                  <div class="flex items-center gap-1 flex-shrink-0">
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
  `,document.getElementById("btn-add-category")?.addEventListener("click",()=>G()),e.querySelectorAll(".btn-edit-category").forEach(a=>{a.addEventListener("click",()=>{let d=a.dataset.id,n=c().categories.find(i=>i.id===d);n&&G(n)})}),e.querySelectorAll(".btn-delete-category").forEach(a=>{a.addEventListener("click",()=>{let d=a.dataset.id,n=c(),i=n.categories.find(r=>r.id===d);if(!i)return;let s=n.achievements.filter(r=>r.categoryId===d).length;v(`
        <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E?</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-2">\xAB${y(i.name)}\xBB</p>
        ${s>0?`<p class="text-red-500 dark:text-red-400 text-sm mb-4">\u0411\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u043E ${s} \u043C\u0435\u0434\u0430\u043B\u0435\u0439 \u0438 \u0432\u0441\u0435 \u0432\u044B\u0434\u0430\u043D\u043D\u044B\u0435 \u043D\u0430\u0433\u0440\u0430\u0434\u044B \u044D\u0442\u043E\u0439 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438.</p>`:'<p class="mb-4"></p>'}
        <div class="flex gap-3 justify-end">
          <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100
            dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
          <button id="modal-confirm" class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>
        </div>
      `),document.getElementById("modal-cancel")?.addEventListener("click",m),document.getElementById("modal-confirm")?.addEventListener("click",()=>{let r=c(),o=r.achievements.filter(l=>l.categoryId===d).map(l=>l.id);r.categories=r.categories.filter(l=>l.id!==d),r.achievements=r.achievements.filter(l=>l.categoryId!==d),r.studentAchievements=r.studentAchievements.filter(l=>!o.includes(l.achievementId)),x(r),m(),E()})})}),e.querySelectorAll(".btn-add-achievement").forEach(a=>{a.addEventListener("click",()=>{let d=a.dataset.cat;v(W("\u041D\u043E\u0432\u0430\u044F \u043C\u0435\u0434\u0430\u043B\u044C")),K((n,i,s)=>{let r=c();r.achievements.push({id:h(),categoryId:d,name:n,description:s,imageUrl:i}),x(r),m(),E()})})}),e.querySelectorAll(".btn-edit-achievement").forEach(a=>{a.addEventListener("click",()=>{let d=a.dataset.id,n=c().achievements.find(i=>i.id===d);n&&(v(W("\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C",n)),K((i,s,r)=>{let o=c(),l=o.achievements.find(b=>b.id===d);l&&(l.name=i,l.imageUrl=s,l.description=r),x(o),m(),E()}))})}),e.querySelectorAll(".btn-delete-achievement").forEach(a=>{a.addEventListener("click",()=>{let d=a.dataset.id,n=c(),i=n.achievements.find(r=>r.id===d);if(!i)return;let s=n.studentAchievements.filter(r=>r.achievementId===d).length;v(`
        <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043C\u0435\u0434\u0430\u043B\u044C?</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-2">\xAB${y(i.name)}\xBB</p>
        ${s>0?`<p class="text-red-500 dark:text-red-400 text-sm mb-4">\u042D\u0442\u0430 \u043C\u0435\u0434\u0430\u043B\u044C \u0432\u044B\u0434\u0430\u043D\u0430 ${s} \u0440\u0430\u0437 \u2014 \u0432\u0441\u0435 \u0437\u0430\u043F\u0438\u0441\u0438 \u0431\u0443\u0434\u0443\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u044B.</p>`:'<p class="mb-4"></p>'}
        <div class="flex gap-3 justify-end">
          <button id="modal-cancel" class="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100
            dark:hover:bg-gray-700 dark:text-gray-200 transition">\u041E\u0442\u043C\u0435\u043D\u0430</button>
          <button id="modal-confirm" class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>
        </div>
      `),document.getElementById("modal-cancel")?.addEventListener("click",m),document.getElementById("modal-confirm")?.addEventListener("click",()=>{let r=c();r.achievements=r.achievements.filter(o=>o.id!==d),r.studentAchievements=r.studentAchievements.filter(o=>o.achievementId!==d),x(r),m(),E()})})})}function y(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function X(){let e=document.getElementById("app"),t=c(),a=new Date().toISOString().slice(0,10);e.innerHTML=`
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
            ${t.students.map(n=>`<option value="${n.id}">${H(n.name)}</option>`).join("")}
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\u041C\u0435\u0434\u0430\u043B\u044C</label>
          <select id="sel-achievement" class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2
            bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="">\u2014 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0434\u0430\u043B\u044C \u2014</option>
            ${t.categories.map(n=>{let i=t.achievements.filter(s=>s.categoryId===n.id);return i.length===0?"":`
                <optgroup label="${H(n.name)}">
                  ${i.map(s=>`<option value="${s.id}">${H(s.name)}</option>`).join("")}
                </optgroup>
              `}).join("")}
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\u0414\u0430\u0442\u0430 \u0432\u044B\u0434\u0430\u0447\u0438</label>
          <input id="inp-date" type="date" value="${a}"
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
  `;let d=document.getElementById("sel-achievement");d?.addEventListener("change",()=>{let n=d.value,i=document.getElementById("assign-preview");if(!n){i.classList.add("hidden");return}let r=c().achievements.find(o=>o.id===n);r&&(document.getElementById("preview-img").src=r.imageUrl,document.getElementById("preview-name").textContent=r.name,document.getElementById("preview-desc").textContent=r.description||"",i.classList.remove("hidden"))}),document.getElementById("btn-assign")?.addEventListener("click",()=>{let n=document.getElementById("sel-student").value,i=document.getElementById("sel-achievement").value,s=document.getElementById("inp-date").value,r=document.getElementById("assign-msg");if(!n||!i||!s){Q(r,"\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432\u0441\u0435 \u043F\u043E\u043B\u044F","error");return}let o=c();o.studentAchievements.push({id:h(),studentId:n,achievementId:i,grantedAt:s}),x(o);let l=o.students.find(g=>g.id===n),b=o.achievements.find(g=>g.id===i);Q(r,`\u2713 \xAB${b?.name}\xBB \u0432\u044B\u0434\u0430\u043D\u0430 \u0443\u0447\u0435\u043D\u0438\u043A\u0443 ${l?.name}`,"success"),document.getElementById("sel-student").value="",document.getElementById("sel-achievement").value="",document.getElementById("assign-preview")?.classList.add("hidden")})}function Q(e,t,a){e.className=`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${a==="success"?"bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300":"bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300"}`,e.textContent=t,e.classList.remove("hidden"),setTimeout(()=>e.classList.add("hidden"),4e3)}function H(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function T(e){let t=e.id,a=document.getElementById("app"),d=c(),n=d.students.find(g=>g.id===t);if(!n){a.innerHTML=`
      <div class="text-center py-20 text-gray-400 dark:text-gray-500">
        <p class="text-lg">\u0423\u0447\u0435\u043D\u0438\u043A \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.</p>
        <button id="btn-back-notfound" class="mt-4 text-indigo-600 hover:underline">\u2190 \u041D\u0430\u0437\u0430\u0434 \u043A \u0443\u0447\u0435\u043D\u0438\u043A\u0430\u043C</button>
      </div>
    `,document.getElementById("btn-back-notfound")?.addEventListener("click",()=>k("/students"));return}let i=new URLSearchParams(window.location.hash.split("?")[1]||"").get("filter")||"all",s=new Date,r=d.studentAchievements.filter(g=>{if(g.studentId!==t)return!1;if(i==="all")return!0;let u=new Date(g.grantedAt);if(i==="year")return u.getFullYear()===s.getFullYear();if(i==="month")return u.getFullYear()===s.getFullYear()&&u.getMonth()===s.getMonth();if(i==="week"){let p=new Date(s);return p.setDate(s.getDate()-s.getDay()),p.setHours(0,0,0,0),u>=p}return i==="day"?u.toDateString()===s.toDateString():!0}),o={};for(let g of r)o[g.achievementId]||(o[g.achievementId]={count:0,dates:[]}),o[g.achievementId].count++,o[g.achievementId].dates.push(g.grantedAt);let l=r.length,b=[{label:"\u0412\u0441\u0451 \u0432\u0440\u0435\u043C\u044F",value:"all"},{label:"\u0413\u043E\u0434",value:"year"},{label:"\u041C\u0435\u0441\u044F\u0446",value:"month"},{label:"\u041D\u0435\u0434\u0435\u043B\u044F",value:"week"},{label:"\u0414\u0435\u043D\u044C",value:"day"}];a.innerHTML=`
    <div class="mb-4">
      <button id="btn-back" class="text-indigo-600 dark:text-indigo-400 hover:underline text-sm">\u2190 \u0412\u0441\u0435 \u0443\u0447\u0435\u043D\u0438\u043A\u0438</button>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">${$(n.name)}</h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D: ${Z(n.createdAt)}</p>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">${l}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">\u043C\u0435\u0434\u0430\u043B\u0435\u0439 \u0437\u0430 \u043F\u0435\u0440\u0438\u043E\u0434</div>
        </div>
      </div>

      <!-- Date filters -->
      <div class="flex gap-2 mt-5 flex-wrap">
        ${b.map(g=>`
          <button class="filter-btn px-3 py-1 rounded-full text-sm font-medium transition
            ${i===g.value?"bg-indigo-600 text-white":"bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}"
            data-filter="${g.value}">${g.label}</button>
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
        ${Object.entries(o).map(([g,u])=>{let p=d.achievements.find(te=>te.id===g);if(!p)return"";let O=u.dates.sort().reverse()[0];return`
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex items-center gap-4">
              <div class="relative flex-shrink-0">
                <img src="${$(p.imageUrl)}" alt=""
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
                <div class="font-semibold text-gray-800 dark:text-gray-100 leading-tight">${$(p.name)}</div>
                ${p.description?`<div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">${$(p.description)}</div>`:""}
                <div class="text-xs text-gray-400 dark:text-gray-500 mt-1">\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F: ${Z(O)}</div>
              </div>
            </div>
          `}).join("")}
      </div>
    `}
  `,document.getElementById("btn-back")?.addEventListener("click",()=>k("/students")),a.querySelectorAll(".filter-btn").forEach(g=>{g.addEventListener("click",()=>{let u=g.dataset.filter,p=u==="all"?`/profile/${t}`:`/profile/${t}?filter=${u}`;window.location.hash.slice(1)===p?T(e):window.location.hash=p})})}function $(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Z(e){return new Date(e).toLocaleDateString("ru-RU")}function D(){let e=document.getElementById("app"),t=c(),a={students:t.students.length,categories:t.categories.length,achievements:t.achievements.length,records:t.studentAchievements.length};e.innerHTML=`
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">\u0418\u043C\u043F\u043E\u0440\u0442 / \u042D\u043A\u0441\u043F\u043E\u0440\u0442</h1>

    <div class="grid gap-6 sm:grid-cols-2 max-w-2xl">

      <!-- Export -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0434\u0430\u043D\u043D\u044B\u0445</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0432\u0441\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0432 JSON-\u0444\u0430\u0439\u043B</p>

        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <div class="flex justify-between"><span>\u0423\u0447\u0435\u043D\u0438\u043A\u043E\u0432:</span><span class="font-medium">${a.students}</span></div>
          <div class="flex justify-between"><span>\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439:</span><span class="font-medium">${a.categories}</span></div>
          <div class="flex justify-between"><span>\u041C\u0435\u0434\u0430\u043B\u0435\u0439:</span><span class="font-medium">${a.achievements}</span></div>
          <div class="flex justify-between"><span>\u0412\u044B\u0434\u0430\u043D\u043D\u044B\u0445 \u043D\u0430\u0433\u0440\u0430\u0434:</span><span class="font-medium">${a.records}</span></div>
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
  `,document.getElementById("btn-export")?.addEventListener("click",F),document.getElementById("btn-import")?.addEventListener("click",()=>{let d=document.getElementById("inp-import"),n=document.getElementById("import-msg"),i=d.files?.[0];if(!i){j(n,"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B","error");return}let s=new FileReader;s.onload=()=>{try{J(s.result),j(n,"\u2713 \u0414\u0430\u043D\u043D\u044B\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u043C\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u044B","success"),d.value="",setTimeout(()=>D(),1200)}catch(r){let o=r instanceof Error?r.message:"\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430";j(n,`\u041E\u0448\u0438\u0431\u043A\u0430: ${o}`,"error")}},s.readAsText(i)})}function j(e,t,a){e.className=`mb-3 px-4 py-2 rounded-lg text-sm font-medium ${a==="success"?"bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300":"bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300"}`,e.textContent=t,e.classList.remove("hidden")}var R=document.getElementById("btn-theme");function ee(){R&&(R.textContent=A()==="dark"?"\u2600\uFE0F":"\u{1F319}")}ee();R?.addEventListener("click",()=>{P(A()==="dark"?"light":"dark"),ee()});f("/students",()=>w());f("/achievements",()=>E());f("/assign",()=>X());f("/profile/:id",e=>T(e));f("/import-export",()=>D());f("/",()=>k("/students"));U();})();
