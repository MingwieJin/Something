<template>
    <div>
        <div class="title">周末去哪</div>
        <ul>
            <li class="item border-bottom" v-for="item in weekendList" :key="item.id">
                <div class="item-img-wapper">
                    <img class="item-img" :src="item.imgUrl">
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
  props: {
    weekendList: Array
  },
  data: function () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
  .title
    line-height: .8rem
    background: #eee
    text-indent: .2rem
   .item-img-wapper
    overflow:hidden
    height:0
    padding-bottom:37.09%
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
