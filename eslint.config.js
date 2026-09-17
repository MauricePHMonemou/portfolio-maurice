import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// ESLint 9 ne compte pas `<motion.div>` comme une utilisation de `motion` :
// cette règle marque les identifiants JSX comme utilisés (équivalent de react/jsx-uses-vars).
const jsxUsesVars = {
  meta: { type: 'problem', schema: [] },
  create(context) {
    return {
      JSXOpeningElement(node) {
        let name = node.name
        while (name.type === 'JSXMemberExpression') name = name.object
        if (name.type !== 'JSXIdentifier') return
        // `<div>`, `<span>`... sont des balises HTML, pas des variables
        if (node.name.type === 'JSXIdentifier' && /^[a-z]/.test(name.name)) return
        context.sourceCode.markVariableAsUsed(name.name, node)
      },
    }
  },
}

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      local: { rules: { 'jsx-uses-vars': jsxUsesVars } },
    },
    rules: {
      'local/jsx-uses-vars': 'error',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
