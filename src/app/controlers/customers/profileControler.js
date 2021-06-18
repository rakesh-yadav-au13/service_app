const path = require('path');
const layout = path.join('layout');
const UserSchema = require('../../../models/userSchema');

const ProfileControler = {
    async getProfile(req, res) {
        try {
            if (!req.session.token) {
                req.flash('error','Loging first')
                return res.redirect('/')
                
            };
            const data = await UserSchema.findById(req.params.id)
            if (data.profile.status != 'available'){
                req.flash('error','Not available')
                return res.redirect('/')
            }
            return res.render('customer/profile',{
                layout,
                data
            })
        } catch (error) {
            console.log(error.message)
        }
    },

}

module.exports = ProfileControler;