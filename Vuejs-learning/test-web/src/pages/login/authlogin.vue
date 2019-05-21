<template>
    <div>
      <input v-model="username" placeholder="请输入用户名">
      <input v-model="password" placeholder="请输入密码">
      <button @click="CheckUserLogin">登录</button>
      <button @click="BackToHome">返回</button>
      <button @click="loginout">登出</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'authlogin',
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    CheckUserLogin () {
      if (this.username === '' || this.password === '') {
        alert('账号或者密码不能为空')
        return
      }
      axios.get('/static/login.json', {
        'username': this.username,
        'password': this.password
      })
        .then((response) => {
          if (response.data.data.code === 1) {
            alert('登录成功')
            sessionStorage.setItem('username', this.username)
            sessionStorage.setItem('password', this.password)
            this.$store.commit('changeUser', this.username)
            console.log(this.$store.state.currentUser)
          }
        })
    },
    loginout () {
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('password')
      this.$router.push('/')
    },
    BackToHome () {
      this.$router.push('/')
    }
  }

}
</script>

<style scoped>
input{
  display:block;
}
</style>
