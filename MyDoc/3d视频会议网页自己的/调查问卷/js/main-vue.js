 var vm=new Vue({
	el:"#app",
//	绑定文字和初始化数值
	data:{
		showPageNumber:1,
		moreadd:"调查问卷",
		pageoneselect:0,
		pagetwoselect:0,
		pagethreeselect:0,
		totalscaore:0,
		
	},
////	局部过滤器
//	filters:{
//		fomatMoney:function(value){
//			return "￥"+value.toFixed(2);
//		}
//	},
//	ready方法
	mounted:function(){
//		this.$nextTick(function(){
//			vm.cartView();
//		})
	},
//	function
	methods:{
		changescore:function(){
			if(this.pageoneselect==1){
				this.totalscaore++;
			}
			if(this.pagetwoselect==2){
				this.totalscaore++;
			}				
			if(this.pagethreeselect==3){
				this.totalscaore++;
			}
		}

	}
});
