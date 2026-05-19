exports.id=3074,exports.ids=[3074],exports.modules={83340:(e,t,a)=>{Promise.resolve().then(a.bind(a,50610))},49394:(e,t,a)=>{Promise.resolve().then(a.bind(a,14831)),Promise.resolve().then(a.bind(a,40381))},8278:(e,t,a)=>{Promise.resolve().then(a.t.bind(a,12994,23)),Promise.resolve().then(a.t.bind(a,96114,23)),Promise.resolve().then(a.t.bind(a,9727,23)),Promise.resolve().then(a.t.bind(a,79671,23)),Promise.resolve().then(a.t.bind(a,41868,23)),Promise.resolve().then(a.t.bind(a,84759,23))},50610:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>L});var s=a(10326),r=a(17577),l=a(90434),i=a(35047),d=a(40381),h=a(62881);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=(0,h.Z)("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]),n=(0,h.Z)("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);var c=a(71664),x=a(33734),p=a(67427),y=a(58907),m=a(58775),f=a(71709),u=a(69152),b=a(95920),g=a(24061),k=a(36283),v=a(6343),Z=a(40617);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let j=(0,h.Z)("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);var w=a(59734);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let M=(0,h.Z)("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);function N(){let[e,t]=(0,r.useState)(!1);async function a(){t(!0);try{(await fetch("/api/sync",{method:"POST"})).ok?d.ZP.success("✅ تمت المزامنة مع الموقع"):d.ZP.error("فشلت المزامنة")}catch{d.ZP.error("خطأ في الاتصال")}finally{t(!1)}}return(0,s.jsxs)("button",{onClick:a,disabled:e,className:"w-full flex items-center gap-3 px-3 py-2 rounded-xl text-green-300 hover:bg-green-500/20 hover:text-green-200 text-sm font-bold transition-all mb-1 disabled:opacity-50",children:[s.jsx(o,{size:16,className:e?"animate-spin":""}),e?"جاري المزامنة...":"مزامنة مع الموقع"]})}let H=[{href:"/dashboard",icon:n,label:"الرئيسية",group:null},{href:"/dashboard/news",icon:c.Z,label:"الأخبار",group:"المحتوى"},{href:"/dashboard/activities",icon:x.Z,label:"الأنشطة",group:"المحتوى"},{href:"/dashboard/clubs",icon:p.Z,label:"الأندية",group:"المحتوى"},{href:"/dashboard/achievements",icon:y.Z,label:"جدارية الإنجازات",group:"المحتوى"},{href:"/dashboard/media",icon:m.Z,label:"الإعلام المدرسي",group:"المحتوى"},{href:"/dashboard/photos",icon:f.Z,label:"أرشيف الصور",group:"المحتوى"},{href:"/dashboard/social",icon:u.Z,label:"المختص الاجتماعي",group:"المحتوى"},{href:"/dashboard/boarding",icon:b.Z,label:"فضاء الداخلية",group:"المحتوى"},{href:"/dashboard/teachers",icon:g.Z,label:"الأساتذة",group:"الأطر"},{href:"/dashboard/teacher-docs",icon:k.Z,label:"وثائق الأساتذة",group:"الأطر"},{href:"/dashboard/student-docs",icon:v.Z,label:"وثائق التلاميذ",group:"التلاميذ"},{href:"/dashboard/messages",icon:Z.Z,label:"الرسائل",group:"أخرى"},{href:"/dashboard/settings",icon:j,label:"الإعدادات",group:"أخرى"}];function z({onClose:e}){let t=(0,i.usePathname)(),a=(0,i.useRouter)();async function r(){await fetch("/api/auth/logout",{method:"POST"}),d.ZP.success("تم تسجيل الخروج"),a.push("/login")}return(0,s.jsxs)("aside",{className:"w-64 bg-primary dark:bg-gray-900 h-full flex flex-col font-cairo shadow-xl",children:[s.jsx("div",{className:"p-5 border-b border-white/10",children:(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[s.jsx("div",{className:"w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center",children:s.jsx(w.Z,{size:20,className:"text-white"})}),(0,s.jsxs)("div",{children:[s.jsx("p",{className:"text-white font-black text-sm leading-tight",children:"محمد المخطار"}),s.jsx("p",{className:"text-white/50 text-xs",children:"لوحة الإدارة"})]})]})}),(0,s.jsxs)("nav",{className:"flex-1 p-3 overflow-y-auto",children:[(0,s.jsxs)(l.default,{href:"/dashboard",onClick:e,className:`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all mb-1 ${"/dashboard"===t?"bg-secondary-light text-white shadow":"text-white/70 hover:bg-white/10 hover:text-white"}`,children:[s.jsx(n,{size:18})," لوحة التحكم"]}),["المحتوى","الأطر","التلاميذ","أخرى"].map(a=>{let r=H.filter(e=>e.group===a);return(0,s.jsxs)("div",{className:"mt-5",children:[s.jsx("p",{className:"text-white/30 text-xs font-black px-3 mb-2 uppercase tracking-wider",children:a}),r.map(a=>(0,s.jsxs)(l.default,{href:a.href,onClick:e,className:`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all mt-0.5 ${t===a.href||"/dashboard"!==a.href&&t.startsWith(a.href+"/")?"bg-secondary-light text-white shadow":"text-white/70 hover:bg-white/10 hover:text-white"}`,children:[s.jsx(a.icon,{size:18}),s.jsx("span",{className:"flex-1",children:a.label}),"/dashboard/import"===a.href&&s.jsx("span",{className:"bg-orange-400 text-white text-xs px-2 py-0.5 rounded-full",children:"Excel"})]},a.href))]},a)})]}),(0,s.jsxs)("div",{className:"p-3 border-t border-white/10",children:[s.jsx(N,{}),s.jsx(l.default,{href:"/",onClick:e,className:"flex items-center gap-3 px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 text-sm transition-all mb-1",children:"← العودة للموقع"}),(0,s.jsxs)("button",{onClick:r,className:"w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-300 hover:bg-red-500/20 hover:text-red-200 text-sm font-bold transition-all",children:[s.jsx(M,{size:18})," تسجيل الخروج"]})]})]})}var P=a(90748),C=a(60850),q=a(72607),V=a(6507),S=a(14831);function L({children:e}){let[t,a]=(0,r.useState)(!1),{theme:l,setTheme:i}=(0,S.F)();return(0,s.jsxs)("div",{className:"flex h-screen bg-gray-100 dark:bg-gray-950 font-cairo overflow-hidden",children:[s.jsx("div",{className:"hidden lg:flex flex-shrink-0",children:s.jsx(z,{})}),t&&(0,s.jsxs)("div",{className:"lg:hidden fixed inset-0 z-50 flex",children:[s.jsx("div",{className:"w-64 flex-shrink-0",children:s.jsx(z,{onClose:()=>a(!1)})}),s.jsx("div",{className:"flex-1 bg-black/50",onClick:()=>a(!1)})]}),(0,s.jsxs)("div",{className:"flex-1 flex flex-col min-w-0 overflow-hidden",children:[(0,s.jsxs)("header",{className:"h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 flex-shrink-0 shadow-sm",children:[(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[s.jsx("button",{className:"lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700",onClick:()=>a(!0),children:s.jsx(P.Z,{size:20,className:"text-gray-600 dark:text-gray-300"})}),s.jsx("h1",{className:"font-black text-primary dark:text-white text-sm hidden sm:block",children:"لوحة تحكم — مجموعة مدارس محمد المختار"})]}),(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[s.jsx("button",{onClick:()=>i("dark"===l?"light":"dark"),className:"p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all",children:"dark"===l?s.jsx(C.Z,{size:18}):s.jsx(q.Z,{size:18})}),s.jsx("button",{className:"p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 relative",children:s.jsx(V.Z,{size:18})}),s.jsx("div",{className:"w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-black",children:"م"})]})]}),s.jsx("main",{className:"flex-1 overflow-y-auto p-4 md:p-6",children:e})]})]})}},6507:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(62881).Z)("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]])},6343:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(62881).Z)("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]])},59734:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(62881).Z)("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]])},36283:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(62881).Z)("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]])},69152:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(62881).Z)("HandHeart",[["path",{d:"M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16",key:"1ifwr1"}],["path",{d:"m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",key:"17abbs"}],["path",{d:"m2 15 6 6",key:"10dquu"}],["path",{d:"M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z",key:"1h3036"}]])},67427:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(62881).Z)("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]])},95920:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(62881).Z)("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]])},71709:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(62881).Z)("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]])},40617:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(62881).Z)("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]])},58775:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(62881).Z)("Mic",[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]])},71664:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(62881).Z)("Newspaper",[["path",{d:"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2",key:"7pis2x"}],["path",{d:"M18 14h-8",key:"sponae"}],["path",{d:"M15 18h-5",key:"95g1m2"}],["path",{d:"M10 6h8v4h-8V6Z",key:"smlsk5"}]])},33734:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(62881).Z)("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]])},58907:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(62881).Z)("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]])},24061:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(62881).Z)("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]])},12567:(e,t,a)=>{"use strict";a.r(t),a.d(t,{$$typeof:()=>i,__esModule:()=>l,default:()=>d});var s=a(68570);let r=(0,s.createProxy)(String.raw`C:\Users\a\Desktop\mohammed al mokhtar\school-app\app\dashboard\layout.jsx`),{__esModule:l,$$typeof:i}=r;r.default;let d=(0,s.createProxy)(String.raw`C:\Users\a\Desktop\mohammed al mokhtar\school-app\app\dashboard\layout.jsx#default`)},7139:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>d,metadata:()=>i});var s=a(19510);a(67272);var r=a(19552),l=a(19125);let i={title:{default:"مجموعة مدارس محمد المختار",template:"%s | مجموعة مدارس محمد المختار"},description:"الموقع الرسمي لمجموعة مدارس محمد المختار - وزارة التربية الوطنية والتعليم الأولي والرياضة",keywords:["مدرسة","محمد المختار","ابتدائي","المغرب","التعليم"],openGraph:{title:"مجموعة مدارس محمد المختار",description:"الموقع الرسمي لمجموعة مدارس محمد المختار",locale:"ar_MA",type:"website"},robots:{index:!0,follow:!0}};function d({children:e}){return(0,s.jsxs)("html",{lang:"ar",dir:"rtl",suppressHydrationWarning:!0,children:[(0,s.jsxs)("head",{children:[s.jsx("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),s.jsx("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),s.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap",rel:"stylesheet"})]}),s.jsx("body",{className:"font-cairo",children:(0,s.jsxs)(r.f,{attribute:"class",defaultTheme:"light",enableSystem:!1,children:[e,s.jsx(l.x7,{position:"bottom-right",toastOptions:{style:{fontFamily:"Cairo, sans-serif",direction:"rtl"},success:{iconTheme:{primary:"#27ae60",secondary:"#fff"}}}})]})})]})}},67272:()=>{}};