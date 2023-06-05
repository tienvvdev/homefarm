const mongoose = require('mongoose');

async function connect() {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/shop', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
        });
        console.log('Connect ok');

    } catch (error) {
        console.log('False!')

    }

}


module.exports = { connect };