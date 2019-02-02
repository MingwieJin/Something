<template>
	<div class="icons">
		<swiper :options="swiperOption" >
			<swiper-slide v-for="(page, index) of pages" :key="index">
				<div class="icon" v-for="item of page" 	:key="item.id">
					<div class="icon-img">
						<img class="icon-img-content" :src="item.url"/>
					</div>
					<p class="icon-desc">{{item.content}}</p>
				</div>	
			</swiper-slide>
			<div class="swiper-pagination1"  slot="pagination"></div>
		</swiper>
	</div>
</template>

<script>
export default{
	name:'HomeIcons',
	data:function(){
		return{
			swiperOption:{
				pagination:'.swiper-pagination1',
				loop:true
			},
			iconList:[{
				id:1,
				url:"http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png",
				content:"景点门票"
			},{
				id:2,
				url:"http://img1.qunarzz.com/piao/fusion/1804/5a/13ceb38dcf262f02.png",
				content:"一日游"
			},{
				id:3,
				url:"http://img1.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png",
				content:"北京必游"
			},{
				id:4,
				url:"http://img1.qunarzz.com/piao/fusion/1803/47/c2b659e048b11602.png",
				content:"溜娃"
			},{
				id:5,
				url:"http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20191/0334cf5430b9b5505fd79e2b8d7e8670.png",
				content:"爬长城"
			},{
				id:6,
				url:"http://img1.qunarzz.com/piao/fusion/1803/6c/9e54a8540fee0102.png",
				content:"故宫"
			},{
				id:7,
				url:"http://img1.qunarzz.com/piao/fusion/1803/22/98cbc1ff9e33fe02.png",
				content:"北京庙会"
			},{
				id:8,
				url:"http://img1.qunarzz.com/piao/fusion/1803/fc/b10a6b2e4f0fe102.png",
				content:"北京滑雪"
			},{
				id:9,
				url:"http://img1.qunarzz.com/piao/fusion/1803/ab/6f7d6e44963c9302.png",
				content:"泡温泉"
			},{
				id:10,
				url:"http://img1.qunarzz.com/piao/fusion/1803/b2/bfbc5d66e0ab5a02.png",
				content:"冰雪季"
			}
			]
		}
	},
	computed:{
		pages(){
			const pages = []
			this.iconList.forEach((item,index) =>{
				const page = Math.floor(index/8)
				if(!pages[page]){
					pages[page] = []
				}
				pages[page].push(item)
			})
			return pages
		}
	}
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  @import '~styles/mixins.styl'
  .icons >>> .swiper-container
    height: 0
    padding-bottom: 50%
  .icons
    margin-top: .1rem
    .icon
      position: relative
      overflow: hidden
      float: left
      width: 25%
      height: 0
      padding-bottom: 25%
      .icon-img
        position: absolute
        top: 0
        left: 0
        right: 0
        /*bottom: .44rem*/
       	bottom:0
        box-sizing: border-box
        padding: .1rem
        .icon-img-content
          display: block
          margin: 0 auto
          height: 100%
      .icon-desc
        position: absolute
        left: 0
        right: 0
        bottom: 0
        height: .44rem
        line-height: .44rem
        text-align: center
        color: $darkTextColor
        ellipsis()
    .swiper-pagination1
     position:absolute
     bottom:0
     text-align:center
</style>
