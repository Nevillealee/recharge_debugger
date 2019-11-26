// https://code.tutsplus.com/articles/an-introduction-to-mongoose-for-mongodb-and-nodejs--cms-29527
const mongoose = require('mongoose');
var subOrderSchema = mongoose.Schema({
  _id: Number,
  address_id: Number,
  billing_address: {
     address1: String,
     address2: String,
     city: String,
     company: String,
     country: String,
     first_name: String,
     last_name: String,
     phone: String,
     province: String,
     zip: String
  },
  charge_id: Number,
  created_at: {
    type: Date,
    default: Date.now
  },
  customer_id: Number,
  email: String,
  first_name: String,
  is_prepaid: Number,
  last_name: String,
  line_items: [
     {
         price: String,
         properties: [],
         quantity: Number,
         shopify_product_id: String,
         shopify_variant_id: String,
         sku: String,
         subscription_id: Number,
         variant_title: String,
         grams: Number,
         title: String
     }
  ],
  payment_processor: String,
  processed_at: Date,
  scheduled_at: Date,
  shipped_date: Date,
  shipping_address: {
     address1: String,
     address2: String,
     city: String,
     company: String,
     country: String,
     first_name: String,
     last_name: String,
     phone: String,
     province: String,
     zip: String
  },
  shipping_date: Date,
  shopify_customer_id: Number,
  shopify_order_id: String,
  shopify_order_number: Number,
  status: String,
  total_price: Number,
  transaction_id: String,
  type: String,
  updated_at: {
    type: Date,
    default: Date.now
  }
});
var orderSchema = mongoose.Schema({
  _id: Number,
  address_id: Number,
  billing_address: {
     address1: String,
     address2: String,
     city: String,
     company: String,
     country: String,
     first_name: String,
     last_name: String,
     phone: String,
     province: String,
     zip: String
  },
  charge_id: Number,
  created_at: {
    type: Date,
    default: Date.now
  },
  customer_id: Number,
  email: String,
  first_name: String,
  is_prepaid: Number,
  last_name: String,
  line_items: [
     {
         price: String,
         properties: [],
         quantity: Number,
         shopify_product_id: String,
         shopify_variant_id: String,
         sku: String,
         subscription_id: Number,
         variant_title: String,
         grams: Number,
         title: String
     }
  ],
  payment_processor: String,
  processed_at: Date,
  scheduled_at: Date,
  shipped_date: Date,
  shipping_address: {
     address1: String,
     address2: String,
     city: String,
     company: String,
     country: String,
     first_name: String,
     last_name: String,
     phone: String,
     province: String,
     zip: String
  },
  shipping_date: Date,
  shopify_customer_id: Number,
  shopify_order_id: String,
  shopify_order_number: Number,
  status: String,
  total_price: Number,
  transaction_id: String,
  type: String,
  versions: [subOrderSchema],
  updated_at: {
    type: Date,
    default: Date.now
  }
});
var Order = mongoose.model('Order', orderSchema);
module.exports = Order;
