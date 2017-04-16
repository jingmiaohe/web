<template>
  <div class="cartC">
    <HeaderC></HeaderC>
	  <div class="headerBar">
      <h3 class="title">购物车</h3>
      <button
        v-on:click="funcToggleEdit()"
        class="button button-clear button-dark">
        {{editShowMsg}}
      </button>
    </div>

     <div class="list list-inset">
       <div v-for="(dish,key) in cart" class="row">
         <div class="col col-33">
           <img class="img-responsive" :src="'static/img/'+dish.img_sm" alt=""/>
         </div>
         <div v-show="!editEnable" class="col col-50">
           <p>{{dish.name}}</p>
           <p>{{dish.price+"×"+dish.dishCount}}</p>
         </div>
         <div v-show='editEnable' class="col col-50">
           <button
             class="button button-small"
             v-on:click="reduce(key)"
             style="vertical-align: middle">-</button>
           <input type="text"
                  v-model="dish.dishCount"
                  style="width: 15px;display: inline-block;vertical-align: middle"/>
           <button
             class="button button-small"
             v-on:click="add(key)"
             style="vertical-align: middle">+</button>
         </div>
       </div>
     </div>

      <div class="text-right">
        <p style="display: inline-block;vertical-align: middle">合计：{{sumAll()}}</p>
        <button
          v-on:click="jump"
          class="button button-balanced button-small"
          style="display: inline-block;vertical-align: middle">确定下单</button>
      </div>

      <Foot></Foot>
  </div>
</template>

<script>
import Foot from '@/components/Foot'
import HeaderC from '@/components/HeaderC'
import router from '../main.js'
export default {
  name: 'cart',
  data () {
    return {
     editShowMsg : '编辑',
     editEnable : false,
     cart : [],
	 userId:''
    }
  },
  methods:{
    funcToggleEdit() {
          this.editEnable = !this.editEnable;
          if (this.editEnable) {
            this.editShowMsg = '完成';
          }
          else {
            this.editShowMsg = '编辑';
          }
        },
    sumAll() {
          var result = 0;
          this.cart.forEach(function (value,key) {
            result += (value.price*value.dishCount);
          })
          return result;
        },
    updateToServer(id,count) {
         this.$http.get('http://localhost:80/data/cart_update.php?uid='+this.userId+'&did='+id+'&count='+count)
            .then(response=>{
                this.$http.get('http://localhost:80/data/cart_select.php?uid='+this.userId)
                .then(response=>{
                      this.cart = response.data.data
                })
         })
        },
    add(index) {
          this.cart[index].dishCount++;
          this.updateToServer(
            this.cart[index].did,
            this.cart[index].dishCount);
        },
    reduce(index) {
          var num = this.cart[index].dishCount;
          if(num <= 0)
          {
            this.cart[index].dishCount = 0;
          }
          else
          {
            this.cart[index].dishCount--
          }
          this.updateToServer(
            this.cart[index].did,
            this.cart[index].dishCount);
        },
    jump(){
		var cart=JSON.stringify(this.cart)
        sessionStorage.setItem('totalPrice',this.sumAll());
        sessionStorage.setItem('cartDetail',cart);
        router.push('/order/'+this.userId)
       }
  },
  mounted(){
	this.userId=sessionStorage.getItem('userId')
     this.$http.get('http://localhost:80/data/cart_select.php?uid='+this.userId)
            .then(response=>{
                this.cart = response.data.data
            })
  },
  components: { Foot,HeaderC }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cartC{
    width:100%;
    overflow:hidden;
    margin-bottom:57px;
  }
  .headerBar{
    display:flex;
    padding:14px;
  }
  .headerBar>h3{
       flex:10;
       text-align:center;
     }
  .headerBar>button{
      flex:1;
    }
</style>
