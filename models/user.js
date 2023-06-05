var mongoose = require('mongoose')


//User Schema
var UserSchema = mongoose.Schema({
    name:
    {
        type: String
    },
    email:
    {
        type: String,
        required: true

    },
    username:
    {
        type: String,
        require: true

    },
    password:
    {
        type: String,
        required: true
    },
    admin:
    {
        type: Number
    }
});

const User = module.exports = mongoose.model('User', UserSchema);
