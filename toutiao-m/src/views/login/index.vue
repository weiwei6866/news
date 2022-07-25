<template>
  <div>
    <van-nav-bar title="黑马头条-登录"/>
    <van-form  @submit="onSubmit">
  <van-field
  required
    v-model="phone"
    name="用户名"
    label="手机号"
    placeholder="请输入手机号"
    :rules="[{ required: true, message: '请输入正确的手机号',pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/ }]"
  />
  <van-field
  required
    v-model="password"
    type="password"
    name="密码"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写6位数字密码',pattern:/^\d{6}$/ }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit" :loading='isTrue'  loading-text="加载中..." >登录</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
export default {
    name:'login',

    data() {
            return {
                phone:'',
                password:'246810',
                isTrue:false
            }
        },
    methods: {
     async onSubmit(){
        this.isTrue = true
        try {
        let result = await this.$api.reqLogin({
            mobile:this.phone,
            code:this.password
        })
        this.isTrue = false
        this.$notify({ type: 'success', message: '成功了' });
        localStorage.setItem('geek-itheima',result.data.token)
        this.$router.push('/layout/home')
        } catch (error) {
          
        this.$notify({ type: 'danger', message: 'please validate your phonenumber or password' });
        this.isTrue = false
        }
       }
    },

}
</script>

<style scoped lang='less'>
.van-nav-bar{
    background-color: #007bff;
    
}

/deep/ .van-nav-bar__title{
    color: white;
}
</style>