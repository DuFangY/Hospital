<template>
    <div class="bottom">
        <div class="content">
            <div class="left">
                京ICP备 2103200065号 电话挂号010-8208208820
            </div>
            <div class="right">
                <span>联系我们</span>
                <span>合作协议</span>
                <span>用户协议</span>
                <span>隐私协议</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>
<script lang="ts">
export default {
  name: 'Bottom'
}
</script>
<style scoped lang="scss">
.bottom{
    width:100%;
    height: 50px;
    background-color: #f0f2f5;
    .content{
        height: 100%;
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        .right{
            span{
                margin-left:6px
            }
        }
    }
}
</style>