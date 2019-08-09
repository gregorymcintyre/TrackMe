const mqtt = require('mqtt');

const { URL, USERNAME, PASSWORD } = process.env;

const client = mqtt.connect(URL, {
	username: USERNAME,
	password: PASSWORD
});

client.on('connect', () => {
	console.log('connected');
});
