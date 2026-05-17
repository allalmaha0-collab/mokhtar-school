"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/messages/route";
exports.ids = ["app/api/messages/route"];
exports.modules = {

/***/ "@libsql/client":
/*!*********************************!*\
  !*** external "@libsql/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@libsql/client");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fmessages%2Froute&page=%2Fapi%2Fmessages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmessages%2Froute.js&appDir=C%3A%5CUsers%5Ca%5CDesktop%5Cmohammed%20al%20mokhtar%5Cschool-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ca%5CDesktop%5Cmohammed%20al%20mokhtar%5Cschool-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fmessages%2Froute&page=%2Fapi%2Fmessages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmessages%2Froute.js&appDir=C%3A%5CUsers%5Ca%5CDesktop%5Cmohammed%20al%20mokhtar%5Cschool-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ca%5CDesktop%5Cmohammed%20al%20mokhtar%5Cschool-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_a_Desktop_mohammed_al_mokhtar_school_app_app_api_messages_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/messages/route.js */ \"(rsc)/./app/api/messages/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/messages/route\",\n        pathname: \"/api/messages\",\n        filename: \"route\",\n        bundlePath: \"app/api/messages/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\a\\\\Desktop\\\\mohammed al mokhtar\\\\school-app\\\\app\\\\api\\\\messages\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_a_Desktop_mohammed_al_mokhtar_school_app_app_api_messages_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/messages/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZtZXNzYWdlcyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbWVzc2FnZXMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZtZXNzYWdlcyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNhJTVDRGVza3RvcCU1Q21vaGFtbWVkJTIwYWwlMjBtb2todGFyJTVDc2Nob29sLWFwcCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDYSU1Q0Rlc2t0b3AlNUNtb2hhbW1lZCUyMGFsJTIwbW9raHRhciU1Q3NjaG9vbC1hcHAmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ29DO0FBQ2pIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW9raHRhci1zY2hvb2wvP2U5NTYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcYVxcXFxEZXNrdG9wXFxcXG1vaGFtbWVkIGFsIG1va2h0YXJcXFxcc2Nob29sLWFwcFxcXFxhcHBcXFxcYXBpXFxcXG1lc3NhZ2VzXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9tZXNzYWdlcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL21lc3NhZ2VzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9tZXNzYWdlcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGFcXFxcRGVza3RvcFxcXFxtb2hhbW1lZCBhbCBtb2todGFyXFxcXHNjaG9vbC1hcHBcXFxcYXBwXFxcXGFwaVxcXFxtZXNzYWdlc1xcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvbWVzc2FnZXMvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fmessages%2Froute&page=%2Fapi%2Fmessages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmessages%2Froute.js&appDir=C%3A%5CUsers%5Ca%5CDesktop%5Cmohammed%20al%20mokhtar%5Cschool-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ca%5CDesktop%5Cmohammed%20al%20mokhtar%5Cschool-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/messages/route.js":
/*!***********************************!*\
  !*** ./app/api/messages/route.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PATCH: () => (/* binding */ PATCH),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.js\");\n\n\n\nasync function GET(req) {\n    const token = req.cookies.get(\"token\")?.value;\n    if (!(0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.verifyToken)(token)) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"غير مصرح\"\n    }, {\n        status: 401\n    });\n    const messages = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.message.findMany({\n        orderBy: {\n            createdAt: \"desc\"\n        }\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        messages\n    });\n}\nasync function POST(req) {\n    const { name, email, phone, message } = await req.json();\n    if (!name || !message) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"الاسم والرسالة مطلوبان\"\n    }, {\n        status: 400\n    });\n    const msg = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.message.create({\n        data: {\n            name,\n            email: email || null,\n            phone: phone || null,\n            message\n        }\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        message: msg\n    }, {\n        status: 201\n    });\n}\nasync function PATCH(req) {\n    const token = req.cookies.get(\"token\")?.value;\n    if (!(0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.verifyToken)(token)) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"غير مصرح\"\n    }, {\n        status: 401\n    });\n    const { id } = await req.json();\n    await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.message.update({\n        where: {\n            id\n        },\n        data: {\n            isRead: true\n        }\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        success: true\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL21lc3NhZ2VzL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUEyQztBQUNUO0FBQ087QUFFbEMsZUFBZUcsSUFBSUMsR0FBRztJQUMzQixNQUFNQyxRQUFRRCxJQUFJRSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxVQUFVQztJQUN4QyxJQUFJLENBQUNOLHNEQUFXQSxDQUFDRyxRQUFRLE9BQU9MLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7UUFBRUMsT0FBTztJQUFXLEdBQUc7UUFBRUMsUUFBUTtJQUFJO0lBQ3ZGLE1BQU1DLFdBQVcsTUFBTVgsMkNBQU1BLENBQUNZLE9BQU8sQ0FBQ0MsUUFBUSxDQUFDO1FBQUVDLFNBQVM7WUFBRUMsV0FBVztRQUFPO0lBQUU7SUFDaEYsT0FBT2hCLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7UUFBRUc7SUFBUztBQUN0QztBQUVPLGVBQWVLLEtBQUtiLEdBQUc7SUFDNUIsTUFBTSxFQUFFYyxJQUFJLEVBQUVDLEtBQUssRUFBRUMsS0FBSyxFQUFFUCxPQUFPLEVBQUUsR0FBRyxNQUFNVCxJQUFJSyxJQUFJO0lBQ3RELElBQUksQ0FBQ1MsUUFBUSxDQUFDTCxTQUFTLE9BQU9iLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7UUFBRUMsT0FBTztJQUF5QixHQUFHO1FBQUVDLFFBQVE7SUFBSTtJQUNuRyxNQUFNVSxNQUFNLE1BQU1wQiwyQ0FBTUEsQ0FBQ1ksT0FBTyxDQUFDUyxNQUFNLENBQUM7UUFBRUMsTUFBTTtZQUFFTDtZQUFNQyxPQUFPQSxTQUFTO1lBQU1DLE9BQU9BLFNBQVM7WUFBTVA7UUFBUTtJQUFFO0lBQzlHLE9BQU9iLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7UUFBRUksU0FBU1E7SUFBSSxHQUFHO1FBQUVWLFFBQVE7SUFBSTtBQUMzRDtBQUVPLGVBQWVhLE1BQU1wQixHQUFHO0lBQzdCLE1BQU1DLFFBQVFELElBQUlFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLFVBQVVDO0lBQ3hDLElBQUksQ0FBQ04sc0RBQVdBLENBQUNHLFFBQVEsT0FBT0wscURBQVlBLENBQUNTLElBQUksQ0FBQztRQUFFQyxPQUFPO0lBQVcsR0FBRztRQUFFQyxRQUFRO0lBQUk7SUFDdkYsTUFBTSxFQUFFYyxFQUFFLEVBQUUsR0FBRyxNQUFNckIsSUFBSUssSUFBSTtJQUM3QixNQUFNUiwyQ0FBTUEsQ0FBQ1ksT0FBTyxDQUFDYSxNQUFNLENBQUM7UUFBRUMsT0FBTztZQUFFRjtRQUFHO1FBQUdGLE1BQU07WUFBRUssUUFBUTtRQUFLO0lBQUU7SUFDcEUsT0FBTzVCLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7UUFBRW9CLFNBQVM7SUFBSztBQUMzQyIsInNvdXJjZXMiOlsid2VicGFjazovL21va2h0YXItc2Nob29sLy4vYXBwL2FwaS9tZXNzYWdlcy9yb3V0ZS5qcz81ODM4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gJ0AvbGliL2RiJztcbmltcG9ydCB7IHZlcmlmeVRva2VuIH0gZnJvbSAnQC9saWIvYXV0aCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxKSB7XG4gIGNvbnN0IHRva2VuID0gcmVxLmNvb2tpZXMuZ2V0KCd0b2tlbicpPy52YWx1ZTtcbiAgaWYgKCF2ZXJpZnlUb2tlbih0b2tlbikpIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAn2LrZitixINmF2LXYsditJyB9LCB7IHN0YXR1czogNDAxIH0pO1xuICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IHByaXNtYS5tZXNzYWdlLmZpbmRNYW55KHsgb3JkZXJCeTogeyBjcmVhdGVkQXQ6ICdkZXNjJyB9IH0pO1xuICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlcyB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxKSB7XG4gIGNvbnN0IHsgbmFtZSwgZW1haWwsIHBob25lLCBtZXNzYWdlIH0gPSBhd2FpdCByZXEuanNvbigpO1xuICBpZiAoIW5hbWUgfHwgIW1lc3NhZ2UpIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAn2KfZhNin2LPZhSDZiNin2YTYsdiz2KfZhNipINmF2LfZhNmI2KjYp9mGJyB9LCB7IHN0YXR1czogNDAwIH0pO1xuICBjb25zdCBtc2cgPSBhd2FpdCBwcmlzbWEubWVzc2FnZS5jcmVhdGUoeyBkYXRhOiB7IG5hbWUsIGVtYWlsOiBlbWFpbCB8fCBudWxsLCBwaG9uZTogcGhvbmUgfHwgbnVsbCwgbWVzc2FnZSB9IH0pO1xuICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBtc2cgfSwgeyBzdGF0dXM6IDIwMSB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBBVENIKHJlcSkge1xuICBjb25zdCB0b2tlbiA9IHJlcS5jb29raWVzLmdldCgndG9rZW4nKT8udmFsdWU7XG4gIGlmICghdmVyaWZ5VG9rZW4odG9rZW4pKSByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ9i62YrYsSDZhdi12LHYrScgfSwgeyBzdGF0dXM6IDQwMSB9KTtcbiAgY29uc3QgeyBpZCB9ID0gYXdhaXQgcmVxLmpzb24oKTtcbiAgYXdhaXQgcHJpc21hLm1lc3NhZ2UudXBkYXRlKHsgd2hlcmU6IHsgaWQgfSwgZGF0YTogeyBpc1JlYWQ6IHRydWUgfSB9KTtcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJ2ZXJpZnlUb2tlbiIsIkdFVCIsInJlcSIsInRva2VuIiwiY29va2llcyIsImdldCIsInZhbHVlIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwibWVzc2FnZXMiLCJtZXNzYWdlIiwiZmluZE1hbnkiLCJvcmRlckJ5IiwiY3JlYXRlZEF0IiwiUE9TVCIsIm5hbWUiLCJlbWFpbCIsInBob25lIiwibXNnIiwiY3JlYXRlIiwiZGF0YSIsIlBBVENIIiwiaWQiLCJ1cGRhdGUiLCJ3aGVyZSIsImlzUmVhZCIsInN1Y2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/messages/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/auth.js":
