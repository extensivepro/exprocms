/**
 * Created with JetBrains WebStorm.
 * User: new-worker
 * Date: 13-12-27
 * Time: 下午12:00
 * To change this template use File | Settings | File Templates.
 */

var post_list = document.getElementById('post_list');
var data_fetch;
$.ajax({
    type: "post",
    url: "/posts/list",
    dataType: "json",
    success: function (data) {
        data_fetch = data;
        if (data_fetch.length == 0){
            post_list.innerHTML = post_list.innerHTML +
                "<h2> There is no post yet, <a href='/posts/create'>CREATE</a> one?</h2>";
        }
        for(var i = 0; i < data_fetch.length; i ++) {
            post_list.innerHTML = post_list.innerHTML +
                "<hr><li>" +
                "<span>" + JSON.stringify(data[i].date).substring(1, 11) + ' '
                + (parseInt(JSON.stringify(data[i].date).substring(12, 14))+8).toString()
                + JSON.stringify(data[i].date).substring(14, 20) + "</span> "+
                "<h2><a href='/posts/view/?id="+data[i]._id +"'>"+ data[i].title +"</a></h2>" +
                "</li>";
        }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    }
});