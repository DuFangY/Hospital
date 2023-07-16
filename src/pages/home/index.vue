<template>
   <div>
      <!-- 顶部轮播图组件 -->
      <Carousel />
      <Search @changeSearch="changeSearch"/>
      <!-- :guttter 默认列之间的间距 -->
      <el-row :gutter="20">
         <el-col :span="20">
            <!-- 医院等级子组件 -->

            <Level @getLevel="getLevel" />
            <!-- 医院所属地区子组件 -->
            <Region @getRegion="getRegion" />

            <!-- 医院信息首页展示 -->
            <div class="hospital" v-if="hasHospitalArr.length > 0">
               <Card v-for="(item, index) in hasHospitalArr" :key="index" :hospitalInfo=item class="item" />
            </div>
            <el-empty v-else :image-size="200" />
            <!-- 分页器 -->
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[4, 6, 10, 20]"
               :background="true" layout=" prev, pager, next, jumper,->,sizes,,total" :total="total" class="pagination"
               @current-change="currentChange" @size-change="sizeChange" />
         </el-col>
         <el-col :span="4">
            <Tip/>
         </el-col>
      </el-row>
   </div>
</template>

<script setup lang="ts">
import Carousel from "./carousel/index.vue"
import Search from './search/index.vue'
import Level from "./level/index.vue"
import Region from "./region/index.vue"
import Card from "./card/index.vue"
//引入右侧组件
import Tip from './tip/index.vue';
//组合式API
import { onMounted } from "vue";
import { reqHospital } from '@/api/home'
//分页器需要的响应数据
import { ref } from 'vue'
//引入为TS定义好的类型
import type { Content, HospitalResponseData } from "@/api/home/type"

//分页器页码
let pageNo = ref<number>(1)
//每页展示的数据数目
let pageSize = ref<number>(8)
//存储已有医院数据
let hasHospitalArr = ref<Content>([])
//医院总数
let total = ref<number>(0)
//存储医院的等级相应数据
let hostype = ref<string>("");
//存储医院的地区
let districtCode = ref<string>("");
onMounted(() => {
   getHospitalInfo()
})
//获取已有医院数据
const getHospitalInfo = async () => {
   //获取医院数据:默认获取第一页、一页展示10条
   let result: HospitalResponseData = await reqHospital(
      pageNo.value,
      pageSize.value,
      hostype.value,
      districtCode.value
   )
   if (result.code === 200) {
      hasHospitalArr.value = result.data.content
      total.value = result.data.totalElements
   }
}

//分页器页码发生变化时候回调
const currentChange = () => {
   getHospitalInfo();
};
//分页器下拉菜单发生变化的时候会触发
const sizeChange = () => {
   //当前页码归第一页
   pageNo.value = 1;
   //再次发请求获取医院的数据
   getHospitalInfo();
};

//子组件自定义事件:获取儿子给父组件传递过来的等级参数
const getLevel = (level: string) => {
   //收集参数:等级参数
   hostype.value = level;
   //再次发请求
   getHospitalInfo();
};
//子组件自定义事件：获取子组件传递过来的地区参数
const getRegion = (region: string) => {
   //存储地区的参数
   districtCode.value = region;
   getHospitalInfo();
};

const changeSearch = (searchInfo:Content)=>
{
   hasHospitalArr.value = searchInfo
}
</script>
<script lang="ts">
export default {
   name: 'Home'
}
</script>
<style scoped lang="scss">
.hospital {
   display: flex;
   flex-wrap: wrap;
   gap: 2%;
   justify-content: space-between;

   .item {
      width: 48%;
      margin: 10px 0px;
   }
}

.pagination {
   margin: 20px 0px;
}
</style>