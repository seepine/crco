const { path } = require('@vuepress/utils')
module.exports = {
  title: 'crco',
  bundler: '@vuepress/bundler-webpack',
  description: '企业快速开发，个人外包必备',
  logo: 'logo.png',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
    // ,
    // '/en': {
    //   lang: 'en-US'
    // }
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['script', { src: '/dark-mode.js' }]
  ],
  themeConfig: {
    locales: {
      '/': {
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        toggleDarkMode: '切换暗黑/明亮模式',

        navbar: [
          {
            text: '指南',
            link: '/guide/quickstart/',
            activeMatch: '^/guide/'
          },
          {
            text: '表单',
            link: '/form/base/',
            activeMatch: '^/form/'
          },
          {
            text: '表格',
            link: '/table/base/',
            activeMatch: '^/table/'
          },
          {
            text: 'Github',
            link: 'https://github.com/seepine/crco'
          }
        ]
      },
      '/en': {
        selectLanguageName: 'English',
        selectLanguageText: 'Languages'
      }
    },
    sidebar: {
      '/guide/': [
        {
          text: '基础',
          isGroup: true,
          children: ['quickstart']
        }
        // {
        //   text: '进阶',
        //   children: [
        //     {
        //       text: '主题',
        //       link: '/guide/theme'
        //     },
        //     {
        //       text: '国际化',
        //       link: '/guide/i18n'
        //     }
        //   ]
        // }
      ],
      '/form/': [
        {
          text: '表单',
          isGroup: true,
          children: ['base', 'value', 'valid', 'dic', 'upload', 'slot', 'adapt']
        }
      ],
      '/table/': [
        {
          text: '表格',
          isGroup: true,
          children: ['base', 'slot', 'popstate', 'ext']
        }
      ]
    }
  },
  plugins: [
    [
      'vuepress-plugin-demo-block-vue3',
      {
        componentsDir: path.resolve(__dirname, './../../examples')
      }
    ]
  ]
}
