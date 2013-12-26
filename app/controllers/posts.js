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
                }
            });
        }
    });
}

exports.show = function (req, res) {
    Post.findOne().exec(function(err, post) {
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
                console.log(content);
                res.render('posts/show', {
                    header: 'Post管理',
                    postTitle: title,
                    postContent: content
                });
            }
        }
    });
}