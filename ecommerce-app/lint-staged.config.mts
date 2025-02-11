/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
const config: import('lint-staged').Configuration = {
  '{**/*,*}.{ts,tsx,js,jsx,cjs,mjs,astro}': 'yarn lint',
  '{**/*,*}.{ts,tsx,json,js,jsx,md,astro,cjs,mjs}': 'yarn format',
}

export default config