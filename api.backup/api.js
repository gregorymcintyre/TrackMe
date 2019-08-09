const express = require('express');
const Device = require('./models/device');
const User = require('./models/user');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //add

//const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://gmcintyre:Bj--D%25c%3FKwb%7DN%5BSj@cluster0-wt5gz.mongodb.net/test";
//const uri = 'mongodb+srv://user:pass1234@sit209-pnsu3.mongodb.net/test';
//mongodb+srv://gmcintyre:<password>@cluster0-wt5gz.mongodb.net/test?retryWrites=true&w=majority

//const client = mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
const client = mongoose.connect(uri, {useNewUrlParser: true});
//const client = mongoose.connect("mongodb+srv://gmcintyre:Bj--D%c?Kwb}N[Sj@cluster0-wt5gz.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});

const app = express();
//const port = process.env.PORT || 5000;
const port = 5000;

app.use(bodyParser.json());		//add
//app.use(express.static(`${__dirname}/public`));

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

/**
* @api {get} /api/devices AllDevices An array of all devices
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
* [
* 	{
* 		"_id": "dsohsdohsdofhsofhosfhsofh",
* 		"name": "Mary's iPhone",
* 		"user": "mary",
* 		"sensorData": [
* 			{
* 				"ts": "1529542230",
* 				"temp": 12,
* 				"loc": {
* 					"lat": -37.84674,
*	 				"lon": 145.115113
* 				}
* 			},
* 			{
* 				"ts": "1529572230",
* 				"temp": 17,
* 				"loc": {
* 					"lat": -37.850026,
* 					"lon": 145.117683
* 				}
* 			}
* 		]
* 	}
* ]
* @apiErrorExample {json} Error-Response:
* {
* 	"User does not exist"
* }
*/

app.get('/api/devices', (req, res) => {
    Device.find({}, (err, devices) => {
		return err
			? res.send(err)
			: res.send(devices);
    });
});

/**
* @api {post} /api/devices AllDevices An array of all devices
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
* {
*	"successfully added device and data"
* }
*
* @apiErrorExample {json} Error-Response:
* { 
*	"error code and details show"
* }
*/

/*
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
*/

app.post('/api/users', (req, res) => {
	//const {user, password)=req.body;
	const newUser = new User({
		user,
		password,
	})
	newUser.save(err => {
		return err
			? res.send(err)
			: res.send('successfully added User');
	});
});


app.post('/api/send-command', (req, res) => {
	console.log(req.body);
});

/*
app.get('/docs', (req, res) => {
	res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});
*/