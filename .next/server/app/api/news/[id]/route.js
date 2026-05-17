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
exports.id = "app/api/news/[id]/route";
exports.ids = ["app/api/news/[id]/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fnews%2F%5Bid%5D%2Froute&page=%2Fapi%2Fnews%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fnews%2F%5Bid%5D%2Froute.js&appDir=C%3A%5CUsers%5Ca%5CDesktop%5Cmohammed%20al%20mokhtar%5Cschool-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ca%5CDesktop%5Cmohammed%20al%20mokhtar%5Cschool-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fnews%2F%5Bid%5D%2Froute&page=%2Fapi%2Fnews%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fnews%2F%5Bid%5D%2Froute.js&appDir=C%3A%5CUsers%5Ca%5CDesktop%5Cmohammed%20al%20mokhtar%5Cschool-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ca%5CDesktop%5Cmohammed%20al%20mokhtar%5Cschool-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_a_Desktop_mohammed_al_mokhtar_school_app_app_api_news_id_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/news/[id]/route.js */ \"(rsc)/./app/api/news/[id]/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/news/[id]/route\",\n        pathname: \"/api/news/[id]\",\n        filename: \"route\",\n        bundlePath: \"app/api/news/[id]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\a\\\\Desktop\\\\mohammed al mokhtar\\\\school-app\\\\app\\\\api\\\\news\\\\[id]\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_a_Desktop_mohammed_al_mokhtar_school_app_app_api_news_id_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/news/[id]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZuZXdzJTJGJTVCaWQlNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRm5ld3MlMkYlNUJpZCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRm5ld3MlMkYlNUJpZCU1RCUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNhJTVDRGVza3RvcCU1Q21vaGFtbWVkJTIwYWwlMjBtb2todGFyJTVDc2Nob29sLWFwcCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDYSU1Q0Rlc2t0b3AlNUNtb2hhbW1lZCUyMGFsJTIwbW9raHRhciU1Q3NjaG9vbC1hcHAmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ3NDO0FBQ25IO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW9raHRhci1zY2hvb2wvP2Y0ZDMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcYVxcXFxEZXNrdG9wXFxcXG1vaGFtbWVkIGFsIG1va2h0YXJcXFxcc2Nob29sLWFwcFxcXFxhcHBcXFxcYXBpXFxcXG5ld3NcXFxcW2lkXVxcXFxyb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvbmV3cy9baWRdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvbmV3cy9baWRdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9uZXdzL1tpZF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxhXFxcXERlc2t0b3BcXFxcbW9oYW1tZWQgYWwgbW9raHRhclxcXFxzY2hvb2wtYXBwXFxcXGFwcFxcXFxhcGlcXFxcbmV3c1xcXFxbaWRdXFxcXHJvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9uZXdzL1tpZF0vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fnews%2F%5Bid%5D%2Froute&page=%2Fapi%2Fnews%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fnews%2F%5Bid%5D%2Froute.js&appDir=C%3A%5CUsers%5Ca%5CDesktop%5Cmohammed%20al%20mokhtar%5Cschool-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ca%5CDesktop%5Cmohammed%20al%20mokhtar%5Cschool-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/news/[id]/route.js":
/*!************************************!*\
  !*** ./app/api/news/[id]/route.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PATCH: () => (/* binding */ PATCH)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.js\");\n\n\n\nfunction auth(req) {\n    return (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.verifyToken)(req.cookies.get(\"token\")?.value);\n}\nasync function GET(req, { params }) {\n    const item = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.news.findUnique({\n        where: {\n            id: parseInt(params.id)\n        }\n    });\n    if (!item) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"غير موجود\"\n    }, {\n        status: 404\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        news: item\n    });\n}\nasync function PATCH(req, { params }) {\n    if (!auth(req)) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"غير مصرح\"\n    }, {\n        status: 401\n    });\n    const body = await req.json();\n    const item = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.news.update({\n        where: {\n            id: parseInt(params.id)\n        },\n        data: body\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        news: item\n    });\n}\nasync function DELETE(req, { params }) {\n    if (!auth(req)) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"غير مصرح\"\n    }, {\n        status: 401\n    });\n    await _lib_db__WEBPACK_IMPORTED_MODULE_1__.prisma.news.delete({\n        where: {\n            id: parseInt(params.id)\n        }\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        success: true\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL25ld3MvW2lkXS9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBMkM7QUFDVDtBQUNPO0FBRXpDLFNBQVNHLEtBQUtDLEdBQUc7SUFBSSxPQUFPRixzREFBV0EsQ0FBQ0UsSUFBSUMsT0FBTyxDQUFDQyxHQUFHLENBQUMsVUFBVUM7QUFBUTtBQUVuRSxlQUFlQyxJQUFJSixHQUFHLEVBQUUsRUFBRUssTUFBTSxFQUFFO0lBQ3ZDLE1BQU1DLE9BQU8sTUFBTVQsMkNBQU1BLENBQUNVLElBQUksQ0FBQ0MsVUFBVSxDQUFDO1FBQUVDLE9BQU87WUFBRUMsSUFBSUMsU0FBU04sT0FBT0ssRUFBRTtRQUFFO0lBQUU7SUFDL0UsSUFBSSxDQUFDSixNQUFNLE9BQU9WLHFEQUFZQSxDQUFDZ0IsSUFBSSxDQUFDO1FBQUVDLE9BQU87SUFBWSxHQUFHO1FBQUVDLFFBQVE7SUFBSTtJQUMxRSxPQUFPbEIscURBQVlBLENBQUNnQixJQUFJLENBQUM7UUFBRUwsTUFBTUQ7SUFBSztBQUN4QztBQUVPLGVBQWVTLE1BQU1mLEdBQUcsRUFBRSxFQUFFSyxNQUFNLEVBQUU7SUFDekMsSUFBSSxDQUFDTixLQUFLQyxNQUFNLE9BQU9KLHFEQUFZQSxDQUFDZ0IsSUFBSSxDQUFDO1FBQUVDLE9BQU87SUFBVyxHQUFHO1FBQUVDLFFBQVE7SUFBSTtJQUM5RSxNQUFNRSxPQUFPLE1BQU1oQixJQUFJWSxJQUFJO0lBQzNCLE1BQU1OLE9BQU8sTUFBTVQsMkNBQU1BLENBQUNVLElBQUksQ0FBQ1UsTUFBTSxDQUFDO1FBQUVSLE9BQU87WUFBRUMsSUFBSUMsU0FBU04sT0FBT0ssRUFBRTtRQUFFO1FBQUdRLE1BQU1GO0lBQUs7SUFDdkYsT0FBT3BCLHFEQUFZQSxDQUFDZ0IsSUFBSSxDQUFDO1FBQUVMLE1BQU1EO0lBQUs7QUFDeEM7QUFFTyxlQUFlYSxPQUFPbkIsR0FBRyxFQUFFLEVBQUVLLE1BQU0sRUFBRTtJQUMxQyxJQUFJLENBQUNOLEtBQUtDLE1BQU0sT0FBT0oscURBQVlBLENBQUNnQixJQUFJLENBQUM7UUFBRUMsT0FBTztJQUFXLEdBQUc7UUFBRUMsUUFBUTtJQUFJO0lBQzlFLE1BQU1qQiwyQ0FBTUEsQ0FBQ1UsSUFBSSxDQUFDYSxNQUFNLENBQUM7UUFBRVgsT0FBTztZQUFFQyxJQUFJQyxTQUFTTixPQUFPSyxFQUFFO1FBQUU7SUFBRTtJQUM5RCxPQUFPZCxxREFBWUEsQ0FBQ2dCLElBQUksQ0FBQztRQUFFUyxTQUFTO0lBQUs7QUFDM0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb2todGFyLXNjaG9vbC8uL2FwcC9hcGkvbmV3cy9baWRdL3JvdXRlLmpzPzMzMTEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnQC9saWIvZGInO1xuaW1wb3J0IHsgdmVyaWZ5VG9rZW4gfSBmcm9tICdAL2xpYi9hdXRoJztcblxuZnVuY3Rpb24gYXV0aChyZXEpIHsgcmV0dXJuIHZlcmlmeVRva2VuKHJlcS5jb29raWVzLmdldCgndG9rZW4nKT8udmFsdWUpOyB9XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxLCB7IHBhcmFtcyB9KSB7XG4gIGNvbnN0IGl0ZW0gPSBhd2FpdCBwcmlzbWEubmV3cy5maW5kVW5pcXVlKHsgd2hlcmU6IHsgaWQ6IHBhcnNlSW50KHBhcmFtcy5pZCkgfSB9KTtcbiAgaWYgKCFpdGVtKSByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ9i62YrYsSDZhdmI2KzZiNivJyB9LCB7IHN0YXR1czogNDA0IH0pO1xuICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBuZXdzOiBpdGVtIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUEFUQ0gocmVxLCB7IHBhcmFtcyB9KSB7XG4gIGlmICghYXV0aChyZXEpKSByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ9i62YrYsSDZhdi12LHYrScgfSwgeyBzdGF0dXM6IDQwMSB9KTtcbiAgY29uc3QgYm9keSA9IGF3YWl0IHJlcS5qc29uKCk7XG4gIGNvbnN0IGl0ZW0gPSBhd2FpdCBwcmlzbWEubmV3cy51cGRhdGUoeyB3aGVyZTogeyBpZDogcGFyc2VJbnQocGFyYW1zLmlkKSB9LCBkYXRhOiBib2R5IH0pO1xuICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBuZXdzOiBpdGVtIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gREVMRVRFKHJlcSwgeyBwYXJhbXMgfSkge1xuICBpZiAoIWF1dGgocmVxKSkgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICfYutmK2LEg2YXYtdix2K0nIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4gIGF3YWl0IHByaXNtYS5uZXdzLmRlbGV0ZSh7IHdoZXJlOiB7IGlkOiBwYXJzZUludChwYXJhbXMuaWQpIH0gfSk7XG4gIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicHJpc21hIiwidmVyaWZ5VG9rZW4iLCJhdXRoIiwicmVxIiwiY29va2llcyIsImdldCIsInZhbHVlIiwiR0VUIiwicGFyYW1zIiwiaXRlbSIsIm5ld3MiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpZCIsInBhcnNlSW50IiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiUEFUQ0giLCJib2R5IiwidXBkYXRlIiwiZGF0YSIsIkRFTEVURSIsImRlbGV0ZSIsInN1Y2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/news/[id]/route.js\n");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/bcryptjs","vendor-chunks/@prisma","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/async-mutex","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fnews%2F%5Bid%5D%2Froute&page=%2Fapi%2Fnews%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fnews%2F%5Bid%5D%2Froute.js&appDir=C%3A%5CUsers%5Ca%5CDesktop%5Cmohammed%20al%20mokhtar%5Cschool-app%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ca%5CDesktop%5Cmohammed%20al%20mokhtar%5Cschool-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();