<template>
	<div class="wrapper">
	  <swiper :options="swiperOption">
	    <!-- slides -->
	    <swiper-slide v-for = "item of swiperList" :key="item.id">
	    	<img class="swiper-img" :src='item.url'/>
	    </swiper-slide>
	    <!-- Optional controls -->
	    <div class="swiper-pagination"  slot="pagination"></div>
	  </swiper>
	</div>
</template>

<script>
	export default{
		name: 'HomeSwiper',
		data:function(){
			return{
				swiperOption:{
					pagination:'.swiper-pagination',
					loop:true
				},
				swiperList:[{
					id:'0001',
					url:'http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20191/e9b6ede83785c7673eb1bcda5a78f123.jpg_750x200_0e6d0de9.jpg'
				},{
					id:'0002',
					url:'http://img1.qunarzz.com/piao/fusion/1812/d1/cd4f32e924a5a302.jpg_750x200_3d492837.jpg'
				},{
					id:'0003',
					url:'http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20191/99d97f5421741c2a2028dced52b66391.jpg_750x200_9e38628d.jpg'
				}]
			}
		}
	}
</script>

<style lang="stylus" scoped>
  .wrapper >>> .swiper-pagination-bullet-active
  /*>>>穿透scoped的限制*/
    background: #fff
  .wrapper
    overflow: hidden
    width: 100%
    height: 0
    padding-bottom: 25%
    background: #eee
    .swiper-img
      width: 100%
</style>