/*!*********************!*\
  !*** ./lib/auth.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   comparePassword: () => (/* binding */ comparePassword),\n/* harmony export */   getTokenFromRequest: () => (/* binding */ getTokenFromRequest),\n/* harmony export */   hashPassword: () => (/* binding */ hashPassword),\n/* harmony export */   signToken: () => (/* binding */ signToken),\n/* harmony export */   verifyToken: () => (/* binding */ verifyToken)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst SECRET = process.env.JWT_SECRET || \"change-me-in-production\";\nfunction signToken(payload) {\n    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign(payload, SECRET, {\n        expiresIn: \"7d\"\n    });\n}\nfunction verifyToken(token) {\n    try {\n        return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, SECRET);\n    } catch  {\n        return null;\n    }\n}\nasync function hashPassword(plain) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().hash(plain, 10);\n}\nasync function comparePassword(plain, hashed) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().compare(plain, hashed);\n}\nfunction getTokenFromRequest(req) {\n    const auth = req.headers.get(\"authorization\");\n    if (auth?.startsWith(\"Bearer \")) return auth.slice(7);\n    const cookie = req.cookies?.get(\"token\")?.value;\n    return cookie || null;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBK0I7QUFDRDtBQUU5QixNQUFNRSxTQUFTQyxRQUFRQyxHQUFHLENBQUNDLFVBQVUsSUFBSTtBQUVsQyxTQUFTQyxVQUFVQyxPQUFPO0lBQy9CLE9BQU9QLHdEQUFRLENBQUNPLFNBQVNMLFFBQVE7UUFBRU8sV0FBVztJQUFLO0FBQ3JEO0FBRU8sU0FBU0MsWUFBWUMsS0FBSztJQUMvQixJQUFJO1FBQUUsT0FBT1gsMERBQVUsQ0FBQ1csT0FBT1Q7SUFBUyxFQUN4QyxPQUFNO1FBQUUsT0FBTztJQUFNO0FBQ3ZCO0FBRU8sZUFBZVcsYUFBYUMsS0FBSztJQUN0QyxPQUFPYixvREFBVyxDQUFDYSxPQUFPO0FBQzVCO0FBRU8sZUFBZUUsZ0JBQWdCRixLQUFLLEVBQUVHLE1BQU07SUFDakQsT0FBT2hCLHVEQUFjLENBQUNhLE9BQU9HO0FBQy9CO0FBRU8sU0FBU0Usb0JBQW9CQyxHQUFHO0lBQ3JDLE1BQU1DLE9BQU9ELElBQUlFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDO0lBQzdCLElBQUlGLE1BQU1HLFdBQVcsWUFBWSxPQUFPSCxLQUFLSSxLQUFLLENBQUM7SUFDbkQsTUFBTUMsU0FBU04sSUFBSU8sT0FBTyxFQUFFSixJQUFJLFVBQVVLO0lBQzFDLE9BQU9GLFVBQVU7QUFDbkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb2todGFyLXNjaG9vbC8uL2xpYi9hdXRoLmpzPzI4N2IiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XG5cbmNvbnN0IFNFQ1JFVCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgJ2NoYW5nZS1tZS1pbi1wcm9kdWN0aW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNpZ25Ub2tlbihwYXlsb2FkKSB7XG4gIHJldHVybiBqd3Quc2lnbihwYXlsb2FkLCBTRUNSRVQsIHsgZXhwaXJlc0luOiAnN2QnIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5VG9rZW4odG9rZW4pIHtcbiAgdHJ5IHsgcmV0dXJuIGp3dC52ZXJpZnkodG9rZW4sIFNFQ1JFVCk7IH1cbiAgY2F0Y2ggeyByZXR1cm4gbnVsbDsgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFzaFBhc3N3b3JkKHBsYWluKSB7XG4gIHJldHVybiBiY3J5cHQuaGFzaChwbGFpbiwgMTApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29tcGFyZVBhc3N3b3JkKHBsYWluLCBoYXNoZWQpIHtcbiAgcmV0dXJuIGJjcnlwdC5jb21wYXJlKHBsYWluLCBoYXNoZWQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9rZW5Gcm9tUmVxdWVzdChyZXEpIHtcbiAgY29uc3QgYXV0aCA9IHJlcS5oZWFkZXJzLmdldCgnYXV0aG9yaXphdGlvbicpO1xuICBpZiAoYXV0aD8uc3RhcnRzV2l0aCgnQmVhcmVyICcpKSByZXR1cm4gYXV0aC5zbGljZSg3KTtcbiAgY29uc3QgY29va2llID0gcmVxLmNvb2tpZXM/LmdldCgndG9rZW4nKT8udmFsdWU7XG4gIHJldHVybiBjb29raWUgfHwgbnVsbDtcbn1cbiJdLCJuYW1lcyI6WyJqd3QiLCJiY3J5cHQiLCJTRUNSRVQiLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsInNpZ25Ub2tlbiIsInBheWxvYWQiLCJzaWduIiwiZXhwaXJlc0luIiwidmVyaWZ5VG9rZW4iLCJ0b2tlbiIsInZlcmlmeSIsImhhc2hQYXNzd29yZCIsInBsYWluIiwiaGFzaCIsImNvbXBhcmVQYXNzd29yZCIsImhhc2hlZCIsImNvbXBhcmUiLCJnZXRUb2tlbkZyb21SZXF1ZXN0IiwicmVxIiwiYXV0aCIsImhlYWRlcnMiLCJnZXQiLCJzdGFydHNXaXRoIiwic2xpY2UiLCJjb29raWUiLCJjb29raWVzIiwidmFsdWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.js\n");

