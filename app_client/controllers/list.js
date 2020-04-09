function listCtrl($http, $location, $rootScope) {


    let vm = this;
    vm.title = "Рейтинг образовательных организаций";

    let p1 = $http.get('/api/ratings', {
        headers : {
            token: localStorage.getItem('token')
        }
    });



    p1.then(res=>{
        vm.list = res.data;
    }, err=>{
        $location.path('/login');

    });

    console.log('hello!');


    vm.test = localStorage.getItem('test');

}