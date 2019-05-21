<template>
    <div>
      <div>修改title</div>
          <input type="text" placeholder="请输入要修改的首页title" v-model="changetitle">
      <button @click="changeTitleVuex()">点击修改</button>
    </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'ChangetTitle',
  data: function () {
    return {
      changetitle: ''
    }
  },
  methods: {
    changeTitleVuex () {
      this.$store.commit('changeTitle', this.changetitle)
    }
  }
}
</script>

<style scoped>

</style>
