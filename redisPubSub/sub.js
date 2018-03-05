const redis = require('redis');

// Create a subscriber
const sub = redis.createClient();

// Attach a listener to receive new messages from the pub channel
sub.on('message', function(channel, message) {
    // Parse message as it's JSON stringified
    try {
	const json = JSON.parse(message);
	console.log('Received message', json);
    } catch (e) {
	// Handle inappropriate message errors that might occur
    }
});

// Sub to the channel with its name
sub.subscribe('parameter-mapping');

console.log('Subcribed to \'parameter-mapping\' channel');
      
