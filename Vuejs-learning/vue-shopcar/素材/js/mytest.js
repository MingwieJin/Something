 var vm=new Vue({
	el:"#app",
//	绑定文字和初始化数值
	data:{
		callmyname: '这里是测试',
		totalMoney:0,
		productList:[],
//		checkAllFlag:false,
		delFlag:false,
		checkflag:false,
//		curProduct:''
		NumOfChecked:0,
		NumOfAll:0,
		indexp:0,
	},
//	局部过滤器
	filters:{
		fomatMoney:function(value){
			return "￥"+value.toFixed(2);
		}
	},
//	ready方法
	mounted:function(){
		this.$nextTick(function(){
			vm.cartView();
		})
	},
//	function
	methods:{
		cartView:function(){
			var _this = this;
			
//			get方法
			this.$http.get("data/cartData.json",{"id":123}).then(function(res){
				_this.productList = res.data.result.list;
				_this.totalMoney   =res.data.result.totalMoney;
				
			});
		},
//		改变数量按钮
		changeMoney:function(item, value){
			if(value>0){
				item.productQuantity++;
			}
			else{
				if(item.productQuantity>1){
					item.productQuantity--;
				}
			}
			this.calcTotalPrice();
		},
//		计算价格按钮
		calcTotalPrice:function(){
//			var _this=this;
			vm.totalMoney=0;
			vm.productList.forEach(function(item,index){
				if(item.checked){
					vm.totalMoney+=item.productPrice*item.productQuantity;
				}
			});
		},
//		选择物品按钮
		selectedProduct:function(item){
			if(typeof item.checked=="undinfined"){
				Vue.set(item,'checked',true);
			}
			else{
				item.checked=!item.checked;
			}
			this.checkNumber();
			this.calcTotalPrice();
		},
//		全选/全不选按钮
		checkall:function(flag){
			vm.productList.forEach(function(item, index){
//				console.log(item);
				if(typeof item.checked=="undinfined"){
					Vue.set(item,'checked',flag);
				}
				else{
					item.checked=flag;
				}
			});
			this.checkNumber();
			this.calcTotalPrice();
		},
//		用来检查现在是不是达到了全选
		checkNumber:function(){
				vm.NumOfChecked=0;
				vm.NumOfAll=0;
			vm.productList.forEach(function(item, index){
				vm.NumOfAll++;
				if(item.checked){
					vm.NumOfChecked++;
				}
			});
			if(vm.NumOfAll==vm.NumOfChecked){
				vm.checkflag = true;
			}
			else{vm.checkflag = false;}
		},
//		用来删除购物车的物品
		delitem:function(){
			vm.productList.splice(vm.indexp,1);
			this.delFlag=false;
			this.calcTotalPrice();
		}
	}
});
//全局过滤器
 Vue.filter("money",function(value,type){
 	return "￥"+value.toFixed(2)+type;
 })