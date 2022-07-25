<template>

<div> 
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list
    offset='10'
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :immediate-check='false'>
<articleItem v-for="(c1,index) in dataList" :key="index" :dataList='c1'/>
</van-list>
</van-pull-refresh>
</div>
</template>

<script>
import articleItem from '../articleItem'
export default {
    components:{articleItem},

    data() {
        return {
            dataList:[],
            loading: false,
            finished: false,
            pretimeStamp:'',
            isLoading:false
        }
    },

    props:['data'],

    async mounted() {
       let result = await this.$api.reqArticleList(this.data,Date.parse(new Date()))
        this.pretimeStamp = result.data.pre_timestamp
        this.dataList = result.data.results
    },

    methods: {
       async onLoad(){
        let result = await this.$api.reqArticleList(this.data,this.pretimeStamp)
this.pretimeStamp = result.data.pre_timestamp
this.dataList = this.dataList.concat(result.data.results)
this.loading = false;
if(result.message == 'ok'){
    this.finished = true;
}
if(result.data.pre_timestamp == null){
    this.finished = true
}
       },

      async onRefresh(){
            try {
        let result = await this.$api.reqArticleList(this.data,Date.parse(new Date()))
        this.pretimeStamp = result.data.pre_timestamp
        this.dataList = []
        this.dataList = result.data.results
        this.isLoading = false
            } catch (error) {
                
            }
       }
       
    },
}
</script>

<style>

</style>