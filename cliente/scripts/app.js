
'use strict';

angular.module('emsaApp', [
    'ngCookies',
    'ngResource',
    'ngRoute'
])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/main.html',
                controller: 'mainCtrl'
            })
            .when('/entrar', {
                templateUrl: 'partials/entrar.html',
                controller: ''
            })
            .when('/funcionarios', {
                templateUrl: 'partials/funcionario.html',
                controller: 'funcionariosCtrl'
            })

            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    })

    .run(function($rootScope, $location, $cookieStore){
        $rootScope.$on('$routeChangeStart',function(event,next,current){
            if($cookieStore.get('estaConectado')== false || $cookieStore.get('estaConectado')== null){
                if(next.templateUrl == 'partials/entrar.html')
                    $location.path('/');
            }
        })
    });