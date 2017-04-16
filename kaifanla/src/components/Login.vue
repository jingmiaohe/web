<template>
  <div>
    <div class="list list-inset">
      <label class="item item-input">
        <span class="input-label">用户名：</span>
        <input type="text" v-model="userName">
      </label>
      <label class="item item-input">
        <span class="input-label">密码：</span>
        <input type="password" v-model="userPwd">
      </label>
	  <label class="item item-input" v-if="showPhone">
        <span class="input-label">电话：</span>
        <input type="text" v-model="phone">
      </label>
	  <button
      v-on:click="login"
      class="button button-balanced button-block">
      登录
      </button>
	  <button
      v-on:click="register"
      class="button button-balanced button-block">
      注册
      </button>
    </div>
	<Vodal
    :show="show"
    animation="door"
    @hide="show = false"
    :closeButton=false
    :width="300"
    :height="200"
    className = "vodal">
          <div class="vodalConcent">
          <i class="icon ion-android-warning"></i>
          {{vodalContent}}
          </div>
    </Vodal>
  </div>
</template>

<script>
import router from '../main.js'
import Vodal from '@/components/vodal'
export default {
  name: 'login',
  data () {
    return {
      userName: null,
	  userPwd:'',
	  phone:'',
	  showPhone:false,
	  show:false,
	  vodalContent:''
    }
  },
  methods:{
	login(){
		var that = this;
		that.showPhone = false;
		if(that.userName && that.userPwd){
			that.$http.get('http://localhost:80/data/user_getbyname.php?uname='+that.userName+'&upwd='+that.userPwd)
			.then(response=>{
				if(response.data.length>0){
					sessionStorage.setItem('userName',that.userName)
					sessionStorage.setItem('userId',response.data[0][0])
					router.push('/main')
				}else{
					//登录失败显示模态框
					that.vodalContent = '登录失败，无此用户'
					that.show = true
				}
			})
			}
	},
	register(){
		var that = this;
		that.showPhone = true;
		if(that.userName && that.userPwd){
			that.$http.get('http://localhost:80/data/user_add.php?uname='+that.userName+'&upwd='+that.userPwd+'&phone='+that.phone)
			.then(response=>{
				if(response.data.msg == 'success'){
					router.push('/main')
				}else if(response.data.msg == 'failed'){
					//注册失败显示模态框
					that.vodalContent = '注册失败,用户已存在'
					that.show = true
				}
			})
			}
	}
  },
  created(){
    var num = this.$route.params.num
    if(num==1){
      this.showPhone = false;
    }else{
      this.showPhone = true;
    }
  },
  components: { Vodal }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vodalConcent{
  width:100%;
  height:100%;
  line-height:170px;
  text-align:center;
  font-size:18px;
  }
</style>
