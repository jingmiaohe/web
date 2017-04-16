<template>
  <div ID="myOrderVue">
    <HeaderC></HeaderC>
    <!-- thead-->
      <div class="row">
        <div class="col col-25">订单编号</div>
        <div class="col col-30">菜品</div>
        <div class="col col-30">下单时间</div>
        <div class="col col-25">联系人</div>
      </div>
      <!-- tbody-->
      <div
        v-for="order in orderList"
        class="row row-center">
        <div class="col col-25">{{order.oid}}</div>
        <div class="col col-30">
          <router-link to="'/detail/'+order.did">
            <img :src="'static/img/'+order.img_sm" alt=""/>
          </router-link>
        </div>
        <div class="col col-30">{{order.order_time}}</div>
        <div class="col col-25">{{order.user_name}}</div>
      </div>
    <Foot></Foot>
  </div>
</template>

<script>
import HeaderC from '@/components/HeaderC'
import Foot from '@/components/Foot'
export default {
  name: 'myorder',
  data () {
    return {
      orderList:[],
	  userId: null
    }
  },
  mounted(){
	this.userId=sessionStorage.getItem('userId')
    this.$http.get('http://localhost:80/data/order_getbyuserid.php?userid='+this.userId)
        .then(response=>{
            this.orderList = response.data.data
        })
  },
  components: { Foot,HeaderC }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#myOrderVue{
  margin-bottom:57px;
}
</style>
