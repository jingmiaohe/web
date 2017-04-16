<template>
  <div id="footerC">
    <a v-on:click="toMain"><i class="ion ion-home"></i><span>主页</span></a>
    <a v-on:click="toMyOrder"><i class="icon ion-person"></i><span>个人订单</span></a>
    <a v-on:click="toMyCart"><i class="icon ion-android-cart"></i><span>购物车</span></a>
    <a v-on:click="toSetting"><i class="icon ion-settings"></i><span>设置</span></a>
  </div>
</template>

<script>
import router from '../main.js'
export default {
  name: 'foot',
  data () {
    return {
      userName: null
    }
  },
  methods:{
	toMain(){router.push('/start')},
	toMyOrder(){
		if(this.userName){
			router.push('/myOrder')
		}else{
			router.push('/login/1')
		}
	},
	toMyCart(){
		if(this.userName){
			router.push('/cart')
		}else{
			router.push('/login/1')
		}
	},
	toSetting(){router.push('/setting')}
  },
  mounted(){
	this.userName=sessionStorage.getItem('userName')
  }
}
</script>

<style scoped>
#footerC{
  display: flex;
  justify-content:center;
  background-color: #f8f8f8;
  position:fixed;
  z-index:100;
  bottom:0;
  width:100%;
  border-top:1px solid #b2b2b2;
  }
#footerC a,#footerC i,#footerC span{
  display:block;
  width:150px;
  text-align:center;
  color:#444;
}
#footerC i{
  font-size:32px;
  height:32px;
}
#footerC a{
  text-decoration: none;
}
</style>
