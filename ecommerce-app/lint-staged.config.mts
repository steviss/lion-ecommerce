/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
const config: import('lint-staged').Configuration = {
  'ecommerce-app/{**/*,*}.{ts,tsx,js,jsx,cjs,mjs}': 'yarn lint',
  'ecommerce-app/{**/*,*}.{ts,tsx,json,js,jsx,md,cjs,mjs}': 'yarn format',
  'ecommerce-app/{**/*,*}.{prisma}': 'yarn prisma:check',
}

export default config
