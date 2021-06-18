const path = require('path');
const bcrypt = require('bcrypt');
const layout = path.join('layout');
const UserSchema = require('../../../models/userSchema');

const RegisterControler = {
    getRegister(req, res) {
        try {
            if (req.body.register == 'user') {
                return res.render('auth/registerUser', {
                    layout
                })
            }
            else if (req.body.register == 'admin') {
                return res.render('auth/registerAdmin', {
                    layout
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    },

    async postUserRegister(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                req.flash('error', 'All fields required');
                return res.render('auth/registerUser', {
                    layout
                })
            }

            let user = await UserSchema.find({ email: email });
            if (user.length) {
                req.flash('error', 'User already exist');
                return res.render('auth/registerUser', {
                    layout
                })
            }
            const hashPassword = await bcrypt.hash(password, 8);
            user = new UserSchema({
                name: name,
                email: email,
                password: hashPassword
            })
            await user.save();
            res.redirect('/login')
        } catch (error) {
            console.log(error.message)
        }
    },

    async postAdminRegister(req, res) {
        try {
            const { name, email, password, phone, role, city, status, price } = req.body;
            if (!name || !email || !password || !phone || !role || !city || !status || !price){
                req.flash('error', 'All fields requiered')
                return res.render('auth/registerAdmin', {
                    layout
                })
            }
            let user = await UserSchema.find({ email: email });
            if (user.length) {
                req.flash('error', 'User already exist');
                return res.render('auth/registerAdmin', {
                    layout
                })
            }
            const hashPassword = await bcrypt.hash(password, 8);
            user = new UserSchema({
                name: name,
                email: email,
                password: hashPassword,
                profile:{
                    image:req.file.filename || 'avatar.jpg',
                    phone,
                    role,
                    city,
                    status,
                    price
                }
            })

            await user.save();
            res.redirect('/login')

        } catch (error) {
            console.log(error.message)
        }
    }

}

module.exports = RegisterControler;