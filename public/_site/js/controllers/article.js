function ArticlesController($scope, Articles, Pagination, $timeout, $injector,$location){
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
//            $scope.currentView = "../public/views/article/test.html"
            $scope.currentView = "jekyll/article/_site/" + articlePath;
//            window.location.href="http://www.baidu.com" ;
//          console.log("articlePath:" + articlePath);
//          window.location.href="http://localhost:3000/display?id=" + articlePath;
//          window.location.href="http://localhost:3000/display?id=" + articlePath;
        });
    }
}