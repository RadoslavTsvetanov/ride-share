(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/DynamicMap.tsx [client] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/node_modules_e3ba53a4._.js",
  "static/chunks/src_components_70c050ef._.js",
  {
    "path": "static/chunks/_3c1cd636._.css",
    "included": [
      "[project]/node_modules/leaflet/dist/leaflet.css [client] (css)",
      "[project]/src/components/Map.module.scss.module.css [client] (css)"
    ],
    "moduleChunks": [
      "static/chunks/node_modules_leaflet_dist_leaflet_css_65f1660e._.single.css",
      "static/chunks/src_components_Map_module_scss_module_css_65f1660e._.single.css"
    ]
  },
  "static/chunks/src_components_DynamicMap_tsx_85a818b9._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/components/DynamicMap.tsx [client] (ecmascript, next/dynamic entry)");
    });
});
}),
]);