self.__BUILD_MANIFEST = {
  "/": [
    "./static/chunks/pages/index.js"
  ],
  "/_error": [
    "./static/chunks/pages/_error.js"
  ],
  "/about": [
    "./static/chunks/pages/about.js"
  ],
  "/auth/signin": [
    "./static/chunks/pages/auth/signin.js"
  ],
  "/auth/signup": [
    "./static/chunks/pages/auth/signup.js"
  ],
  "/companies/[companyName]": [
    "./static/chunks/pages/companies/[companyName].js"
  ],
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/_app",
    "/_error",
    "/about",
    "/api/trpc/[trpc]",
    "/auth/signin",
    "/auth/signup",
    "/companies/[companyName]"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()