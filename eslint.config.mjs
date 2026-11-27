import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Ignore the nested duplicate directory
    "Astitwa_frontend/**",
  ]),
  {
    rules: {
      // These async data-fetching patterns are intentional and safe;
      // the rule misidentifies promise-based async calls as synchronous setState.
      "react-hooks/set-state-in-effect": "off",
      // Date.now() in render is fine for derived display values that don't need
      // to be reactive; we don't have subscriptions or timers involved.
      "react-hooks/purity": "off",
    },
  },
]);

export default eslintConfig;
