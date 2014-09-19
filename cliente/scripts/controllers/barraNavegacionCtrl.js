


'use strict';

angular.module('emsaApp')
    .controller('barraNavegacionCtrl', function ($scope, Usuarios, $cookieStore, $location ) {
            $scope.usuarioConectado = { estaConectado: false};
            $scope.usuario = {nombre:"", contrasenia:""};
            $scope.menu =[];

        $scope.cargarSesion = function(){
            $scope.usuario = {nombre:"", contrasenia:""};
            $scope.usuarioConectado = $cookieStore.get('usuario');
            $scope.opcionesUsuarioNoConectado();

            if($scope.usuarioConectado == null){
                $scope.usuarioConectado = { estaConectado: false};
            }
            else{
                $scope.usuarioConectado.estaConectado = true;
                $scope.opcionesUsuarioConectado();
            }
        };

        $scope.iniciarSesion = function(){
            $scope.usuarios = [];
            $("#mensajeDatosIncorrectos").hide();

            Usuarios.get({user:$scope.usuario.nombre,password:$scope.usuario.contrasenia})
                .$promise
                .then(function(data){
                    angular.copy(data,$scope.usuarioConectado );

                    $scope.usuarioConectado.estaConectado = true;
                    $cookieStore.put('estaConectado', true);
                    $cookieStore.put('usuario', $scope.usuarioConectado);
                    $location.path('/entrar');

                    $scope.usuario = {nombre:"", contrasenia:""};
                    $('#ventanaEntrar').modal('toggle');
                    $scope.opcionesUsuarioConectado();
                })
                .catch( function(err) {
                    if(err.status == 404){
                        $("#mensajeDatosIncorrectos").show();
                    }
                });
        };

        $scope.salir = function(){
            $scope.usuarioConectado = {estaConectado:false};
            $cookieStore.remove('estaConectado');
            $cookieStore.remove('usuario');
            $scope.opcionesUsuarioNoConectado();

            $location.path('/');

        };

        $scope.validarCampos = function(campo) {
            var regExpNoEspecial = /[^A-Za-z0-9_&"' ñÑáéíóúÁÉÍÓÚäüö.,-]/g;
            var valor = "", nuevoValor = [];
            if (campo == 'nombreUsuario') {
                if($scope.usuario.nombre != null) {
                    valor = $scope.usuario.nombre.split("");
                    nuevoValor = [];
                    for(var i = 0, len = valor.length; i<len; i++){
                        if (!valor[i].match(regExpNoEspecial)) {
                            nuevoValor[i] = valor[i];
                        }
                    }
                    $scope.usuario.nombre = nuevoValor.join("");
                }
            }
            else{
                if (campo == 'contrasenia') {
                    if($scope.usuario.contrasenia != null) {
                        valor = $scope.usuario.contrasenia.split("");
                        nuevoValor = [];
                        for(var i = 0, len = valor.length; i<len; i++){
                            if (!valor[i].match(regExpNoEspecial)) {
                                nuevoValor[i] = valor[i];
                            }
                        }
                        $scope.usuario.contrasenia = nuevoValor.join("");
                    }
                }
            }
        };

        $scope.opcionesUsuarioConectado = function(){
            $('#entrarBtn').hide();
            $("#nombreOpcionesBtn").show();

            $scope.menu = [
                {id:'1',opcion:"Funcionarios",enlace:"/funcionarios"},
                {id:'2',opcion:"Entradas",enlace:"/entradas"},
                {id:'3',opcion:"Salidas",enlace:"/salias"},
                {id:'4',opcion:"Kardex",enlace:"/kardex"}
            ];

            $scope.menu.forEach(function(opcion){
                $("#opcion_" + opcion.id).show();
            });
        };


        $scope.opcionesUsuarioNoConectado = function(){
            $('#entrarBtn').show();
            $("#nombreOpcionesBtn").hide();
            $scope.menu = [];
            $scope.menu.forEach(function(opcion){
                $("#opcion_" + opcion.id).hide();
            });
        };
    });
