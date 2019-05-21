<template>
  <div class="form-table">
    <div>创建规则</div>
    <div><span>姓名</span><input type="text" v-model="name"></div>
    <div>
      <span>目标节点</span>
      <select v-model="tarNode">
        <option disabled value="请选择">请选择</option>
        <option value="192.168.28.90">90</option>
        <option value="192.168.28.89">89</option>
        <option value="192.168.28.91">91</option>
      </select>
    </div>
    <div><span>用户名</span><input type="text" v-model="username"></div>
    <div><span>密码</span><input type="text" v-model="password"></div>
    <button @click="sendAjax()">点击提交</button>
  </div>
</template>

<script>
export default {
  name: 'createrule',
  data: function () {
    return {
      name: '',
      tarNode: '',
      username: '',
      password: ''
    }
  },
  methods: {
    sendAjax () {
      // 调用buildParams去组成参数
      let params = this.buildParams()
      console.log(params)
    },
    buildParams () {
      let ret = {
        'name': this.name,
        'tarNode': this.tarNode,
        'username': this.username,
        'password': this.password
      }
      return ret
    }
  },
  created () {
    // 如果没有这句代码，select中初始化会是空白的，默认选中就无法实现
    this.tarNode = '192.168.28.90'
  }
}
</script>

<style scoped>

</style>
