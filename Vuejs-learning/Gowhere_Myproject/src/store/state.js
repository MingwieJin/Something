let defaultcity = '上海'
try{
	if(localStorage.city){
		defaultcity = localStorage.city
	}
}catch(e){
	//TODO handle the exception
}

export default {
	city: defaultcity
}