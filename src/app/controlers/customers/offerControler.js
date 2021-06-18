const OfferSchema = require("../../../models/offerSchema");
const path = require("path");
const layout = path.join("layout");

const OfferControler = {
  async postOffer(req, res) {
    try {
      const { id, phone, address, offerRate } = req.body;
      if (!id || !phone || !address || !offerRate) {
        req.flash("error", "All fields required");
        return res.redirect(`/profile/${id}`);
      }
      const offer = new OfferSchema({
        userId: req.session.token.id,
        spId: id,
        phone,
        address,
        offerRate,
      });
      await offer.save();
      res.redirect("/customer/offers");
    } catch (error) {
      console.log(error.message);
    }
  },

  async getOfferPage(req, res) {
    try {
      const order = await OfferSchema.find(
        { userId: req.session.token.id },
        null,
        { sort: { createdAt: -1 } }
      ).populate("userId");
      //   res.render("customer/offer", {
      //     layout,
      //     order,
      //   });
    } catch (error) {
      console.log(error.message);
    }
  },
};

module.exports = OfferControler;
