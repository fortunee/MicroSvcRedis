const redis = require('redis');

// Create a standard redis client which is the publisher
const pub = redis.createClient();

// Publish a message every six seconds by specifying a channel name
setInterval(function () {
   pub.publish('parameter-mapping', JSON.stringify({
       name: 'Fortune Ekeruo'
   }));
   console.log('Message Sent!');
}, 6000);

console.log('Publishing via channel name \'parameter-mapping\'...');

