(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[91],{7911:function(e,t,a){Promise.resolve().then(a.bind(a,2893))},2893:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return m}});var s=a(7437),r=a(2265),n=a(6106);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a(8030).Z)("Inbox",[["polyline",{points:"22 12 16 12 14 15 10 15 8 12 2 12",key:"o97t9d"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"oot6mr"}]]);var l=a(7390),c=a(9832),d=a(4086),o=a(4241),x=a(2940),h=a(8726);function m(){let[e,t]=(0,r.useState)([]),[a,m]=(0,r.useState)(!0),[u,p]=(0,r.useState)("all");async function f(){m(!0);try{let e=await fetch("/api/messages"),a=await e.json();t(a.messages||[])}catch(e){h.ZP.error("خطأ في تحميل الرسائل")}finally{m(!1)}}async function y(e){await fetch("/api/messages",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e})}),t(t=>t.map(t=>t.id===e?{...t,isRead:!0}:t))}(0,r.useEffect)(()=>{f()},[]);let g="unread"===u?e.filter(e=>!e.isRead):e,j=e.filter(e=>!e.isRead).length;return(0,s.jsxs)("div",{className:"space-y-6",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h1",{className:"text-2xl font-black text-primary dark:text-white",children:"الرسائل"}),(0,s.jsxs)("p",{className:"text-gray-500 dark:text-gray-400 text-sm",children:[e.length," رسالة ",j>0&&(0,s.jsxs)("span",{className:"text-red-500 font-bold",children:["(",j," غير مقروءة)"]})]})]}),(0,s.jsx)("div",{className:"flex gap-2",children:["all","unread"].map(e=>(0,s.jsx)("button",{onClick:()=>p(e),className:"px-4 py-2 rounded-xl text-sm font-bold transition-all ".concat(u===e?"bg-primary text-white":"bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300"),children:"all"===e?"الكل":"غير مقروءة (".concat(j,")")},e))})]}),a?(0,s.jsx)("div",{className:"flex justify-center py-16",children:(0,s.jsx)("div",{className:"w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"})}):0===g.length?(0,s.jsxs)("div",{className:"card p-16 text-center text-gray-400",children:[(0,s.jsx)(i,{size:48,className:"mx-auto mb-3 opacity-40"}),(0,s.jsx)("p",{children:"unread"===u?"لا توجد رسائل غير مقروءة":"لا توجد رسائل"})]}):(0,s.jsx)("div",{className:"space-y-3",children:g.map(e=>(0,s.jsx)(n.E.div,{initial:{opacity:0},animate:{opacity:1},className:"card p-5 transition-all ".concat(e.isRead?"":"border-r-4 border-primary"),children:(0,s.jsxs)("div",{className:"flex items-start justify-between gap-4",children:[(0,s.jsxs)("div",{className:"flex items-start gap-4 flex-1 min-w-0",children:[(0,s.jsx)("div",{className:"w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ".concat(e.isRead?"bg-gray-100 dark:bg-gray-700 text-gray-500":"bg-primary text-white"),children:(0,s.jsx)(l.Z,{size:18})}),(0,s.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2 mb-1",children:[(0,s.jsx)("p",{className:"font-black text-gray-800 dark:text-white",children:e.name}),!e.isRead&&(0,s.jsx)("span",{className:"badge bg-primary text-white text-xs",children:"جديد"})]}),(0,s.jsx)("p",{className:"text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3",children:e.message}),(0,s.jsxs)("div",{className:"flex flex-wrap gap-3 text-xs text-gray-400",children:[e.phone&&(0,s.jsxs)("span",{className:"flex items-center gap-1",children:[(0,s.jsx)(c.Z,{size:11})," ",e.phone]}),e.email&&(0,s.jsxs)("span",{className:"flex items-center gap-1",children:[(0,s.jsx)(d.Z,{size:11})," ",e.email]}),(0,s.jsxs)("span",{className:"flex items-center gap-1",children:[(0,s.jsx)(o.Z,{size:11})," ",new Date(e.createdAt).toLocaleDateString("ar-MA")]})]})]})]}),!e.isRead&&(0,s.jsxs)("button",{onClick:()=>y(e.id),className:"flex items-center gap-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 px-3 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0",children:[(0,s.jsx)(x.Z,{size:14})," قُرئت"]})]})},e.id))})]})}},8030:function(e,t,a){"use strict";a.d(t,{Z:function(){return c}});var s=a(2265);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),n=function(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return t.filter((e,t,a)=>!!e&&a.indexOf(e)===t).join(" ")};/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,s.forwardRef)((e,t)=>{let{color:a="currentColor",size:r=24,strokeWidth:l=2,absoluteStrokeWidth:c,className:d="",children:o,iconNode:x,...h}=e;return(0,s.createElement)("svg",{ref:t,...i,width:r,height:r,stroke:a,strokeWidth:c?24*Number(l)/Number(r):l,className:n("lucide",d),...h},[...x.map(e=>{let[t,a]=e;return(0,s.createElement)(t,a)}),...Array.isArray(o)?o:[o]])}),c=(e,t)=>{let a=(0,s.forwardRef)((a,i)=>{let{className:c,...d}=a;return(0,s.createElement)(l,{ref:i,iconNode:t,className:n("lucide-".concat(r(e)),c),...d})});return a.displayName="".concat(e),a}},4241:function(e,t,a){"use strict";a.d(t,{Z:function(){return s}});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(8030).Z)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]])},2940:function(e,t,a){"use strict";a.d(t,{Z:function(){return s}});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(8030).Z)("CircleCheckBig",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]])},4086:function(e,t,a){"use strict";a.d(t,{Z:function(){return s}});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(8030).Z)("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]])},7390:function(e,t,a){"use strict";a.d(t,{Z:function(){return s}});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(8030).Z)("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]])},9832:function(e,t,a){"use strict";a.d(t,{Z:function(){return s}});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(8030).Z)("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]])}},function(e){e.O(0,[726,106,971,23,744],function(){return e(e.s=7911)}),_N_E=e.O()}]);