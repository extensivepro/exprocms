function SigninController($scope, Users, $location){
	$scope.errorLoginDetail = "用户名或密码不正确";
	$scope.loginUser = {
		username:"", password:""
	}
	
	$scope.Login = function() {
		var user = $scope.loginUser;
		if(user.username.length === 0 || user.password.length === 0) return;
		Users.signin(user, function(data){
			$scope.setUserStatus(data.name, true, data, user.username)
			user = {username:"", password:""};
			$location.path('/crm');
		},function(){
			$('.alert').show();
		});
	};
}

function SettingPasswordController($scope, Users, $location) {
	$scope.newPassword = "";
	$scope.passwordConfirmation = "";
	$scope.showSettingMessage = false;
	$scope.errorDetail = "更新失败请重试";
	
	$scope.setPassword = function() {
		if($scope.newPassword === "" || $scope.passwordConfirmation === "") {
			$scope.errorDetail = "密码不能为空";
			$scope.showSettingMessage = true;			
		} else if($scope.newPassword !== $scope.passwordConfirmation) {
			$scope.errorDetail = "两次输入密码不一致";
			$scope.showSettingMessage = true;
		} else {
			console.log($scope.uuser)
			Users.save({userID:$scope.uuser.id}, {password:$scope.newPassword}, function() {
				$('#settingPasswordModal').modal('hide')
			}, function() {
				$scope.errorDetail = "更新失败请重试";
				$scope.showSettingMessage = true;
			})
		}
	}
}