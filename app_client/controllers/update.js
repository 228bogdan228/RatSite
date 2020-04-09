function updateCtrl($http, $location, $routeParams) {
    let vm = this;
    vm.error = '';
    vm.title = "Изменение";
    const id = $routeParams.id;


    vm.formWasValidated = false;

    vm.formModel = {
        name: {
            valid: true,
            infoText: '',
            value: ''
        },
        city: {
            valid: true,
            infoText: '',
            value: ''
        },
        student: {
            valid: true,
            infoText: '',
            value: ''
        },
        ballrate: {
            valid: true,
            infoText: '',
            value: ''
        },
        formobuch: {
            valid: true,
            infoText: '',
            value: ''
        },
        dateStart: {
            valid: true,
            infoText: '',
            value: new Date()
        },
        dateFinish: {
            valid: true,
            infoText: '',
            value: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
        }
    };

    vm.validate = function () {
        const onlyDigits = /\d{1,5}/;
        const onlyLetters = /^([-\.aA-zZаА-яЯёЁ ]+)$/;

        console.log("validatin");

        //Название
        vm.formModel.name.valid = onlyLetters.test(vm.formModel.name.value);
        vm.formModel.name.infoText = (vm.formModel.name.valid) ? 'Введено верно' :
            (vm.formModel.name.value === '') ? 'Название не может быть пустым' : 'Допускаются только буквы';

        //Город
        vm.formModel.city.valid = onlyLetters.test(vm.formModel.city.value);
        vm.formModel.city.infoText = (vm.formModel.city.valid) ? 'Введено верно' :
            (vm.formModel.city.value === '') ? 'Заполните город учебного заведения' : 'Допускаются только буквы';

        //Студентов
        vm.formModel.student.valid = onlyDigits.test(vm.formModel.student.value);
        vm.formModel.student.infoText = (vm.formModel.student.valid) ? 'Введено верно' :
            (vm.formModel.student.value === '') ? 'Введите количество студентов' : 'Допускаются только цифры';

        //Рейтинг
        vm.formModel.ballrate.valid = onlyDigits.test(vm.formModel.ballrate.value);
        vm.formModel.ballrate.infoText = (vm.formModel.ballrate.valid) ? 'Введено верно' :
            (vm.formModel.ballrate.value === '') ? 'Введите Рейтинг' : 'Допускаются только цифры';

        //Форма обучения
        vm.formModel.formobuch.valid = (vm.formModel.formobuch.value !== undefined) && (vm.formModel.formobuch.value !== '');
        vm.formModel.formobuch.infoText = (vm.formModel.formobuch.valid) ? 'Введено верно' : 'Выберите форму обучения';

        //Дата завершения аккредитации
        vm.formModel.dateFinish.valid = new Date(vm.formModel.dateStart.value)  < new Date(vm.formModel.dateFinish.value);
        vm.formModel.dateFinish.infoText = (vm.formModel.dateFinish.valid) ? '' : 'Дата завершения не может быть раньше даты начала';

        //Валидация формы
        vm.formWasValidated = true;
        for (let field in vm.formModel)
            vm.formWasValidated = vm.formWasValidated && vm.formModel[field].valid;
    };

    vm.sendForm = function () {

        vm.error = '';
        console.log('waiting...');
        let p1 = $http.put('/api/ratings/' + id, {
            name: vm.formModel.name.value,
            city: vm.formModel.city.value,
            student: vm.formModel.student.value,
            ballrate: vm.formModel.ballrate.value,
            formobuch: vm.formModel.formobuch.value,
            dateStart: vm.formModel.dateStart.value,
            dateFinish: vm.formModel.dateFinish.value,
        }, {
            headers : {
                token: localStorage.getItem('token')
            }
        });

        p1.then(res=>{
            console.log('success!');
            $location.path('/');
        }, err=>{
            vm.error = 'Ошибка: ' + JSON.stringify(err);
            //console.log('error add rating: ', err);
        });


    };

    function init() {

        vm.error = '';
        console.log('waiting...');


        let p1 = $http.get('/api/ratings/' + id, {
            headers : {
                token: localStorage.getItem('token')
            }
        });

        p1.then(res=>{
            //console.log('success!');
            const oneRow = res.data;
            vm.formModel.name.value = oneRow.name;
            vm.formModel.city.value = oneRow.city;
            vm.formModel.student.value = oneRow.student;
            vm.formModel.ballrate.value = oneRow.ballrate;
            vm.formModel.formobuch.value = oneRow.formobuch;
            vm.formModel.dateStart.value = new Date(oneRow.dateStart);
            vm.formModel.dateFinish.value = new Date(oneRow.dateFinish);
            vm.validate();
        }, err=>{
            vm.error = 'Ошибка: ' + JSON.stringify(err);
            //console.log('error add rating: ', err);
        });
    }

    init();


}