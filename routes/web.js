const homeController=require('../app/http/controller/homeController');
const authController=require('../app/http/controller/authController');
const cartController=require('../app/http/controller/customers/cartController');

//middlewares

const guest = require('../app/http/middleware/guest')
//const auth = require('../app/http/middleware/auth')
//const admin = require('../app/http/middleware/admin')


function initRoutes(app) {
    app.get('/',homeController().index)
    app.get('/login',guest,authController().login)
    app.post('/login',authController().postLogin)
    app.get('/register',guest, authController().register)
    app.post('/register',authController().postRegister)
    app.post('/logout',authController().logout)


    app.get('/cart', cartController().index)
    app.post('/update-cart',cartController().update)
}
module.exports=initRoutes;
