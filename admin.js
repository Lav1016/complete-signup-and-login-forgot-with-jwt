const express = require('express')
const nodemailer = require('nodemailer');
const router = express.Router();
const mongoose = require('mongoose');
const admin = require('../../model/admin')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const middleware = require('../../middleware/check-auth');
const { response } = require('../../app');
const { db } = require('../../model/admin');
// signup user..................
router.post('/', (req, res) => {
    let vikash = req.body;
    console.log('password', req.body.password)
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            console.log('error00', err)
            return res.status(200).json({
                status: "data not found ",
                error: err
            })
        }
        else {
            console.log('error11', vikash)
            const user = new admin({
                username: req.body.username,
                password: hash,
                phone: req.body.phone,
                email: req.body.email,
                gender: req.body.gender,
                role: req.body.role,
                // token: req.body.token,
            })
            admin.findOne({ email: req.body.email }, (err, result) => {
                if (err) {
                    res.status(501).json({
                        msg: 'err'
                    })
                }
                if (Boolean(result)) {
                    res.status(201).json({
                        msg: 'email already exist'
                    })
                } else {
                    user.save()
                        .then(result => {
                            res.status(200).json({
                                new_user: result,
                                msg: "user successfully registered"
                            })
                        })
                        .catch(error => {
                            console.log('error', error)
                            res.status(501).json({
                                error: 'err '
                            })
                        })
                }
            })

        }
    })
});
//Set up forgot password
router.post('/forgot', (req, res) => {
    email = req.body.email;
    otp = req.body.otp;
    console.log(req.body)
    if (email.length ==0) {
        console.error("email-0", req.body.email)
        res.status(400).json({ message: 'Email is required' })
    }
    if (email.length) {
        console.error("email", req.body.email)
        admin.find({ email: email })
            .then(result => {
                console.log(result[0].email)
                let otp = Math.floor(1000 + Math.random() * 9000);
                console.log("otp", otp)
                //const user = new admin()
                admin.updateOne({email:req.body.email},
                    {$set: { otp:otp }},{upsert: true},function(err){
                    if(err){
                        console.log(err)
                    }else{
                        console.log("otp update")
                    }
                });
                res.status(200).json({
                    "msg": "otp will send"
                });
                ////mail start
                const transporter = nodemailer.createTransport({
                    host: "smtp.mailtrap.io",
                    // service: 'Gmail',
                    port: 2525,
                    auth: {
                        user: "3b7b3596899d82",
                        pass: "b8f03bee81e18f"
                    }
                });
                message = {
                    from: "lavec1016@gmail.com",
                    to: result[0].email,
                    subject: "first message using node.js",
                    text: "Hello! Your otp is " + otp
                };
                transporter.sendMail(message, function (err, info) {
                    if (err) {
                        console.log("smtp erorr", err)
                    } else {
                        console.log("smpt info", info);
                    };
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err

                })
            })
    }
    else {
        res.status(501).json({
            msg: 'Data not matched enter the correct details '
        })
    }
});
// //otp setup
// { $and: [{status:'false' },{ email: email} ]}
router.post('/verifyotp', (req, res) => {
    let email = req.body.email
    let userOtp = req.body.otp
    admin.find({ email: email})
        .then(result => {
              console.log('result',result)
            let dbOtp = result[0].otp
            console.log('result', dbOtp, userOtp)
            if (userOtp == dbOtp) {
                admin.findOneAndUpdate({ otp:userOtp  }, {
                    $set: {
                        status:true
                    }
                })
                    .then(result => {
                        res.status(200).json({
                            "msg":"you has been successfully registered"
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
            }
            else {
                res.status(400).json({
                    msg: 'otp is incorrect enter the correct credential '
                })
            }
        })
})
// put update password
router.put('/updatePassword', (req, res) => {
    console.log(req.body.email)
    let newPassword = req.body.newPassword
    console.log('h1',newPassword)
    bcrypt.hash(newPassword, 10, (err, result) => {
        if (err) {
            res.send('err',err)
        }
        else {
            console.log('hello')
            admin.findOneAndUpdate({ email: req.body.email, }, {
                $set: {
                    password: result
                }
            })
                .then(result => {
                    res.status(200).json({
                        "msg": "your password is successfully update"
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        }
    })
});
// PARTICULAR GET ONE DATA FROM DB 
router.get('/:id', middleware, (req, res, next) => {
    console.log('h1-', req.params.id);
    admin.findById(req.params.id)
        .then(result => {
            res.status(200).json({
                admin: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});
// GET ALL DATA FROM DB 
router.get('/', (req, res, next) => {
    admin.find()
        .then(result => {
            res.status(200).json({
                adminData: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});
// // delete data;
router.delete('/:id', (req, res) => {
    console.log(req.params.id);

    admin.findByIdAndDelete({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: 'admin data deleted',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})
router.post("/login", async (req, res) => {
    try {
     const {email, password } = req.body;     
    const user = await admin.findOne({email});
    if(user){
        const getUser = await bcrypt.compare(password, user.password);
        console.log(getUser)
        if(getUser){
            const token = jwt.sign({
                username: admin.username,
                role: admin.role,
                email: admin.email,
                phone: admin.phone
            }, "this .dummy text", { expiresIn: "4h" })
            user.token = token;
            res.status(200).json({
                status: 'OK',
                msg: 'login successfully',
                token: token
            });
        }
        else{
            res.status(401).send("pasword not matched");
        }
       
    }else{
        res.status(401).send("Invalid Credentials");
    }
        // Validate if user exist in our database
       
        
        // if (user && getUser) {
        //     
        // }
      
    } catch (err) {
        res.status(401).send(err);
    }
});
module.exports = router