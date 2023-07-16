import { createApp } from 'vue'
//引入清除默认样式
import "@/style/reset.scss"
//根组件APP
import App from '@/App.vue'
//引入全局组件-顶部和底部
import HospitalTop from "@/components/hospital_top/index.vue"
import HospitalBottom from "@/components/hospital_bottom/index.vue"
import Login from "@/components/login/index.vue"
import Visitor from '@/components/visitor/visitor.vue';
//引入vue-router配置项
import router from "@/router/index.ts"
//emement-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore  忽略ts校验
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//引入pinia仓库
import pinia from '@/store'
//引入路由鉴权的文件
import './permisstion'
const app = createApp(App)
//注册全局组件-顶部和底部和登录注册
app.component("HospitalTop",HospitalTop)
app.component("HospitalBottom",HospitalBottom)
app.component("Login",Login)
//就诊人全局组件
app.component('Visitor',Visitor);
//安装vue-router
app.use(router)
//安装element-plus插件
app.use(ElementPlus, {
    locale: zhCn,
  })
//安装pinia仓库
app.use(pinia);

app.mount('#app')
