<template>
    <div>
        <div class="title">周末去哪</div>
        <ul>
            <li class="item border-bottom" v-for="item in recommendList" :key="item.id">
                <div class="item-img-wapper">
                    <img class="item-img" :src="item.url">
                </div>
                <div class="item-info">
                    <p class="item-title">{{item.title}}</p>
                    <p class="item-desc">{{item.desc}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default{
  name: 'HomeWeekend',
  data: function () {
    return {
      recommendList: [{
        id: '0001',
        url: 'http://img1.qunarzz.com/sight/source/1811/f3/86173f863bef61.jpg_r_640x214_52b003ac.jpg',
        title: '京城周末撒欢',
        desc: '在帝都过周末，不仅仅是城中游！'
      }, {
        id: '0002',
        url: 'http://img1.qunarzz.com/sight/source/1510/6e/1ea71e2f04e.jpg_r_640x214_aa6f091d.jpg',
        title: '京城有好泉',
        desc: '细数北京温泉，温暖你的冬天'
      }, {
        id: '0003',
        url: 'http://img1.qunarzz.com/sight/source/1811/7e/476589267ebb41.jpg_r_640x214_bf599709.jpg',
        title: '京城溜娃必去',
        desc: '德智体美劳全面发展的亲子日，这些地方该去看看…'
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
  .title
    margin-top: .2rem
    line-height: .8rem
    background: #eee
    text-indent: .2rem
   .item-img-wapper
    overflow:hidden
    height:0
    padding-bottom:33.9%
    .item-img
     width:100%
   .item-info
    padding:0.3rem 0.2rem
    .item-title
     line-height: .54rem
     font-size: .32rem
     ellipsis()
    .item-desc
     line-height: .4rem
     color: #ccc
     ellipsis()
</style>
