import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * base: './' — relative asset paths, so the build works at
 *   https://<user>.github.io/<any-repo-name>/  with no edits.
 * SITE_URL — absolute published URL, injected into Open Graph tags
 *   (social previews need absolute image URLs). The GitHub Actions
 *   workflow sets it automatically from the Pages configuration.
 */
const siteUrl = (process.env.SITE_URL ?? '').replace(/\/?$/, '/');

const injectSiteUrl = (): Plugin => ({
  name: 'inject-site-url',
  transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl === '/' ? '' : siteUrl),
});

export default defineConfig({
  base: './',
  plugins: [react(), injectSiteUrl()],
  build: {
    target: 'es2020',
    assetsInlineLimit: 4096,
    sourcemap: false,
  },
});
