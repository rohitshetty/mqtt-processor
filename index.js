'use strict';
const mqtt = require('mqtt'),
    url = require('url'),
    Topics = require('./subscriptions/topics-aggregator.js');



const topics = Topics.getTopicsToBeSubscribed(),
    mqtt_url = url.parse(process.env.CLOUDMQTT_URL|| "mqtt://localhost:1883"),
    auth = (mqtt_url.auth || ':').split(':'),
    mqtt_broker_url = `mqtts://${mqtt_url.host}`;

const options  = {
    port: mqtt_url.port,
    clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
    username: auth[0],
    password: auth[1]
};

const client = mqtt.connect(mqtt_broker_url, options);

client.on('connect', () => {
    //subscribe to the aggregated topics
    for(let topic in topics) {
        client.subscribe(topic);
        console.log(`subscribed to ${topic}`);
    }

    client.publish('/all', 'mqtt-processor is up.');
});


client.on('message', (topicName, message) => {
    //call respective callbacks
    topics[topicName](message);
});

client.on('error', (err) => {
    console.error(err);
});
