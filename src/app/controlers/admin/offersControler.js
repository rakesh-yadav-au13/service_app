const OfferSchema = require('../../../models/offerSchema');
const path = require('path');
const layout = path.join('layout');

const OfferControler = {
    async getOfferPage(req, res) {
        try {
            const offers = await OfferSchema.find({ status: { $ne: 'completed' },spId:{_id:req.session.token.id}}, null, { sort: { 'createdAt': -1 } }).populate('userId')
            // res.json({
            //     data: offers
            // })
            res.render('admin/offer', {
                layout,
                data: offers
            })
        } catch (err) {
            console.log(err.message)
        }
    }
}


module.exports = OfferControler;