module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    //site routes
    var site = require ('../app/controllers/site_manage');

    var posts = require('../app/controllers/posts');

    var articles = require('../app/controllers/articles');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);

    //setting up site information
    app.get('/site_manage', site.show);
    app.post('/site_manage/update', site.post);

    //setting up posts api
    app.get('/posts/create', posts.create);
    app.post('/posts/create', posts.save);

    app.post('/posts/list', posts.all);
    app.get('/posts/list', posts.show);

    app.get('/posts/view', posts.edit);
    app.post('/posts/view', posts.fetch);

    app.post('/posts/edit', posts.upToDate);
    app.post('/posts/delete', posts.delete);

    app.post('/imgUpload', posts.imgUpload);

    //Setting up the users api
    app.post('/users', users.create);

    app.post('/users/session', passport.authenticate('local'), users.session);


    app.get('/users/get_all', auth.user.hasAuthorization,users.getAll);

    app.get('/users/me', users.me);
    app.get('/users/:userId', users.show);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Article Routes

    app.get('/articles', articles.all);
    app.post('/articles/preview', articles.preview);//生成markdown文档
    app.post('/articles', auth.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
    app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);
//    app.get('/display', articles.display);
    //Finish with setting up the articleId param
    app.param('articleId', articles.article);
/*    function checkLogin(req, res, next) {

        if (!req.user) {
            console.log('hello');
            res.redirect('#!/signin');
        }
        next();
    }*/
};
