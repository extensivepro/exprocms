function MembersController($scope, Members, Users, Shops, Pagination, $timeout, $injector){
	$injector.invoke(BasicController, this, {$scope: $scope});
	$scope.resource = Members
	$scope.searchOptions.fields = ['user.name']
	$scope.editView ="views/member/edit.html"
	
	// profile 
	$scope.profileAvatar = "img/avatar.jpg"
	$scope.profileFields = [
			{name: "code", title: "编号", readonly:true, creatable:true, hide:true}
		,	{name: "user.username", title: "用户名", readonly:true, creatable:true, hide:true}
		,	{name: "user.password", title: "密码", readonly:true, creatable:true, unlist:true, hide:true}
		,	{name: "user.name", title: "姓名", hide:true}
		,	{name: "user.idcard", title: "身份证", hide:true}
		,	{name: "user.phone", title: "电话", hide:true}
		,	{name: "level", title: "等级", readonly:true}
		,	{name: "point", title: "累积积分", readonly:true}
		,	{name: "totalPoint", title: "累计积分", readonly:true}
		,	{name: "balance", title: "储值余额", readonly:true}
		, {name: "shop.name", title: "门店", hide:true}
		,	{name: "createdAt", title: "注册日期", readonly:true}
		,	{name: "status", title: "状态", value:function(entity){
			entity.fieldClass = entity.fieldClass || {}
				if(entity.status === 'active') {
					entity.fieldClass.status = "label label-success"
					return "激活"
				} else if(entity.status === 'removed') {
					entity.fieldClass.status = "label label-warning"
					return "过期"
				} else {
					return entity.status
				}
		}, readonly:true, hide:true}
	]	

	$scope.profileShortcuts = $scope.profileShortcuts.concat([
			{class: "span8"}
		,	{class: "box quick-button-small span1", icon: "icon-money", text: "充值", op:"selectViewByPath('views/member/recharge.html')"}
		,	{class: "box quick-button-small span1", icon: "icon-plus", text: "充值", op:"selectViewByPath('views/member/accumulate.html')"}
	])
	
	//route
	$scope.showCreate = function() {
		var entity = {
			level:"VIP",
			user:{
				name:"朱鸿风",
				username:"zhuhongfeng",
				password: "123456",
				idcard:"410224195608035991",
				phone:"13312345678"
			},
			status:"active"
		}
		$scope.showEdit(entity)
	}
	
	// Restful
	$scope.create = function(entity) {
		if(!entity.shop._id) {
			return console.log('error: must have shop')
		}
		var newOne = new $scope.resource(entity)
		console.log(newOne)
		newOne.shop = entity.shop._id
		newOne.$save(function(one) {
			console.log("success",one)
			$scope.showList()
		},function(err){
			console.log('error:', err)
		})
	}
	
	// bussiness
	$scope.shops = []
	$scope.fetchShops = function() {
		var s = $scope.entity.shop
		Shops.list(function(result){
			$scope.shops = result.entities
			if(s) {
				var inArray = false
				for(var i in $scope.shops) {
					if($scope.shops[i].name === s.name) {
						$scope.entity.shop = $scope.shops[i]
						inArray = true
						break;
					}
				}
				if(!inArray) {
					$scope.shops.push(s)
					$scope.entity.shop = s
				}
			} else {
				$scope.entity.shop = $scope.shops[0]
			}
		})
	}
}
