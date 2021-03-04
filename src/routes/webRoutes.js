const express = require('express');
const router = express.Router();
const path = require('path');
const layout = path.join('layout')


// controlers 
const LoginControler = require('../app/controlers/auth/loginControler');
const RegisterControler = require('../app/controlers/auth/registerControler');
const homeControler = require('../app/controlers/customers/homeControler');
const CartControler = require('../app/controlers/customers/cartControler');
const ProfileControler = require('../app/controlers/customers/profileControler');

router.get('/',homeControler.getHome);

router.get('/login',LoginControler.getLogin);

router.post('/logout',LoginControler.postLogout);

router.post('/login',LoginControler.postLogin);

router.post('/register',RegisterControler.getRegister);

router.post('/register/user',RegisterControler.postUserRegister);

router.post('/register/admin',RegisterControler.postAdminRegister);

router.get('/profile/:id',ProfileControler.getProfile)

// router.get('/cart',CartControler.get);

// router.post('/cart',CartControler.update)

module.exports = router;