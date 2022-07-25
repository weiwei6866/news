<template>
  <div>
    <!-- 弹出层的头部区域 -->
    <van-nav-bar title="频道管理">
      <template #right>
        <van-icon name="cross" size="0.37333334rem" color="white" @click="goBack"/>
      </template>
    </van-nav-bar>
    <!-- 我的频道 -->
    <div class="my-channel-box">
      <div class="channel-title">
        <span>我的频道
          <span class="small-title" v-if="!showTag">
            点击进入频道
          </span>
          <span class="small-title" v-else>
            点击删除频道
          </span>
        </span>
        <span @click="changeStable" v-if="!showTag">编辑</span>
        <span @click="changeStable" v-else >完成</span>
      </div>
      <!-- 我的频道列表 -->
      <van-row type="flex">
        <van-col span="6" v-for="(c1,index) in userChannels" :key="c1.id" @click="goChannel(c1,index)">
          <div class="channel-item van-hairline--surround" >
            {{c1.name}}
            <!-- 删除的徽标 -->
            <van-badge color="transparent" class="cross-badge" v-show="showTag">
              <template #content>
                <van-icon
                 @click="deleteChannels(c1,index)"
                  name="cross"
                  class="badge-icon"
                  color="#cfcfcf"
                  size="0.32rem"
                />
              </template>
            </van-badge>
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 更多频道 -->
    <div class="more-channel-box">
      <div class="channel-title">
        <span>点击添加更多频道：</span>
      </div>
      <!-- 更多频道列表 -->
      <van-row type="flex">
        <van-col span="6" v-for="(c2,index) in rest" :key="c2.id"  @click="addChannels(c2,index)">
          <div class="channel-item van-hairline--surround">{{c2.name}}</div>
        </van-col>
      </van-row>
    </div>
  </div>
  
</template>

<script>
export default {
    name:'channelEdit',

    data() {
        return {
            allChannels:[],
            userChannels:[],
            showTag:false,
        }
    },

    async created() {
        // 获取所有的频道
        let allChannels = await this.$api.getAllchannels()
        this.allChannels = allChannels.data.channels
        //获取user频道
        let userChannels = await this.$api.reqChannels()
        this.userChannels = userChannels.data.channels
    },

    methods: {
        changeStable(e){
          this.showTag = !this.showTag
          if(e.path[0].innerText == '完成'){
            this.$bus.$emit('sendData')
          }
        },

        addChannels(c2){
            if(this.showTag == true){
                this.userChannels.push(c2)
            this.updateChannels()
            }
        },

        deleteChannels(c1,index){
            if(this.showTag == true){
                if(index !== 0){
                    this.userChannels.splice(index,1)
                this.updateChannels()
                }
            }
        },
        

        async updateChannels(){
            let bianli = this.userChannels.filter((item)=>{
                return item.id !== 0
            })
            let newArr = bianli.map((item,index)=>{
                return{
                    id:item.id,
                    seq:index+1
                }
            })
            let result = await this.$api.reqReset(newArr)
            // console.log(result);
            
        },

        goBack(){
          this.$emit('changeValue',false)
          this.$bus.$emit('sendData')
          this.showTag = false
        },

        goChannel(c1,index){
          if(this.showTag == false){
            this.$emit('getActive',index)
          }
        }

    },  


    computed: {
        rest(){
            var replace = [...this.allChannels]
            this.userChannels.forEach((item,index) => {              
               replace.forEach((item2,index) => {
                  if(item.id == item2.id){
                    replace.splice(index,1)
                  }
               });
               return replace
            });
            return replace
        }
    },
}
</script>

<style scoped lang="less">

/deep/.van-nav-bar__content{
    background-color: #007bff;
}
.van-popup,
.popup-container {
  background-color: transparent;
  height: 100%;
  width: 100%;
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-header {
  height: 90px;
  background-color: #007bff;
  color: white;
  text-align: center;
  font-size: 14px;
  position: relative;
  .title {
    width: 100%;
    position: absolute;
    bottom: 15px;
  }
}

.pop-body {
  flex: 1;
  overflow: scroll;
  padding: 8px;
  background-color: white;
}

.my-channel-box,
.more-channel-box {
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
  }
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 5px;
}

/*删除的微标 */
.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

/*提示文字 */
.small-title {
  font-size: 10px;
  color: gray;
}
</style>