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

// 生成markdown文档
exports.preview = function(req, res) {
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
