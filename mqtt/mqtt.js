//mqtt subscribe -h mqtt://soldier.cloudmqtt.com -p 17826 -u bzwlzhhd -P U1q2RGhiLof6 -t /test/#

const mqtt = require('mqtt');
//const { URL, USERNAME, PASSWORD } = process.env;

const URL='mqtt://soldier.cloudmqtt.com:17826';
const USERNAME='bzwlzhhd';
const PASSWORD='U1q2RGhiLof6';

const express = require('express');
const bodyParser = require('body-parser');
const port = 5001;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

const client = mqtt.connect(URL, {
    username: USERNAME,
    password: PASSWORD
});

client.on('connect', () => {
    console.log('connected');
}); 

const topic = '/test/hello';
const msg = 'Hello MQTT world!';
client.publish(topic, msg, () => {
	console.log('message sent...');
});


app.post('/send-command', (req, res) => {
	const { deviceId, command } = req.body;
	const topic = `/command/${deviceId}`;
	client.publish(topic, command, () => {
		res.send('published new message');
	});
});


app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
