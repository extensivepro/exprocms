function MainMenuController($scope, $rootScope,$location){

        $scope.views = [
            {name:"系统用户", icon:"icon-user-md", path:"views/user/index.html"},
            {name:"网站管理", icon:"icon-hdd", path:"views/site_manage/site.html"},
             {name:"文章管理", icon:"icon-list", path:"views/post/list.html"},
             {name:"新建文章", icon:"icon-plus", path:"views/post/create.html"},
             {name:"修改文章", icon:"icon-money", path:"views/post/edit.html"},

        ];
    $rootScope.currentView = $scope.views[$location.search().view | 0];
	$scope.selectView = function(view) {
        $rootScope.currentView = view;

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