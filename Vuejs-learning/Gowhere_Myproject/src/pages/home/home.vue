<template>
	<div>
		<home-header></home-header>
		<home-swiper></home-swiper>
		<home-icons></home-icons>
	</div>
</template>

<script>
import HomeHeader from './components/header'
import HomeSwiper from './components/swiper'
import HomeIcons from './components/icons'

export default{
	name:"home",
	components:{
		HomeHeader:HomeHeader,
		HomeSwiper:HomeSwiper,
		HomeIcons:HomeIcons
	}
}

</script>

<style>
</style>