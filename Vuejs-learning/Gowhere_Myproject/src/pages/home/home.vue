<template>
    <div>
        <home-header></home-header>
        <home-swiper :list="swiperList"></home-swiper>
        <home-icons :iconList="iconList"></home-icons>
        <home-recommend :recommendList = "recommendList"></home-recommend>
        <home-weekend :weekendList = "weekendList"></home-weekend>
    </div>
</template>

<script>
import HomeHeader from './components/header'
import HomeSwiper from './components/swiper'
import HomeIcons from './components/icons'
import HomeRecommend from './components/recommend'
import HomeWeekend from './components/weekend'
import axios from 'axios'
import { mapState} from 'vuex'

export default{
  name: 'home',
  components: {
    HomeHeader: HomeHeader,
    HomeSwiper: HomeSwiper,
    HomeIcons: HomeIcons,
    HomeRecommend: HomeRecommend,
    HomeWeekend: HomeWeekend
  },
  data () {
    return {
			lastCity: '',
      swiperList: [],
      iconList: [],
      recommendList: [],
      weekendList: []
    }
  },
	computed:{
		...mapState(['city'])
	},
  methods: {
    getHomeInfo () {
      axios.get('/api/index.json?city=' + this.city)
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.swiperList = data.swiperList
        this.iconList = data.iconList
        this.recommendList = data.recommendList
        this.weekendList = data.weekendList
      }
    }
  },
  mounted () {
		this.lastCity = this.city
    this.getHomeInfo()
  },
	activated () {
		if(this.lastCity != this.city){
			this.lastCity = this.city
			this.getHomeInfo()
		}
	}
}

</script>

<style>
</style>
