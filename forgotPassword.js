// const expires = require('express');
// // const app = express();
// const router = express.Router();
// const mongoose = require('mongoose');
// const forgot = require('../../model/forgot')


// // const Adminotp = require('../../model/Adminotp');
// router.post('/',(req,res)=>{
//     let Otp = req.body.Otp
//     bcrypt.hash(req.body.password, 10, (err, hash) => {
//         if (err) {
//             console.log('error00', err)
//             return res.status(200).json({
//                 status: "data not found ",
//                 error: err
//             })
//         }
//         else {
//             const user = new forgotOtp({
//                 email: req.body.email,
//                 password: hash,
//                 Otp:req.body.Otp,
//                 status: req.body.status,
//                 // token: req.body.token,
//             })
//             forgotOtp.findOne({ email: req.body.email }, (err, result) => {
//                 if (err) {
//                     res.status(501).json({
//                         msg: 'err'
//                     })
//                 }
//                 if (Boolean(result)) {
//                     res.status(201).json({
//                         msg: 'email already exist'
//                     })
//                 } else {
//                     user.save()
//                         .then(result => {
//                             res.status(200).json({
//                                 new_user: result,
//                                 msg: "user successfully registered"
//                             })
//                         })
//                         .catch(error => {
//                             console.log('error', error)
//                             res.status(501).json({
//                                 error: 'err '
//                             })
//                         })
//                 }
//             })

//         }
//     })
// });

// module.exports= router

