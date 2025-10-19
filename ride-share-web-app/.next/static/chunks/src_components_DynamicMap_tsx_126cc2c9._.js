(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/DynamicMap.tsx [client] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/node_modules_e3ba53a4._.js",
  "static/chunks/src_components_DynamicMap_tsx_ecc2e3f4._.js",
  {
    "path": "static/chunks/node_modules_leaflet_dist_leaflet_6634502f.css",
    "included": [
      "[project]/node_modules/leaflet/dist/leaflet.css [client] (css)"
    ]
  },
  "static/chunks/src_components_DynamicMap_tsx_41893f80._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/components/DynamicMap.tsx [client] (ecmascript, next/dynamic entry)");
    });
});
}),
]);