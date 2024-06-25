const Order = require('../../../models/order');

function orderController() {
  return {
    async index(req, res) {
      try {
        const orders = await Order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 } }).populate('customerId', '-password');
        
        if (req.xhr) {
          return res.json(orders);
        } else {
          return res.render('admin/orders', { orders });  // Pass orders to the view
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');  // Send an appropriate error response
      }
    }
  }
}

module.exports = orderController;
