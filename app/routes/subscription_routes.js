const Subscription = require('../models/subscription.js')

module.exports = function(app, db){
  app.post('/subscriptions', (req, res)=> {
    let subBody = req.body.subscription
    Subscription.findById(subBody.id, function(err, existingSub) {
      if(existingSub){
        let _subscription = new Subscription({
          _id: subBody.id,
          address_id: subBody.address_id,
          cancellation_reason: subBody.cancellation_reason,
          cancellation_reason_comments: subBody.cancellation_reason_comments,
          cancelled_at: subBody.cancelled_at,
          charge_interval_frequency: subBody.charge_interval_frequency,
          created_at: subBody.created_at,
          customer_id: subBody.customer_id,
          expire_after_specific_number_of_charges: subBody.expire_after_specific_number_of_charges,
          has_queued_charges: subBody.has_queued_charges,
          is_skippable: subBody.is_skippable,
          is_swappable: subBody.is_swappable,
          max_retries_reached: subBody.max_retries_reached,
          next_charge_scheduled_at: subBody.next_charge_scheduled_at,
          order_day_of_month: subBody.order_day_of_month,
          order_day_of_week: subBody.order_day_of_week,
          order_interval_frequency: subBody.order_interval_frequency,
          order_interval_unit: subBody.order_interval_unit,
          price: subBody.price,
          product_title: subBody.product_title,
          properties: subBody.properties,
          quantity: subBody.quantity,
          recharge_product_id: subBody.recharge_product_id,
          shopify_product_id: subBody.shopify_product_id,
          shopify_variant_id: subBody.shopify_variant_id,
          sku: subBody.sku,
          sku_override: subBody.sku_override,
          status: subBody.status,
          updated_at: subBody.updated_at,
          variant_title: subBody.variant_title
        });
        existingSub.versions.push(_subscription)
        existingSub.save(function(err, doc){
          if (err) return res.send(500, { error: err} );
          return res.send("new Subscription version successfully created");
        })
      } else {
        let newSubscription = new Subscription({
          _id: subBody.id,
          address_id: subBody.address_id,
          cancellation_reason: subBody.cancellation_reason,
          cancellation_reason_comments: subBody.cancellation_reason_comments,
          cancelled_at: subBody.cancelled_at,
          charge_interval_frequency: subBody.charge_interval_frequency,
          created_at: subBody.created_at,
          customer_id: subBody.customer_id,
          expire_after_specific_number_of_charges: subBody.expire_after_specific_number_of_charges,
          has_queued_charges: subBody.has_queued_charges,
          is_skippable: subBody.is_skippable,
          is_swappable: subBody.is_swappable,
          max_retries_reached: subBody.max_retries_reached,
          next_charge_scheduled_at: subBody.next_charge_scheduled_at,
          order_day_of_month: subBody.order_day_of_month,
          order_day_of_week: subBody.order_day_of_week,
          order_interval_frequency: subBody.order_interval_frequency,
          order_interval_unit: subBody.order_interval_unit,
          price: subBody.price,
          product_title: subBody.product_title,
          properties: subBody.properties,
          quantity: subBody.quantity,
          recharge_product_id: subBody.recharge_product_id,
          shopify_product_id: subBody.shopify_product_id,
          shopify_variant_id: subBody.shopify_variant_id,
          sku: subBody.sku,
          sku_override: subBody.sku_override,
          status: subBody.status,
          updated_at: subBody.updated_at,
          variant_title: subBody.variant_title,
          versions: [],
          orders: []
        });
        newSubscription.save(function(err, doc) {
          if (err) return res.send(500, { error: err} );
          return res.send("Subscription successfully created");
        })
      }
    });
  });
};
