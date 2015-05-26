angular.module('hinario', []);

angular.module('hinario').controller('Home', function ($scope, $sce, $http) {
    $scope.hino_selecionado = '';
    $scope.pesquisando = true;
    $scope.exibindo = false;
    $scope.carregando = false;
    $scope.hinos = [];
    $scope.hinos_origem = [];
    $scope.pesquisa = '';

    loadData();

    $scope.ButtonClick = function (valor) {

        if ($scope.hino_selecionado.length == 0) {
            $scope.hino_selecionado = valor.toString();
            $scope.$digest();
            return;
        }

        var prim_letra = $scope.hino_selecionado.substring(0, 1);
        var tamanho_maximo = 3;
        if (prim_letra == 'S' || prim_letra == 'C') {
            tamanho_maximo = 4;
        }
        if ($scope.hino_selecionado.length < tamanho_maximo) {
            $scope.hino_selecionado = $scope.hino_selecionado + '' + valor;
        }
        $scope.$digest();
    };

    $scope.SelecionaHino = function (tipoHino) {
        if ($scope.hino_selecionado.length == 0) {
            $scope.hino_selecionado = tipoHino;
            return;
        }

        var hino_temp = $scope.hino_selecionado;
        if ($scope.hino_selecionado.substring(0, 1) == 'S' ||
            $scope.hino_selecionado.substring(0, 1) == 'C') {
            hino_temp = $scope.hino_selecionado.substr(1);
        }

        $scope.hino_selecionado = tipoHino + hino_temp;
    };

    $scope.Limpar = function () {
        $scope.hino_selecionado = '';
    };

    $scope.Pesquisar = function () {
        $scope.carregando = true;
        setTimeout(function () {
            $scope.hinos = SearchJson($scope.hinos_origem, 'number', $scope.hino_selecionado);
            if ($scope.hinos.length == 0) {
                $scope.carregando = false;
                $scope.$digest();
                Materialize.toast('Nenhum hino encontrado', 3000);
            }
            else {
                $scope.pesquisando = false;
                $scope.exibindo = true;
                $scope.carregando = false;
                $scope.$digest();
            }
        }, 2000);
    };

    $scope.HabilitaPesquisa = function () {
        $scope.pesquisando = true;
        $scope.hino_selecionado = '';
    };

    $scope.FormatHtml = function (hinoTemp) {
        return $sce.trustAsHtml(hinoTemp);
    };

    function loadData() {
        $http.get('data/hymns.json')
            .success(function (data) {
                $scope.carregando = true;
                // Mockando
                setTimeout(function () {
                    $scope.hinos_origem = angular.fromJson(data);
                    $scope.carregando = false;
                    $scope.$digest();
                }, 1500);
            }).catch(function () {
                $scope.carregando = false;
                Materialize.toast('Falha ao recuperar os dados', 3000);
            });
    }

    function SearchJson(obj, key, val) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(SearchJson(obj[i], key, val));
            } else
            //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
            if (i == key && obj[i] == val || i == key && val == '') { //
                objects.push(obj);
            } else if (obj[i] == val && key == '') {
                //only add if the object is not already in the array
                if (objects.lastIndexOf(obj) == -1) {
                    objects.push(obj);
                }
            }
        }
        return objects;
    }
});