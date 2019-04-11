<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--显示的当前路由地址锁对应的路由-->
		<keep-alive exclude="Detail"> 
			<router-view/>
		</keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
