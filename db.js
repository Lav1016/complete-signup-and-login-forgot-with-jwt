const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://lav:lav@cluster0.tlisc.mongodb.net/studentData', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('Connected with database.') }
    else { console.log('Error in DB connection : ' + err) }
});
