module.exports = [
"[externals]/maplibre-gl [external] (maplibre-gl, cjs, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[externals]_maplibre-gl_df37b79e._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[externals]/maplibre-gl [external] (maplibre-gl, cjs)");
    });
});
}),
];