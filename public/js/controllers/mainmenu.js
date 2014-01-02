function MainMenuController($scope, $routeParams, $location){
	$scope.views = [ 
	/*	  {name:"会员管理", icon:"icon-user", path:"views/member/index.html", submenus:[
					{name:"储值账单", icon:"icon-list", path:"views/member/balanceIndex.html"}
				,	{name:"会员充值", icon:"icon-money", path:"views/member/recharge.html"}
				,	{name:"积分清单", icon:"icon-list-alt", path:"views/member/pointLogIndex.html"}
				,	{name:"积分累积", icon:"icon-plus", path:"views/member/accumulate.html"}
			]}
			, {name:"门店管理", icon:"icon-folder-close-alt", path:"views/shop/index.html", submenus: [
					{name:"门店员工", icon:"icon-hdd", path:"views/staff/index.html"}
			]}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
			, {name:"系统用户", icon:"icon-user-md", path:"views/user/index.html"}
=======
			, */
        {name:"系统用户", icon:"icon-user-md", path:"views/user/index.html"},
<<<<<<< HEAD
        {name:"网站管理", icon:"icon-hdd", path:"views/site_manage/site.html"},
	    {name:"文章管理", icon:"icon-list", path:"views/post/list.html"},
        {name:"新建文章", icon:"icon-plus", path:"views/post/create.html"},
        {name:"修改文章", icon:"icon-money", path:"views/post/edit.html"}
=======
        {name:"网站管理", icon:"icon-user-md", path:"views/site_manage/site.html"},
	    {name:"文章管理", icon:"icon-user-md", path:"views/post/list.html"},
        {name:"新建文章", icon:"icon-user-md", path:"views/post/create.html"},
        {name:"修改文章", icon:"icon-user-md", path:"views/post/edit.html"}
>>>>>>> b95a2b7... 添加Markdown及时html渲染，添加网站管理页面，完善post增删改查

>>>>>>> afbda34... icon change
	]
<<<<<<< HEAD
	$scope.currentView = $scope.views[2]
=======
	$scope.currentView = $scope.views[$location.search().view | 0];
>>>>>>> b95a2b7... 添加Markdown及时html渲染，添加网站管理页面，完善post增删改查
=======
			, */{name:"系统用户", icon:"icon-user-md", path:"views/user/index.html"},
			 {name:"文章编辑", icon:"icon-user-md", path:"views/article/index.html"}
	]
	$scope.currentView = $scope.views[0];
>>>>>>> 0a7408f... add user
=======
			, */
        {name:"系统用户", icon:"icon-user-md", path:"views/user/index.html"},
        {name:"网站管理", icon:"icon-user-md", path:""},
	    {name:"文章管理", icon:"icon-user-md", path:"views/post/list.html"},
        {name:"新建文章", icon:"icon-user-md", path:"views/post/create.html"},
        {name:"修改文章", icon:"icon-user-md", path:"views/post/edit.html"}

	]
	$scope.currentView = $scope.views[$location.search().view];
>>>>>>> b69176f... post management transplanted to new theme with functionalities:
	
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