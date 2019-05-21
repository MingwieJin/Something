<template>
  <div v-html="html"></div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Viewtopic2',
  component: {
  },
  data: function () {
    return {
      topiclist: [],
      html: ''
    }
  },
  methods: {
    getTopicInfo () {
      axios.get('/static/city.json')
        .then(this.getTopicInfoSucc)
    },
    getTopicInfoSucc: function (res) {
      let resdata = res.data.data.topic
      this.html += '<table> <tr> <th>查看topic</th> </tr>'
      for (let x = 0; x < resdata.length; x++) {
        this.html += '<tr><td>' + resdata[x].index + '</td></tr>'
        console.log(resdata[x])
      }
      // 另一只循环写法
      // resdata.forEach((item, index) => {
      //   this.html += '<tr><td>' + item.index + '</td></tr>'
      // })
      this.html += '</table>'
    }
  },
  mounted () {
    this.getTopicInfo()
  }
}
</script>

<style scoped>

</style>
