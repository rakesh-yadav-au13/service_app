const OfferSchema = require('../../../models/offerSchema');
const UserSchema = require('../../../models/userSchema');

const StatusControler = {
    async postStatus(req,res){
        try {
            await OfferSchema.updateOne({_id:req.body.orderId},{status:req.body.status})
            if(req.body.status == "accept"){
                await UserSchema.findOneAndUpdate({_id:req.session.token.id},
                    {
                        $set:{'profile.status':'Not available'}
                    })
            }else if(req.body.status == "completed"){

                await UserSchema.findOneAndUpdate({_id:req.session.token.id},
                    {
                        $set:{'profile.status':'available'},
                        $inc:{'profile.jobsDone':1}
                    })
            }

            res.redirect('/admin/offers')

        } catch (err) {
            console.log(err.message)
        }
    }
}

module.exports = StatusControler