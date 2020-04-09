let mongoose = require( 'mongoose' );

let ratingSchema = new mongoose.Schema({
    name: {type: String, required: true},
    city: {type: String, required: true, default: "Неизвестный город"},
    student: {type: String, required: true},
    ballrate: {type: String, required: true},
    formobuch: {type: String, required: true},
    dateStart: {type: Date, required: true, default: Date.now},
    dateFinish: {type: Date, required: true},
    userId: {type: Number, required: false}
});


mongoose.model('rating', ratingSchema );

