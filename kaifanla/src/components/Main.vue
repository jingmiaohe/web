<template>
  <div id="mainVue">
      <HeaderC></HeaderC>
      <div class="list list-inset">
            <div class="item item-input">
                <i class="icon ion-search"></i>
                <input type="text"
                       v-model="info.kw"
                       placeholder="请输入菜品或者原材料的名称"/>
            </div>
      </div>
      <div class="list list-inset">
            <router-link
            :to="'/detail/'+dish.did"
            class="item item-thumbnail-left"
            v-for="dish in dishList">
               <img v-bind:src="'static/img/'+dish.img_sm"/>
               <h2>{{dish.name}}</h2>
               <p>{{dish.material}}</p>
               <p>{{dish.price}}</p>
            </router-link>

      	    <button v-show="hasMore"
            v-on:click="loadMore()"
            class="button button-balanced button-block">
            加载更多
            </button>

            <div class="card" v-show="!hasMore">
              <div class="item">
                没有更多数据可以加载了
              </div>
            </div>
      </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Foot from '@/components/Foot'
import HeaderC from '@/components/HeaderC'
export default{
  name: 'main',
  data () {
    return {
	  hasMore : true,
	  info : {kw : ''},
	  dishList : []
    }
  },
  methods: {
    onSearch(keywords) {
      this.searching = true;
    },
	  onCancel() {
        this.searching = false;
        this.keywords = ''
	   },
	  loadMore(){
    var that=this;
    that.$http.get('http://127.0.0.1:80/data/dish_getbypage.php?start='+that.dishList.length)
    .then(response=>{
  	if(response.data.length<5){
  	that.hasMore = false;}
  	that.dishList = that.dishList.concat(response.data);
    },
    response=>{console.log('失败')},
    )
	  }
  },
  created(){
	var that = this;
	that.$http.get('http://localhost:80/data/dish_getbypage.php')//跨域成功
	//that.$http.jsonP('http://localhost:80/data/dish_getbypage.php') //jsonP有问题
	//that.$http.get('http://localhost:8080/static/dish_getbypage.php') //非跨域 可能是php不认识 或mysql语句不认识
	//that.$http.get('http://localhost:8080/static/test.json') //正确拿到数据
	.then(
		(response)=>{
		this.dishList = response.data
		},(response)=>{
		}
	)
  },
  beforeUpdate(){

  },
  updated(){
   this.$watch(
         function () {return this.info.kw},
         function (newVal, oldVal) {
           console.log('更改了')
           if (this.info.kw) {
               this.$http.get('http://localhost:80/data/dish_getbykw.php?kw=' + this.info.kw)
               .then((response)=>{
                     if (response.data.length > 0) {
                         this.dishList = response.data;}
               		}
               	)
           }
         }
   )
  },
  components: { Foot,HeaderC}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mainVue{
  margin-bottom:57px;
}
.item{
	text-align:center
}
</style>
