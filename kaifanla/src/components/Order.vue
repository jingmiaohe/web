<template>
  <div id="orderVue">
    <div class="list list-inset" v-show="!requestResult">
        <label class="item item-input">
          <span class="input-label">用户名</span>
          <input type="text"
                 v-model="order.user_name"
                 placeholder="输入用户名"/>
        </label>
        <label class="item item-input">
          <span class="input-label">送餐地址</span>
          <input type="text"
                 v-model="order.addr"
                 placeholder="输入送餐地址"/>
        </label>
        <label class="item item-input">
          <span class="input-label">手机号</span>
          <input type="text"
                 v-model="order.phone"
                 placeholder="输入手机号"/>
        </label>
        <label class="item item-input">
          <span class="input-label">选择性别</span>
        </label>
        <label class="item item-input input-radio" >
          <input type="radio" name="sex" value="1" v-model="order.sex"/>
          <div class="radio-item" v-on:click="sexMale">
            <span class="input-label">男</span>
            <i class="radio-icon icon ion-checkmark" v-show="male"></i>
          </div>
        </label>
        <label class="item item-input input-radio" >
          <input type="radio" name="sex" value="2" v-model="order.sex"/>
           <div class="radio-item" v-on:click="sexFemale">
            <span class="input-label">女</span>
            <i class="radio-icon icon ion-checkmark" v-show="!male"></i>
           </div>
        </label>

        <button
          v-on:click="submitOrder"
          class="button button-block button-balanced">
          下单
        </button>
      </div>

      <div class="card" v-show="requestResult">
        <div class="item">
          {{requestResult}}
        </div>
      </div>
      <Foot></Foot>
  </div>
</template>

<script>
import Foot from '@/components/Foot'
export default {
  name: 'order',
  data () {
    return {
      order:{},
      requestResult:'',
      male:true
    }
  },
  methods:{
    sexMale(){
      this.male=true;
    },
    sexFemale(){
      this.male=false;
    },
    submitOrder() {
      var that=this
      that.$http.get('http://localhost:80/data/order_add.php',{params:this.order})
          .then(response=>{
              //console.log(response.data)
              if (response.data.length > 0) {
                  if (response.data[0].msg == 'succ') {
                    that.requestResult = '下单成功，订单编号为' + response.data[0].oid;
                  }
                  else {
                    that.requestResult = '下单失败';
                  }
                }
          },response=>{console.log('失败')})
  }
},
mounted(){
  this.order.userid = this.$route.params.userid;
  this.order.totalprice = sessionStorage.getItem('totalPrice');
  this.order.cartDetail = sessionStorage.getItem('cartDetail');
},
components: { Foot }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#orderVue{
  margin-bottom:57px;
}
label.input-radio{
  position:relative;
}
input[type="radio"]{
  position:absolute;
  top:0;
  left:0;
}
div.radio-item{
  width:100%;
  display:flex;
  justify-content: space-between;
}
</style>
