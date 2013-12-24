function MainMenuController($scope){
	$scope.views = [ 
		  {name:"会员管理", icon:"icon-user", path:"views/member/index.html", submenus:[
					{name:"储值账单", icon:"icon-list", path:"views/member/balanceIndex.html"}
				,	{name:"会员充值", icon:"icon-money", path:"views/member/recharge.html"}
				,	{name:"积分清单", icon:"icon-list-alt", path:"views/member/pointLogIndex.html"}
				,	{name:"积分累积", icon:"icon-plus", path:"views/member/accumulate.html"}
			]}
			, {name:"门店管理", icon:"icon-folder-close-alt", path:"views/shop/index.html", submenus: [
					{name:"门店员工", icon:"icon-hdd", path:"views/staff/index.html"}
			]}
			, {name:"系统用户", icon:"icon-user-md", path:"views/user/index.html"}
	]
	$scope.currentView = $scope.views[2]
	
	$scope.selectView = function(view) {
		$scope.currentView = view
	}
	
	$scope.selectViewByPath = function(path) {
		$scope.views.some(function(view){
			if(view.path === path) {
				$scope.currentView = view
				return true
			} else {
				return view.submenus.some(function(submenu){
					if(submenu.path === path) {
						$scope.currentView = submenu
						console.log(submenu, path)
						return true
					} else {
						return false
					}
				})
			}
		})
	}
}