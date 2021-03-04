const path = require('path');
const layout = path.join('layout');
const UserSchema = require('../../../models/userSchema');

const HomeControler = {
    async getHome(req,res){
        const data = await UserSchema.find({profile:{$ne:null}});
        res.render('home',{
            layout,
            data
        })
    }
}

module.exports = HomeControler;