const express = require('express');
const Device = require('./models/device');
const mongoose = require('mongoose');
const bodyParser = require('body-parser') //add

//const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://gmcintyre:Bj--D%25c%3FKwb%7DN%5BSj@cluster0-wt5gz.mongodb.net/test?retryWrites=true&w=majority";

const client = mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
//const client = mongoose.connect("mongodb+srv://gmcintyre:Bj--D%c?Kwb}N[Sj@cluster0-wt5gz.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});

const app = express();
app.use(bodyParser.json());		//add
const port = process.env.PORT || 5000;

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/api/test', (req, res) => {
	res.send('The API is working!');
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});

app.get('/api/devices', (req, res) => {
    Device.find({}, (err, devices) => {
		return err
			? res.send(err)
			: res.send(devices);
    });
});

app.post('/api/devices', (req, res) => {
	const { name, user, sensorData } = req.body;
	const newDevice = new Device({
		name,
		user,
		sensorData
	});
	newDevice.save(err => {
		return err
			? res.send(err)
			: res.send('successfully added device and data');
	});
});

app.post('/api/send-command', (req, res) => {
	console.log(req.body);
});

