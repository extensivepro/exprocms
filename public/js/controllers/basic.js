function BasicController($scope, Pagination, $timeout){
	$scope.activeView = "views/basicList.html"
	$scope.resource = undefined
	$scope.searchFields = []
	$scope.editView = undefined
  $scope.searchOptions = {
    text: '',
    tooltip: '',
    fields: []
  }

	// list
	$scope.fields = []
	$scope.fieldOperations = [
			{class: "btn btn-success", icon: "icon-file", op:"showProfile(entity)"}
		,	{class: "btn btn-info", icon: "icon-edit", op:"showEdit(entity)"}
		,	{class: "btn btn-danger", icon: "icon-trash", op:"remove(entity)"}
	]
	
	// profile 
	$scope.profileShortcuts = [
			{class: "box quick-button-small span1", icon: "icon-edit", text: "编辑", op:"showEdit(entity)"}
		,	{class: "box quick-button-small span1", icon: "icon-trash", text: "删除", op:"remove(entity)"}
	]
	$scope.profileFields = []
	
	$scope.shouldOpenConfirmCreate = false
	$scope.entities = []
	$scope.entity = {}
	
	$scope.$watch('pagination.iLength', function(){
		$scope.refreshList()
	})
	$scope.$watch('pagination.iPage', function() {
		$scope.refreshList()
	})
	$scope.pagination = Pagination
	
	// route
	$scope.showEdit = function(entity) {
		$scope.entity = entity
		$scope.activeView = "views/basicEdit.html"
	}

	$scope.showCreate = function() {
		$scope.showEdit({createdAt: Date()})
	}

	$scope.showList = function(){
		$scope.activeView = "views/basicList.html"
		$scope.refreshList()
	}
	
	$scope.showProfile = function(entity) {
		$scope.entity = entity
		$scope.activeView = "views/basicProfile.html"
	}
	
	$scope.cancelEdit = function() {
		$scope.showList()
	}
	
	// Restful
	$scope.refreshList = function() {
		var p = $scope.pagination
		var params = {page:p.iPage, limit:p.iLength}
    console.log($scope.searchOptions.text)
    if($scope.searchOptions.text !== '' && $scope.searchOptions.fields.length > 0) {
			params["$or"] = []
      $scope.searchOptions.fields.forEach(function(field){
        var filter = {}
        filter[field] = {$regex:$scope.searchOptions.text}
        params.$or.push(filter)
      })
      console.log(params)
		}
		$scope.resource.get(params, function(result){
			console.log('refresh', result)
			$scope.entities = result.entities
			$scope.pagination.paginate(result.total)
		})
	}
	
	$scope.create = function(entity) {
		var newOne = new $scope.resource(entity)
		newOne.$save(function(user) {
			console.log("success",user)
			$scope.showList()
		},function(err){
			console.log('error:', err)
		})
	}
	
	$scope.update = function(entity) {
		console.log('update=', entity)
		var resource = new $scope.resource(entity)
		resource.$update(function(err) {
			console.log('update success', err)
			$scope.showList()
		}, function(err) {
			console.log('update user error:', err)
		})
	}
	
	$scope.remove = function(entity) {
		var resource = new $scope.resource(entity)
		resource.$remove(function() {
			if($scope.activeView === 'views/basicProfile.html'){
			  $scope.showList()
			} else {
			  var iPage = $scope.pagination.iPage
        $scope.pagination.paginate($scope.pagination.iTotal-1)
        if(iPage === $scope.pagination.iPage) {
          $scope.refreshList()
        }
			}
		}, function(err) {
			console.log('Remove user error:', err)
		})
	}
		
	$scope.init = function() {
		$scope.pagination.iPage = 1
		$scope.fields = $scope.profileFields.filter(function(field){
			return !field.unlist
		})
	}

	$scope.valueOfKeyString = function(entity, keyString) {
		var v = entity
		var keys = keyString.split('.')
		keys.forEach(function(key){
			v = v[key]
		})
		return v
	}
}