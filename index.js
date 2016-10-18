var mqtt = require('mqtt'),
    url = require('url'),
    Topics = require('./subscriptions/topics-aggregator.js')
    topics = Topics.getTopicsToBeSubscribed();

var mqtt_url = url.parse(process.env.CLOUDMQTT_URL|| "mqtt://localhost:1883");

var auth = (mqtt_url.auth || ':').split(':');

var url = "mqtts://" + mqtt_url.host;

var options  = {
    port: mqtt_url.port,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: auth[0],
    password: auth[1]
};
var client = mqtt.connect(url, options);

client.on('connect', function () {
    //subscribe to the aggregated topics
    for(topic in topics) {
        client.subscribe(topic);
        console.log('subscribed to ', topic);
    }

    client.publish('/all', 'mqtt-processor is up.');
});


client.on('message', function (topicName, message) {
    //call respective callbacks
    topics[topicName](message);
});

client.on('error', function (err) {
    console.error(err);
});
