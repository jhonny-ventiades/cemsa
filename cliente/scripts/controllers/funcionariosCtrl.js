


'use strict';


angular.module('emsaApp')
    .controller('funcionariosCtrl', function ($scope,Funcionarios,FuncionariosEspecifico) {
        $scope.listaFuncionarios = [];
        $scope.funcionario = {
            ci:"",
            nombre:"",
            apellidoPaterno:"",
            apellidoMaterno:"",
            cargo:"",
            telefono:"",
            celular:"",
            fechaNacimiento:"",
            lugarNacimiento:"",
            Nacionalidad:"",
            fechaIngreso:"",
            correoElectronico:""
        };
        $scope.funcionarioAlmacenado = {};

        $scope.cargarListas = function(){
            Funcionarios.get()
                .$promise
                .then(function(data){
                    angular.copy(data,$scope.listaFuncionarios);
                });

            $("#insertarBtn").show();
            $("#editarBtn").hide();
        };

        $scope.limpiarCampos = function(){
            $scope.funcionario = {
                ci:"",
                nombre:"",
                apellidoPaterno:"",
                apellidoMaterno:"",
                cargo:"",
                telefono:"",
                celular:"",
                fechaNacimiento:"",
                lugarNacimiento:"",
                Nacionalidad:"",
                FechaIngreso:"",
                correoElectronico:""
            };
            $scope.funcionarioAlmacenado = {};

            $("#insertarBtn").show();
            $("#editarBtn").hide();
        };

        $scope.funcionarioSeleccionado = function(seleccionado){
            angular.copy(seleccionado,$scope.funcionario);

            var date = new Date($scope.funcionario.fechaIngreso);
            var mes = 0, day = 0;
            if((date.getMonth()+1) < 10) mes = '0' + (date.getMonth()+1); else  mes = (date.getMonth()+1);
            if(date.getDate() < 10) day = '0' + date.getDate(); else day = date.getDate();
            $scope.funcionario.fechaIngreso = date.getFullYear() + '-' + mes + '-' + day;


            date = new Date($scope.funcionario.fechaNacimiento);
            if((date.getMonth()+1) < 10) mes = '0' + (date.getMonth()+1); else  mes = (date.getMonth()+1);
            if(date.getDate() < 10) day = '0' + date.getDate(); else day = date.getDate();
            $scope.funcionario.fechaNacimiento = date.getFullYear() + '-' + mes + '-' + day;


            angular.copy($scope.funcionario,$scope.funcionarioAlmacenado);
            $("#insertarBtn").hide();
            $("#editarBtn").show();
        };

        $scope.validarCampos = function(tipo,valor) {
            if (tipo == "cadena")           var regExpNoEspecial = /[^A-Za-z0-9_&"'@ ñÑáéíóúÁÉÍÓÚäüö.,-]/g;
            else if (tipo == "numerico")    var regExpNoEspecial = /[^0-9.]/g;

            if(valor == null) return "";
            var nuevoValor = [];
            nuevoValor = [];
            for(var i = 0, len = valor.length; i<len; i++){
                if (!valor[i].match(regExpNoEspecial)) {
                    nuevoValor[i] = valor[i];
                }
            }
            return nuevoValor.join('');
        };

        $scope.cambios = function(){
            return angular.equals($scope.funcionario, $scope.funcionarioAlmacenado);
        };

        $scope.insertar = function(){
            Funcionarios.post($scope.funcionario)
                .$promise
                .then(function(data){
                    console.log(data);
                    $scope.cargarListas();
                    $scope.limpiarCampos();
              });
        };

        $scope.editar =function(){
            FuncionariosEspecifico.put({id:$scope.funcionario.idFuncionario},$scope.funcionario);
        }
    });
