module.exports = [
"[externals]/leaflet [external] (leaflet, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("leaflet", () => require("leaflet"));

module.exports = mod;
}),
"[externals]/react-leaflet [external] (react-leaflet, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("react-leaflet");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/components/Map.module.scss [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
});
}),
"[project]/src/components/DynamicMap.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$leaflet__$5b$external$5d$__$28$leaflet$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/leaflet [external] (leaflet, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$leaflet__$5b$external$5d$__$28$react$2d$leaflet$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-leaflet [external] (react-leaflet, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Map$2e$module$2e$scss__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/Map.module.scss [ssr] (css module)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$leaflet__$5b$external$5d$__$28$react$2d$leaflet$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$leaflet__$5b$external$5d$__$28$react$2d$leaflet$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
const { MapContainer } = __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$leaflet__$5b$external$5d$__$28$react$2d$leaflet$2c$__esm_import$29$__;
const Map = ({ children, className, width, height, ...rest })=>{
    let mapClassName = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Map$2e$module$2e$scss__$5b$ssr$5d$__$28$css__module$29$__["default"].map;
    if (className) {
        mapClassName = `${mapClassName} ${className}`;
    }
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        (async function init() {
            delete __TURBOPACK__imported__module__$5b$externals$5d2f$leaflet__$5b$external$5d$__$28$leaflet$2c$__cjs$29$__["default"].Icon.Default.prototype._getIconUrl;
            __TURBOPACK__imported__module__$5b$externals$5d2f$leaflet__$5b$external$5d$__$28$leaflet$2c$__cjs$29$__["default"].Icon.Default.mergeOptions({
                iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
                iconUrl: 'leaflet/images/marker-icon.png',
                shadowUrl: 'leaflet/images/marker-shadow.png'
            });
        })();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(MapContainer, {
        className: mapClassName,
        ...rest,
        children: children(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$leaflet__$5b$external$5d$__$28$react$2d$leaflet$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$leaflet__$5b$external$5d$__$28$leaflet$2c$__cjs$29$__["default"])
    }, void 0, false, {
        fileName: "[project]/src/components/DynamicMap.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Map;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/components/DynamicMap.tsx [ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/DynamicMap.tsx [ssr] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2d2454c0._.js.map