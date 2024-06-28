const Order = require('../../../models/order');

function renderItems(items) {
  let parsedItems = Object.values(items)
  return parsedItems.map((menuItem) => {
      return `
          <p>${ menuItem.item.name } - ${ menuItem.qty } pcs</p>
      `;
  }).join('')
}
function orderController() {
  return {
    async index(req, res) {
      try {
        const orders = await Order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 } }).populate('customerId', '-password');
        
        if (req.xhr) {
          return res.json(orders);
        } else {
          return res.render('admin/orders', { orders, renderItems });  // Pass orders to the view
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');  // Send an appropriate error response
      }
    }
  }
}

module.exports = orderController;
