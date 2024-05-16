const homeController=require('../app/http/controller/homeController');
const authController=require('../app/http/controller/authController');
const cartController=require('../app/http/controller/customers/cartController');
const orderController=require('../app/http/controller/customers/orderController');
const adminOrderController=require('../app/http/controller/admin/orderController');



//middlewares

const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const admin = require('../app/http/middleware/admin')


function initRoutes(app) {
    app.get('/',homeController().index)
    app.get('/login',guest,authController().login)
    app.post('/login',authController().postLogin)
    app.get('/register',guest, authController().register)
    app.post('/register',authController().postRegister)
    app.post('/logout',authController().logout)


    app.get('/cart', cartController().index)
    app.post('/update-cart',cartController().update)


    //customer routes
    app.post('/orders', auth, orderController().store)
    app.get('/customers/orders', auth, orderController().index)

    //admin routes
    app.get('/admin/orders', admin,adminOrderController().index)

}
module.exports=initRoutes;
