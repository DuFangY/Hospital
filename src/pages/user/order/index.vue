<template>
  <div>
    <div v-if="$route.query.orderId">
      <Detail />
    </div>
    <div v-else>
      <AllOrder />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
//引入子组件
import Detail from "./detail/index.vue";
import AllOrder from "./allOrder/index.vue";
//获取路由对象
let $route = useRoute();
</script>

<style scoped></style>
