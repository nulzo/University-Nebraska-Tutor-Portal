module.exports = {
  root: true,
  env: { browser: true, es2020: true, es6: true, node: true, },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",

  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"], // Use Unix line endings
    "quotes": ["error", "double"], // Use single quotes
    "semi": ["error", "always"], // Require semicolons at the end of statements
    "no-console": "off", // You can disable this rule if you want to allow console.log
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};


