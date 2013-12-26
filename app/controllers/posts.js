/**
 * Created with JetBrains WebStorm.
 * User: new-worker
 * Date: 13-12-25
 * Time: 下午1:05
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    _ = require('underscore');


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
                //console.log(content);
                //res.jsonp(content);
                res.render('posts/view', {
                    header: 'Post Edit',
                    postTitle: title,
                    postContent: content
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
            console.log(post);
            post.save(function(err) {
                if (err) {
                    res.redirect('/');
                } else {
                    res.jsonp(post);
                    res.redirect('/posts/list');
                }
            });
        }
    });
}

exports.all = function(req, res) {
    Post.find().sort('-created').exec(function(err, posts) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(posts);
        }
    });
};

exports.fetch = function(req, res) {
    console.log(id);
    Post.findOne({_id: id}).exec(function(err, post) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            console.log('33');
            if (post == null) {
                res.redirect('/');
            } else {
                var content = post.content;
                console.log(content);
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
