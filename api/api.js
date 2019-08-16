const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://user:pass1234@sit209-pnsu3.mongodb.net/test", { useNewUrlParser: true });

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const Device = require('./models/device');
const User = require('./models/user');

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
		return res.send(devices);
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
	    }); });

//app.post('/api/send-command', (req, res) => {
//	console.log(req.body.command);
//    });

app.post('/api/authenticate', (req, res) => {
	const { user, password } = req.body;
	User.findOne({
		name: user
		    }, (err, found) => {
		if (err) {
		    return res.send(err);
		} else if (!found) {
		    return res.send('No user found');
		} else if (found.password !== password) {
		    return res.send('Incorrect name or password');
		} else {
		    return res.json({
			    success: true,
			    message: 'Authenticated successfully',
			    isAdmin: found.isAdmin
			});
		}
	    });
    });


app.post('/api/registration', (req, res) => {
	const { user, password, isAdmin } = req.body;
	User.findOne({
		name: user
		    }, (err, found) => {
		if (err) {
		    return res.send(err);
		} else if (found) {
		    return res.send('User already exists');
		} else {
		    const newUser = new User({
			    name: user,
			    password,
        isAdmin
			});
		    newUser.save(err => {
        return err
	? res.send(err)
	: res.json({
		success: true,
		message: 'Created new user'
	    });
			});
		}
	    });
    });


app.get('/api/devices/:deviceId/device-history', (req, res) => {
	const { deviceId } = req.params;
	Device.findOne({"_id": deviceId }, (err, devices) => {
		const { sensorData } = devices;
    return err
		? res.send(err)
		: res.send(sensorData);
	    });
    });

app.get('/api/users/:user/devices', (req, res) => {
	const { user } = req.params;
	Device.find({ "user": user }, (err, devices) => {
    return err
    ? res.send(err)
    : res.send(devices);
	    }); });
