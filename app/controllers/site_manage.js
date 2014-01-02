/**
 * Created with JetBrains WebStorm.
 * User: new-worker
 * Date: 13-12-23
 * Time: 下午4:16
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose'),
    Site = mongoose.model('Site'),
    _ = require('underscore');

exports.site = function(req, res, next, id) {
    Site.load(id, function(err, site) {
        if (err) return next(err);
        if (!site) return next(new Error('Failed to load site ' + id));
        req.site = site;
        console.log(req.site);
        next();
    });
};

exports.all = function(req, res) {
    Site.findOne().exec(function(err, site) {
        if (err) {

        } else {
            res.jsonp(site);
        }
    });
};

exports.show = function (req, res){
    var owner, address, email, telephone;
    Site.findOne().exec(function(err, site) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            if (site == null) {
                res.render('site_manage', {
                    header: 'Site Management Information',
                    owner: null,
                    address: null,
                    email: null,
                    telephone: null
                });
            } else {
                owner = site.owner || null;
                address = site.address || null;
                email = site.email || null;
                telephone = site.telephone || null;
                res.render('site_manage', {
                    header: 'Site Management Information',
                    owner: owner,
                    address: address,
                    email: email,
                    telephone: telephone
                });
            }
        }
    });
};

exports.post = function(req, res){
    Site.findOne().exec(function(err, site) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            if (site == null) {
                var site = new Site(req.body);
                console.log(site);
                site.save(function(err) {
                    if (err) {

                    } else {
                        res.redirect('/#!/crm?view=1');
                    }
                });
            } else {
                site.remove(function(err) {
                    if (err) {
                        res.render('error', {
                            status: 500
                        });
                    } else {
                        var site = new Site(req.body);
                        site.save(function(err) {
                            if (err) {

                            } else {
                                res.redirect('/#!/crm?view=1');
                            }
                        });
                    }
                });
            }
        }
    });
};