const UserSchema = require('../../models/userSchema');

async function admin(req, res, next){
    let id = req.session.token.id
    if(id){
        try {
            const user = await UserSchema.findById(id);
            if (user.profile){
                return next()
            }
        } catch (err) {
            console.log(err.message)
        }
    };
    res.redirect('/')
}

module.exports = admin;