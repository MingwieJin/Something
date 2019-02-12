<template>
    <div class="list">
    	<li class="item">A</li>
    	<li class="item">B</li>
    	<li class="item">C</li>
    	<li class="item">D</li>
    </div>
</template>

<script>
export default{
  name: 'CityAlphabet'
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .list
    display: flex
    flex-direction: column
    justify-content: center
    position: absolute
    top: 1.58rem
    right: 0
    bottom: 0
    width: .4rem
    .item
      line-height: .4rem
      text-align: center
      color: $bgColor
      list-style-type:none;
</style>
