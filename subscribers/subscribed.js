var glob = require('glob');
var path = require('path');
var channels = glob.sync(path.resolve('./subscribers/channels/**.js'));

exports.getSubscribers = function () {
    var subscribers = {};

    var pushIntoSubscriber = function (filename) {
        var file = require(filename);
        for (topic in file) {
            subscribers[topic] = file[topic];
        }
    };

    channels.forEach(function (channel) {
        pushIntoSubscriber(channel);
    });

    return subscribers;
};
