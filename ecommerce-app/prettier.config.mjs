
const config = {
  printWidth: 140,
  trailingComma: 'all',
  tabWidth: 2,
  endOfLine: 'lf',
  semi: false,
  singleQuote: true,
  importOrder: [
    '^src/types|src/utilities(.*)$',
    '^src/components/(.*)$',
    '^src/stores(.*)$',
    '^src/pages(.*)$',
    '^src/layout(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-css-order', 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['classNames'],
  cssDeclarationSorterOrder: 'smacss',
}

export default config
