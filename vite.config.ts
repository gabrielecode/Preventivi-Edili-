import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        // registerType 'prompt' logic handled via custom ReloadPrompt component
        registerType: 'prompt',
        injectRegister: 'auto',
        // Workbox strategies
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
          // Skip API routes from caching
          runtimeCaching: [
            {
              urlPattern: /^\/api\/.*/i,
              handler: 'NetworkOnly',
            },
          ],
          // SPA fallback
          navigateFallback: '/index.html',
        },
        devOptions: {
          enabled: false, // User requested PWA only in production
        },
        manifest: {
          id: '/',
          name: 'Preventivo Casa & Fai da Te AI',
          short_name: 'PreventivoAI',
          description: "Calcola preventivi di ristrutturazione e lavori di casa, confronta Fai da Te e Professionista con l'Intelligenza Artificiale.",
          lang: 'it',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          orientation: 'portrait',
          theme_color: '#2563eb',
          background_color: '#f8fafc',
          icons: [
            {
              src: 'pwa-64x64.png',
              sizes: '64x64',
              type: 'image/png'
            },
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'maskable-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ],
          shortcuts: [
            {
              name: 'Nuova stima',
              url: '/stima',
              icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }]
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
