import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        ecmaVersion: 2020, // Use a version that supports structuredClone
      },
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'constructor-super': 'off', // Disable the problematic rule
    },
  },
  pluginReact.configs.flat.recommended,
];