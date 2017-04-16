<template>
  <div id="detailVue">
    <HeaderC></HeaderC>
    <div class="card">
        <div class="item item-divider">
          <a href="/start">首页</a> / 详情
        </div>
        <div class="item item-text-wrap">
          <h2>{{dish.name}}</h2>
          <img class="img-responsive" :src="'static/img/'+dish.img_lg" alt=""/>
          <p>{{dish.detail}}</p>
          <hr/>
          <p>{{dish.material}}</p>
          <p>{{dish.price}}</p>
        </div>
        <div class="item item-divider text-right">
          <button
            class="button button-balanced button-small"
            @click="addToCart">
            添加到购物车
          </button>
          <button
            class="button button-energized button-small"
            @click="jump('/main')"
            >
            我再看看
          </button>
        </div>
    </div>
    <Foot></Foot>
    <Vodal
    :show="show"
    animation="door"
    @hide="show = false"
    :closeButton=false
    :width="300"
    :height="200">
          <div class="vodalConcent">添加成功</div>
         <button class="button button-balanced button-small btn-ok"
         v-on:click="toClose">ok</button>
    </Vodal>
  </div>
</template>

<script>
import Foot from '@/components/Foot'
import HeaderC from '@/components/HeaderC'
import Vodal from '@/components/vodal'
import router from '../main.js'
export default {
  name: 'detail',
  data () {
    return {
      closeButton : false,
      show : false,
      did: '',
      dish:{},
	  userId: null
    }
  },
  methods:{
    addToCart(){
	    if(this.userId == null){
			router.push('/login/1')
	    }else{
		  console.log(this.userName)
		  this.$http.get('http://localhost:80/data/cart_update.php?uid='+this.userId+'&did='+ this.did + '&count=-1')
			.then(response=>{
				if (response.data.msg == 'succ') {
					console.log(response.data)
					this.show=!this.show
				  }
			})
		}
    },
    jump(){
    router.push('/main')
   },
   toClose(){
      this.show=false;
   }
  },
  created(){
	this.userId=sessionStorage.getItem('userId')
    var that=this
    that.did=that.$route.params.did
    that.$http.get('http://localhost:80/data/dish_getbyid.php?id='+that.did)
    .then(response=>{
        that.dish=response.data[0]
    })
  },
  components: { Foot, HeaderC,Vodal }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "./vodal/src/animation/door.css";
  @import "./vodal/src/animation/rotate.css";
#detailVue{
  margin-bottom:57px;
}
.vodalConcent{
  width:100%;
  height:80%;
  line-height:160px;
  text-align:center;
  font-size:16px;
  }
.btn-ok{
  padding:0 20px;
  margin:0 auto;
  display:block;
  font-size:16px;
}
</style>
