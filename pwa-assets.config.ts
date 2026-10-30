import { defineConfig, minimalPreset as preset } from '@vite-pwa/assets-generator/config'

export default defineConfig({
  head: {
    inputs: [
      'public/icon.svg'
    ],
  },
  preset,
  images: [
    'public/icon.svg'
  ]
})
