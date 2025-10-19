module.exports = [
"[externals]/leaflet [external] (leaflet, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("leaflet", () => require("leaflet"));

module.exports = mod;
}),
"[project]/src/pages/map/ride-opprotunities.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// App.jsx
__turbopack_context__.s([
    "default",
    ()=>RideOpportunities
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$leaflet__$5b$external$5d$__$28$leaflet$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/leaflet [external] (leaflet, cjs)");
(()=>{
    const e = new Error("Cannot find module 'leaflet-routing-machine'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module 'leaflet-routing-machine/dist/leaflet-routing-machine.css'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
;
;
;
function RideOpportunities() {
    const [position, setPosition] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [city, setCity] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // Get user location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos)=>{
                const { latitude, longitude } = pos.coords;
                setPosition([
                    latitude,
                    longitude
                ]);
                // Reverse geocode to get city
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
                const data = await res.json();
                setCity(data.address.city || data.address.town || data.address.village || "Unknown");
            });
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!position) return;
        // Add routing (example route near user)
        const map = __TURBOPACK__imported__module__$5b$externals$5d2f$leaflet__$5b$external$5d$__$28$leaflet$2c$__cjs$29$__["default"].map("map").setView(position, 13);
        __TURBOPACK__imported__module__$5b$externals$5d2f$leaflet__$5b$external$5d$__$28$leaflet$2c$__cjs$29$__["default"].tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        }).addTo(map);
        __TURBOPACK__imported__module__$5b$externals$5d2f$leaflet__$5b$external$5d$__$28$leaflet$2c$__cjs$29$__["default"].marker(position).addTo(map).bindPopup(`You are here: ${city}`).openPopup();
        // Example routing (simulate route nearby)
        __TURBOPACK__imported__module__$5b$externals$5d2f$leaflet__$5b$external$5d$__$28$leaflet$2c$__cjs$29$__["default"].Routing.control({
            waypoints: [
                __TURBOPACK__imported__module__$5b$externals$5d2f$leaflet__$5b$external$5d$__$28$leaflet$2c$__cjs$29$__["default"].latLng(position[0], position[1]),
                __TURBOPACK__imported__module__$5b$externals$5d2f$leaflet__$5b$external$5d$__$28$leaflet$2c$__cjs$29$__["default"].latLng(position[0] + 0.01, position[1] + 0.01),
                __TURBOPACK__imported__module__$5b$externals$5d2f$leaflet__$5b$external$5d$__$28$leaflet$2c$__cjs$29$__["default"].latLng(position[0] + 0.02, position[1] - 0.01)
            ],
            routeWhileDragging: false,
            draggableWaypoints: false,
            addWaypoints: false
        }).addTo(map);
    }, [
        position,
        city
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            height: "100vh",
            width: "100%"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            id: "map",
            style: {
                height: "100%",
                width: "100%"
            }
        }, void 0, false, {
            fileName: "[project]/src/pages/map/ride-opprotunities.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/map/ride-opprotunities.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__77dbf714._.js.map