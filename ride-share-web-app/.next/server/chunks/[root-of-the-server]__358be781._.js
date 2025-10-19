module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/@trpc/server/adapters/next [external] (@trpc/server/adapters/next, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("@trpc/server/adapters/next");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@t3-oss/env-nextjs [external] (@t3-oss/env-nextjs, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("@t3-oss/env-nextjs");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/zod [external] (zod, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("zod");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/env.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "env",
    ()=>env
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$t3$2d$oss$2f$env$2d$nextjs__$5b$external$5d$__$2840$t3$2d$oss$2f$env$2d$nextjs$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@t3-oss/env-nextjs [external] (@t3-oss/env-nextjs, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/zod [external] (zod, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$t3$2d$oss$2f$env$2d$nextjs__$5b$external$5d$__$2840$t3$2d$oss$2f$env$2d$nextjs$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$t3$2d$oss$2f$env$2d$nextjs__$5b$external$5d$__$2840$t3$2d$oss$2f$env$2d$nextjs$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const env = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$t3$2d$oss$2f$env$2d$nextjs__$5b$external$5d$__$2840$t3$2d$oss$2f$env$2d$nextjs$2c$__esm_import$29$__["createEnv"])({
    /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */ server: {
        DATABASE_URL: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().url(),
        NODE_ENV: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].enum([
            "development",
            "test",
            "production"
        ]).default("development")
    },
    /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */ client: {
    },
    /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */ runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: ("TURBOPACK compile-time value", "development")
    },
    /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */ skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */ emptyStringAsUndefined: true
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/@trpc/server [external] (@trpc/server, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("@trpc/server");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/superjson [external] (superjson, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("superjson");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/src/server/db.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/env.js [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$js__$5b$api$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$js__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const createPrismaClient = ()=>new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]({
        log: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$js__$5b$api$5d$__$28$ecmascript$29$__["env"].NODE_ENV === "development" ? [
            "query",
            "error",
            "warn"
        ] : [
            "error"
        ]
    });
const globalForPrisma = globalThis;
const db = globalForPrisma.prisma ?? createPrismaClient();
if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$js__$5b$api$5d$__$28$ecmascript$29$__["env"].NODE_ENV !== "production") globalForPrisma.prisma = db;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/server/api/trpc.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */ __turbopack_context__.s([
    "createCallerFactory",
    ()=>createCallerFactory,
    "createTRPCContext",
    ()=>createTRPCContext,
    "createTRPCRouter",
    ()=>createTRPCRouter,
    "publicProcedure",
    ()=>publicProcedure
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$trpc$2f$server__$5b$external$5d$__$2840$trpc$2f$server$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@trpc/server [external] (@trpc/server, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$superjson__$5b$external$5d$__$28$superjson$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/superjson [external] (superjson, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/zod [external] (zod, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/db.ts [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$trpc$2f$server__$5b$external$5d$__$2840$trpc$2f$server$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$superjson__$5b$external$5d$__$28$superjson$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$trpc$2f$server__$5b$external$5d$__$2840$trpc$2f$server$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$superjson__$5b$external$5d$__$28$superjson$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */ const createInnerTRPCContext = (_opts)=>{
    return {
        db: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["db"]
    };
};
const createTRPCContext = (_opts)=>{
    return createInnerTRPCContext({});
};
/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */ const t = __TURBOPACK__imported__module__$5b$externals$5d2f40$trpc$2f$server__$5b$external$5d$__$2840$trpc$2f$server$2c$__esm_import$29$__["initTRPC"].context().create({
    transformer: __TURBOPACK__imported__module__$5b$externals$5d2f$superjson__$5b$external$5d$__$28$superjson$2c$__esm_import$29$__["default"],
    errorFormatter ({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError: error.cause instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["ZodError"] ? error.cause.flatten() : null
            }
        };
    }
});
const createCallerFactory = t.createCallerFactory;
const createTRPCRouter = t.router;
/**
 * Middleware for timing procedure execution and adding an artificial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */ const timingMiddleware = t.middleware(async ({ next, path })=>{
    const start = Date.now();
    if (t._config.isDev) {
        // artificial delay in dev
        const waitMs = Math.floor(Math.random() * 400) + 100;
        await new Promise((resolve)=>setTimeout(resolve, waitMs));
    }
    const result = await next();
    const end = Date.now();
    console.log(`[TRPC] ${path} took ${end - start}ms to execute`);
    return result;
});
const publicProcedure = t.procedure.use(timingMiddleware);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/server/api/routers/post.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "postRouter",
    ()=>postRouter
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/zod [external] (zod, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function toISO8601(datetime) {
    // If string is missing seconds, append ":00"
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(datetime)) {
        datetime += ":00";
    }
    // Optional: force UTC with "Z" at the end
    if (!datetime.endsWith("Z") && !/[+-]\d{2}:\d{2}$/.test(datetime)) {
        datetime += "Z";
    }
    return datetime;
}
const postRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    hello: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].object({
        text: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string()
    })).query(({ input })=>{
        return {
            greeting: `Hello ${input.text}`
        };
    }),
    // make it so that in the future it accepts options for either end destinaton, start destination, both, or all in a certain radius
    getRidesOpportunities: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["publicProcedure"].query(async ({ ctx })=>{
        // const rides = await ctx.db.rideOpportunity.findMany({
        //   orderBy: { createdAt: "desc" },
        //   include: {
        //     driver: true,
        //   }
        // });
        const rides = [
            {
                id: 1,
                startLat: 38.907132,
                startLng: -77.036546,
                endLat: 38.911132,
                endLng: -77.041546,
                stops: [
                    [
                        38.907132,
                        -77.036546
                    ],
                    [
                        38.911132,
                        -77.041546
                    ]
                ],
                driver: {
                    id: 1,
                    name: 'John Doe',
                    email: 'john@example.com',
                    phoneNumber: '123-456-7890'
                }
            },
            {
                id: 2,
                startLat: 38.909132,
                startLng: -77.039546,
                endLat: 38.912132,
                endLng: -77.042546,
                stops: [
                    [
                        38.909132,
                        -77.039546
                    ],
                    [
                        38.912132,
                        -77.042546
                    ]
                ],
                driver: {
                    id: 2,
                    name: 'Jane Smith',
                    email: 'jane@example.com',
                    phoneNumber: '098-765-4321'
                }
            }
        ];
        return rides;
    }),
    getRideRequests: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["publicProcedure"].query(async ({ ctx })=>{
        const rideRequests = await ctx.db.rideRequest.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                passenger: true
            }
        });
        return rideRequests;
    }),
    createRideRequest: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].object({
        startLat: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].number(),
        startLng: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].number(),
        endLat: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].number(),
        endLng: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].number(),
        passengerId: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string(),
        arrivalTime: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string()
    })).mutation(async ({ ctx, input })=>{
        const rideRequest = await ctx.db.rideRequest.create({
            data: {
                startLat: input.startLat,
                startLng: input.startLng,
                endLat: input.endLat,
                endLng: input.endLng,
                passengerId: input.passengerId,
                arrivalTime: toISO8601(input.arrivalTime)
            }
        });
        return rideRequest;
    })
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/server/api/root.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "appRouter",
    ()=>appRouter,
    "createCaller",
    ()=>createCaller
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$post$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/post.ts [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$post$2e$ts__$5b$api$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$post$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const appRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    post: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$post$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["postRouter"]
});
const createCaller = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["createCallerFactory"])(appRouter);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/pages/api/trpc/[trpc].ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$trpc$2f$server$2f$adapters$2f$next__$5b$external$5d$__$2840$trpc$2f$server$2f$adapters$2f$next$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@trpc/server/adapters/next [external] (@trpc/server/adapters/next, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/env.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$root$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/root.ts [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$trpc$2f$server$2f$adapters$2f$next__$5b$external$5d$__$2840$trpc$2f$server$2f$adapters$2f$next$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$js__$5b$api$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$root$2e$ts__$5b$api$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$trpc$2f$server$2f$adapters$2f$next__$5b$external$5d$__$2840$trpc$2f$server$2f$adapters$2f$next$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$js__$5b$api$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$root$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$trpc$2f$server$2f$adapters$2f$next__$5b$external$5d$__$2840$trpc$2f$server$2f$adapters$2f$next$2c$__esm_import$29$__["createNextApiHandler"])({
    router: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$root$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["appRouter"],
    createContext: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["createTRPCContext"],
    onError: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$js__$5b$api$5d$__$28$ecmascript$29$__["env"].NODE_ENV === "development" ? ({ path, error })=>{
        console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`);
    } : undefined
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__358be781._.js.map