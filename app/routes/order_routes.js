// HTTParty.post("http://localhost:8000/orders", :headers => {'Content-Type' => 'application/json'}, :body => order.to_json)
// place one line 1942 in worker_helper.rb in sports jacket to simulate webhooks
const Order = require('../models/order.js')
const Subscription = require('../models/subscription.js')

module.exports = function(app, db){
  app.post('/orders', (req, res) => {
    let orderBody = req.body.order;
    // find subscription_id TODO(Neville): account for multiple subscription purchases at once
    let subId = '';
    let line_item_count = orderBody.line_items.length;
    if (line_item_count == 1){
      subId = orderBody.line_items[0].subscription_id
    } else if (line_item_count > 1) {
        subId = orderBody.line_items[line_item_count - 1].subscription_id
    }
    //update Orders
    Order.findById(orderBody.id, function(err, existingOrder){
      if (existingOrder){
        let _newSubOrder = {
            _id: orderBody.id,
            address_id: orderBody.address_id,
            billing_address: orderBody.billing_address,
            charge_id: orderBody.charge_id,
            created_at: orderBody.created_at,
            customer_id: orderBody.customer_id,
            email: orderBody.email,
            first_name: orderBody.first_name,
            is_prepaid: orderBody.is_prepaid,
            last_name: orderBody.last_name,
            line_items: orderBody.line_items,
            payment_processor: orderBody.payment_processor,
            processed_at: orderBody.processed_at,
            scheduled_at: orderBody.scheduled_at,
            shipped_date: orderBody.shipped_date,
            shipping_address: orderBody.shipping_address,
            shipping_date: orderBody.shipping_date,
            shopify_customer_id: orderBody.shopify_customer_id,
            shopify_order_id: orderBody.shopify_order_id,
            shopify_order_number: orderBody.shopify_order_number,
            status: orderBody.status,
            tags: orderBody.tags,
            total_price: orderBody.total_price,
            transaction_id: orderBody.transaction_id,
            type: orderBody.type,
            updated_at: orderBody.updated_at,
          };
        existingOrder.versions.push(_newSubOrder)
        existingOrder.save(function(err, doc) {
          if (err) return res.send(500, { error: err} );
          return res.send("new order version successfully created");
        });
      } else {
        let _newOrder = new Order({
            _id: orderBody.id,
            address_id: orderBody.address_id,
            billing_address: orderBody.billing_address,
            charge_id: orderBody.charge_id,
            created_at: orderBody.created_at,
            customer_id: orderBody.customer_id,
            email: orderBody.email,
            first_name: orderBody.first_name,
            is_prepaid: orderBody.is_prepaid,
            last_name: orderBody.last_name,
            line_items: orderBody.line_items,
            payment_processor: orderBody.payment_processor,
            processed_at: orderBody.processed_at,
            scheduled_at: orderBody.scheduled_at,
            shipped_date: orderBody.shipped_date,
            shipping_address: orderBody.shipping_address,
            shipping_date: orderBody.shipping_date,
            shopify_customer_id: orderBody.shopify_customer_id,
            shopify_order_id: orderBody.shopify_order_id,
            shopify_order_number: orderBody.shopify_order_number,
            status: orderBody.status,
            tags: orderBody.tags,
            total_price: orderBody.total_price,
            transaction_id: orderBody.transaction_id,
            type: orderBody.type,
            updated_at: orderBody.updated_at,
            versions: []
          });
        _newOrder.save(function(err, doc) {
          if (err) return res.send(500, { error: err} );
          return res.send("Order successfully created");
        });
      }
    });
    // update associated Subscription
    Subscription.findById(subId, function(err, existingSub){
      if(existingSub){
        existingSub.orders.push(orderBody.id);
        existingSub.save(function(err, doc) {
          if (err) return res.send(500, { error: err} );
          return res.send("new subscription version successfully created");
        });
      }
    });
  });
};
