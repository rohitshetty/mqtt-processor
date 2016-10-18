var mqtt = require('mqtt'),
    url = require('url');

var mqtt_url = url.parse(process.env.CLOUDMQTT_URL|| "mqtt://localhost:1883");

var auth = (mqtt_url.auth || ':').split(':');

var url = "mqtts://" + mqtt_url.host;

var options  = {
    port: mqtt_url.port,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: auth[0],
    password: auth[1]
};
console.log(url, options)
var client = mqtt.connect(url, options);

client.on('connect', function () {
    console.log('connected to mqtt broker!');
});

client.on('error', function (err) {
    console.log(err);
})
