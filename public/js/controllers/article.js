function ArticlesController($scope, $upload, $http, Articles, $route, Pagination, $timeout, $injector,$location){
    $scope.articleText = "";
    $scope.title = "";

    $scope.previewArticle = function() {
        var title = $scope.title;
        var tempDate = new Date().toLocaleDateString();
        var dateReplace = tempDate.replace("年","-").replace("月","-").replace("日","");
        var dates = dateReplace.split('-');
        var year = dates[0];
        var month = dates[1] > 10 ? dates[1] : "0" + dates[1];
        var day = dates[2] > 10 ? dates[2] : "0" + dates[2];
        console.log("year:" + year + "\n" + "month:" + month + "\n" + "day:" + day);
        var date = year + "-" + month + "-" + day;
        var articlePath =  year + "/" + month + "/" + day + "/" + title + ".html";
        console.log("articlePath:" + articlePath);
        function Article(text, title, date) {
            this.text = text;
            this.title = title;
            this.date = date;
        }
//        window.location.href="http://localhost:3000/display?id=" + "2013/12/27/test1.html";
       var article = new Article($scope.articleText, title, date);
        Articles.preview(article, function(result) {
            console.log("文章成功提交到后台");
            console.log(result.message);
//            $scope.currentView = "article/_site/2013/12/27/Welcome Expro.html";
//            console.log("路径是：" + "article/_site/" + articlePath);
            $scope.currentView = "article/_site/" + articlePath;


        });
    }

    $scope.post_rev_id="";

    $scope.reload = function() {
        $route.reload();
        $scope.fetch_post();
    }

    $scope.reload_nake = function() {
        $route.reload();
    }

    $scope.posts = [];
    $scope.title_rev;
    $scope.content_rev;
    $scope.id_rev;

    $scope.myModelObj;
    $scope.onFileSelect = function($files) {

        for (var i=0; i<$files.length;i++) {
            var file = $files[i];

            $scope.upload = $upload.upload({
                url: '/upload',
                method: 'POST',
                data: {myObj: $scope.myModelObj},
                file: file
            }).progress(function(evt) {
                    console.log('percent: ' + parseInt(100.0*evt.loaded/evt.total));
                }).success(function (data, status, header, config){
//                    alert(JSON.stringify(data));
//                    console.log(JSON.stringify(data));
                    $scope.myModelObj = '![Invalid Image URL Link](http://localhost:3000'+JSON.stringify(data).substring(9,JSON.stringify(data).length-1)+")";

                });
        }
    }

    $scope.fill_value = function() {
        var date, title, post_id, content;
        var data_fetch;
        $http({
            url: '/posts/list',
            method: 'POST'
        }).success(function(data, status, headers, config) {
                $scope.post_rev_id = $location.search().post_id;
                data_fetch = data;
                if (data_fetch.length == 0){

                } else {
                    for(var i = 0; i < data_fetch.length; i ++) {
                        date = JSON.stringify(data[i].date).substring(1, 11) + ' '
                            + (parseInt(JSON.stringify(data[i].date).substring(12, 14))+8).toString()
                            + JSON.stringify(data[i].date).substring(14, 20);

                        post_id = data[i]._id;
                        title = data[i].title;
                        content = data[i].content;
                        if ($scope.post_rev_id == post_id) {
                            $scope.title_rev = title;
                            $scope.content_rev = content;
                            $scope.id_rev = post_id;
                        }
                    }
                }
            }).error(function(data, status, headers, config) {
                $scope.status = status;
            });
    }

    var fetch_data = function(){
        var date, title, post_id, content;
        var data_fetch;
        $http({
            url: '/posts/list',
            method: 'POST'
        }).success(function(data, status, headers, config) {
                data_fetch = data;
                if (data_fetch.length == 0){

                } else {
                    for(var i = 0; i < data_fetch.length; i ++) {
                        date = JSON.stringify(data[i].date).substring(1, 11) + ' '
                            + (parseInt(JSON.stringify(data[i].date).substring(12, 14))+8).toString()
                            + JSON.stringify(data[i].date).substring(14, 20);
                        post_id = data[i]._id;
                        title = data[i].title;
                        content = data[i].content;
                        $scope.posts.push({"title":title, "date":date, "id":post_id});
                    }
                }
        }).error(function(data, status, headers, config) {
                $scope.status = status;
        });
    }
    fetch_data();
}