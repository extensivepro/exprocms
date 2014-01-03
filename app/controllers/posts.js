/**
 * Created with JetBrains WebStorm.
 * User: new-worker
 * Date: 13-12-25
 * Time: 下午1:05
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    formidable = require('formidable'),
    fs = require('fs'),
    sys = require('sys'),
    _ = require('underscore');

formidable.IncomingForm.prototype.uploadDir = './public/upload';
formidable.IncomingForm.prototype.keepExtensions = true;

exports.posts = function(req, res, next, id) {
    Post.load(id, function(err, post) {
        if (err) return next(err);
        if (!post) return next(new Error('Failed to load article ' + id));
        req.post = post;
        next();
    });
};

var id;
exports.edit = function(req, res) {
    //console.log(req.query.id);
    id = req.query.id;

    Post.findOne({_id: req.query.id}).exec(function(err, post) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            if (post == null) {
                res.redirect('/');
            } else {
                var title = post.title;
                var content = post.content;
                res.render('posts/view', {
                    header: 'Post Edit',
                    postTitle: title,
                    postContent: content,
                    postId: id
                });
            }
        }
    });
}

exports.create = function (req, res) {
    res.render ('posts/create', {
        header: '新建Post',
        title: 'Post Management'
    });
};

exports.save = function (req, res) {
    Post.findOne().exec(function(err, post) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            var post = new Post(req.body);
            post.content = post.content.substring(0, post.content.length);

            post.save(function(err) {
                if (err) {
                    throw err;
                    res.redirect('/');
                } else {
                    res.jsonp(post);
                    res.redirect('/#!/crm?view=2');
                }
            });
        }
    });
}

exports.all = function(req, res) {
    Post.find().sort('-date').exec(function(err, posts) {
        if (err) {

        } else {
            res.jsonp(posts);
        }
    });
};

exports.fetch = function(req, res) {
    Post.findOne({_id: id}).exec(function(err, post) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            if (post == null) {
                res.redirect('/');
            } else {
                var content = post.content;
                res.jsonp(content);

            }
        }
    });
};

exports.show = function(req, res) {
    res.render('posts/list', {
        header: 'Post List'
    });
}

exports.upToDate = function(req, res) {
    Post.remove({_id: req.body.id}).exec(function(err, post) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            var post = new Post(req.body);
            post.content = post.content.substring(0, post.content.length);
            post.save(function(err) {
                if (err) {
                    res.redirect('/');
                } else {
                    res.jsonp(post);
                    res.redirect('/#!/crm?view=2');
                }
            });
        }
    });
}

exports.delete = function(req, res) {

    Post.remove({_id: req.body.id}).exec(function(err, post) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.redirect('/#!/crm?view=2');
        }
    });
}

exports.imgUpload = function (req, res) {

    console.log("进入upload");
    for (var i in req.files) {
        if (req.files[i].size == 0){
            // 使用同步方式删除一个文件
            fs.unlinkSync(req.files[i].path);
            console.log('Successfully removed an empty file!');
        } else {
            var target_path = './public/upload/' + req.files[i].name;
            // 使用同步方式重命名一个文件
            fs.renameSync(req.files[i].path, target_path);
            console.log('Successfully renamed a file!');
        }
    }
    return res.send(target_path);
}