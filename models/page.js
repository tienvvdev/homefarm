var mongoose = require('mongoose')


//Page Schema
var PageSchema = mongoose.Schema({
    title:
    {
        type: String
    },
    slug:
    {
        type: String

    },
    content:
    {
        type: String

    },
    sorting:
    {
        type: Number,
        required: true
    }
});

const page = module.exports = mongoose.model('Page', PageSchema);
