angular.module('mainController', ['authServices'])
.controller('mainCtrl', function(Auth, $timeout, $location, $rootScope){
    var app = this;
    app.loadme = false;

    $rootScope.$on('$routeChangeStart', function(){
        if(Auth.isLoggedIn()){
            app.isLoggedIn = true;
            Auth.getUser().then(function(data){
                app.username = data.data.username;
                app.email = data.data.email;
                app.loadme = true;
            });
        }else{
            app.isLoggedIn = false;
            app.username = '';
            app.loadme = true;
        }
    });

    this.doLogin = function(loginData){

        Auth.login(app.loginData).then(function(data){
            app.errorMsg = false;

            if(data.data.success){
                app.successMsg = data.data.message;
                //redirect to home page
                $timeout(function(){
                    $location.path('/profile');
                    app.loginData = '';
                    app.successMsg = false;
                }, 2000);
            }else{
                app.errorMsg = data.data.message;
            }
        });
    };

    this.logout = function(){
        Auth.logout();
        $location.path('/logout');
        $timeout(function(){
            $location.path('/');
        }, 2000);
    };
});


