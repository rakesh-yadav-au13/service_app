const path = require('path');
const layout = path.join('layout');
const UserSchema = require('../../../models/userSchema');

const ProfileControler = {
    async getProfile(req, res) {
        try {
            const data = await UserSchema.findById(req.params.id)
            return res.render('customer/profile', {
                layout,
                data
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

module.exports = ProfileControler;