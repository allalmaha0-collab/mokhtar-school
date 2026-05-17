(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[626],{3045:function(e,t,r){Promise.resolve().then(r.bind(r,76))},76:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return h}});var a=r(7437),s=r(2265),n=r(6463),i=r(8726);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,r(8030).Z)("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);var c=r(5733),o=r(4453),u=r(6198);function d(){let e=(0,n.useRouter)(),t=(0,n.useSearchParams)().get("redirect")||"/dashboard",[r,u]=(0,s.useState)({email:"",password:""}),[d,h]=(0,s.useState)(!1),[m,x]=(0,s.useState)(!1);async function f(a){a.preventDefault(),x(!0);try{let a=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),s=await a.json();if(!a.ok){i.ZP.error(s.error||"بيانات خاطئة");return}i.ZP.success("مرحباً بك!"),e.push(t)}catch(e){i.ZP.error("خطأ في الاتصال")}finally{x(!1)}}return(0,a.jsxs)("form",{onSubmit:f,className:"space-y-5",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"label",children:"البريد الإلكتروني"}),(0,a.jsx)("input",{type:"email",required:!0,className:"input text-center",placeholder:"admin@mokhtar-school.ma",value:r.email,onChange:e=>u(t=>({...t,email:e.target.value}))})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"label",children:"كلمة المرور"}),(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsx)("input",{type:d?"text":"password",required:!0,className:"input text-center pl-10",placeholder:"••••••••",value:r.password,onChange:e=>u(t=>({...t,password:e.target.value}))}),(0,a.jsx)("button",{type:"button",onClick:()=>h(!d),className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600",children:d?(0,a.jsx)(l,{size:18}):(0,a.jsx)(c.Z,{size:18})})]})]}),(0,a.jsxs)("button",{type:"submit",disabled:m,className:"w-full bg-primary hover:bg-primary-light text-white font-black py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60",children:[(0,a.jsx)(o.Z,{size:18}),m?"جاري الدخول...":"دخول"]})]})}function h(){return(0,a.jsx)("div",{className:"min-h-screen bg-gradient-to-br from-primary via-primary-light to-secondary flex items-center justify-center p-4",children:(0,a.jsxs)("div",{className:"w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8",children:[(0,a.jsxs)("div",{className:"text-center mb-8",children:[(0,a.jsx)("div",{className:"w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg",children:(0,a.jsx)(u.Z,{size:36,className:"text-white"})}),(0,a.jsx)("h1",{className:"text-2xl font-black text-primary dark:text-white",children:"لوحة تحكم الإدارة"}),(0,a.jsx)("p",{className:"text-gray-500 dark:text-gray-400 text-sm mt-1",children:"مجموعة مدارس محمد المخطار"})]}),(0,a.jsx)(s.Suspense,{fallback:(0,a.jsx)("div",{className:"text-center py-4 text-gray-400",children:"جاري التحميل..."}),children:(0,a.jsx)(d,{})}),(0,a.jsxs)("p",{className:"text-center text-xs text-gray-400 mt-6",children:["للتجربة: ",(0,a.jsx)("span",{className:"font-bold text-primary",children:"admin@mokhtar-school.ma"})," / ",(0,a.jsx)("span",{className:"font-bold text-primary",children:"admin123"})]})]})})}},8030:function(e,t,r){"use strict";r.d(t,{Z:function(){return c}});var a=r(2265);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),n=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter((e,t,r)=>!!e&&r.indexOf(e)===t).join(" ")};/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,a.forwardRef)((e,t)=>{let{color:r="currentColor",size:s=24,strokeWidth:l=2,absoluteStrokeWidth:c,className:o="",children:u,iconNode:d,...h}=e;return(0,a.createElement)("svg",{ref:t,...i,width:s,height:s,stroke:r,strokeWidth:c?24*Number(l)/Number(s):l,className:n("lucide",o),...h},[...d.map(e=>{let[t,r]=e;return(0,a.createElement)(t,r)}),...Array.isArray(u)?u:[u]])}),c=(e,t)=>{let r=(0,a.forwardRef)((r,i)=>{let{className:c,...o}=r;return(0,a.createElement)(l,{ref:i,iconNode:t,className:n("lucide-".concat(s(e)),c),...o})});return r.displayName="".concat(e),r}},5733:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(8030).Z)("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},6198:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(8030).Z)("GraduationCap",[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]])},4453:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(8030).Z)("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]])},6463:function(e,t,r){"use strict";var a=r(1169);r.o(a,"useParams")&&r.d(t,{useParams:function(){return a.useParams}}),r.o(a,"usePathname")&&r.d(t,{usePathname:function(){return a.usePathname}}),r.o(a,"useRouter")&&r.d(t,{useRouter:function(){return a.useRouter}}),r.o(a,"useSearchParams")&&r.d(t,{useSearchParams:function(){return a.useSearchParams}})}},function(e){e.O(0,[726,971,23,744],function(){return e(e.s=3045)}),_N_E=e.O()}]);