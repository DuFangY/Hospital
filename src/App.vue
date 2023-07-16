<template>
  <div class="container">
    <!-- 顶部全局组件 -->
    <HospitalTop />
    <!-- 路由组件区域 -->
    <div class="content">
      <router-view v-slot="{ Component }">
        <keep-alive :include="['Home']">
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
    </div>
    <!-- 底部全局组件 -->
    <HospitalBottom />
    <!-- 登录组件 -->
    <Login  v-if="userStore.visiable"/>
  </div>
</template>

<script setup lang="ts">
//引入用户仓库
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();
</script>

<style scoped lang="scss">
.content {
  padding-top: 70px;
  min-height: 770px;
  width: 1200px;
  margin: 0 auto;
}
</style>