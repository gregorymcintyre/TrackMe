//require('dotenv').config();
const mqtt = require('mqtt');

const { URL, USERNAME, PASSWORD } = process.env;

/*const client = mqtt.connect(URL, {
	username: USERNAME,
	password: PASSWORD
});*/

const client = mqtt.connect({
	host: 'soldier.cloudmqtt.com:17826',
	username: 'bzwlzhhd',
	password: 'U1q2RGhiLof6'
});

console.log(client);

client.on('connect', () => {
	console.log('connected');
	
	const topic = '/test/hello/';
	const msg = 'Hello MQTT world!';
	client.publish(topic, msg, () => {
		console.log('message sent...');
	});	
});