/**
 * Created by mzf on 2018/8/7.
 */
$(function(){
    addArray();
    //console.log(arr2);
    //加载省级列表
    for(let i=0;i<arr.length;i++) {
        $('.dropProvUl').append("<li class='dropProvLi'>" + arr[i] + "</li>");
    }
    //点击选择城市时，先隐藏省级市级选择块
    $('.citySelect').on('click',function(){
        //$('.dropDown').toggle();
        $('.dropCity').css('display',"none");
        $('.dropProv').toggle();
            //点击省份时，自动选择省会城市
            $('.dropProvLi').on('click',function(){
            	var parStr = '';
            	var praIndex = $(this).index();
				if (praIndex !== 0 && praIndex !== 1 && praIndex !== 2 && praIndex !== 3 && praIndex !== 31 && praIndex !== 32)
				{parStr = arr[$(this).index()]}
                $('.cityName').text( parStr + arr2[$(this).index()][0]);
                $('.dropDown div').css("display","none");
            });
            //给省级列表添加mouseover事件
            $('.dropProvLi').on('mouseover',function(){
                $('.dropCity').css("display","block");
                $('.dropProvLi').css("background-color","#f1f3f6");
                $('.dropCityUl').empty();
                $(this).css("background-color","rgba(31,180,254,0.7)");
                //加载城市列表
//              console.log($(this).index()) // 获得相对其他同胞元素的位置
                for(let j=0;j<arr2[$(this).index()].length;j++){
                    $('.dropCityUl').append("<li class='dropCityLi'>"+arr2[$(this).index()][j]+"</li>");
                }
                //选择城市
                var CityIndex = $(this).index();
//              var arrExc = [0, 1, 2, 3, 31, 32]
                $('.dropCityLi').on("click", function () {
//                    console.log($(this));
				var parStr = '';
					if (CityIndex !== 0 && CityIndex !== 1 && CityIndex !== 2 && CityIndex !== 3 && CityIndex !== 31 && CityIndex !== 32)
					{parStr = arr[CityIndex]}
                    $('.cityName').text(parStr + $(this).text());
                    $('.dropDown div').css("display","none");
                });
            });
    });
   // console.log(arr[17]);
});
//把市级添加到arr2中对应的省级
function addArray(){
     arr=["北京","天津","上海","重庆","河北","山西","内蒙古","辽宁","吉林","黑龙江","江苏","浙江","安徽","福建","江西","山东","河南","湖北","湖南","广东","广西","海南","四川","贵州","云南","西藏","陕西","甘肃","青海","宁夏","新疆","香港","澳门","台湾"];
     arr2=["北京","天津","上海","重庆","河北","山西","内蒙古","辽宁","吉林","黑龙江","江苏","浙江","安徽","福建","江西","山东","河南","湖北","湖南","广东","广西","海南","四川","贵州","云南","西藏","陕西","甘肃","青海","宁夏","新疆","香港","澳门","台湾"];
    function addTo(id,iArray){
        arr2[id] = [];
        for(let i=0;i<iArray.length;i++){
            arr2[id][i]=iArray[i];
        }

    }
   addTo("0",["北京"]);
   addTo("1",["天津"]);
   addTo("2",["上海"]);
   addTo("3",["重庆"]);
   addTo("4",["石家庄","张家口","承德","秦皇岛","唐山","廊坊","保定","衡水","沧州","邢台","邯郸"]);
   addTo("5",["太原","朔州","大同","阳泉","长治","晋城","忻州","晋中","临汾","吕梁","运城"]);
   addTo("6",["呼和浩特","包头","乌海","赤峰","通辽","呼伦贝尔","鄂尔多斯","乌兰察布","巴彦淖尔","兴安盟","锡林郭勒盟","阿拉善盟"]);
   addTo("7",["沈阳","朝阳","阜新","铁岭","抚顺","本溪","辽阳","鞍山","丹东","大连","营口","盘锦","锦州","葫芦岛"]);
   addTo("8",["长春","白城","松原","吉林","四平","辽源","通化","白山","延边州"]);
   addTo("9",["哈尔滨","齐齐哈尔","七台河","黑河","大庆","鹤岗","伊春","佳木斯","双鸭山","鸡西","牡丹江","绥化","大兴安岭"]);
   addTo("10",["南京","徐州","连云港","宿迁","淮安","盐城","扬州","泰州","南通","镇江","常州","无锡","苏州"]);
   addTo("11",["杭州","湖州","嘉兴","舟山","宁波","绍兴","衢州","金华","台州","温州","丽水"]);
   addTo("12",["合肥","宿州","淮北","亳州","阜阳","蚌埠","淮南","滁州","马鞍山","芜湖","铜陵","安庆","黄山","六安","巢湖","池州","宣城"]);
   addTo("13",["福州","南平","莆田","三明","泉州","厦门","漳州","龙岩","宁德"]);
   addTo("14",["南昌","九江","景德镇","鹰潭","新余","萍乡","赣州","上饶","抚州","宜春","吉安"]);
   addTo("15",["济南","青岛","聊城","德州","东营","淄博","潍坊","烟台","威海","日照","临沂","枣庄","济宁","泰安","莱芜","滨州","菏泽"]);
   addTo("16",["郑州","开封","三门峡","洛阳","焦作","新乡","鹤壁","安阳","濮阳","商丘","许昌","漯河","平顶山","南阳","信阳","周口","驻马店","济源"]);
   addTo("17",["武汉","十堰","襄阳","荆门","孝感","黄冈","鄂州","黄石","咸宁","荆州","宜昌","随州","仙桃","潜江","天门","神农架林区","恩施州"]);
   addTo("18",["长沙","张家界","常德","益阳","岳阳","株洲","湘潭","衡阳","郴州","永州","邵阳","怀化","娄底","湘西州"]);
   addTo("19",["广州","深圳","清远","韶关","河源","梅州","潮州","汕头","揭阳","汕尾","惠州","东莞","珠海","中山","江门","佛山","肇庆","云浮","阳江","茂名","湛江"]);
   addTo("20",["南宁","桂林","柳州","梧州","贵港","玉林","钦州","北海","防城港","崇左","百色","河池","来宾","贺州"]);
   addTo("21",["海口","三亚","文昌","琼海","万宁","五指山","东方","儋州","三沙"]);
   addTo("22",["成都","广元","绵阳","德阳","南充","广安","遂宁","内江","乐山","自贡","泸州","宜宾","攀枝花","巴中","达州","资阳","眉山","雅安","阿坝州","甘孜州","凉山州"]);
   addTo("23",["贵阳","六盘水","遵义","安顺","毕节","铜仁","黔东南州","黔南州","黔西南州"]);
   addTo("24",["昆明","曲靖","玉溪","保山","昭通","丽江","思茅","临沧","德宏州","怒江州","迪庆州","大理州","楚雄州","红河州","文山州","西双版纳"]);
   addTo("25",["拉萨","那曲","昌都","林芝","山南","日喀则","阿里"]);
   addTo("26",["西安","延安","铜川","渭南","咸阳","宝鸡","汉中","榆林","安康","商洛"]);
   addTo("27",["兰州","嘉峪关","白银","天水","武威","酒泉","张掖","庆阳","平凉","定西","陇南","临夏州","甘南州"]);
   addTo("28",["西宁","海东","海北州","海南州","黄南州","果洛州","玉树州","海西州"]);
   addTo("29",["银川","石嘴山","吴忠","固原","中卫"]);
   addTo("30",["乌鲁木齐","克拉玛依","喀什","阿克苏","和田","吐鲁番","哈密","克孜勒苏柯州","博尔塔拉州","昌吉州","巴音郭楞州","伊犁州","塔城","阿勒泰"]);
   addTo("31",["香港"]);
   addTo("32",["澳门"]);
   addTo("33",["台北","高雄","台中","花莲","基隆","嘉义","金门","连江","苗栗","南投","澎湖","屏东","台东","台南","桃园","新竹","宜兰","云林","彰化"]);
   // console.log(arr);
};

