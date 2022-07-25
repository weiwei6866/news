<template>
<div>
  <!-- 头部导航 -->
  <div>
    <van-nav-bar fixed>
  <template v-slot:left>
    <h2 style="color:lightBlue">新闻</h2>
    </template>
  <template v-slot:right>
     <van-icon  name="search" size="0.48rem"></van-icon>
    </template>
    </van-nav-bar>
  </div>

  <!-- tab标签页 -->
<div class="main">
    <van-tabs v-model="active" sticky offset-top='1.22667rem' :swipeable='true' :animated='true'>
  <van-tab :title="c1.name" v-for="c1 in channerList" :key="c1.id">

  <!-- 内容页面 -->
<articleList :data='c1.id'/>
  </van-tab>
</van-tabs>
<van-icon name="plus" size="0.37333334rem" class="moreChannels" @click="showPopup"/>
<!--遮罩层 -->
<van-action-sheet v-model="show" :actions="actions" @select="onSelect" @closed='close' :cancel-text="text" @cancel='cancelFn'/> 
</div>

<!-- 弹出层选择标签 -->
<van-popup v-model="show2" get-container="body"><channelEdit @changeValue='changeValue' @getActive='getActive'/></van-popup>

</div>
</template>

<script>
import articleList from './components/articleList'
import {firstActions,secondActions} from '@/api/report'
import channelEdit from './ChannelEdit.vue'
export default {
    name:'home',

    components:{articleList,channelEdit},

    data() {
      return {
        active:0,
        channerList:[],
        show:false,
        actions: firstActions,
        text:'取消',
        textId:'',
        show2:false
      }
    },
    
    mounted() {
      this.getChannels()
      this.$bus.$on('changeShow',(id,buer)=>{
        this.show = buer
        this.textId = id
      })

      this.$bus.$on('sendData',()=>{
         this.getChannels()
      })

      
    },

    methods: {
      goclose(){
        this.show2 = false
      },

      async getChannels(){
       let result =  await this.$api.reqChannels()

        this.channerList = result.data.channels
      },

      async onSelect(action,item){
        if(action.name == '反馈垃圾内容'){
          this.text = '返回'
          this.actions = secondActions
        }
        else if(action.name == '不感兴趣'){
          try {
           let result = this.$api.reqDislike(this.textId)
           this.$notify({
            type:"success",
            message:'请求成功'
           })
           this.show = false
          } catch (error) {
           this.$notify({
            type:"warning",
            message:'请求失败'
           }) 
          }
        }else{
          try {
            let result = await this.$api.reqReport(this.textId,action.value)
            this.show = false
            this.$notify({
            type:"success",
            message:'举报成功'
           })
          } catch (error) {
            
          }
        }
      },

      close(){
        this.text = '取消'
        this.actions = firstActions
      },

      cancelFn(){
        if(this.text == '返回'){
          this.show = true
          this.actions = firstActions
          this.text = '取消'
        }else{
          this.show = false
        }
      },

      showPopup(){
        // let token = localStorage.getItem('geek-itheima')
        // if(token){
          this.show2 = true
        // }else{
        //   this.$notify('请登录')
        // }
      },

      changeValue(value){
        this.show2 = value
      },

      getActive(index){
        this.show2 = false
        this.active = index
      }

      

    },
}
</script>

<style scoped lang='less'>
  // 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}


  .logo{
    width: 100px;
    height: 30px;
  }

  .main{
    padding-top: 46px;
  }

  /deep/ .van-tabs__line{
    background-color: rgb(66, 66, 228);
  }

  .van-popup--center{
    width: 100vw;
    height: 100vh;
  }

</style>