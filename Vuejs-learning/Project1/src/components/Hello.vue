<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ msgfromfather }}</h1>
    <button v-on:click="onClickMe">click!</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'give me an apple'
    }
  },
  props:['msgfromfather'],
  methods:{
  	onClickMe: function (){
//		console.log(this.msgfromfather)
		this.$emit('listen-to-my-children', this.msg);
//			this.$dispatch('listen-to-my-children', this.msg);
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
