//User service used for articles REST endpoint
window.app.factory("Articles", function($resource){
	return $resource(window.restful.baseURL+'/articles/:articleID', {articleID:'@_id'}, {
        preview:{method:'POST', params:{articleID:'preview'}},
		signin: {method: 'POST', params:{articleID:'session'}},
		signout: {method: 'POST', params:{articleID:'signout'}},
		update: { method: 'PUT' },
        getAll:{method:'GET', params:{articleID:'get_all'}} //查询所有的用户信息
	});
});