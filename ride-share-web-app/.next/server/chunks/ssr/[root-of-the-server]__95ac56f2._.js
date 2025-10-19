module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CompanyPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ride$2d$share$2f$ride$2d$share$2d$web$2d$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/ride-share/ride-share-web-app/node_modules/next/router.js [ssr] (ecmascript)");
;
;
;
function CompanyPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$ride$2d$share$2f$ride$2d$share$2d$web$2d$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { companyName } = router.query;
    const displayName = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"](()=>{
        if (!companyName) return "Company";
        try {
            return decodeURIComponent(companyName).replace(/-/g, " ").replace(/\s+/g, " ").replace(/\b\w/g, (c)=>c.toUpperCase());
        } catch  {
            return String(companyName);
        }
    }, [
        companyName
    ]);
    const [description, setDescription] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"]("");
    __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"](()=>{
        if (!companyName) return;
        const key = String(companyName).toLowerCase();
        const map = {
            "acme-corp": "Acme Corp provides fast, affordable rides across the city with a focus on reliability and safety.",
            "ride-share-pro": "Ride Share Pro connects drivers and passengers with premium, on-time service and transparent pricing.",
            "city-cabs": "City Cabs offers 24/7 urban transportation with vetted drivers and clean vehicles."
        };
        const fallback = `${displayName} offers reliable rides and deliveries.`;
        const value = map[key] ?? fallback;
        const t = setTimeout(()=>setDescription(value), 200);
        return ()=>clearTimeout(t);
    }, [
        companyName,
        displayName
    ]);
    const [recentRides] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"]([
        {
            id: "r1",
            origin: "Downtown",
            destination: "Airport",
            date: new Date().toISOString(),
            reviews: [
                {
                    id: "rv1",
                    author: "Alex",
                    rating: 5,
                    comment: "Smooth ride and friendly driver.",
                    date: new Date().toISOString()
                },
                {
                    id: "rv2",
                    author: "Sam",
                    rating: 4,
                    comment: "On time, clean car.",
                    date: new Date().toISOString()
                }
            ]
        },
        {
            id: "r2",
            origin: "Central Station",
            destination: "Tech Park",
            date: new Date().toISOString(),
            reviews: [
                {
                    id: "rv3",
                    author: "Mia",
                    rating: 3,
                    comment: "Traffic was heavy, but okay overall.",
                    date: new Date().toISOString()
                }
            ]
        }
    ]);
    const [companyReviews] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"]([
        {
            id: "cr1",
            author: "Jordan",
            rating: 5,
            comment: "Excellent service across the board.",
            date: new Date().toISOString()
        },
        {
            id: "cr2",
            author: "Taylor",
            rating: 4,
            comment: "Reliable and affordable.",
            date: new Date().toISOString()
        }
    ]);
    const completedTrips = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"](()=>recentRides.length, [
        recentRides
    ]);
    const overallScore = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"](()=>{
        if (!companyReviews.length) return null;
        const avg = companyReviews.reduce((a, r)=>a + r.rating, 0) / companyReviews.length;
        return Number(avg.toFixed(1));
    }, [
        companyReviews
    ]);
    const cardStyle = {
        width: "100%",
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: 12,
        padding: 24,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
    };
    const sectionTitleStyle = {
        margin: 0,
        marginBottom: 12,
        fontSize: 18
    };
    const badgeStyle = (rating)=>({
            display: "inline-block",
            padding: "2px 8px",
            borderRadius: 999,
            background: rating >= 4 ? "#ecfdf5" : rating >= 3 ? "#eff6ff" : "#fff7ed",
            border: "1px solid #e2e8f0",
            color: "#111827",
            fontSize: 12,
            fontWeight: 600
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            background: "#f7f7f7",
            padding: 24
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                maxWidth: 980,
                display: "flex",
                flexDirection: "column",
                gap: 16
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: cardStyle,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                            style: {
                                margin: 0,
                                marginBottom: 8,
                                fontSize: 28
                            },
                            children: displayName
                        }, void 0, false, {
                            fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: 0,
                                color: "#666",
                                marginBottom: 16,
                                lineHeight: 1.5
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                            children: completedTrips
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                            lineNumber: 119,
                                            columnNumber: 15
                                        }, this),
                                        " completed trip",
                                        completedTrips === 1 ? "" : "s"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: [
                                        "Overall score: ",
                                        overallScore !== null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                    children: overallScore
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                                    lineNumber: 122,
                                                    columnNumber: 58
                                                }, this),
                                                "★"
                                            ]
                                        }, void 0, true) : "No reviews"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                    lineNumber: 121,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: 6
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontWeight: 600
                                    },
                                    children: "Description"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        borderRadius: 8,
                                        border: "1px solid #e2e8f0",
                                        padding: 12,
                                        color: "#374151",
                                        background: "#f9fafb",
                                        minHeight: 96,
                                        whiteSpace: "pre-wrap"
                                    },
                                    children: description || "Loading description..."
                                }, void 0, false, {
                                    fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                    lineNumber: 128,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: cardStyle,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            style: sectionTitleStyle,
                            children: "Recent rides"
                        }, void 0, false, {
                            fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: 12
                            },
                            children: recentRides.map((ride)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        border: "1px solid #e5e7eb",
                                        borderRadius: 10,
                                        padding: 16
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                marginBottom: 8
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontWeight: 600
                                                            },
                                                            children: [
                                                                ride.origin,
                                                                " → ",
                                                                ride.destination
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                                            lineNumber: 151,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                color: "#6b7280",
                                                                fontSize: 12
                                                            },
                                                            children: new Date(ride.date).toLocaleString()
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                                            lineNumber: 152,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    style: badgeStyle(ride.reviews.length ? Math.round(ride.reviews.reduce((a, r)=>a + r.rating, 0) / ride.reviews.length * 10) / 10 : 0),
                                                    children: ride.reviews.length ? `${(ride.reviews.reduce((a, r)=>a + r.rating, 0) / ride.reviews.length).toFixed(1)}★` : "No reviews"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                                    lineNumber: 154,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                            lineNumber: 149,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 8
                                            },
                                            children: ride.reviews.length ? ride.reviews.map((rev)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        background: "#f9fafb",
                                                        border: "1px solid #e5e7eb",
                                                        borderRadius: 8,
                                                        padding: 12
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                marginBottom: 4
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                    children: rev.author
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                                                    lineNumber: 174,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        color: "#111827"
                                                                    },
                                                                    children: [
                                                                        rev.rating,
                                                                        "★"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                                                    lineNumber: 175,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                                            lineNumber: 173,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                color: "#374151"
                                                            },
                                                            children: rev.comment
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                                            lineNumber: 177,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                color: "#6b7280",
                                                                fontSize: 12,
                                                                marginTop: 4
                                                            },
                                                            children: new Date(rev.date).toLocaleString()
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                                            lineNumber: 178,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, rev.id, true, {
                                                    fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                                    lineNumber: 172,
                                                    columnNumber: 23
                                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    color: "#6b7280",
                                                    fontStyle: "italic"
                                                },
                                                children: "No reviews for this ride yet."
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                                lineNumber: 182,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                            lineNumber: 169,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, ride.id, true, {
                                    fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                    lineNumber: 148,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                    lineNumber: 144,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: cardStyle,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            style: sectionTitleStyle,
                            children: "Company reviews"
                        }, void 0, false, {
                            fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                            lineNumber: 191,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                marginBottom: 12
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontWeight: 600
                                    },
                                    children: "Overall rating:"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    style: badgeStyle(companyReviews.length ? Math.round(companyReviews.reduce((a, r)=>a + r.rating, 0) / companyReviews.length * 10) / 10 : 0),
                                    children: companyReviews.length ? `${(companyReviews.reduce((a, r)=>a + r.rating, 0) / companyReviews.length).toFixed(1)}★` : "No reviews"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: 8
                            },
                            children: companyReviews.length ? companyReviews.map((rev)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: "#f9fafb",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: 8,
                                        padding: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginBottom: 4
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                    children: rev.author
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                                    lineNumber: 214,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: "#111827"
                                                    },
                                                    children: [
                                                        rev.rating,
                                                        "★"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                            lineNumber: 213,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: "#374151"
                                            },
                                            children: rev.comment
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                            lineNumber: 217,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: "#6b7280",
                                                fontSize: 12,
                                                marginTop: 4
                                            },
                                            children: new Date(rev.date).toLocaleString()
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                            lineNumber: 218,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, rev.id, true, {
                                    fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                    lineNumber: 212,
                                    columnNumber: 17
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    color: "#6b7280",
                                    fontStyle: "italic"
                                },
                                children: "No company reviews yet."
                            }, void 0, false, {
                                fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                                lineNumber: 222,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                            lineNumber: 209,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
                    lineNumber: 190,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
            lineNumber: 114,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/ride-share/ride-share-web-app/src/pages/companies/[companyName].tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__95ac56f2._.js.map