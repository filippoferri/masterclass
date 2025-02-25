"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/dashboard",{

/***/ "./pages/dashboard.tsx":
/*!*****************************!*\
  !*** ./pages/dashboard.tsx ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Dashboard; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/react */ \"./node_modules/next-auth/react/index.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! swr */ \"./node_modules/swr/dist/index/index.mjs\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction Dashboard() {\n    var _session_user;\n    _s();\n    const { data: session, status } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.useSession)();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const fetcher = (url)=>fetch(url, {\n            credentials: \"include\"\n        }).then((res)=>res.json());\n    const { data: masterclasses, error } = (0,swr__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(\"/api/masterclasses\", fetcher);\n    if (status === \"loading\") return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n        children: \"Loading session...\"\n    }, void 0, false, {\n        fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n        lineNumber: 17,\n        columnNumber: 36\n    }, this);\n    if (status === \"unauthenticated\" || (session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.role) !== \"ADMIN\") {\n        router.push(\"/admin\");\n        return null;\n    }\n    if (error) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n        children: \"Failed to load masterclasses\"\n    }, void 0, false, {\n        fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n        lineNumber: 23,\n        columnNumber: 21\n    }, this);\n    if (!masterclasses) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n        children: \"Loading masterclasses...\"\n    }, void 0, false, {\n        fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n        lineNumber: 24,\n        columnNumber: 30\n    }, this);\n    async function handleDelete(id) {\n        if (!window.confirm(\"Are you sure you want to delete?\")) return;\n        try {\n            const res = await fetch(\"/api/masterclasses/\".concat(id), {\n                method: \"DELETE\",\n                credentials: \"include\"\n            });\n            if (!res.ok) throw new Error(\"Failed to delete\");\n            (0,swr__WEBPACK_IMPORTED_MODULE_5__.mutate)(\"/api/masterclasses\");\n            router.refresh();\n        } catch (err) {\n            alert(err.message);\n        }\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"min-h-screen flex justify-center bg-gray-100 px-4\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"w-full max-w-4xl bg-white shadow-md rounded-lg p-6\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                    className: \"text-3xl font-bold text-gray-800 mb-6 text-center\",\n                    children: \"Masterclass Dashboard\"\n                }, void 0, false, {\n                    fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n                    lineNumber: 47,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex justify-end mb-6\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {\n                        href: \"/dashboard/create\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            className: \"button\",\n                            children: \"+ Create Masterclass\"\n                        }, void 0, false, {\n                            fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n                            lineNumber: 53,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n                        lineNumber: 52,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n                    lineNumber: 51,\n                    columnNumber: 9\n                }, this),\n                masterclasses.length > 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                    className: \"space-y-4\",\n                    children: masterclasses.map((mc)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                            className: \"p-4 bg-gray-100 rounded-md flex justify-between items-center\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"w-1/3 flex flex-col\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                            className: \"text-lg font-bold\",\n                                            children: mc.title\n                                        }, void 0, false, {\n                                            fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n                                            lineNumber: 67,\n                                            columnNumber: 19\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                            className: \"text-sm text-gray-600\",\n                                            children: [\n                                                \"Duration: \",\n                                                mc.duration,\n                                                \" min\"\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n                                            lineNumber: 68,\n                                            columnNumber: 19\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n                                    lineNumber: 66,\n                                    columnNumber: 17\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"w-1/3 flex items-center justify-center  space-x-4\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n                                    lineNumber: 71,\n                                    columnNumber: 17\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"w-1/3 flex items-center justify-end space-x-4\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                            onClick: ()=>router.push(\"/dashboard/edit/\".concat(mc.id)),\n                                            className: \"p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600\",\n                                            title: \"Edit\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"svg\", {\n                                                xmlns: \"http://www.w3.org/2000/svg\",\n                                                fill: \"none\",\n                                                viewBox: \"0 0 24 24\",\n                                                strokeWidth: 1.5,\n                                                stroke: \"currentColor\",\n                                                className: \"w-6 h-6\",\n                                                \"aria-hidden\": \"true\",\n                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"path\", {\n                                                    strokeLinecap: \"round\",\n                                                    strokeLinejoin: \"round\",\n                                                    d: \"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10\"\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n                                                    lineNumber: 88,\n                                                    columnNumber: 27\n                                                }, this)\n                                            }, void 0, false, {\n                                                fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n                                                lineNumber: 79,\n                                                columnNumber: 21\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n                                            lineNumber: 74,\n                                            columnNumber: 19\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                            onClick: ()=>handleDelete(mc.id),\n                                            className: \"p-3 bg-red-500 text-white rounded-full hover:bg-red-600\",\n                                            title: \"Delete\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"svg\", {\n                                                xmlns: \"http://www.w3.org/2000/svg\",\n                                                fill: \"none\",\n                                                viewBox: \"0 0 24 24\",\n                                                strokeWidth: 1.5,\n                                                stroke: \"currentColor\",\n                                                className: \"w-6 h-6\",\n                                                \"aria-hidden\": \"true\",\n                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"path\", {\n                                                    strokeLinecap: \"round\",\n                                                    strokeLinejoin: \"round\",\n                                                    d: \"M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0\"\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n                                                    lineNumber: 105,\n                                                    columnNumber: 27\n                                                }, this)\n                                            }, void 0, false, {\n                                                fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n                                                lineNumber: 96,\n                                                columnNumber: 21\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n                                            lineNumber: 91,\n                                            columnNumber: 19\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n                                    lineNumber: 73,\n                                    columnNumber: 17\n                                }, this)\n                            ]\n                        }, mc.id, true, {\n                            fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n                            lineNumber: 62,\n                            columnNumber: 15\n                        }, this))\n                }, void 0, false, {\n                    fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n                    lineNumber: 60,\n                    columnNumber: 11\n                }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: \"text-center text-gray-600\",\n                    children: \"No masterclasses available.\"\n                }, void 0, false, {\n                    fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n                    lineNumber: 113,\n                    columnNumber: 11\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n            lineNumber: 46,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/filippoferri/Projects/masterclass/pages/dashboard.tsx\",\n        lineNumber: 45,\n        columnNumber: 5\n    }, this);\n}\n_s(Dashboard, \"+xpZ5JrWY2d6lo+bO3NOiqljEM4=\", false, function() {\n    return [\n        next_auth_react__WEBPACK_IMPORTED_MODULE_1__.useSession,\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter,\n        swr__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\n    ];\n});\n_c = Dashboard;\nvar _c;\n$RefreshReg$(_c, \"Dashboard\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O2dEQUNOQyxNQUFLO2dEQUNMQyxTQUFRO2dEQUNSQyxhQUFhO2dEQUNiQyxRQUFPO2dEQUNQbEIsV0FBVTtnREFDVm1CLGVBQVk7MERBRVosNEVBQUNDO29EQUFLQyxlQUFjO29EQUFRQyxnQkFBZTtvREFBUUMsR0FBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkJBMUMxRGhCLEdBQUdsQixFQUFFOzs7Ozs7Ozs7eUNBa0RoQiw4REFBQ0w7b0JBQUVnQixXQUFVOzhCQUE0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLbkQ7R0E3R3dCOUI7O1FBQ1lOLHVEQUFVQTtRQUM3QkMsc0RBQVNBO1FBSWVHLDJDQUFNQTs7O0tBTnZCRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9kYXNoYm9hcmQudHN4P2Q3ZjYiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCB7IHVzZVNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoL3JlYWN0XCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9uYXZpZ2F0aW9uXCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdXNlU1dSLCB7IG11dGF0ZSB9IGZyb20gXCJzd3JcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGFzaGJvYXJkKCkge1xuICBjb25zdCB7IGRhdGE6IHNlc3Npb24sIHN0YXR1cyB9ID0gdXNlU2Vzc2lvbigpO1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICBjb25zdCBmZXRjaGVyID0gKHVybDogc3RyaW5nKSA9PlxuICAgIGZldGNoKHVybCwgeyBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIgfSkudGhlbigocmVzKSA9PiByZXMuanNvbigpKTtcbiAgY29uc3QgeyBkYXRhOiBtYXN0ZXJjbGFzc2VzLCBlcnJvciB9ID0gdXNlU1dSKFwiL2FwaS9tYXN0ZXJjbGFzc2VzXCIsIGZldGNoZXIpO1xuXG4gIGlmIChzdGF0dXMgPT09IFwibG9hZGluZ1wiKSByZXR1cm4gPHA+TG9hZGluZyBzZXNzaW9uLi4uPC9wPjtcbiAgaWYgKHN0YXR1cyA9PT0gXCJ1bmF1dGhlbnRpY2F0ZWRcIiB8fCBzZXNzaW9uPy51c2VyPy5yb2xlICE9PSBcIkFETUlOXCIpIHtcbiAgICByb3V0ZXIucHVzaChcIi9hZG1pblwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChlcnJvcikgcmV0dXJuIDxwPkZhaWxlZCB0byBsb2FkIG1hc3RlcmNsYXNzZXM8L3A+O1xuICBpZiAoIW1hc3RlcmNsYXNzZXMpIHJldHVybiA8cD5Mb2FkaW5nIG1hc3RlcmNsYXNzZXMuLi48L3A+O1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZURlbGV0ZShpZDogc3RyaW5nKSB7XG4gICAgaWYgKCF3aW5kb3cuY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGU/XCIpKSByZXR1cm47XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYC9hcGkvbWFzdGVyY2xhc3Nlcy8ke2lkfWAsIHtcbiAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXMub2spIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBkZWxldGVcIik7XG5cbiAgICAgIG11dGF0ZShcIi9hcGkvbWFzdGVyY2xhc3Nlc1wiKTtcbiAgICAgIHJvdXRlci5yZWZyZXNoKCk7XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIGFsZXJ0KGVyci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGZsZXgganVzdGlmeS1jZW50ZXIgYmctZ3JheS0xMDAgcHgtNFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctNHhsIGJnLXdoaXRlIHNoYWRvdy1tZCByb3VuZGVkLWxnIHAtNlwiPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC0zeGwgZm9udC1ib2xkIHRleHQtZ3JheS04MDAgbWItNiB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgIE1hc3RlcmNsYXNzIERhc2hib2FyZFxuICAgICAgICA8L2gxPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWVuZCBtYi02XCI+XG4gICAgICAgICAgPExpbmsgaHJlZj1cIi9kYXNoYm9hcmQvY3JlYXRlXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvblwiPlxuICAgICAgICAgICAgICArIENyZWF0ZSBNYXN0ZXJjbGFzc1xuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7bWFzdGVyY2xhc3Nlcy5sZW5ndGggPiAwID8gKFxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cbiAgICAgICAgICAgIHttYXN0ZXJjbGFzc2VzLm1hcCgobWM6IGFueSkgPT4gKFxuICAgICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICBrZXk9e21jLmlkfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtNCBiZy1ncmF5LTEwMCByb3VuZGVkLW1kIGZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlclwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xLzMgZmxleCBmbGV4LWNvbFwiPlxuICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkXCI+e21jLnRpdGxlfTwvaDI+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS02MDBcIj5EdXJhdGlvbjoge21jLmR1cmF0aW9ufSBtaW48L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMS8zIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyICBzcGFjZS14LTRcIj48L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xLzMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1lbmQgc3BhY2UteC00XCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHJvdXRlci5wdXNoKGAvZGFzaGJvYXJkL2VkaXQvJHttYy5pZH1gKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0zIGJnLWdyYXktNTAwIHRleHQtd2hpdGUgcm91bmRlZC1mdWxsIGhvdmVyOmJnLWdyYXktNjAwXCJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJFZGl0XCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHN2ZyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsPVwibm9uZVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXsxLjV9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy02IGgtNlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE2Ljg2MiA0LjQ4NyAxLjY4Ny0xLjY4OGExLjg3NSAxLjg3NSAwIDEgMSAyLjY1MiAyLjY1MkwxMC41ODIgMTYuMDdhNC41IDQuNSAwIDAgMS0xLjg5NyAxLjEzTDYgMThsLjgtMi42ODVhNC41IDQuNSAwIDAgMSAxLjEzLTEuODk3bDguOTMyLTguOTMxWm0wIDBMMTkuNSA3LjEyNU0xOCAxNHY0Ljc1QTIuMjUgMi4yNSAwIDAgMSAxNS43NSAyMUg1LjI1QTIuMjUgMi4yNSAwIDAgMSAzIDE4Ljc1VjguMjVBMi4yNSAyLjI1IDAgMCAxIDUuMjUgNkgxMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVEZWxldGUobWMuaWQpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTMgYmctcmVkLTUwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtZnVsbCBob3ZlcjpiZy1yZWQtNjAwXCJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJEZWxldGVcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIFxuICAgICAgICAgICAgICAgICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGw9XCJub25lXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9ezEuNX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTYgaC02XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQuNzQgOWwtLjM0NiA5bS00Ljc4OCAwTDkuMjYgOW05Ljk2OC0zLjIxYy4zNDIuMDUyLjY4Mi4xMDcgMS4wMjIuMTY2bS0xLjAyMi0uMTY1TDE4LjE2IDE5LjY3M2EyLjI1IDIuMjUgMCAwIDEtMi4yNDQgMi4wNzdIOC4wODRhMi4yNSAyLjI1IDAgMCAxLTIuMjQ0LTIuMDc3TDQuNzcyIDUuNzltMTQuNDU2IDBhNDguMTA4IDQ4LjEwOCAwIDAgMC0zLjQ3OC0uMzk3bS0xMiAuNTYyYy4zNC0uMDU5LjY4LS4xMTQgMS4wMjItLjE2NW0wIDBhNDguMTEgNDguMTEgMCAwIDEgMy40NzgtLjM5N203LjUgMHYtLjkxNmMwLTEuMTgtLjkxLTIuMTY0LTIuMDktMi4yMDFhNTEuOTY0IDUxLjk2NCAwIDAgMC0zLjMyIDBjLTEuMTguMDM3LTIuMDkgMS4wMjItMi4wOSAyLjIwMXYuOTE2bTcuNSAwYTQ4LjY2NyA0OC42NjcgMCAwIDAtNy41IDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L3VsPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHRleHQtZ3JheS02MDBcIj5ObyBtYXN0ZXJjbGFzc2VzIGF2YWlsYWJsZS48L3A+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn0iXSwibmFtZXMiOlsidXNlU2Vzc2lvbiIsInVzZVJvdXRlciIsIkxpbmsiLCJSZWFjdCIsInVzZVNXUiIsIm11dGF0ZSIsIkRhc2hib2FyZCIsInNlc3Npb24iLCJkYXRhIiwic3RhdHVzIiwicm91dGVyIiwiZmV0Y2hlciIsInVybCIsImZldGNoIiwiY3JlZGVudGlhbHMiLCJ0aGVuIiwicmVzIiwianNvbiIsIm1hc3RlcmNsYXNzZXMiLCJlcnJvciIsInAiLCJ1c2VyIiwicm9sZSIsInB1c2giLCJoYW5kbGVEZWxldGUiLCJpZCIsIndpbmRvdyIsImNvbmZpcm0iLCJtZXRob2QiLCJvayIsIkVycm9yIiwicmVmcmVzaCIsImVyciIsImFsZXJ0IiwibWVzc2FnZSIsImRpdiIsImNsYXNzTmFtZSIsImgxIiwiaHJlZiIsImJ1dHRvbiIsImxlbmd0aCIsInVsIiwibWFwIiwibWMiLCJsaSIsImgyIiwidGl0bGUiLCJkdXJhdGlvbiIsIm9uQ2xpY2siLCJzdmciLCJ4bWxucyIsImZpbGwiLCJ2aWV3Qm94Iiwic3Ryb2tlV2lkdGgiLCJzdHJva2UiLCJhcmlhLWhpZGRlbiIsInBhdGgiLCJzdHJva2VMaW5lY2FwIiwic3Ryb2tlTGluZWpvaW4iLCJkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/dashboard.tsx\n"));

/***/ })

});