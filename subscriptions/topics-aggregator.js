var glob = require('glob');
var path = require('path');
var channels = glob.sync(path.resolve('./subscriptions/channels/**.js'));

exports.getTopicsToBeSubscribed = function () {
    var topics = {};

    var pushIntoTopics = function (filename) {
        var file = require(filename);
        for (topic in file) {
            //create one json with key as topicname and value as the callback function
            topics[topic] = file[topic];
        }
    };

    channels.forEach(function (channel) {
        pushIntoTopics(channel);
    });

    return topics;
};
