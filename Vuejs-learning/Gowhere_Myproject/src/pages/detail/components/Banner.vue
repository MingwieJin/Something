<template>
	<div>
		<div class="banner" @click="handleBannerClick">
			<img class="banner-img" src="//img1.qunarzz.com/sight/p0/1409/19/adca619faaab0898245dc4ec482b5722.jpg_600x330_f922b488.jpg">
			<div class="banner-info">
				<div class="banner-tittle">
					大连圣亚海洋世界AAAA
				</div>
				<div class="banner-number">
					<span class="iconfont banner-icon">&#xe6e9;</span>
					39
				</div>
			</div>
		</div>
		<common-gallary :imgs="imgs" v-show="showGallary" @close = "handleGalaryClose"></common-gallary>
	</div>
</template>

<script>
import CommonGallary from  'common/gallary/Gallary.vue'	

export default {
	name: 'Detailbanner',
	data: function () {
		return {
			showGallary: false,
			imgs: ['http://img1.qunarzz.com/sight/p0/1709/20/209869933e4d3c8ba3.img.jpg_r_800x800_8057310e.jpg', 'http://img1.qunarzz.com/sight/p0/1709/bf/bfe91441ab865b2ea3.img.jpg_r_800x800_dc97aa3d.jpg']
		}
	},
	components: {
		CommonGallary
	},
	methods: {
		handleBannerClick () {
			this.showGallary = true 
		},
		handleGalaryClose () {
			this.showGallary = false
		}
	}
}
</script>

<style lang="stylus" scoped>
  .banner
    position: relative
    overflow: hidden
    height: 0
    padding-bottom: 55%
    .banner-img
      width: 100%
    .banner-info
      display: flex
      position: absolute
      left: 0
      right: 0
      bottom: 0
      line-height: .6rem
      color: #fff
      background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))
      .banner-tittle
        flex: 1
        font-size: .32rem
        padding: 0 .2rem
      .banner-number
        height: .32rem
        line-height: .32rem
        margin-top: .14rem
        padding: 0 .4rem
        border-radius: .2rem
        background: rgba(0, 0, 0, .8)
        font-size: .24rem
        .banner-icon
          font-size: .24rem
</style>
