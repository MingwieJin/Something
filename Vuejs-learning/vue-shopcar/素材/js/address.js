 var vm=new Vue({
	el:".container",
	data:{
		addressList:[],
		limitNum:3,
		currentIndex:0,
		shoppingMethod:1,
	},
	mounted:function(){
		this.$nextTick(function(){
			vm.getAddressList();
		});
	},
	computed: {
	  filteraddress: function () {
	    return this.addressList.slice(0, this.limitNum);
	  }
	},
	methods:{
		getAddressList:function(){
			vm.$http.get("data/address.json").then(function(response){
				var res = response.data;
				if (res.status == "0"){
					vm.addressList = res.result;
				}
			});
		},
		setDefault:function(addressId){
			this.addressList.forEach(function(address,index){
				if(address.addressId==addressId){
					address.isDefault=true;
				}else{
					address.isDefault=false;
				}
			});
		},
		delProduct:function(){
			this.addressList.splice(this.pindex,1);
		},
		addProduct:function(){
	     this.addressList.unshift({
	      "addressId":"100006",
	      "userName":"陈杰",
	      "streetName":"深圳市南山区",
	      "postCode":"100001",
	      "tel":"123355678901",
	      "isDefault":false
	    });
	     this.limitNum=this.addressList.length;
		},
		showOrHide:function(limitNum){
			if(this.limitNum==3){
				this.limitNum=this.addressList.length;
			}else{
				this.limitNum=3;
			}
		}
		
	}
});