/***/ }),

/***/ "(rsc)/./lib/db.js":
/*!*******************!*\
  !*** ./lib/db.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getSettings: () => (/* binding */ getSettings),\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _prisma_adapter_libsql__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @prisma/adapter-libsql */ \"(rsc)/./node_modules/@prisma/adapter-libsql/dist/index-node.mjs\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ \"url\");\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst __dirname = path__WEBPACK_IMPORTED_MODULE_1___default().dirname((0,url__WEBPACK_IMPORTED_MODULE_2__.fileURLToPath)(\"file:///C:/Users/a/Desktop/mohammed%20al%20mokhtar/school-app/lib/db.js\"));\nconst dbPath = path__WEBPACK_IMPORTED_MODULE_1___default().resolve(__dirname, \"../prisma/school.db\");\nfunction createPrismaClient() {\n    const adapter = new _prisma_adapter_libsql__WEBPACK_IMPORTED_MODULE_3__.PrismaLibSql({\n        url: \"file:\" + dbPath\n    });\n    return new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n        adapter\n    });\n}\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? createPrismaClient();\nif (true) globalForPrisma.prisma = prisma;\nasync function getSettings() {\n    const rows = await prisma.setting.findMany();\n    return Object.fromEntries(rows.map((r)=>[\n            r.key,\n            r.value\n        ]));\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQThDO0FBQ1E7QUFDOUI7QUFDWTtBQUVwQyxNQUFNSSxZQUFZRixtREFBWSxDQUFDQyxrREFBYUEsQ0FBQyx5RUFBZTtBQUM1RCxNQUFNSSxTQUFTTCxtREFBWSxDQUFDRSxXQUFXO0FBRXZDLFNBQVNLO0lBQ1AsTUFBTUMsVUFBVSxJQUFJVCxnRUFBWUEsQ0FBQztRQUFFSyxLQUFLLFVBQVVDO0lBQU87SUFDekQsT0FBTyxJQUFJUCx3REFBWUEsQ0FBQztRQUFFVTtJQUFRO0FBQ3BDO0FBRUEsTUFBTUMsa0JBQWtCQztBQUNqQixNQUFNQyxTQUFTRixnQkFBZ0JFLE1BQU0sSUFBSUoscUJBQXFCO0FBQ3JFLElBQUlLLElBQXlCLEVBQWNILGdCQUFnQkUsTUFBTSxHQUFHQTtBQUU3RCxlQUFlRTtJQUNwQixNQUFNQyxPQUFPLE1BQU1ILE9BQU9JLE9BQU8sQ0FBQ0MsUUFBUTtJQUMxQyxPQUFPQyxPQUFPQyxXQUFXLENBQUNKLEtBQUtLLEdBQUcsQ0FBQ0MsQ0FBQUEsSUFBSztZQUFDQSxFQUFFQyxHQUFHO1lBQUVELEVBQUVFLEtBQUs7U0FBQztBQUMxRCIsInNvdXJjZXMiOlsid2VicGFjazovL21va2h0YXItc2Nob29sLy4vbGliL2RiLmpzPzNkYzkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xuaW1wb3J0IHsgUHJpc21hTGliU3FsIH0gZnJvbSAnQHByaXNtYS9hZGFwdGVyLWxpYnNxbCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnO1xuXG5jb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKTtcbmNvbnN0IGRiUGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9wcmlzbWEvc2Nob29sLmRiJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVByaXNtYUNsaWVudCgpIHtcbiAgY29uc3QgYWRhcHRlciA9IG5ldyBQcmlzbWFMaWJTcWwoeyB1cmw6ICdmaWxlOicgKyBkYlBhdGggfSk7XG4gIHJldHVybiBuZXcgUHJpc21hQ2xpZW50KHsgYWRhcHRlciB9KTtcbn1cblxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcztcbmV4cG9ydCBjb25zdCBwcmlzbWEgPSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID8/IGNyZWF0ZVByaXNtYUNsaWVudCgpO1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWE7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXR0aW5ncygpIHtcbiAgY29uc3Qgcm93cyA9IGF3YWl0IHByaXNtYS5zZXR0aW5nLmZpbmRNYW55KCk7XG4gIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMocm93cy5tYXAociA9PiBbci5rZXksIHIudmFsdWVdKSk7XG59XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiUHJpc21hTGliU3FsIiwicGF0aCIsImZpbGVVUkxUb1BhdGgiLCJfX2Rpcm5hbWUiLCJkaXJuYW1lIiwidXJsIiwiZGJQYXRoIiwicmVzb2x2ZSIsImNyZWF0ZVByaXNtYUNsaWVudCIsImFkYXB0ZXIiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwicHJvY2VzcyIsImdldFNldHRpbmdzIiwicm93cyIsInNldHRpbmciLCJmaW5kTWFueSIsIk9iamVjdCIsImZyb21FbnRyaWVzIiwibWFwIiwiciIsImtleSIsInZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/bcryptjs","vendor-chunks/@prisma","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/async-mutex","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fmessages%2Froute&page=%2Fapi%2Fmessages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmessages%2Froute.js&appDir=C%3A%5CUsers%5Ca%5CDesktop%5Cmohammed%20al%20mokhtar%5Cschool-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ca%5CDesktop%5Cmohammed%20al%20mokhtar%5Cschool-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();