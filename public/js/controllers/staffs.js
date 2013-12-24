function StaffsController($scope, Staffs, Users, Shops, Pagination, $timeout, $injector){
	$injector.invoke(BasicController, this, {$scope: $scope});
	$scope.resource = Staffs
	$scope.searchOptions.fields = ['user.name']
	$scope.editView ="views/staff/edit.html"

	// profile 
	$scope.profileAvatar = "img/avatar.jpg"
	$scope.profileFields = [
			{name: "code", title: "编号", readonly:true, creatable:true, hide:true}
		,	{name: "user.username", title: "用户名", readonly:true, creatable:true, hide:true}
		,	{name: "user.password", title: "密码", readonly:true, creatable:true, unlist:true, hide:true}
		,	{name: "user.name", title: "姓名", hide:true}
		,	{name: "title", title: "职务", value:function(entity){
			if(entity.title === 'cashier') return '收银员'
			if(entity.title === 'manager') return '店长'
			if(entity.title === 'owner') return '业主'
			return entity.title
		}, hide:true}
		,	{name: "user.idcard", title: "身份证", hide:true}
		,	{name: "user.phone", title: "电话", hide:true}
		, {name: "shop.name", title: "门店", hide:true}
		, {name: "shop.address", title: "地址", hide:true}
		,	{name: "createdAt", title: "注册日期", readonly:true}
		,	{name: "status", title: "状态", value:function(entity){
			if(entity.status === 'active') {
				this.class = "label label-success"
				return "正常"
			} else if(entity.status === 'removed') {
				this.class = "label label-warning"
				return "离职"
			} else {
				return entity.status
			}
		}, hide:true}
	]

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