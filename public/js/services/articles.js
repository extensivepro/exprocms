//User service used for articles REST endpoint
window.app.factory("Articles", function($resource){
	return $resource(window.restful.baseURL+'/articles/:articleID', {articleID:'@_id'}, {
        saveArticle:{method:'POST', params:{articleID:'saveArticle'}},
		signin: {method: 'POST', params:{articleID:'session'}},
		signout: {method: 'POST', params:{articleID:'signout'}},
		update: { method: 'PUT' },
        getAll:{method:'GET', params:{articleID:'get_all'}}, //查询所有的用户信息
        remove:{method:'POST', params:{articleID:'remove'}}, // 删除指定文章
        upload:{method:'POST', params:{articleID:'upload'}},// 上传图片
        findByAddress:{method:'POST', params:{articleID:'findByAddress'}} // 找到相应的markdown文件
	});
});