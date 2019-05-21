<template>
    <div>
        <table>
          <tr>
            <th>查看topic</th>
          </tr>
          <tr v-for="item in topiclist" :key="item.index">
            <td>
              {{item.name}}
            </td>
          </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Viewtopic',
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
    getTopicInfoSucc (res) {
      let resdata = res.data.data.topic
      this.topiclist = resdata
    }
  },
  mounted () {
    this.getTopicInfo()
  }
}
</script>

<style scoped>

</style>
