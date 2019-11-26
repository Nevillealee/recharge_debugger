const request = require('request');
let options = {
  url: 'https://api.rechargeapps.com/orders/count?',
  headers: {
    'content-type': 'application/json',
    'x-recharge-access-token': process.env.RECHARGE_ACTIVE_KEY
  }
};
let count = 0;
function callback(error, response, body){
  if(!error && response.statusCode == 200){
    let info = JSON.parse(body);
    console.log(info.count);
    count = info.count;
    //send orders to endpoint to simulate webhook
    const pages = Math.ceil(count/250);
    for(var i = 1; i < pages; i++){
      options.url = `https://api.rechargeapps.com/orders?limit=250&page=${i}`
      request(options, callback2)
    }
  } else {
    console.log(error);
  }
}

function callback2(error, response, body){
  if(!error && response.statusCode == 200){
    let info = JSON.parse(body);
    console.log(info.orders);

  } else {
    console.log(error);
  }
}
//get count of orders
request(options, callback)
