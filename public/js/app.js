window.app = angular.module('exprocms', ['ngCookies', 'ngResource', 'ngRoute','ui.bootstrap', 'mdFilter', 'ngSanitize', 'angularFileUpload']);

/*
* 
*   User Managemente for main
*
*/
window.app.run(function($rootScope,localStorage, $location, $timeout){
  //.. watch change on location.path()
  $rootScope.location = $location;
  $rootScope.$watch('location.path()', function( path ) {
    //.. path to logout?
//    console.log("进入了路径监控");
//    console.log("path:" + path);
    if (path == '/signout') {
      $rootScope.setUserStatus('',false,'',false);
      $location.path('/');
    }
    var flag = true;
    if (path == '/signup') {
      flag = false;
        $location.path('/signup');
    }

    if(!$rootScope.Signed && flag){
//      console.log('我进入了signin');
      $location.path('/signin');
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
  $rootScope.Signed =  localStorage.getB('is-user-signed');

  //.. set user signed or unsigned stae to localStorage
  $rootScope.setUserStatus = function(uname, ustate, uuser, uprofile){
    localStorage.set('user-access', uuser);
    localStorage.set('user-name', uname);
    localStorage.set('is-user-signed', ustate);
    localStorage.set('user-profile', uprofile);
    $rootScope.userName =  uname;
    $rootScope.Signed = ustate;
    $rootScope.uuser = uuser;
    $rootScope.profileName =  uprofile;
  }
});
