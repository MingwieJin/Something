<template>
    <div>
        <city-header></city-header>
        <city-search></city-search>
        <city-list :cities="cities" :hot="hotCities" :letter="letter"></city-list>
        <city-alphabet :cities="cities" @change="changeletters"></city-alphabet>
    </div>
</template>

<script>
import CityHeader from './components/CityHeader'
import CitySearch from './components/search'
import CityList from './components/list'
import CityAlphabet from './components/alphabet'
import axios from 'axios'

export default{
  name: 'City',
  components: {
    CityHeader: CityHeader,
    CitySearch: CitySearch,
    CityList: CityList,
    CityAlphabet: CityAlphabet
  },
  data: function () {
    return {
      hotCities: [],
      cities: {},
      letter: ''
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
        this.cities =  data.cities
      }
    },
    changeletters (letter) {
    	this.letter = letter
    }
  },
  mounted () {
    this.getcityInfo()
  }
}
</script>

<style lang="stylus" scoped>
</style>
