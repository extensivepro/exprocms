function BalancesController($scope, Settlements, Members, Pagination, $injector){
	$injector.invoke(BasicController, this, {$scope: $scope});
	$scope.resource = Settlements
	$scope.searchOptions.fields = ['member.user.name']
	$scope.editView ="views/member/recharge.html"
	
	// profile 
	$scope.profileFields = [
			{name: "member.code", title: "会员编号", readonly:true, creatable:true, hide:true}
		,	{name: "member.user.name", title: "姓名", hide:true}
		,	{name: "type", title: "类型", readonly:true, value:function(entity){
			entity.fieldClass = entity.fieldClass || {}
			if(entity.type === 'prepay') {
				entity.fieldClass.type = "label label-warning"
				return "充值"
			} else if(entity.type === 'pay') {
				entity.fieldClass.type = "label label-success"
				return "消费"
			} else if(entity.type === 'writeoff') {
				entity.fieldClass.type = "label label-success"
				return "冲销"
			} else {
				entity.fieldClass.type = "label label-danger"
				return entity.type
			}
		}}
		,	{name: "amount", title: "金额", readonly:true}
		,	{name: "balance", title: "交易后余额", readonly:true}
		,	{name: "agent.user.name", title: "经办人", hide:true}
		,	{name: "createdAt", title: "日期", readonly:true}
	]	
	$scope.profileShortcuts = [
			{class: "box quick-button-small span1", icon: "icon-trash", text: "删除", op:"remove(entity)"}
	]

	// route
	$scope.showCreate = function() {
		$scope.selectViewByPath('views/member/recharge.html')
	}
	$scope.showList = function(){
		$scope.selectViewByPath('views/member/balanceIndex.html')
		$scope.refreshList()
	}

	// list
	$scope.fieldOperations = [
			{class: "btn btn-success", icon: "icon-zoom-in", op:"showProfile(entity)"}
	]
	
	// Restful
	$scope.create = function(entity, type) {
		var newOne = new $scope.resource(entity)
		newOne.member = entity.member._id
		newOne.type = type || 'prepay'
		if(newOne.type !== 'prepay'){
			newOne.amount = 0 - newOne.amount
			if(newOne.amount+entity.member.balance < 0) {
				newOne.amount = 0-entity.member.balance
			}
		}
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
