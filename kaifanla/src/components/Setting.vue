<template>
  <div id="settingVue">
    <HeaderC></HeaderC>
    <ul class="mainUl">
      <li @click="toggleModal">关于</li>
      <li @click="comeBack" v-if="userName!=null">退出登录</li>
    </ul>
    <Foot></Foot>
    <Vodal :show="show" animation="rotate" @hide="show = false">
      <ul class="aboutInfo">
        	<li>关于 开饭啦</li>
        	<li v-for="info in infoList">
        		<b>{{info.name}}:</b>
        		<span>{{info.value}}</span>
        	</li>
        </ul>
    </Vodal>
  </div>
</template>

<script>
import HeaderC from '@/components/HeaderC'
import Foot from '@/components/Foot'
import Vodal from '@/components/vodal'
import router from '../main.js'
export default {
  name: 'setting',
  data () {
    return {
      show : false,
	  userName:null,
      infoList : [
            {name: '开发者', value: 'anna'},
            {name: '版本号', value: 'v1.0'},
            {name: 'email', value: '13717536274@163.com'}
          ]
    }
  },
  methods:{
    toggleModal(){
    this.show=!this.show
    },
    comeBack(){
      router.push('/start')
	  sessionStorage.removeItem('userName')
	  sessionStorage.removeItem('userId')
    }
  },
  mounted(){
	this.userName=sessionStorage.getItem('userName')
  },
  components: { Foot,Vodal, HeaderC }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "./vodal/src/animation/fade.css";
  @import "./vodal/src/animation/rotate.css";
  #settingVue{
    margin-bottom:57px;
  }
  ul.mainUl>li,ul.aboutInfo>li{
    border-bottom:1px solid #ddd;
    padding:14px;
    font-size:16px;
  }
   ul.mainUl>li:hover{
    background-color:#f8f8f8;
   }
  ul.mainUl>li:first-child{
    border-top:1px solid #ddd;
    margin-top:20px;
  }

  ul.aboutInfo>li:first-child{
    font-size:20px;
  }
</style>
