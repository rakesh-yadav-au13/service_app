const express = require('express');
const router = express.Router();

const AdminOrderControler = require('../app/controlers/admin/offersControler')
const StatusControler = require('../app/controlers/admin/statusControler')

//Middlewares
const admin = require('../app/middlewares/admin')
const auth = require('../app/middlewares/auth')

router.get('/offers',auth,admin,AdminOrderControler.getOfferPage)

router.post('/offers',StatusControler.postStatus);


module.exports = router;