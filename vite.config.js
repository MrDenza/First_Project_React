import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// Полная перезагрузка страницы вместо горячей
const fullReloadAlways = { 
  handleHotUpdate({ server }) {
    server.ws.send({ type: "full-reload" });
    return [];
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), fullReloadAlways],
  base: "./",
  server: {
  port: 3000,
  },
  //   server: {
  //     open: true,
  //     proxy: {
  //       "/base": {
  //         target: "http://localhost:19000",
  //         changeOrigin: true,
  //         rewrite: (path) => path.replace(/^\/base/, ""),
  //       },
  //     },
  //   },
  build: {
    outDir: './public',
    //copyPublicDir: false, // устраняет ошибку The public directory feature may not work correctly. outDir __ and publicDir __ are not separate folders.
    assetsDir: '', // Leave `assetsDir` empty so that all static resources are placed in the root of the `dist` folder.
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        // eslint-disable-next-line no-undef
        main: resolve(__dirname, 'index.html')
      },
      output: {
        //scripts/[name]-[hash].js
        entryFileNames: 'scripts/script-[name].js', // If you need a specific file name, comment out - scripts/script-[hash].js
        chunkFileNames: 'scripts/script-[name].js', // these lines and uncomment the bottom ones
        // entryFileNames: chunk => {
        //   if (chunk.name === 'main') {
        //     return 'js/main.min.js';
        //   }
        //   return 'js/main.min.js';
        // },
        assetFileNames: assetInfo => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|webm|tiff|bmp|ico)$/.test(assetInfo.name)) {
            return `images/[name].${extType}`;
          }
          if (/\.(css)$/.test(assetInfo.name)) {
            return `css/styles-[name].${extType}`;
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name)) {
            return `fonts/[name].${extType}`;
          }
          return `[name].${extType}`;
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['source/__tests__/setup.js'],
  },
});
