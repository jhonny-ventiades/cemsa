
angular.module('emsaApp')
    .factory('Usuarios', function ($resource) {
        return $resource('api/usuario/:user/:password',
            {}, { //parameters default
                get: {
                    method: 'GET',
                    params:{
                        user:'@user',
                        password:'@password'
                    }
                    //isArray:true
                }
            });
    });