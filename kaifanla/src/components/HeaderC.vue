<template>
  <div class='bar-header'>
    <h1 class='title'>开饭啦</h1>
    <div class="login-group" v-if="showLogin">
      <router-link to="/login/1">登录</router-link>
      <span>/</span>
      <router-link to="/login/2">注册</router-link>
    </div>
    <div class="user-group" v-if="!showLogin">
      <span>欢迎回来</span>
      <b>{{userName}}</b>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headerC',
  data(){
    return{
      userName:null,
      showLogin:true
    }
  },
  created(){
  this.userName=sessionStorage.getItem('userName')
  //console.log(this.userName)
  if(this.userName!=null){
    this.showLogin = false;
  }else{
    this.showLogin = true;
  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.bar-header{
		height:44px;
		border-bottom:1px solid #ddd;
		position:relative
	}
	.bar-header>h1{
		font-size: 17px;
		font-weight: 500;
		line-height: 44px;
		min-width: 30px;
		height: 43px;
		text-align: center;
	}
	.login-group, .user-group{
	  position:absolute;
	  top:50%;
	  right:10%;
	  transform:translate(0,-50%);
	  font-size:14px;
	}
	.login-group a{
		margin:0 10px;
	}
</style>
