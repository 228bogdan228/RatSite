function createCtrl($http, $location) {
    let vm = this;
    let now = new Date();
    vm.error = '';
    vm.title = "";

    vm.formWasValidated = false;

    vm.formModel = {
        name: {
            valid: false,
            infoText: 'Название не может быть пустым',
            value: ''
        },
        city: {
            valid: false,
            infoText: 'Заполните город учебного заведения',
            value: ''
        },
        student: {
            valid: false,
            infoText: 'Введите количество студентов',
            value: ''
        },
        ballrate: {
            valid: false,
            infoText: 'Введите Рейтинг',
            value: ''
        },
        formobuch: {
            valid: false,
            infoText: 'Выберите форму обучения',
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
            value: new Date(now.getFullYear() + 1, now.getMonth(), now.getDay())
        },
    };

    vm.validate = function () {
        const onlyDigits = /\d{1,5}/;
        const onlyLetters = /^([-\.aA-zZаА-яЯёЁ ]+)$/;

        console.log("validatin");

        vm.formModel.name.valid = onlyLetters.test(vm.formModel.name.value);
        vm.formModel.name.infoText = (vm.formModel.name.valid) ? 'Введено верно' :
            (vm.formModel.name.value === '') ? 'Название не может быть пустым' : 'Допускаются только буквы';


        vm.formModel.city.valid = onlyLetters.test(vm.formModel.city.value);
        vm.formModel.city.infoText = (vm.formModel.city.valid) ? 'Введено верно' :
            (vm.formModel.city.value === '') ? 'Заполните город учебного заведения' : 'Допускаются только буквы';

        vm.formModel.student.valid = onlyDigits.test(vm.formModel.student.value);
        vm.formModel.student.infoText = (vm.formModel.student.valid) ? 'Введено верно' :
        (vm.formModel.student.value === '') ? 'Введите количество студентов' : 'Допускаются только цифры';

        vm.formModel.ballrate.valid = onlyDigits.test(vm.formModel.ballrate.value);
        vm.formModel.ballrate.infoText = (vm.formModel.ballrate.valid) ? 'Введено верно' :
            (vm.formModel.ballrate.value === '') ? 'Введите Рейтинг' : 'Допускаются только цифры';

        vm.formModel.formobuch.valid = (vm.formModel.formobuch.value !== undefined) && (vm.formModel.formobuch.value !== '');
        vm.formModel.formobuch.infoText = (vm.formModel.formobuch.valid) ? 'Введено верно' : 'Выберите форму обучения';

        vm.formModel.dateFinish.valid = new Date(vm.formModel.dateStart.value)  < new Date(vm.formModel.dateFinish.value);
        vm.formModel.dateFinish.infoText = (vm.formModel.dateFinish.valid) ? '' : 'Дата завершения не может быть раньше даты начала';

        vm.formWasValidated = true;
        for (let field in vm.formModel)
            vm.formWasValidated = vm.formWasValidated && vm.formModel[field].valid;
    };


    vm.sendForm = function () {

        vm.error = '';

        console.log('waiting...');
        let p1 = $http.post('/api/ratings', {
            name: vm.formModel.name.value,
            city: vm.formModel.city.value,
            student: vm.formModel.student.value,
            ballrate: vm.formModel.ballrate.value,
            formobuch: vm.formModel.formobuch.value,
            dateStart: vm.formModel.dateStart.value,
            dateFinish : vm.formModel.dateFinish.value,
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        });

        p1.then(res => {
            console.log('success!');
            $location.path('/');
        }, err => {
            vm.error = 'Ошибка: ' + JSON.stringify(err);

        });
    }


}