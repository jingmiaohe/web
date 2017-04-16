<template>
  <div>
	<router-link tag='div' to='/main' class='kflcenter'>
		<h1 class="text-center">开饭啦</h1>
		<img src="../../static/img/kid-foods.jpg"/>
	</router-link>
	<Foot></Foot>
  </div>
</template>

<script>
import Foot from '@/components/Foot'
export default {
  name: 'start',
  data () {
    return {
      msg: 'startPage'
    }
  },
  components: { Foot }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	div.kflcenter {
	  display: block;
	  position: fixed;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%,-50%);
	  text-align:center;
	}

	div.kflcenter > h1{
		font-weight:initial;
		margin-bottom:10px;
	}
</style>
