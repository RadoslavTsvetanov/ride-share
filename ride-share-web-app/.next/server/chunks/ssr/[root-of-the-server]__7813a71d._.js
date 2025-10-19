module.exports = [
"[project]/src/components/Map.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dynamic.js [ssr] (ecmascript)");
;
;
;
const DynamicMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/src/components/DynamicMap.tsx [ssr] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/DynamicMap.tsx [client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;
const Map = (props)=>{
    const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            aspectRatio: width / height
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(DynamicMap, {
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/Map.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/Map.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Map;
}),
"[project]/src/pages/map/ride-opprotunities.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Map$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Map.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/api.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const DEFAULT_CENTER = [
    38.907132,
    -77.036546
];
;
// Simulate a route with multiple waypoints
const ROUTE_COORDINATES = [
    [
        38.907132,
        -77.036546
    ],
    [
        38.910,
        -77.040
    ],
    [
        38.915,
        -77.045
    ],
    [
        38.920,
        -77.048
    ],
    [
        38.925,
        -77.050
    ]
];
const Route = (props)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(props.others.Popup, {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                    href: "http://localhost:3000/companies/" + props.routeData.id
                }, void 0, false, {
                    fileName: "[project]/src/pages/map/ride-opprotunities.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/pages/map/ride-opprotunities.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(props.others.Marker, {
                position: [
                    props.routeData.startLat,
                    props.routeData.startLng
                ],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(props.others.Popup, {
                    children: [
                        "Start Point for Ride Opportunity ",
                        props.routeData.id
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/map/ride-opprotunities.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/pages/map/ride-opprotunities.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(props.others.Marker, {
                position: [
                    props.routeData.endLat,
                    props.routeData.endLng
                ],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(props.others.Popup, {
                    children: [
                        "End Point for Ride Opportunity ",
                        props.routeData.id
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/map/ride-opprotunities.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/pages/map/ride-opprotunities.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(props.others.Polyline, {
                positions: props.routeData.stops,
                color: "blue",
                weight: 4,
                opacity: 0.7
            }, void 0, false, {
                fileName: "[project]/src/pages/map/ride-opprotunities.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
function Home() {
    const [userLocation, setUserLocation] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(DEFAULT_CENTER);
    const rides = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["api"].post.getRidesOpportunities.useQuery();
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // Get user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
                const { latitude, longitude } = position.coords;
                const location = [
                    latitude,
                    longitude
                ];
                setUserLocation(location);
            }, (error)=>{
                console.error('Error getting user location:', error);
            // Fallback to default center if location access is denied
            });
        }
        setInterval(()=>{
            setUserLocation([
                30.0000,
                30.0000
            ]);
        }, 5000);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Map$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
            width: "800",
            height: "400",
            center: userLocation,
            zoom: 12,
            children: ({ TileLayer, Marker, Popup, Polyline })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(TileLayer, {
                            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                            attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        }, void 0, false, {
                            fileName: "[project]/src/pages/map/ride-opprotunities.tsx",
                            lineNumber: 80,
                            columnNumber: 17
                        }, this),
                        rides?.data?.map((ride)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Route, {
                                routeData: ride,
                                others: {
                                    TileLayer,
                                    Marker,
                                    Popup,
                                    Polyline
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/pages/map/ride-opprotunities.tsx",
                                lineNumber: 85,
                                columnNumber: 19
                            }, this))
                    ]
                }, void 0, true)
        }, void 0, false, {
            fileName: "[project]/src/pages/map/ride-opprotunities.tsx",
            lineNumber: 77,
            columnNumber: 11
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/map/ride-opprotunities.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7813a71d._.js.map