<template>
    <div class="carousel">
        <el-carousel height="350px">
            <el-carousel-item>
                <img src="../../../assets/images/web-banner-1.png">
            </el-carousel-item>
            <el-carousel-item>
                <img src="../../../assets/images/web-banner-2.png">
            </el-carousel-item>
         
        </el-carousel>
    </div>
</template>

<script setup lang="ts">

</script>
<script lang="ts">
export default {
  name: 'Carousel'
}
</script>
<style scoped lang="scss">
.carousel {
    img {
        // object-fit: cover;
        width: 100%;
        height: 100%;
    }
}
</style>