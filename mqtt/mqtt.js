const { URL, UNAME, PASSWORD } = process.env;

const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 5001;

//console.log(URL);
//console.log(UNAME);
//console.log(PASSWORD);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

const client = mqtt.connect(URL, {
	username: UNAME,
	password: PASSWORD
});

client.on('connect', () => {
	console.log('mqtt connected');
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