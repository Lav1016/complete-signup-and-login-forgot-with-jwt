const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
// const studentRoute = require('./api/routes/student')
// const facultyRoute = require('./api/routes/student-registration.js')
const adminRoute = require('./api/routes/admin')
// const forgototp = require('./api/routes/forgotPassword')
const middleware = require('./middleware/check-auth')
const Db = require('./db')

//body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(
    cors({
        origin:"*",
        credentials:"true"

    })
)
// app.use('/student',studentRoute)


app.use('/admin',adminRoute)
// app.use('/forgototp',forgototp)


app.use((req,res,next)=>{
    res.status(404).json({
        error:'bad error'
    })
})

app.listen(3000,()=> {
    console.log('server is running');
})
module.exports = app