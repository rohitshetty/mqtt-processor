var mqtt = require('mqtt'),
    url = require('url'),
    Subscriber = require('./subscribers/subscribed.js')
    subscribers = Subscriber.getSubscribers();

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
    console.log('connected to mqtt broker!');

    for(topic in subscribers) {
        client.subscribe(topic);
        console.log('subscribed to ', topic);
    }

    client.publish('/all', 'mqtt-processor is up.');
});


client.on('message', function (topic, message) {
    subscribers[topic](message);
});

client.on('error', function (err) {
    console.log(err);
});
