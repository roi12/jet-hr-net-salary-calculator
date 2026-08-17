import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "coverage/**",
      "node_modules/**",
      "next-env.d.ts",
      "out/**",
    ],
  },
];

export default eslintConfig;
