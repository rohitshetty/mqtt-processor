#MQTT PROCESSOR

This is a framework-ish code for writing mqtt processors.
MQTT processor is a standalone node js app which subscribes to topics described along with callbacks for topics.
And on message on subscribed topics does some action (may be add data to db, fetch data and return on some channel, turn some gpio on if running on some embedded device like Raspi or intel galileo or edison etc)

To run this app you need to export `CLOUDMQTT_URL` in format `mqtts://user@password:serverurl:portid`.
I have used cloudmqtt.com as my mqtt broker you can use anything that you fancy.

You can describe topics to be subscribed by creating new file in `subscriptions/channels/` folder.
follow `subscriptions/channels/utils.js` for example.

This works by adding all the callbacks to one big json with topic's name as the key.
And then the key is subscribed upon. And on `message` event the incoming topic name is used and the appropriate call back is summoned.
