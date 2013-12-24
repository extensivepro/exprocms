//User service used for articles REST endpoint
window.app.factory("Users", function($resource){
	return $resource(window.restful.baseURL+'/users/:userID', {userID:'@_id'}, {
		signin: {method: 'POST', params:{userID:'session'}},
		signout: {method: 'POST', params:{userID:'signout'}},
		update: { method: 'PUT' }
	});
});