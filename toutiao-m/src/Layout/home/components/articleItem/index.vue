<template>
  <!-- 一条文章单元格 -->
  <van-cell>
    <!-- 标题区域的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{dataList.title}}</span>
        <!-- 单图 -->
        <img v-show="isShow == 1" :src="images" alt="" class="thumb">
        <!-- 多图 -->
        
      </div>
      <div v-show="isShow == 3" class="thumb-box" >
            <img :src="c1" alt=""  class="thumb" v-for="(c1,index) in dataList.cover.images" :key="index">
        </div>

    </template> 
    <!-- label 区域的插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>{{dataList.aut_name}}</span>
          <span>{{dataList.comm_count}}评论</span>
          <span>{{formatTime(dataList.pubdate)}}</span>
        </div>
        <!-- 反馈按钮 -->
        <van-icon name="cross" @click="sendMessage"/>
      </div>
    </template>
  </van-cell>
  
</template>

<script>
import {timeAgo} from '@/utils/data.js'
export default {
    name:'artcleItem',

    props:['dataList'],

    mounted() {
    },

    methods: {
      formatTime:timeAgo,
      
      sendMessage(){
        const{dataList} = this
        this.$bus.$emit('changeShow',dataList.art_id,true)
      }
    },

    computed: {
        isShow(){
           if(this.dataList.cover.images){
            if(this.dataList.cover.images.length == 1){
            return 1
           }else if(this.dataList.cover.images.length > 1)
           return 3
           }
        },

        images(){
          if(this.dataList.cover.images){
            return this.dataList.cover.images[0]
          }else{
            return undefined
          }
        }


    },
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span{
    margin: 0 3px;
    &:first-child{
        margin-left: 0;
    }
}

/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>