<template>
    <div class="top">
        <div class="content">
            <!-- left -->
            <div class="left" @click="goHome">
                <h1><img src="../../assets/images/logo.png" alt="医易通"></h1>
                <h1>医易通 预约挂号通用平台</h1>
            </div>
            <div class="right">
                <p class="help">帮助中心</p>
        <!-- 如果没有用户名字:显示登录注册 -->
        <p class="login" @click="login" v-if="!userStore.userInfo.name">登录/注册</p>
        <!-- 如果有用户信息展示用户信息 -->
        <el-dropdown v-else>
          <span class="el-dropdown-link">
            {{ userStore.userInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goUser('/user/certification')"
                >实名认证</el-dropdown-item
              >
              <el-dropdown-item @click="goUser('/user/order')">挂号订单</el-dropdown-item>
              <el-dropdown-item @click="goUser('/user/patient')"
                >就诊人管理</el-dropdown-item
              >
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowDown } from "@element-plus/icons-vue";
//引入路由器
import { useRouter } from "vue-router";
//获取user仓库的数据( visiable)可以控制login组件的对话框显示与隐藏
import useUserStore from "@/store/modules/user"
let userStore = useUserStore()
let $router = useRouter();
const goHome = () => {
  //编程式导航跳转到首页
  $router.push({ path: "/home" });
};
const login = ()=>{
    userStore.visiable = true
}
//退出登录按钮的回调
const logout = () => {
  //通知pinia仓库清除用户相关的信息
  userStore.logout();
  //编程式导航路由跳转到首页
  $router.push({ path: "/home" });
};

//点击顶部下拉菜单进行路由跳转
const goUser = (path: string) => {
  $router.push({ path: path });
};
</script>
<script lang="ts">
export default {
  name: 'Top'
}
</script>
<style scoped lang="scss">
.top{
    width: 100%;
    height: 70px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 99;
    .content{
        width:1200px;
        height: 70px;
        background-color: white;
        display: flex;
        justify-content: space-between;
        .left{
            display: flex;
            cursor: pointer;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            img{
            width:50px;
            height: 50px;
            }
            h1{
                font-size: 25px;
                color: #55a6fe;
            }
        }
        .right{
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            font-size: 14px;
            .login{
                cursor: pointer;
            }
        }

    }
}
</style>