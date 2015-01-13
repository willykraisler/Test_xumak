
angular.module('ngCartDemo', ['ngResource', 'ui.router', 'ngCart', 'ui.bootstrap'])

.run (['$rootScope', '$state', function($rootScope, $state){
    $rootScope.$state = $state;
}])

.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', 
    function($locationProvider, $stateProvider, $urlRouterProvider) {
    
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/home');
    $stateProvider

        .state('site', {
            abstract:true,
            url: "/",
            controller:"main",
            template: "<div ui-view></div>"
        })

        .state('site.home', {
            url: "home",
            templateUrl: 'partials/home.html'
        })

        .state('site.products', {
            url: "products",
            templateUrl: 'partials/products.html'
        })       

        .state('site.cart', {
            url: "cart",
            controller:"cart",
            templateUrl: 'partials/cart.html'
        })

}])

.controller('main',[ '$http','ngCart', '$scope', function ($http, ngCart, $scope) {

        ngCart.setShipping(10.99);
        ngCart.setTax(7.5);

        $http({method: 'GET', url: 'data/phones.json'})
            .success(function(data, status, headers, config) {
                $scope.products = data;
            })
            .error(function(data, status, headers, config) {
        });
}])

.controller('cart',['ngCart', '$log', '$modal', '$scope', function (ngCart,$log, $modal, $scope) {
    
    $scope.items = ['Visa', 'Master Card', 'American Express'];

    $scope.showCart = function(){
        
        $log.info ('---Items in Cart:---');
        var cart = ngCart.getCart();
        $log.info (cart);
        $scope.checkout = cart;
        $scope.total  = ngCart.totalCost();
        
        /*var modalInstance = $modal.open({
            templateUrl: 'partials/modal.html',
            controller: 'cart',
            resolve: {
                items: function () {
                return $scope.checkout;
                }
            }
        });  

        /*var modalInstance = $modal.open({
            templateUrl: 'partials/modal.html',
            controller: 'cart',
            resolve: {
                items: function () {
                return $scope.checkout;
                }
            }
        });  */  
    };  

}]);


