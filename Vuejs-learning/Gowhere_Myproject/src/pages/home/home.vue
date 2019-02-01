<template>
	<div>
		<home-header></home-header>
		<home-swiper></home-swiper>
	</div>
</template>

<script>
import HomeHeader from './components/header'
import HomeSwiper from './components/swiper'
export default{
	name:"home",
	components:{
		HomeHeader:HomeHeader,
		HomeSwiper:HomeSwiper
	}
}

</script>

<style>
</style>