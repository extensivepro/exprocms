//Setting up route
window.app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'view/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'view/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'view/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'view/articles/view.html'
        }).
        when('/', {
            templateUrl: 'view/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);