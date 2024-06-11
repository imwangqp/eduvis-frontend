import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from "path";
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from  'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      tailwindcss, 
      autoprefixer,
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  tailwindcss: {
    config: resolve(__dirname, 'tailwind.config.js')
  },
    server: {
        //用来配置跨域
        host: '127.0.0.1',
        port: 8000,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:5000',//目标服务器地址
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
        }
    }
})
