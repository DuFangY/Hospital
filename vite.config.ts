import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //src位置起别名
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'src')
    }
  },
    //配置代理跨域
    server: {
      proxy: {
        '/api': {
          //target + /api/***
          target: 'http://syt.atguigu.cn',
          changeOrigin: true,
        },
      }
    }
})
