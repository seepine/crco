module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  globals: {
    defineProps: true,
    defineEmits: true,
    defineExpose: true
  },
  settings: {},
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    // 开放入参修改值
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'e', // for e.returnvalue
          'ctx', // for Koa routing
          'req', // for Express requests
          'request', // for Express requests
          'res', // for Express responses
          'response', // for Express responses
          'state' // for vuex state
        ]
      }
    ],
    camelcase: ['error', { allow: ['^p_'] }],
    'no-unused-vars': [
      'error',
      { argsIgnorePattern: '(^event)|(^p_)', caughtErrorsIgnorePattern: '^ignore' }
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }]
  }
}
