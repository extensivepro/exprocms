//Setting up route
window.app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/crm', { templateUrl: 'views/index.html'}).
	when('/signin', { templateUrl: 'views/sign/signin.html', controller: 'SigninController'}).
	when('/articles/create', { templateUrl: 'views/articles/create.html' }).
	when('/articles/:articleId/edit', { templateUrl: 'views/articles/edit.html' }).
	when('/articles/:articleId', { templateUrl: 'views/articles/view.html' }).
	// when('/', { templateUrl: 'index.html', controller: 'IndexController'}).
	otherwise({redirectTo: '/signin'});
}]);

//Setting up Restful Server
window.restful = {
	baseURL: "http://"+window.location.hostname+"\\:3000"
};

//Removing tomcat unspported headers
window.app.config(['$httpProvider', function($httpProvider, Configuration) {
	$httpProvider.defaults.withCredentials = true;
    //delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider', function($locationProvider) {
    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("!");
}]);