
angular.module('emsaApp')
    .factory('Funcionarios', function ($resource) {
        return $resource('api/funcionario',
            {}, { //parameters default
                get: {
                    method: 'GET',
                    isArray:true
                },
                post:{
                    method: 'POST'
                }

            });
    });



angular.module('emsaApp')
    .factory('FuncionariosEspecifico', function ($resource) {
        return $resource('api/funcionario/:id',
            {}, { //parameters default
                put: {
                    method: 'PUT',
                    params:{
                        id:"@id"
                    }
                }

            });
    });