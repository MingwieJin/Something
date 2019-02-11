<template>
    <city-header></city-header>
</template>

<script>
import CityHeader from './components/CityHeader'
import axios from 'axios'

export default{
  name: 'City',
  components: {
    CityHeader: CityHeader
  },
  data: function () {
    return {
      hotCities: []
    }
  },
  methods: {
    getcityInfo () {
      axios.get('/api/city.json')
        .then(this.getcityInfoSucc)
    },
    getcityInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.hotCities = data.hotCities
      }
    }
  },
  mounted () {
    this.getcityInfo()
  }
}
</script>

<style lang="stylus" scoped>
</style>
