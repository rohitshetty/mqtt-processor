'use strict';
const glob = require('glob'),
	path = require('path'),
	channels = glob.sync(path.resolve('./subscriptions/channels/**.js'));

exports.getTopicsToBeSubscribed = () => {
	let topics = {};

	let pushIntoTopics = (filename) => {
		let file = require(filename);
		for (let topic in file) {
			//create one json with key as topicname and value as the callback function
			topics[topic] = file[topic];
		}
	};

	channels.forEach((channel) => {
		pushIntoTopics(channel);
	});

	return topics;
};
