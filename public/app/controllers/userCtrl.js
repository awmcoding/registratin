angular.module('userControllers', ['userServices'])
.controller('regCtrl', function($http, $location, $timeout, User){
    this.regUser = function(regData){

        var app = this;

        User.create(app.regData).then(function(data){
            app.errorMsg = false;

            if(data.data.success){
                app.successMsg = data.data.message;
                //redirect to home page
                $timeout(function(){
                    $location.path('/');
                }, 2000);
            }else{
                app.errorMsg = data.data.message;
            }
        });
    };
});


