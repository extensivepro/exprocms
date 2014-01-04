window.app = angular.module('exprocms', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap']);

/*
 *
 *   User Managemente for main
 *
 */
window.app.run(function ($rootScope, localStorage, $location, $timeout) {
    //.. watch change on location.path()
    $rootScope.location = $location;
    $rootScope.$watch('location.path()', function (path) {
        //.. path to logout?
        if (path == '/signout') {
            $rootScope.setUserStatus('', false, '', false);
            $location.path('/');
        }
    });

    //.. uncomment for cleaning
    // localStorage.set('user-access','');
    // localStorage.set('user-name','');
    // localStorage.set('is-user-signed','false');
    // localStorage.set('user-profile','USER');

    $rootScope.profileName = localStorage.get('user-profile');
    $rootScope.uuser = localStorage.get('user-access');
    $rootScope.userName = localStorage.get('user-name');
    $rootScope.Signed = localStorage.getB('is-user-signed');

    //.. set user signed or unsigned stae to localStorage
    $rootScope.setUserStatus = function (uname, ustate, uuser, uprofile) {
        localStorage.set('user-access', uuser); // 整个user对象
        localStorage.set('user-name', uname);//用户的真实姓名
        localStorage.set('is-user-signed', ustate);//是否登录的标识，true表示已登录
        localStorage.set('user-profile', uprofile); //描述名称，也就是用户名
        $rootScope.userName = uname;
        $rootScope.Signed = ustate;
        $rootScope.uuser = uuser;
        $rootScope.profileName = uprofile;
    }
});
