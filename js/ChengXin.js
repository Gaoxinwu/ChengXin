var app=angular.module('chengxin',['ng','ngRoute','ngAnimate']);
//定义一个输入防抖动的服务$bebounce
app.factory('$debounce',
    ['$rootScope', '$browser', '$q', '$exceptionHandler',
        function($rootScope, $browser, $q, $exceptionHandler) {
            var deferreds = {},
                methods = {},
                uuid = 0;
            function debounce(fn, delay, invokeApply) {
                var deferred = $q.defer(),
                    promise = deferred.promise,
                    skipApply = (angular.isDefined(invokeApply) && !invokeApply),
                    timeoutId, cleanup,
                    methodId, bouncing = false;

                // check we dont have this method already registered
                angular.forEach(methods, function(value, key) {
                    if (angular.equals(methods[key].fn, fn)) {
                        bouncing = true;
                        methodId = key;
                    }
                });
                // not bouncing, then register new instance
                if (!bouncing) {
                    methodId = uuid++;
                    methods[methodId] = { fn: fn };
                } else {
                    // clear the old timeout
                    deferreds[methods[methodId].timeoutId].reject('bounced');
                    $browser.defer.cancel(methods[methodId].timeoutId);
                }
                var debounced = function() {
                    // actually executing? clean method bank
                    delete methods[methodId];
                    try {
                        deferred.resolve(fn());
                    } catch (e) {
                        deferred.reject(e);
                        $exceptionHandler(e);
                    }
                    if (!skipApply) $rootScope.$apply();
                };
                timeoutId = $browser.defer(debounced, delay);

                // track id with method
                methods[methodId].timeoutId = timeoutId;
                cleanup = function(reason) {
                    delete deferreds[promise.$$timeoutId];
                };
                promise.$$timeoutId = timeoutId;
                deferreds[timeoutId] = deferred;
                promise.then(cleanup, cleanup);
                return promise;
            }
            // similar to angular's $timeout cancel
            debounce.cancel = function(promise) {
                if (promise && promise.$$timeoutId in deferreds) {
                    deferreds[promise.$$timeoutId].reject('canceled');
                    return $browser.defer.cancel(promise.$$timeoutId);
                }
                return false;
            };
            return debounce;
        }
    ]);
app.config(function($routeProvider){
    $routeProvider
        .when('/cStart',{
            templateUrl:'tpl/start.html'
        })
        .when('/cMain',{
            templateUrl:'tpl/main.html',
            controller:'mainCtrl'
        })
        .when('/cDetail/:did',{
            templateUrl:'tpl/detail.html',
            controller:'detailCtrl'
        })
        .when('/cOrder/:did',{
            templateUrl:'tpl/order.html',
            controller:'orderCtrl'
        })
        .when('/cMyOrder',{
            templateUrl:'tpl/myOrder.html',
            controller:'myOrderCtrl'
        })
        .otherwise({redirectTo:'/cStart'});
});
//创建一个控制器 给body
// 里边封装一个跳转的方法
app.controller('bodyCtrl',['$scope','$location',function($scope,$location){
    $scope.jump=function(desPath){
        $location.path(desPath);
    }
}]);
//进入main加载列表
app.controller('mainCtrl',['$scope','$http','$debounce',function($scope,$http,$debounce){
    $scope.hasMore=true;
    $scope.myKw="";
    //初始化车辆列表
    //发起网络请求，拿到数据，绑定到视图
    $http({
        method:'get',
        url:'data/dish_getbypage.php?start=0'
    }).success(function(data){
        console.log(data);
        $scope.dList=data;
    }).error(function(data){console.log(data.msg);});
    //定义一个加载更多的方法
    $scope.loadMore=function(){
        $http.get('data/dish_getbypage.php?start='+$scope.dList.length)
        .success(function(data){
                //当返回的数据不到5条时候，
                // 认为按钮可以隐藏，显示提示信息
                if(data.length<5){
                    $scope.hasMore=false;
                }
                //将返回的新的数据和之前的列表拼在一起
                $scope.dList=$scope.dList.concat(data);
            })
        .error(function(){});
    };
    //监听用户输入，发起网路请求，搜索的数据显示在列表
    watchHandler=function(newValue,oldValue){
        //console.log($scope.myKw);
        //发起网络请求，dish_getbykw.php?kw=?
        if($scope.myKw.length>0){
            $http.get('data/dish_getbykw.php?kw='+$scope.myKw)
                .success(function(data){
                    //console.log(data);
                    if(data.length>0){
                        $scope.dList=data;
                    }//需增加，清空搜索，恢复列表
                })
        }
    }
    $scope.$watch('myKw',function(){
        $debounce(watchHandler,300);
    });
}]);
//跳转到详情页面,给detail创建控制器 接收参数 发起网络请求
app.controller('detailCtrl',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
        //console.log($routeParams);
    $scope.did=$routeParams.did;
        $http.get('data/dish_getbyid.php?did='+$routeParams.did)
            .success(function(data){
                //console.log(data[0]);
                $scope.dish=data;
            })
}]);
//订单页面
app.controller('orderCtrl',['$scope','$http','$routeParams','$httpParamSerializerJQLike',function($scope,$http,$routeParams,$httpParamSerializerJQLike){
   // console.log($routeParams);
    $scope.showForm=true;
    $scope.submitResult="";
    $scope.order={userDid:$routeParams.did};
    $scope.submitOrder=function(){
        //将用户所输入的数据打印
        console.log($scope.order);
        var params=
            $httpParamSerializerJQLike($scope.order);
        //console.log(params);
        $http.get('data/order_add.php?'+params)
        .success(function(data){
                $scope.showForm=false;
                //console.log(data);
                //result=data;
                if(data.msg=='success'){
                    $scope.submitResult="√预订成功！您的订单编号为："+data.oid+"。您可以在用户中心查看订单状态。";
                    //存储手机号 sessionStorage
                    //console.log($scope.order.userPhone);
                    sessionStorage.setItem("userPhone",$scope.order.userPhone);
                }
                else{
            $scope.submitResult="很抱歉，提交过程中出了点小问题，请再试一下^_^";
                }
            });
       /*此方法麻烦，使用$httpParamSerializerJQLike更好
       $un=$scope.userName;
        $us=$scope.userSex;
        $ua=$scope.useraddr;
        $up=$scope.userPhone;
        $http.get('data/order_add.php?userName='+$un+'&userSex='+$us+'&userAddr='+$ua+'&userPhone='+$up+'&userDid='+$routeParams.did)
        .success(function(data){
                console.log(data);
            })  */
    }
}]);
//我的订单页面
app.controller('myOrderCtrl',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
    var phone=sessionStorage.getItem('userPhone');
    $http.get('data/order_getbyphone.php?phone='+phone)
         .success(function(data){
            //console.log(data);
            $scope.order=data;
        })
}]);