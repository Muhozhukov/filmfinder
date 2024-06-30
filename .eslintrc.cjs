module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "prettier",
    "plugin:prettier/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true
    },
    sourceType: "module",
    project: "./tsconfig.app.json"
  },
  plugins: ['react-refresh', 'react', '@typescript-eslint', 'prettier'],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    "react/require-default-props": "off",
    "import/no-named-as-default": 0,
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    "import/prefer-default-export": "off",
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state',
      ]
    }],
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", 'ts', 'tsx'] }],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {},
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"]
      }
    },
    react: {
      version: "detect"
    }
  }
}
