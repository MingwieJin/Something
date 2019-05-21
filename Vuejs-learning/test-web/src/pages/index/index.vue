<template>
  <div>
    <div class="loginblock" v-show="!isLogin">
      登录
    </div>
    <div class="loginblock" v-show="isLogin">
      用户{{this.$store.state.currentUser}}登录中
    </div>
    <div>{{this.$store.state.title}}</div>
    <router-link to="/authlogin">
      <div class="view_topic">登录界面</div>
    </router-link>
    <router-link to="/viewtopic">
      <div class="view_topic">查看topic</div>
    </router-link>
    <router-link to="/viewtopic2">
      <div class="view_topic">查看topic2</div>
    </router-link>
    <router-link to="/dbrule/createrule">
      <div class="view_topic">创建规则</div>
    </router-link>
    <router-link to="/changetTitle">
      <div class="view_topic">改变首页title</div>
    </router-link>

  </div>
</template>

<script>
export default{
  name: 'home',
  components: {

  },
  data () {
    return {
      showIndexTopic: String,
      isLogin: false,
      username: ''
    }
  },
  mounted () {
    this.username = sessionStorage.getItem('username')
    if (this.username) {
      this.$store.commit('changeUser', this.username)
      this.isLogin = true
    }
  }
}
</script>

<style scoped>
.view_topic{
  font-size: 16px;
  text-decoration: none;
}
  .loginblock{
    float: right;
    clear:both;
  }
</style>
