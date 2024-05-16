const Order = require('../../../models/order')

function orderController() {
  return {
    index(req, res) {
      try {
        Order.find({ status: { $ne: 'completed' } },null, { sort: { 'createdAt': -1 }}).populate('customerId', '-password');
        if (req.xhr) {
          return res.json(Orders);
        } else {
          return res.render('admin/orders');
        }
      } catch (err) {
        console.error(err);
        // Handle the error appropriately
      }
    }
  }
}

module.exports = orderController
