/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  settings: { react: { version: "18.2" } },
  plugins: ["react", "react-hooks", "react-refresh", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  overrides: [
    {
      files: ["vite.config.ts"],
      parserOptions: {
        project: null, // Exclude this file from TypeScript's strict checking
      },
    },
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-no-target-blank": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
