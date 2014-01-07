/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    _ = require('underscore');
var fs = require("fs");
var path = require('path');
/**
 * Find article by id
 */
exports.article = function(req, res, next, id) {
    Article.load(id, function(err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));
        req.article = article;
        next();
    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
    var article = new Article(req.body);
    article.user = req.user;

    article.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: article
            });
        } else {
            res.jsonp(article);
        }
    });
};

/**
 * Update a article
 */
exports.update = function(req, res) {
    var article = req.article;

    article = _.extend(article, req.body);

    article.save(function(err) {
        res.jsonp(article);
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var article = req.article;

    article.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(article);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.article);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Article.find().sort('-created').populate('user', 'name username').exec(function(err, articles) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(articles);
        }
    });
};

exports.upload = function(req, res) {
    console.log("进入upload");
    for (var i in req.files) {
        if (req.files[i].size == 0){
            // 使用同步方式删除一个文件
            fs.unlinkSync(req.files[i].path);
            console.log('Successfully removed an empty file!');
        } else {
            var target_path = './public/images/' + req.files[i].name;
            // 使用同步方式重命名一个文件
            fs.renameSync(req.files[i].path, target_path);
            console.log('Successfully renamed a file!');
        }
    }
    return res.send({"200":"OK"});
};
//删除操作
exports.remove = function(req, res) {
    var url = req.body.url;
    console.log("url:" + req.body.url + " name:" + req.body.name);// /2013/12/31/Hello.html
    String.prototype.replaceAll = stringReplaceAll;
    function stringReplaceAll(t1, t2) {
        var reg = new RegExp(t1, "g");
        return this.replace(reg, t2);
    }
    var url1 = url.replaceAll('/', '-').replace('html', 'markdown');
    var url2 = url1.substring(1, url1.length);
    console.log("url1:" + url1);
    console.log("url2:" + url2);
    var path1 = "public/article/_posts/" + url2;
    var path2 = "public/article/_site/" + url;
    var path1_D = __dirname + "/../../" + path1;
    var path2_D = __dirname + "/../../" + path2;
    fs.unlinkSync(path1_D, function(err) {
        console.log("err1:" + err);
    });
    fs.unlinkSync(path2_D, function(err) {
        console.log("err2:" + err);
    });
    res.send({code:"200"});

};
exports.findByAddress = function(req, res) {
    console.log("into findByAddress");
    var fileName ='./public/article/_posts/' +  req.body.fileName;
//    var data=fs.readFileSync(fileName,"utf-8");//同步读

    fs.readFile(fileName,'utf-8',function(err,data){
        if(err){
            console.log("error");
            res.send({"500":"读取文件失败"});
            return
        }else{
            console.log('==============\n' + data + '==============');
            return res.send({"result":data});
        }
    });


};

// 生成markdown文档
exports.saveArticle = function(req, res) {
    console.log('进入生成markdown文档界面');
    console.log(req.body);
    var text = req.body.text;
    var title = req.body.title;
    var date = req.body.date;

    // 异步写
    fs.open("./public/article/_posts/" + date+'-'+title + '.markdown',"w",0644,function(e,fd){
        if(e) throw e;
        fs.write(fd,text,0,'utf8',function(e){
            if(e) {

                throw e;
            }
            console.log("写入文件成功");
            fs.closeSync(fd);
            return res.json(200,{message:'成功'});
        })
    });

    // 同步写
/*    var fd = fs.openSync("./public/article/_posts/" + date+'-'+title + '.markdown',"w",0644);
    fs.writeSync(fd, text,0,'utf8')
    fs.closeSync(fd);
    return res.json(200,{message:'成功'});*/



};

/*exports.display = function(req, res) {
//    console.log("我进来啦");
    var temp = req.query.id;
    console.log("id:" + temp);
    var arr = temp.split('/');
    var year = arr[0];
    var month = arr[1];
    var day = arr[2];
    var title = arr[3];
    console.log("year:" + year + " month:" + month + " day:" + day + " title:" + title);
    var myPath = __dirname + '/../../jekyll/article/_site/' + year + "/" + month + "/" + day + "/" + title;
    console.log("myPath:" + myPath);
    var html = path.normalize(myPath);
    console.log("html:" + html);
    return res.sendfile(html);
}*/
