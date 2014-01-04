//User service used for articles REST endpoint
window.app.factory("Users", function($resource){
	return $resource(window.restful.baseURL+'/users/:userID', {userID:'@_id'}, {
		signin: {method: 'POST', params:{userID:'session'}},
		signup: {method: 'POST', params:{userID:'signup'}},
		signout: {method: 'POST', params:{userID:'signout'}},
		update: { method: 'PUT' },
        getAll:{method:'GET', params:{userID:'get_all'}} //查询所有的用户信息
	});
});