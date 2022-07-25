<template>
    <div>  
          <div class="home_container">
            <router-view></router-view>
          </div>
          <van-tabbar v-model="active"  route class="bottom">
  <van-tabbar-item icon="home-o" to="/layout/home">主页</van-tabbar-item>
  <van-tabbar-item icon="setting-o" to="/layout/user">我的</van-tabbar-item>

</van-tabbar>

    </div>
</template>

<script>
export default {
    name:'layout',
    data() {
        return {
            active:0
        }
    },

   
}
</script>

<style scoped>
.home_container {
  padding-bottom: 50px;
}
</style>