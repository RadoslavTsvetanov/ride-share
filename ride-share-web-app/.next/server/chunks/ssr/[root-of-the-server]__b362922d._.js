module.exports = [
"[externals]/leaflet [external] (leaflet, cjs, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[externals]_leaflet_8dfa95e3._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[externals]/leaflet [external] (leaflet, cjs)");
    });
});
}),
"[externals]/leaflet-routing-machine [external] (leaflet-routing-machine, cjs, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[externals]_leaflet-routing-machine_034b9f32._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[externals]/leaflet-routing-machine [external] (leaflet-routing-machine, cjs)");
    });
});
}),
];