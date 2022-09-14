import { loadEnv } from 'vite';
import createVuePlugin from '@vitejs/plugin-vue';
// import vue from "@vitejs/plugin-vue";
import { svgBuilder } from './src/plugins/svgBuilder';
import path from 'path';

const CWD = process.cwd();

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()]
// })
export default ({ mode }) => {
  const { VITE_BASE_URL } = loadEnv(mode, CWD);

  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        // 相对路径别名配置，使用 @ 代替 src
        '@': path.resolve(__dirname, './src'),
      },
    },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
        },
      },
    },

    plugins: [
      createVuePlugin({
        jsx: true,
      }),
      svgBuilder('./src/assets/icons/svg/'),
    ],

    server: {
      host: '0.0.0.0',
      port: 3001,
      proxy: {
        '/api': {
          // 用于开发环境下的转发请求
          // 更多请参考：https://vitejs.dev/config/#server-proxy
          target:
            'https://www.fastmock.site/mock/fddbdf46578e29939645f1eb21d63bc4/',
          changeOrigin: true,
        },
      },
    },
  };
};
