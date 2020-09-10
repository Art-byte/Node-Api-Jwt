const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/simpleJwt', {
    useNewUrlParser: true,
    useUnifiedTopology: true

})

.then(db => console.log('database is connect'))