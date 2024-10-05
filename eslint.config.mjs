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
