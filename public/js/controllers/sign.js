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
//            console.log("data:" + JSON.stringify(data));
//            alert(111);
			$location.path('/crm');
		},function(data){
            console.log('进入登录异常');
//            console.log("data:" + JSON.stringify(data));
			$('.alert').show();
		});
	};
}function SignupController($scope, Users, $location){
	$scope.errorLoginDetail = "用户名或密码不正确";
	$scope.user = {
		username:"",
        password:"",
        name:"",
        email:"",
        phone:"",
        idcard:"",
        male:""
	};

	$scope.signup = function() {
        $scope.errorSignupDetail = "注册失败，请正确填写注册信息";
		var user = $scope.user;
//        console.log("user:" + JSON.stringify(user));
		if(user.username.length === 0 || user.password.length === 0) return;
		Users.signup(user, function(data){
            $scope.user = {
                username:"",
                password:"",
                name:"",
                email:"",
                phone:"",
                idcard:"",
                male:""
            };

            console.log(JSON.stringify(data));
            var errCode = data.code;
            console.log("errCode:" + data.code + " message:" + data.message);
            console.log(JSON.stringify(data));
            if (errCode == "402") {
                console.log("进入402");
                $scope.errorSignupDetail = "邮箱已被占用";
                $('.alert').show();
            }
            else if (errCode == "403") {
                console.log("进入403");
                $scope.errorSignupDetail = "用户名已被占用";
                $('.alert').show();
            }
            else if (errCode == "400") {
                $('.alert').show();
            } else {
                $location.path('/signin');
            }
		},function(){
            console.log('出异常了');
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