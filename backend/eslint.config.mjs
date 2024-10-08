if (typeof globalThis.structuredClone !== 'function') {
  globalThis.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        ecmaVersion: 2020, // Adjust based on your needs
        sourceType: "module", // Allow the use of imports
        babelOptions: {
          configFile: './babel.config.json', // Ensure Babel config is correctly referenced
        },
      },
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
    rules: {
      "constructor-super": "off", // Disable or adjust based on your requirements
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];