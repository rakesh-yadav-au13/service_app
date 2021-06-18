const express = require("express");
const router = express.Router();
const multer = require("multer");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/img");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + file.originalname);
  },
});

const uplode = multer({ storage: diskStorage });

// controlers
const LoginControler = require("../app/controlers/auth/loginControler");
const RegisterControler = require("../app/controlers/auth/registerControler");
const homeControler = require("../app/controlers/customers/homeControler");
const ProfileControler = require("../app/controlers/customers/profileControler");
const OfferControler = require("../app/controlers/customers/offerControler");

// Middlewares
const guest = require("../app/middlewares/guest");
const auth = require("../app/middlewares/auth");

router.get("/", homeControler.getHome);

router.get("/login", guest, LoginControler.getLogin);

router.post("/logout", LoginControler.postLogout);

router.post("/login", LoginControler.postLogin);

router.post("/register", guest, RegisterControler.getRegister);

router.post("/register/user", RegisterControler.postUserRegister);

router.post(
  "/register/admin",
  uplode.single("image"),
  RegisterControler.postAdminRegister
);

router.get("/profile/:id", auth, ProfileControler.getProfile);

router.post("/offers", auth, OfferControler.postOffer);

router.get("/customer/offers", auth, OfferControler.getOfferPage);

// router.get('/cart',CartControler.get);

// router.post('/cart',CartControler.update)

module.exports = router;
