const mongoose = require('mongoose')

module.exports = {
    mongoose,
     async connect() {
        mongoose.Promise = global.Promise;
        await mongoose.connect( process.env.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    },
    async disconnect(done){
        await mongoose.disconnect(done);
    }
};