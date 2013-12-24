function HeaderController($scope, $location, Users) {
	$scope.menu = [
		{
			"title": "Articles",
			"link": "articles"
		},
		{
			"title": "Create New Article",
			"link": "articles/create"
		}
	]
	$scope.showSettingPasswordModal = false;

	$scope.signout = function() {
		$location.path('/signout');
		Users.signout($scope.uuser);
	};
	$scope.init = function() {
		// console.log($scope)
	};
}