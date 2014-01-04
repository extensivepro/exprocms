/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Auth callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
  res.send(200);
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    var user = new User(req.body);
    console.log("user是：" + user);
    user.save(function(err) {
        console.log("code:" + err);
        if (err) {
            console.log("错了："+ err);
            switch(err.code){
                case 11000:
                case 11001:

                    var re1 = /email/i;
                    if (re1.test(err)) {

                        console.log("进入402");
                        return res.send({code:402, message:'邮箱已被占用'});
                    }
                    var re2 = /username/i;
                    if (re2.test(err)) {

                        return res.send({code:403, message:'用户名已被占用'});
                    }
                    break;
                default:

                    return res.send({code:400, message:'请正确填写所有的字段'});
            }


        }
        return res.redirect('/');
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    console.log('进来啦');
    res.redirect('#!/crm');

};

/**
 * Create user
 */
exports.create = function(req, res) {
    var user = new User(req.body);

    user.provider = 'local';
    user.save(function(err) {
        if (err) {
            return res.render('users/signup', {
                errors: err.errors,
                user: user
            });
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.redirect('/');
        });
    });
};

/**
 *  Show profile
 */
exports.show = function(req, res) {
    var user = req.profile;

    res.render('users/show', {
        title: user.name,
        user: user
    });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};

// 查询所有的用户信息
exports.getAll = function(req, res) {
    User.find().sort('name').exec(function(err, users) {
        if (err) {
            return res.status(500).send({message: 'load all Users failed!'});
        }
        if(users){
            console.log("users:的内容是：" + users);
            var statusCode = (users.length === 0) ? 204:200;
            res.json(statusCode, {entities:users});
        }else{
            res.json(204,{total:0});
        }
    });
};