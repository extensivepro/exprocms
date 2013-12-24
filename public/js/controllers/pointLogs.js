function PointLogsController($scope, PointLogs, Members, Pagination, $injector){
	$injector.invoke(BasicController, this, {$scope: $scope});
	$scope.resource = PointLogs
	$scope.searchOptions.fields = ['member.user.name']
	$scope.editView ="views/member/accumulate.html"
	
	// profile 
	$scope.profileFields = [
			{name: "member.code", title: "会员编号", readonly:true, creatable:true, hide:true}
		,	{name: "member.user.name", title: "姓名", hide:true}
		,	{name: "type", title: "类型", readonly:true, value:function(entity){
			if(entity.type === 'earn') {
				this.class = "label label-warning"
				return "累积"
			} else if(entity.type === 'redeem') {
				this.class = "label label-success"
				return "兑换礼品"
			} else {
				return entity.type
			}
		}}
		,	{name: "point", title: "积分数", readonly:true}
		,	{name: "postPoint", title: "累积积分", readonly:true}
		,	{name: "postTotalPoint", title: "累计积分", readonly:true}
		,	{name: "agent.user.name", title: "经办人", hide:true}
		,	{name: "createdAt", title: "日期", readonly:true}
	]	
	$scope.profileShortcuts = [
			{class: "box quick-button-small span1", icon: "icon-trash", text: "删除", op:"remove(entity)"}
	]

	// route
	$scope.showCreate = function() {
		$scope.selectViewByPath('views/member/accumulate.html')
	}
	
	$scope.showList = function(){
		$scope.selectViewByPath('views/member/pointLogIndex.html')
		$scope.refreshList()
	}

	// list
	$scope.fieldOperations = [
			{class: "btn btn-success", icon: "icon-zoom-in", op:"showProfile(entity)"}
	]
	
	// Restful
	$scope.create = function(entity) {
		var newOne = new $scope.resource(entity)
		newOne.member = entity.member._id
		newOne.type = 'earn'
		console.log(newOne)
		newOne.$save(function(one) {
			console.log("success",one)
			$scope.showList()
		},function(err){
			console.log('error:', err)
		})
	}
	
	// bussiness
	$scope.members = []
	$scope.fetchMembers = function() {
		Members.list(function(result){
			$scope.members = result.entities
			if(!$scope.entity.member) {
				$scope.entity.member = $scope.members[0]
			}
		})
	}
}
