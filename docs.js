export default {
  src: 'docs',
  description: 'Документация фронтенда',
  menu: ['Introduction', 'Contributing'],
  themeConfig: {
    initialColorMode: 'dark',
  },
  files: ['**/*.mdx'], // should not find README.md
  ignore: ['README.md'], // should also ignore README.md
};
