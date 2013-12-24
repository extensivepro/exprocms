//Shop service used for articles REST endpoint
window.app.factory("Shops", function($resource){
	return $resource(window.restful.baseURL+'/shops/:shopID', {shopID:'@_id'}, {
		update: { method: 'PUT' },
		list: { method:'GET', param:{page:1, limit:9999} }
	})
});

//Staff service used for articles REST endpoint
window.app.factory("Staffs", function($resource){
	return $resource(window.restful.baseURL+'/staffs/:staffID', {staffID:'@_id'}, {
		update: { method: 'PUT' }
	})
});

//Member service used for articles REST endpoint
window.app.factory("Members", function($resource){
	return $resource(window.restful.baseURL+'/members/:memberID', {memberID:'@_id'}, {
		update: { method: 'PUT' },
		list: { method:'GET', param:{page:1, limit:9999} }
	})
});

//Settlement service used for articles REST endpoint
window.app.factory("Settlements", function($resource){
	return $resource(window.restful.baseURL+'/settlements/:settlementID', {settlementID:'@_id'}, {
		update: { method: 'PUT' }
	})
});

//PointLog service used for articles REST endpoint
window.app.factory("PointLogs", function($resource){
	return $resource(window.restful.baseURL+'/pointlogs/:pointlogID', {pointlogID:'@_id'}, {
		update: { method: 'PUT' }
	})
});