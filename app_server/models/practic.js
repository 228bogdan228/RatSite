let mongoose = require( 'mongoose' );

let ratingSchema = new mongoose.Schema({
    name: {type: String, required: true},
    city: {type: String, required: true, default: "Неизвестный руководитель"},
    student: {type: String, required: true},
    ballrate: {type: String, required: true},
    formobuch: {type: String, required: true},
    dateStart: {type: Date, required: true, default: Date.now},
    dateFinish: {type: Date, required: true},
});

// компиляция модели
mongoose.model('rating', ratingSchema );

// наименование: "по ПМ.02 Осуществление интеграции программных модулей"
// обучающийся: "Фамилия Имя Отчество"
// группа: "3ИСиП-17-1"
// специальность: "09.02.07 Информационные системы и программирование"
// дата начала: "«23» сентября 2019 г."
// дата окончания: "«12»  октября 2019 г."
// общая оценка: "4"
// руководитель: "ФИО"